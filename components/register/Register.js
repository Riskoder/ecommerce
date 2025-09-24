export function Register() {
  const container = document.createElement('div');
  container.classList.add('container-login', 'container-register');

  container.innerHTML = `
    <div class="register-box">
      <h1>STYLEPOINT</h1>
      <p>Crea tu cuenta</p>
      <form id="registerForm" novalidate>
        <div class="form-group">
          <label for="nombre">Nombre completo</label>
          <input 
            type="text" 
            id="nombre" 
            name="nombre"
            placeholder="Ej: Juan Pérez"
            autocomplete="name" 
          />
          <div class="error-message" id="nombreError"></div>
        </div>

        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            placeholder="ejemplo@email.com"
            autocomplete="email" 
          />
          <div class="error-message" id="emailError"></div>
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            placeholder="••••••••"
            autocomplete="new-password"
          />
          <div class="error-message" id="passwordError"></div>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirmar contraseña</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword"
            placeholder="••••••••"
            autocomplete="new-password"
          />
          <div class="error-message" id="confirmPasswordError"></div>
        </div>
        
        <button type="submit" id="submitBtn">Crear cuenta</button>
      </form>
      <p id="registerMessage"></p>
      <div class="login-link">
        <p>¿Ya tienes cuenta? <a href="#/login">Inicia sesión aquí</a></p>
      </div>
    </div>
  `;

  const form = container.querySelector('#registerForm');
  const nombreInput = container.querySelector('#nombre');
  const emailInput = container.querySelector('#email');
  const passwordInput = container.querySelector('#password');
  const confirmPasswordInput = container.querySelector('#confirmPassword');
  const nombreError = container.querySelector('#nombreError');
  const emailError = container.querySelector('#emailError');
  const passwordError = container.querySelector('#passwordError');
  const confirmPasswordError = container.querySelector('#confirmPasswordError');
  const submitBtn = container.querySelector('#submitBtn');
  const mensaje = container.querySelector('#registerMessage');

  const validateNombre = (nombre) => {
    if (!nombre) {
      showError(nombreInput, nombreError, 'El nombre es requerido');
      return false;
    }
    if (nombre.length < 3) {
      showError(
        nombreInput,
        nombreError,
        'El nombre debe tener al menos 3 caracteres'
      );
      return false;
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
      showError(
        nombreInput,
        nombreError,
        'El nombre solo puede contener letras'
      );
      return false;
    }
    clearError(nombreInput, nombreError);
    return true;
  };

  // Validación del email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      showError(emailInput, emailError, 'El correo electrónico es requerido');
      return false;
    }
    if (!emailRegex.test(email)) {
      showError(emailInput, emailError, 'Ingrese un correo electrónico válido');
      return false;
    }

    // Verificar si el correo ya está registrado
    const usuarios = JSON.parse(localStorage.getItem('users') || '[]');
    if (usuarios.some((u) => u.email === email)) {
      showError(
        emailInput,
        emailError,
        'Este correo electrónico ya está registrado'
      );
      return false;
    }

    clearError(emailInput, emailError);
    return true;
  };

  // Validación de la contraseña
  const validatePassword = (password) => {
    if (!password) {
      showError(passwordInput, passwordError, 'La contraseña es requerida');
      return false;
    }
    if (password.length < 6) {
      showError(
        passwordInput,
        passwordError,
        'La contraseña debe tener al menos 6 caracteres'
      );
      return false;
    }
    if (!/(?=.*\d)(?=.*[a-zA-Z])/.test(password)) {
      showError(
        passwordInput,
        passwordError,
        'La contraseña debe contener al menos una letra y un número'
      );
      return false;
    }
    clearError(passwordInput, passwordError);
    return true;
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) {
      showError(
        confirmPasswordInput,
        confirmPasswordError,
        'Debe confirmar la contraseña'
      );
      return false;
    }
    if (confirmPassword !== passwordInput.value) {
      showError(
        confirmPasswordInput,
        confirmPasswordError,
        'Las contraseñas no coinciden'
      );
      return false;
    }
    clearError(confirmPasswordInput, confirmPasswordError);
    return true;
  };

  const showError = (input, errorElement, message) => {
    input.parentElement.classList.add('error');
    errorElement.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" fill="currentColor"/>
    </svg>${message}`;
  };

  const clearError = (input, errorElement) => {
    input.parentElement.classList.remove('error');
    errorElement.textContent = '';
  };

  // Validaciones en tiempo real
  nombreInput.addEventListener('input', () =>
    validateNombre(nombreInput.value.trim())
  );
  emailInput.addEventListener('input', () =>
    validateEmail(emailInput.value.trim())
  );
  passwordInput.addEventListener('input', () => {
    validatePassword(passwordInput.value);
    if (confirmPasswordInput.value) {
      validateConfirmPassword(confirmPasswordInput.value);
    }
  });
  confirmPasswordInput.addEventListener('input', () =>
    validateConfirmPassword(confirmPasswordInput.value)
  );

  // Manejo del submit del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validar todos los campos
    const isNombreValid = validateNombre(nombre);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (
      !isNombreValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    mensaje.textContent = '';

    try {
      const usuarios = JSON.parse(localStorage.getItem('users') || '[]');

      const newUser = {
        email,
        password,
        nombre,
        rol: 'usuario',
      };

      usuarios.push(newUser);
      localStorage.setItem('users', JSON.stringify(usuarios));

      mensaje.textContent = '¡Cuenta creada con éxito! Redirigiendo...';
      mensaje.className = 'success';

      setTimeout(() => {
        window.location.hash = '#/';
      }, 1500);
    } catch (error) {
      mensaje.textContent =
        'Error al crear la cuenta. Por favor, intente nuevamente.';
      mensaje.className = 'error';
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  });

  return container;
}
