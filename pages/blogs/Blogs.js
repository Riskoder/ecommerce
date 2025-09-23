export function Blogs() {
  const container = document.createElement('div');
  container.classList.add('container');

  container.innerHTML = `
  <h1>
    Blogs Test
  </h1>
  <br>
  <p>Bienvenido a la sección de datos curiosos donde encontrar articulos y noticias bastante entretenidas</p>
  <section class= "border">

      <div class="noticia">
        <h3>NOTICIA 1</h3>
      </div>
      
      <div class="linea">
        <h4>Nuevas tendencias de moda en mujeres</h4>
        <br>
        <p>De la pasarela a la calle, pasando por las tendencias más virales. El mejor análisis de las prendas, los accesorios y 
        los looks que más se llevan temporada tras temporada</p>
      </div>

      <div class="pct">
        <img 
        src="assets/moda.webp" 
        alt="imagen de moda" 
        class="picture" 
        height="300px" 
        width="500px">
      </div>
      <a href="https://www.vogue.es/moda/tendencias" target="_blank" rel="noopener noreferrer">
      <button class="add-btn btn-ver-mas">Ver más</button>
      </a>
  </section>

  <section class= "border">

      <div class="noticia">
        <h3>NOTICIA 2</h3>
      </div>
      
      <div class="linea">
        <h4>Nuevas tendencias de moda</h4>
        <br>
        <p>Tendencias primavera / verano 2025: así vestirán los hombres que más saben de moda</p>
      </div>

      <div class="pct">
        <img 
        src="assets/hombres.jpg" 
        alt="imagen de moda" 
        class="picture" 
        height="300px" 
        width="500px">
      </div>
      <a href="https://www.revistagq.com/articulo/tendencias-primavera-verano-2025-hombre-como-vestir" target="_blank" rel="noopener noreferrer">
      <button class="add-btn btn-ver-mas">Ver más</button>
      </a>
  </section>

  <section class= "border">

      <div class="noticia">
        <h3>NOTICIA 3</h3>
      </div>
      
      <div class="linea">
        <h4>Nuevas tendencias de relojes</h4>
        <br>
        <p>Estas son las tendencias de Watches and Wonders 2025</p>
      </div>

      <div class="pct">
        <img 
        src="assets/reloj.jpg" 
        alt="imagen de moda" 
        class="picture" 
        height="300px" 
        width="500px">
      </div>
      <a href="https://www.chrono24.cl/magazine/estas-son-las-tendencias-de-watches-and-wonders-2025-p_152256/" target="_blank" rel="noopener noreferrer">
      <button class="add-btn btn-ver-mas">Ver más</button>
      </a>
  </section>


  `;

  return container;
}


