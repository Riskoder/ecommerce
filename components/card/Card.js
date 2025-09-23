import { AddToCartBtn } from "../AddToCardBtn.js";
import { getCart } from "../../pages/carritoCompras/cartLogic.js";

const Card = ({ product }) => {
  const card = document.createElement("div");
  card.classList.add("card");

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

  const btnsContainer = card.querySelector(".card-btns");

  btnsContainer.appendChild(AddToCartBtn(product));

  card.addEventListener("click", (e) => {
    if (e.target.closest(".card-btns")) return;
    window.location.hash = `#/product/${product.id}`;
  });

  console.log(getCart());

  return card;
};

export { Card };
