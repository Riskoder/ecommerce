export function ProductDetail(product) {
  const container = document.createElement('div');
  container.classList.add('container');
  const flexContainer = document.createElement('div');
  flexContainer.classList.add('flex-container');
  container.appendChild(flexContainer);

  flexContainer.innerHTML = `
    <h2>${product.title}</h2>
  `;

  return container;
}
