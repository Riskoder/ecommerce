export function Home() {
  const container = document.createElement('div');
  container.classList.add('container');

  container.innerHTML = `
  <section class= "border-home">
      
      <div class="linea-home">
        <p>Creando nuevas tendencias</p>
      </div>

      <div class="pct">
        <img 
        src="assets/HEROIMAGE.png" 
        alt="imagen del home" 
        class="picture-home" 
        height="300px" 
        width="600px">
      </div>
      <a href="http://127.0.0.1:3000/ecommerce/index.html?serverWindowId=f7a6e821-841a-4fe6-927f-74b7c1aa9633#/products" "rel="noopener noreferrer">
      <button class="add-btn btn-ver-productos">Ver productos</button>
      </a>
  </section>
  `;

  return container;
}
