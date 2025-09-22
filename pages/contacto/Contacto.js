export function Contacto() {
  const container = document.createElement("div");
  container.classList.add("container");

  container.innerHTML = `
    <div class="flex-contact-container">
      <h1>StylePoint</h1>
      <form id="contact-form">
      <h2>Formulario Contacto</h2>
      <div class="form-group">
      <label for="name">Nombre*</label>
      <input type="text" id="name" name="name" required placeholder="">
      </div>
      
      <div class="form-group">
      <label for="email">Correo electrónico*</label>
      <input type="email" id="email" name="email" required placeholder="">
      </div>
      
      <div class="form-group">
      <label for="message">Mensaje*</label>
      <textarea id="message" name="message" rows="4" required placeholder=""></textarea>
      </div>
      
      <div class="form-group">
      <button class="btn-enviar" type="submit">Enviar</button>
      </div>
      </form>
    </div>
  `;

  container
    .querySelector("#contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Formulario enviado (esto es solo una simulación)");
    });

  return container;
}
