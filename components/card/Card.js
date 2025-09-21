import { AddToCartBtn } from '../AddToCardBtn.js';
import { getCart } from '../../pages/carritoCompras/cartLogic.js';

const Card = ({ product }) => {
  const card = document.createElement('div');
  card.classList.add('card');

  // Estructura base con innerHTML
  card.innerHTML = `
    <div class="card-flex-container">
      <!-- IMAGENES DEL PRODUCTO -->
      <div class="img-carousel">
        <img height="150px" width="auto" src="${product.thumbnail}" alt="imagen del producto">
      </div>

      <!-- INFORMACION DEL PRODUCTO -->
      <div class="product-info">
        <h2 class="product-name">${product.title}</h2>
        <p class="product-rating">${product.rating} ⭐</p>
        <p class="product-price">$${product.price}</p>
      </div>

      <!-- BOTONES -->
      <div class="card-btns"></div>
    </div>
  `;

  // 🔑 Seleccionamos el contenedor de botones
  const btnsContainer = card.querySelector('.card-btns');

  // Añadimos el botón dinámico (AddToCartBtn) correctamente
  btnsContainer.appendChild(AddToCartBtn(product));

  // Navegación al hacer click en la tarjeta
  card.addEventListener('click', (e) => {
    if (e.target.closest('.card-btns')) return;
    window.location.hash = `#/product/${product.id}`;
  });

  console.log(getCart());

  return card;
};

export { Card };
