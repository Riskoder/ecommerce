import {
  addProduct,
  updateProductQuantity,
  getCart,
} from '../carritoCompras/cartLogic.js';

export function ProductDetail(product) {
  const container = document.createElement('div');
  container.classList.add('container');
  const flexContainer = document.createElement('div');
  flexContainer.classList.add('product-details');
  container.appendChild(flexContainer);

  flexContainer.innerHTML = `
    <div class="product-img">
      <img src="${product.images[0]}" alt="" />
    </div>
    <div class="product-details-info">
      <h2 class="pd-title">${product.title}</h2>
      <div class="pd-rating">${product.rating} ⭐</div>
      <p class="pd-description">${product.description}</p>
      
      <div class="pd-price">
        <span class="price-amount">$${product.price}</span>
        <span class="price-discount">${
          product.discountPercentage ? `-${product.discountPercentage}%` : ''
        }</span>
      </div>

      <div class="pd-quantity">
        <label class="quantity-label">Cantidad:</label>
        <div class="quantity-controls">
          <button class="quantity-btn quantity-minus" type="button">-</button>
          <span class="quantity-display">1</span>
          <button class="quantity-btn quantity-plus" type="button">+</button>
        </div>
      </div>

      <button class="add-to-cart-btn" type="button">
        <span class="cart-icon">🛒</span>
        Agregar al carrito
      </button>
    </div>
  `;

  // Agregar funcionalidad al selector de cantidad y botón de carrito
  setTimeout(() => {
    initializeProductDetail(container, product);
  }, 0);

  return container;
}

function initializeProductDetail(container, product) {
  const quantityDisplay = container.querySelector('.quantity-display');
  const minusBtn = container.querySelector('.quantity-minus');
  const plusBtn = container.querySelector('.quantity-plus');
  const addToCartBtn = container.querySelector('.add-to-cart-btn');

  let currentQuantity = 1;

  // Funcionalidad del selector de cantidad
  minusBtn.addEventListener('click', () => {
    if (currentQuantity > 1) {
      currentQuantity--;
      quantityDisplay.textContent = currentQuantity;
    }
  });

  plusBtn.addEventListener('click', () => {
    if (currentQuantity < 10) {
      currentQuantity++;
      quantityDisplay.textContent = currentQuantity;
    }
  });

  // Funcionalidad del botón agregar al carrito
  addToCartBtn.addEventListener('click', () => {
    // Verificar si el producto ya está en el carrito
    const existingCartItem = getCart().find((item) => item.id === product.id);

    if (existingCartItem) {
      // Si ya existe, actualizar la cantidad sumando la cantidad seleccionada
      updateProductQuantity(
        product.id,
        existingCartItem.quantity + currentQuantity
      );
    } else {
      // Si no existe, agregarlo con la cantidad seleccionada
      addProduct({ ...product, quantity: currentQuantity });
    }

    // Feedback visual
    addToCartBtn.innerHTML = '<span class="cart-icon">✅</span> Agregado!';
    addToCartBtn.style.backgroundColor = '#27ae60';

    setTimeout(() => {
      addToCartBtn.innerHTML =
        '<span class="cart-icon">🛒</span> Agregar al carrito';
      addToCartBtn.style.backgroundColor = '';
    }, 2000);

    // Disparar evento personalizado para actualizar contador del carrito
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  });
}
