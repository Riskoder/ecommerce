import {
  getProductTotal,
  updateProductQuantity,
  removeProduct,
} from './cartLogic.js';

export function ProductInCart(product) {
  const productContainer = document.createElement('div');
  productContainer.classList.add('cartProduct-container');

  const productTotal = getProductTotal(product);
  const totalPrice = (
    product.price *
    product.quantity *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  productContainer.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <div class="cartProduct-info">
        <h4>${product.title}</h4>
        <p>${product.description}</p>
        <p>Precio unitario: $${product.price}</p>
      </div>
      <div class="cartProduct-controls">
        <div class="quantity-controls">
          <button onclick="updateQuantity(${product.id}, ${
    product.quantity - 1
  })">-</button>
          <span>${product.quantity}</span>
          <button onclick="updateQuantity(${product.id}, ${
    product.quantity + 1
  })">+</button>
        </div>
        <div class="product-total">
          <h5>Total: $${totalPrice}</h5>
        </div>
        <button onclick="removeFromCart(${
          product.id
        })" class="remove-btn">Eliminar</button>
      </div>
  `;

  window.updateQuantity = (productId, newQuantity) => {
    updateProductQuantity(productId, newQuantity);
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  window.removeFromCart = (productId) => {
    removeProduct(productId);
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  return productContainer;
}
