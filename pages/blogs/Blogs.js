export function Blogs() {
  const container = document.createElement('div');
  container.classList.add('blogs-container');

  container.innerHTML = `
  <!-- Hero Section -->
  <div class="blogs-hero">
    <div class="blogs-hero-content">
      <h1>Blog y Novedades</h1>
      <p>Descubre las últimas tendencias, consejos de estilo y noticias del mundo de la moda. Mantente al día con nuestros artículos exclusivos.</p>
    </div>
  </div>

  <!-- Main Content -->
  <div class="container">

  <nav class="blogs-filters" aria-label="Filtros de categoría">
    <button class="chip is-active" type="button" aria-pressed="true" data-filter="all">Todo</button>
    <button class="chip" type="button" aria-pressed="false" data-filter="moda">Moda</button>
    <button class="chip" type="button" aria-pressed="false" data-filter="hombres">Hombres</button>
    <button class="chip" type="button" aria-pressed="false" data-filter="relojes">Relojes</button>
  </nav>

  <section class="blogs-grid" aria-label="Listado de artículos">
    <article class="blog-card" data-category="moda">
      <div class="blog-media">
        <img 
          src="assets/moda.webp" 
          alt="Tendencias de moda en mujeres" 
          class="blog-image"
          loading="lazy"
        >
      </div>
      <div class="blog-content">
        <h3 class="blog-tag">NOTICIA 1</h3>
        <h2 class="blog-title">Nuevas tendencias de moda en mujeres</h2>
        <p class="blog-excerpt">De la pasarela a la calle: prendas, accesorios y looks que marcan cada temporada.</p>
        <a class="add-btn blog-action" href="https://www.vogue.es/moda/tendencias" target="_blank" rel="noopener noreferrer">Ver más</a>
      </div>
    </article>

    <article class="blog-card" data-category="hombres">
      <div class="blog-media">
        <img 
          src="assets/hombres.jpg" 
          alt="Tendencias de moda para hombres primavera/verano 2025" 
          class="blog-image"
          loading="lazy"
        >
      </div>
      <div class="blog-content">
        <h3 class="blog-tag">NOTICIA 2</h3>
        <h2 class="blog-title">Nuevas tendencias de moda</h2>
        <p class="blog-excerpt">Así vestirán los hombres que más saben de moda esta temporada.</p>
        <a class="add-btn blog-action" href="https://www.revistagq.com/articulo/tendencias-primavera-verano-2025-hombre-como-vestir" target="_blank" rel="noopener noreferrer">Ver más</a>
      </div>
    </article>

    <article class="blog-card" data-category="relojes">
      <div class="blog-media">
        <img 
          src="assets/reloj.jpg" 
          alt="Tendencias de relojes Watches and Wonders 2025" 
          class="blog-image"
          loading="lazy"
        >
      </div>
      <div class="blog-content">
        <h3 class="blog-tag">NOTICIA 3</h3>
        <h2 class="blog-title">Nuevas tendencias de relojes</h2>
        <p class="blog-excerpt">Lo último desde Watches and Wonders 2025.</p>
        <a class="add-btn blog-action" href="https://www.chrono24.cl/magazine/estas-son-las-tendencias-de-watches-and-wonders-2025-p_152256/" target="_blank" rel="noopener noreferrer">Ver más</a>
      </div>
    </article>
  </section>
  </div>
  `;

  const filterBar = container.querySelector('.blogs-filters');
  const chips = Array.from(container.querySelectorAll('.chip'));
  const cards = Array.from(container.querySelectorAll('.blog-card'));

  filterBar?.addEventListener('click', (ev) => {
    const target = ev.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest('button.chip');
    if (!button) return;

    const selected = button.getAttribute('data-filter');

    chips.forEach((c) => {
      const isActive = c === button;
      c.classList.toggle('is-active', isActive);
      c.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    cards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const show = selected === 'all' || category === selected;
      card.style.display = show ? '' : 'none';
    });
  });

  return container;
}
