import { getTotalProducts } from '../pages/carritoCompras/cartLogic.js';

export const CartOption = () => {
  const cartContainer = document.createElement('a');
  cartContainer.href = '#/cart';
  cartContainer.classList.add('cart-option');

  const updateBadge = () => {
    const totalItems = getTotalProducts();
    cartContainer.innerHTML = `
      <span class="material-symbols-outlined">shopping_cart</span>
      <span class="cart-badge ${totalItems === 0 ? 'empty' : ''} ${
      totalItems > 9 ? 'double-digits' : ''
    }">${totalItems}</span>
    `;
  };

  updateBadge();

  window.addEventListener('cartUpdated', updateBadge);

  setInterval(updateBadge, 1000);

  return cartContainer;
};
