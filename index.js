import { Home } from "./pages/home/Home.js";
import { Blogs } from "./pages/blogs/Blogs.js";
import { Contacto } from "./pages/contacto/Contacto.js";
import { Nosotros } from "./pages/nosotros/Nosotros.js";
import { Productos } from "./pages/productos/Productos.js";
import { ProductDetail } from "./pages/productos/ProductDetail.js";
import {
  productsCache,
  loadProducts,
  loadCurrentUser,
  logoutCurrentUser,
} from "./globalState.js";
import { CartOption } from "./components/CartOption.js";
import { Login } from "./components/login/Login.js";
import { Cart } from "./pages/carritoCompras/Cart.js";
import { Admin } from "./pages/admin/Admin.js";
import { Register } from "./components/register/Register.js";

const root = document.getElementById("content");
const cartOptionContainer = document.getElementById("cart-option-container");
const userNameEl = document.getElementById("user-name");
const logoutBtn = document.getElementById("logout-btn");
const userLinkIcon = document.querySelector(
  "#user-link .material-symbols-outlined"
);
cartOptionContainer.appendChild(CartOption());

const routes = {
  "": Home,
  "#/": Home,
  "#/products": Productos,
  "#/about": Nosotros,
  "#/contact": Contacto,
  "#/blog": Blogs,
  "#/login": Login,
  "#/cart": Cart,
  "#/admin": Admin,
  "#/register": Register,
};

async function router() {
  const hash = window.location.hash;
  const header = document.querySelector("header.header");
  const footer = document.querySelector("footer.footer");

  // Mostrar nombre usuario y logout si hay sesión
  const current = loadCurrentUser();
  if (current && userNameEl && logoutBtn) {
    userNameEl.textContent = current.nombre || current.email || "";
    logoutBtn.style.display = "inline-flex";
    if (userLinkIcon) userLinkIcon.style.display = "none";
  } else if (userNameEl && logoutBtn) {
    userNameEl.textContent = "";
    logoutBtn.style.display = "none";
    if (userLinkIcon) userLinkIcon.style.display = "";
  }

  // Ocultar layout público en vista de Admin
  if (hash === "#/admin") {
    // Proteger admin: solo rol admin
    if (!current || (current.rol || "usuario") !== "admin") {
      window.location.hash = "#/";
      return;
    }
    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";
  } else {
    if (header) header.style.display = "";
    if (footer) footer.style.display = "";
  }
  root.innerHTML = `<p>Cargando...</p>`;
  try {
    await loadProducts();
  } catch (e) {
    console.error("Error cargando productos", e);
  }

  if (hash.startsWith("#/product/")) {
    const id = parseInt(hash.split("/")[2]);
    const product = productsCache.find((p) => p.id === id);

    root.innerHTML = "";
    if (product) {
      root.appendChild(ProductDetail(product));
    } else {
      root.innerHTML = `<p>Producto no encontrado.</p>`;
    }
    return;
  }

  const view = routes[hash] || Home;
  const content = await view();
  root.innerHTML = "";
  root.appendChild(content);
}

// async function renderProductos() {
//   const section = await Productos();
//   root.appendChild(section);
// }

// renderProductos();

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);

// Logout
logoutBtn?.addEventListener("click", () => {
  logoutCurrentUser();
  window.location.hash = "#/login";
  router();
});
