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
      <div class="pd-color-selection">
        Seleccione algun Color:
        <div class="pd-colors">
          <div class="red"></div>
          <div class="blue"></div>
          <div class="gree"></div>
          <div class="yellow"></div>
          <div class="purple"></div>
          <div class="gray"></div>
        </div>
      </div>

      <div class="pd-sizes">
        <h4 class="pd-size-titel">Escoja una talla:</h4>
        <button class="pd-size-btn">Small</button>
        <button class="pd-size-btn">Medium</button>
        <button class="pd-size-btn">Large</button>
        <button class="pd-size-btn">X-Large</button>
      </div>
    </div>
  `;

  return container;
}
