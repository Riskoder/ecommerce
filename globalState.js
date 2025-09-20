import { getProducts } from './service/getProducts.js';

export let productsCache = [];

export async function loadProducts() {
  if (productsCache.length) return productsCache;

  const data = await getProducts();
  productsCache = data;

  return productsCache;
}
