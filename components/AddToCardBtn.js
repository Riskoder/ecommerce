import {
  updateProductQuantity,
  addProduct,
  getCart,
} from '../pages/carritoCompras/cartLogic.js';
import { renderConditional } from '../utils/renderConditional.js';

const AddToCartBtn = (product) => {
  const container = document.createElement('div');
  container.classList.add('card-btns');
  let quantity =
    getCart().find((item) => item.id === product.id)?.quantity || 0;

  const render = () => {
    container.innerHTML = '';

    const addBtn = document.createElement('button');
    addBtn.classList.add('add-btn');
    addBtn.textContent = 'Agregar al Carrito';
    addBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      quantity = 1;
      addProduct(product);
      render();
      // Disparar evento para actualizar el carrito
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    });

    const controls = document.createElement('div');
    controls.classList.add('quantity-controls');

    const minusBtn = document.createElement('button');
    minusBtn.textContent = '−';
    minusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (quantity > 1) {
        quantity -= 1;
        updateProductQuantity(product.id, quantity);
      } else {
        quantity = 0;
        updateProductQuantity(product.id, 0);
      }
      render();
      // Disparar evento para actualizar el carrito
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    });

    const qtySpan = document.createElement('span');
    qtySpan.textContent = quantity;

    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      quantity += 1;
      updateProductQuantity(product.id, quantity);
      render();
      // Disparar evento para actualizar el carrito
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    });

    controls.append(minusBtn, qtySpan, plusBtn);

    const node = renderConditional(quantity === 0, addBtn, controls);
    container.appendChild(node);
  };

  render();
  return container;
};

export { AddToCartBtn };
