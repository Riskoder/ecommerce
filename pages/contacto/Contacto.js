export function Contacto() {
  const container = document.createElement('div');
  container.classList.add('contact-container');

  container.innerHTML = `
    <div class="contact-hero">
      <div class="contact-hero-content">
        <h1>Contáctanos</h1>
        <p>¿Tienes alguna pregunta? Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.</p>
      </div>
    </div>
    <div class="container">
    <div class="contact-main">
      <div class="contact-info">
        <div class="contact-card">
          <div class="contact-icon">
            <span class="material-symbols-outlined">location_on</span>
          </div>
          <h3>Ubicación</h3>
          <p>Av. Principal 123<br>Santiago, Chile 666</p>
        </div>

        <div class="contact-card">
          <div class="contact-icon">
            <span class="material-symbols-outlined">phone</span>
          </div>
          <h3>Teléfono</h3>
          <p>+56 9 1234 5678 <br>Lunes a Viernes 9:00 - 18:00</p>
        </div>

        <div class="contact-card">
          <div class="contact-icon">
            <span class="material-symbols-outlined">email</span>
          </div>
          <h3>Email</h3>
          <p class="email-contact">info@stylepoint.com<br>soporte@stylepoint.com</p>
        </div>

        <div class="contact-card">
          <div class="contact-icon">
            <span class="material-symbols-outlined">schedule</span>
          </div>
          <h3>Horarios</h3>
          <p>Lunes - Viernes: 9:00 - 18:00<br>Sábados: 10:00 - 16:00</p>
        </div>
      </div>

      <div class="contact-form-section">
        <div class="form-container">
          <h2>Envíanos un mensaje</h2>
          <form id="contact-form" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Nombre completo *</label>
                <input type="text" id="name" name="name" required placeholder="Tu nombre completo">
                <span class="error-message" id="name-error"></span>
              </div>
              
              <div class="form-group">
                <label for="email">Correo electrónico *</label>
                <input type="email" id="email" name="email" required placeholder="tu@email.com">
                <span class="error-message" id="email-error"></span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="phone">Teléfono</label>
                <input type="tel" id="phone" name="phone" placeholder="+569 12345678">
              </div>
              
              <div class="form-group">
                <label for="subject">Asunto *</label>
                <select id="subject" name="subject" required>
                  <option value="">Selecciona un asunto</option>
                  <option value="consulta">Consulta general</option>
                  <option value="soporte">Soporte técnico</option>
                  <option value="ventas">Información de ventas</option>
                  <option value="devolucion">Devolución/Reembolso</option>
                  <option value="otro">Otro</option>
                </select>
                <span class="error-message" id="subject-error"></span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="message">Mensaje *</label>
              <textarea id="message" name="message" rows="6" required placeholder="Cuéntanos en qué podemos ayudarte..."></textarea>
              <span class="error-message" id="message-error"></span>
            </div>
            
            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" id="privacy" name="privacy" required>
                <span class="checkmark"></span>
                Acepto la <a href="#" class="privacy-link">política de privacidad</a> y el tratamiento de mis datos personales.
              </label>
              <span class="error-message" id="privacy-error"></span>
            </div>
            
            <button class="btn-enviar" type="submit">
              <span class="btn-text">Enviar mensaje</span>
              <span class="btn-icon">
                <span class="material-symbols-outlined">send</span>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  `;

  // Mejorar la funcionalidad del formulario
  const form = container.querySelector('#contact-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (validateForm()) {
      // Simular envío
      const submitBtn = form.querySelector('.btn-enviar');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnIcon = submitBtn.querySelector('.btn-icon');

      // Estado de carga
      btnText.textContent = 'Enviando...';
      btnIcon.innerHTML =
        '<span class="material-symbols-outlined">hourglass_empty</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        // Éxito
        btnText.textContent = '¡Mensaje enviado!';
        btnIcon.innerHTML =
          '<span class="material-symbols-outlined">check</span>';
        submitBtn.style.background = 'var(--success-color, #28a745)';

        // Resetear formulario después de 2 segundos
        setTimeout(() => {
          form.reset();
          resetForm();
        }, 2000);
      }, 2000);
    }
  });

  // Validación en tiempo real
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearError(input));
  });

  return container;
}

function validateForm() {
  const form = document.getElementById('contact-form');
  const name = form.querySelector('#name');
  const email = form.querySelector('#email');
  const subject = form.querySelector('#subject');
  const message = form.querySelector('#message');
  const privacy = form.querySelector('#privacy');

  let isValid = true;

  isValid &= validateField(name);
  isValid &= validateField(email);
  isValid &= validateField(subject);
  isValid &= validateField(message);
  isValid &= validateField(privacy);

  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  const errorElement = document.getElementById(`${fieldName}-error`);

  clearError(field);

  if (field.hasAttribute('required') && !value) {
    showError(field, 'Este campo es obligatorio');
    return false;
  }

  if (fieldName === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showError(field, 'Por favor, ingresa un email válido');
      return false;
    }
  }

  if (fieldName === 'message' && value && value.length < 10) {
    showError(field, 'El mensaje debe tener al menos 10 caracteres');
    return false;
  }

  if (fieldName === 'privacy' && !field.checked) {
    showError(field, 'Debes aceptar la política de privacidad');
    return false;
  }

  return true;
}

function showError(field, message) {
  const errorElement = document.getElementById(`${field.name}-error`);
  if (errorElement) {
    errorElement.textContent = message;
    field.classList.add('error');
  }
}

function clearError(field) {
  const errorElement = document.getElementById(`${field.name}-error`);
  if (errorElement) {
    errorElement.textContent = '';
    field.classList.remove('error');
  }
}

function resetForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = form.querySelector('.btn-enviar');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnIcon = submitBtn.querySelector('.btn-icon');

  btnText.textContent = 'Enviar mensaje';
  btnIcon.innerHTML = '<span class="material-symbols-outlined">send</span>';
  submitBtn.disabled = false;
  submitBtn.style.background = '';

  // Limpiar errores
  const errorMessages = form.querySelectorAll('.error-message');
  errorMessages.forEach((error) => (error.textContent = ''));

  const errorFields = form.querySelectorAll('.error');
  errorFields.forEach((field) => field.classList.remove('error'));
}
