export function Home() {
  const container = document.createElement('div');
  container.classList.add('hero-img');

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
  `;

  return container;
}
