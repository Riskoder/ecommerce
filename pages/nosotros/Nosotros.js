export function Nosotros() {
  const container = document.createElement('div');
  container.classList.add('container');

  container.innerHTML = `
    <h1>
      Nosotros
    </h1>
    <h2>🏬 ¿Quienes somos?</h2>
      <p>Somos una tienda dedicada a la moda y el estilo, ofreciendo ropa de calidad, zapatillas exclusivas y accesorios como relojes que marcan la diferencia. Nuestro objetivo es acompañar a cada cliente en la creación de un look único, moderno y versátil, adaptado a cada ocasión.</p>
    <h2>🎯 Misión</h2>
      <p>Brindar a nuestros clientes productos de moda accesibles, de calidad y con diseños actuales, garantizando una experiencia de compra confiable, cercana y satisfactoria.</p>
    <h2>👀 Visión</h2>
      <p>Convertirnos en una marca reconocida en el mercado nacional por la innovación, la autenticidad y la excelencia en moda y accesorios, expandiendo nuestra presencia tanto física como digital</p>
    <h2>💎 Valores</h2>
      <p>Nuestros valores: </p>
    <ul>
      <li><strong>Calidad:</strong> seleccionamos cuidadosamente cada prenda y accesorio.</li>
      <li><strong>Confianza:</strong> construimos relaciones sólidas con nuestros clientes.</li>
      <li><strong>Innovación:</strong> buscamos siempre nuevas tendencias y estilos.</li>
      <li><strong>Compromiso:</strong> trabajamos con dedicación para superar expectativas.</li>
      <li><strong>Pasión:</strong> amamos lo que hacemos y lo reflejamos en cada detalle.</li>
    </ul>
  `;

  return container;
}
