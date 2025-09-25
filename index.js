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
const profileMenuContainer = document.getElementById("profile-menu-container");
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

  // Renderizar el menú de perfil o el botón de login
  const currentUser = loadCurrentUser();
  profileMenuContainer.innerHTML = ""; // Limpiar antes de renderizar
  profileMenuContainer.appendChild(ProfileMenu(currentUser));

  // Proteger vista de Admin y ajustar layout
  if (hash === "#/admin") {
    // Proteger admin: solo rol admin
    if (!currentUser || (currentUser.rol || "usuario") !== "admin") {
      window.location.hash = "#/";
      return;
    }
    // Mantener header visible pero ocultar footer en admin
    if (header) header.style.display = "";
    if (footer) footer.style.display = "none";
  } else {
    // Mostrar header y footer normalmente en otras vistas
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
//FUNCIONES PARA CAMBIAR DE VISTA
window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);

// Mobile menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navbar = document.getElementById("navbar");
  
  if (mobileMenuBtn && navbar) {
    mobileMenuBtn.addEventListener("click", () => {
      navbar.classList.toggle("show");
      
      // Change icon based on menu state
      const icon = mobileMenuBtn.querySelector(".material-symbols-outlined");
      if (navbar.classList.contains("show")) {
        icon.textContent = "close";
      } else {
        icon.textContent = "menu";
      }
    });

    // Close mobile menu when clicking on a link
    const navLinks = navbar.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navbar.classList.remove("show");
        const icon = mobileMenuBtn.querySelector(".material-symbols-outlined");
        icon.textContent = "menu";
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navbar.classList.remove("show");
        const icon = mobileMenuBtn.querySelector(".material-symbols-outlined");
        icon.textContent = "menu";
      }
    });
  }
});

// Función que crea el menú de perfil
function ProfileMenu(user) {
  const container = document.createElement("div");

  if (user) {
    // --- Vista para usuario autenticado ---
    container.classList.add("profile-menu");
    container.innerHTML = `
      <button class="profile-menu-button">
        <span class="material-symbols-outlined">person</span>
      </button>
      <div class="profile-menu-content">
        <div class="profile-menu-header">
          <p class="user-name">${user.nombre}</p>
          <p class="user-email">${user.email}</p>
        </div>
        <a href="#/my-account">
          <span class="material-symbols-outlined">manage_accounts</span>
          Mi Cuenta
        </a>
        <a href="#/my-orders">
          <span class="material-symbols-outlined">receipt_long</span>
          Mis Pedidos
        </a>
        ${user.rol === 'admin' ? `
        <div class="profile-menu-divider"></div>
        <a href="#/admin">
          <span class="material-symbols-outlined">admin_panel_settings</span>
          Panel de Admin
        </a>` : ''}
        <div class="profile-menu-divider"></div>
        <button id="logout-btn">
          <span class="material-symbols-outlined">logout</span>
          Cerrar Sesión
        </button>
      </div>
    `;

    const menuButton = container.querySelector(".profile-menu-button");
    const menuContent = container.querySelector(".profile-menu-content");

    menuButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Evitar que el click se propague al documento
      menuContent.classList.toggle("show");
    });

    // Cerrar el menú si se hace clic fuera de él
    const closeMenuHandler = (e) => {
      if (!container.contains(e.target)) {
        menuContent.classList.remove("show");
      }
    };
    
    document.addEventListener("click", closeMenuHandler);
    
    // Cerrar el menú cuando se navega a otra página
    const menuLinks = container.querySelectorAll('a[href^="#"]');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuContent.classList.remove("show");
      });
    });

    // Funcionalidad de logout
    const logoutBtn = container.querySelector("#logout-btn");
    logoutBtn.addEventListener("click", () => {
      logoutCurrentUser();
      window.location.hash = "#/login";
      router(); // Volver a renderizar el router para actualizar el header
    });

  } else {
    // --- Vista para usuario no autenticado ---
    container.innerHTML = `
      <a href="#/login" class="login-button">
        <span class="material-symbols-outlined">account_circle</span>
        <span>Iniciar Sesión</span>
      </a>
    `;
    // Estilo simple para el botón de login
    const style = document.createElement('style');
    style.textContent = `
      .login-button {
        display: inline-flex;
        align-items: center;
        padding: 8px 12px;
        text-decoration: none;
        color: #333;
        border-radius: 6px;
        transition: background-color 0.3s;
      }
      .login-button:hover {
        background-color: #f0f0f0;
      }
      .login-button span:first-child {
        margin-right: 8px;
      }
    `;
    container.appendChild(style);
  }

  return container;
}
