import { loadProducts } from '../../globalState.js';

export async function Home() {
  const container = document.createElement('div');
  container.classList.add('home-container');

  const products = await loadProducts();

  const watchesProducts = products
    .filter(
      (product) =>
        product.category === 'mens-watches' ||
        product.category === 'womens-watches'
    )
    .slice(0, 3);

  const shoesProducts = products
    .filter(
      (product) =>
        product.category === 'mens-shoes' || product.category === 'womens-shoes'
    )
    .slice(0, 3);

  container.innerHTML = `
  <section class="border-home">
    <img 
      src="assets/HEROIMAGE.png" 
      alt="StylePoint - Encuentra tu estilo único" 
      class="picture-home">
    
    <div class="hero-content">
      <h1>StylePoint</h1>
      <p>Encuentra tu estilo único en StylePoint</p>
      <a href="#/products">
        <button class="btn-ver-productos">Ver productos</button>
      </a>
    </div>
  </section>

  <div class="container">
    <section class="featured-section">
      <div class="section-header">
        <h2>Último en Relojes</h2>
        <a href="#/products" class="btn-ver-mas">Ver más</a>
      </div>
      <div class="products-grid">
        ${watchesProducts
          .map(
            (product) => `
          <div class="product-card">
            <div class="product-image">
              <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
              <h3 class="product-title">${product.title}</h3>
              <p class="product-price">$${product.price}</p>
              <div class="product-rating">
                <span>⭐ ${product.rating}</span>
              </div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </section>

    <section class="featured-section">
      <div class="section-header">
        <h2>Nuevos Zapatos</h2>
        <a href="#/products" class="btn-ver-mas">Ver más</a>
      </div>
      <div class="products-grid">
        ${shoesProducts
          .map(
            (product) => `
          <div class="product-card">
            <div class="product-image">
              <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
              <h3 class="product-title">${product.title}</h3>
              <p class="product-price">$${product.price}</p>
              <div class="product-rating">
                <span>⭐ ${product.rating}</span>
              </div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </section>
  </div>
  `;

  const productCards = container.querySelectorAll('.product-card');

  productCards.forEach((card, index) => {
    const product =
      index < watchesProducts.length
        ? watchesProducts[index]
        : shoesProducts[index - watchesProducts.length];

    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-btns')) return;
      window.location.hash = `#/product/${product.id}`;
    });
  });

  return container;
}
