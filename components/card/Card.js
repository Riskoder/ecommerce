const Card = ({ product }) => {
  const card = document.createElement('div');
  card.classList.add('card');
  // COntenido HTML de la CARD
  card.innerHTML = `
      <div class="card-flex-container">
        <!-- IMAGENES DEL PRODUCTO -->
        <div class="img-carousel">
          <img height="150px" width="auto"  src="${product.thumbnail}" alt="imagen del producto">
        </div>

        <!-- INFORMACION DEL PRODUCTO -->
        <div class="product-info">
          <h2 class="product-name">${product.title}</h2>
          <p class="product-rating">
          ${product.rating}
          <span class="material-symbols-outlined" style="color: gold;">star</span>
          </p>
          <p class="product-price">$${product.price}</p>
        </div>

        <!-- BOTONES DE AGREGAR, MENOS Y MAS  -->
        <div class="card-btns">
          <button class="btn-add">Agregar</button>
          <button class="btn-remove">Quitar</button>
        </div>
      </div>
  `;

  card.addEventListener('click', () => {
    console.log('click en card');
  });

  return card;
};

export { Card };
