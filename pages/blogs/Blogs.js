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
    <div class="flex">
      <div class="linea">
        <p>Nuevas tendencias de moda</p>
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
    </div>
      <button class="add-btn">Ver más</button>
  </section>
  `;

  return container;
}
