import { Home } from './pages/home/Home.js';
import { Blogs } from './pages/blogs/Blogs.js';
import { Contacto } from './pages/contacto/Contacto.js';
import { Nosotros } from './pages/nosotros/Nosotros.js';
import { Productos } from './pages/productos/Productos.js';
import { ProductDetail } from './pages/productos/ProductDetail.js';
import { productsCache, loadProducts } from './globalState.js';
import { CartOption } from './components/CartOption.js';
import { Cart } from './pages/carritoCompras/Cart.js';

const root = document.getElementById('content');
const cartOptionContainer = document.getElementById('cart-option-container');
cartOptionContainer.appendChild(CartOption());

const routes = {
  '': Home,
  '#/': Home,
  '#/products': Productos,
  '#/about': Nosotros,
  '#/contact': Contacto,
  '#/blog': Blogs,
  '#/cart': Cart,
};

async function router() {
  const hash = window.location.hash;
  root.innerHTML = `<p>Cargando...</p>`;
  await loadProducts();

  if (hash.startsWith('#/product/')) {
    const id = parseInt(hash.split('/')[2]);
    const product = productsCache.find((p) => p.id === id);

    root.innerHTML = '';
    if (product) {
      root.appendChild(ProductDetail(product));
    } else {
      root.innerHTML = `<p>Producto no encontrado.</p>`;
    }
    return;
  }

  const view = routes[hash] || Home;
  const content = await view();
  root.innerHTML = '';
  root.appendChild(content);
}

// async function renderProductos() {
//   const section = await Productos();
//   root.appendChild(section);
// }

// renderProductos();

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
