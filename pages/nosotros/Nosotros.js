export function Nosotros() {
  const container = document.createElement('div');
  container.classList.add('nosotros-container');

  container.innerHTML = `
    <!-- Hero Section -->
    <div class="nosotros-hero">
      <div class="nosotros-hero-content">
        <h1>Conoce a StylePoint</h1>
        <p>Somos más que una tienda de moda. Somos tu compañero de estilo, tu inspiración y tu destino para encontrar tu look perfecto.</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container">
    <div class="nosotros-main">
      <!-- About Section -->
      <section class="about-section">
        <div class="about-content">
          <div class="about-text">
            <h2>Nuestra Historia</h2>
            <p>Somos una tienda dedicada a la moda y el estilo, ofreciendo ropa de calidad, zapatillas exclusivas y accesorios como relojes que marcan la diferencia. Nuestro objetivo es acompañar a cada cliente en la creación de un look único, moderno y versátil, adaptado a cada ocasión.</p>
            <p>Desde nuestros inicios, hemos creído que la moda es una forma de expresión personal. Cada prenda, cada accesorio, cada detalle cuenta una historia. En StylePoint, no solo vendemos productos, creamos experiencias que te ayudan a descubrir y expresar tu estilo único.</p>
          </div>
          <div class="about-image">
            <div class="image-placeholder">
              <span class="material-symbols-outlined">storefront</span>
              <p>Nuestra tienda</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Mission, Vision, Values -->
      <section class="mvv-section">
        <div class="mvv-grid">
          <div class="mvv-card mission">
            <div class="mvv-icon">
              <span class="material-symbols-outlined">flag</span>
            </div>
            <h3>Misión</h3>
            <p>Brindar a nuestros clientes productos de moda accesibles, de calidad y con diseños actuales, garantizando una experiencia de compra confiable, cercana y satisfactoria.</p>
          </div>

          <div class="mvv-card vision">
            <div class="mvv-icon">
              <span class="material-symbols-outlined">visibility</span>
            </div>
            <h3>Visión</h3>
            <p>Convertirnos en una marca reconocida en el mercado nacional por la innovación, la autenticidad y la excelencia en moda y accesorios, expandiendo nuestra presencia tanto física como digital.</p>
          </div>

          <div class="mvv-card values">
            <div class="mvv-icon">
              <span class="material-symbols-outlined">diamond</span>
            </div>
            <h3>Valores</h3>
            <ul>
              <li><strong>Calidad:</strong> Seleccionamos cuidadosamente cada prenda y accesorio.</li>
              <li><strong>Confianza:</strong> Construimos relaciones sólidas con nuestros clientes.</li>
              <li><strong>Innovación:</strong> Buscamos siempre nuevas tendencias y estilos.</li>
              <li><strong>Compromiso:</strong> Trabajamos con dedicación para superar expectativas.</li>
              <li><strong>Pasión:</strong> Amamos lo que hacemos y lo reflejamos en cada detalle.</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats-section">
        <div class="stats-container">
          <h2>Números que nos respaldan</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">500+</div>
              <div class="stat-label">Productos únicos</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">1000+</div>
              <div class="stat-label">Clientes satisfechos</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">3</div>
              <div class="stat-label">Años de experiencia</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Soporte al cliente</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="team-section">
        <div class="team-container">
          <h2>Nuestro Equipo</h2>
          <p>Conoce a las personas detrás de StylePoint</p>
          <div class="team-grid">
            <div class="team-card">
              <div class="team-avatar">
                <span class="material-symbols-outlined">person</span>
              </div>
              <h4>Gabriel Vidal</h4>
              <p>Fundador & CEO</p>
              <div class="team-social">
                <a href="#" class="social-link">
                  <span class="material-symbols-outlined">link</span>
                </a>
              </div>
            </div>
            <div class="team-card">
              <div class="team-avatar">
                <span class="material-symbols-outlined">person</span>
              </div>
              <h4>Raúl Fernández</h4>
              <p>Co-Fundador & CTO</p>
              <div class="team-social">
                <a href="#" class="social-link">
                  <span class="material-symbols-outlined">link</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>¿Listo para encontrar tu estilo?</h2>
          <p>Explora nuestra colección y descubre piezas únicas que reflejen tu personalidad.</p>
          <a href="#/products" class="cta-button">
            <span>Ver Productos</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </section>
    </div>
    </div>
  `;

  return container;
}
