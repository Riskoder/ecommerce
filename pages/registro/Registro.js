export function Home() {
  const container = document.createElement('div');
  container.classList.add('container');

  container.innerHTML = `
    <h1>
      Registro
    </h1>
  `;

  return container;
}
