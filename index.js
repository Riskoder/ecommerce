import { Home } from './pages/home/Home.js';
import { Blogs } from './pages/blogs/Blogs.js';
import { Contacto } from './pages/contacto/Contacto.js';
import { Nosotros } from './pages/nosotros/Nosotros.js';
import { Productos } from './pages/productos/Productos.js';

const root = document.getElementById('content');

const routes = {
  '': Home,
  '#/': Home,
  '#/products': Productos,
  '#/about': Nosotros,
  '#/contact': Contacto,
  '#/blog': Blogs,
};

async function router() {
  const hash = window.location.hash;
  root.innerHTML = `<p>Cargando...</p>`;

  if (hash.startsWith('#/product/')) {
    const id = parseInt(hash.split('/')[2]);
    const product = productsCache.find((p) => p.id === id);

    if (product) {
      root.innerHTML = '';
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
