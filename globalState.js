import { getProducts } from "./service/getProducts.js";

export let productsCache = [];
export let currentUser = null;
export let usersCache = [];

export async function loadProducts() {
  if (productsCache.length) return productsCache;

  const data = await getProducts();
  productsCache = data;

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
