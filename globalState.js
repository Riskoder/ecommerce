import { getProducts } from "./service/getProducts.js";

export let productsCache = [];
export let currentUser = null;
export let usersCache = [];

export async function loadProducts() {
  if (productsCache.length) return productsCache;

  try {
    const data = await getProducts();
    productsCache = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(
      "No se pudieron cargar los productos. Continuando sin datos.",
      error
    );
    const stored = localStorage.getItem("products");
    productsCache = stored ? JSON.parse(stored) : [];
  }

  return productsCache;
}

// Usuarios
export function loadUsers() {
  const stored = localStorage.getItem("users");
  usersCache = stored ? JSON.parse(stored) : [];
  return usersCache;
}

export function setUsers(users) {
  usersCache = users;
  localStorage.setItem("users", JSON.stringify(usersCache));
}

export function removeUserByEmail(email) {
  usersCache = usersCache.filter((u) => u.email !== email);
  localStorage.setItem("users", JSON.stringify(usersCache));
}

// Current user
export function loadCurrentUser() {
  const stored = localStorage.getItem("currentUser");
  currentUser = stored ? JSON.parse(stored) : null;
  return currentUser;
}

export function logoutCurrentUser() {
  currentUser = null;
  localStorage.removeItem("currentUser");
}

// Productos helpers (agregar/eliminar)
export function addProduct(product) {
  productsCache = [product, ...productsCache];
  localStorage.setItem("products", JSON.stringify(productsCache));
}

export function removeProductById(productId) {
  productsCache = productsCache.filter((p) => p.id !== productId);
  localStorage.setItem("products", JSON.stringify(productsCache));
}

// Actualizar producto por id con propiedades parciales
export function updateProductById(productId, updates) {
  let updated = false;
  productsCache = productsCache.map((product) => {
    if (product.id === productId) {
      updated = true;
      return { ...product, ...updates };
    }
    return product;
  });
  if (updated) {
    localStorage.setItem("products", JSON.stringify(productsCache));
  }
  return updated;
}

// Generar un nuevo id incremental comenzando desde 200
export function generateNewProductId() {
  const currentMax = productsCache.reduce((maxId, product) => {
    if (typeof product.id === "number" && product.id >= 200) {
      return Math.max(maxId, product.id);
    }
    return maxId;
  }, 199);
  return currentMax + 1; // 200 si no hay anteriores >= 200
}
