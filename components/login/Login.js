export function Login() {
  const container = document.createElement('div');
  container.classList.add('container-login');

  container.innerHTML = `
    <div class="login-box">
      <h1>STYLEPOINT</h1>
      <p>Inicia sesión en tu cuenta</p>
      <form id="loginForm" novalidate>
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
            autocomplete="current-password"
          />
          <div class="error-message" id="passwordError"></div>
        </div>

        <div class="options">
          <label class="remember-me">
            <input type="checkbox" id="remember"> Recordarme
          </label>
          <a href="#/forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
        
        <button type="submit" id="submitBtn">Iniciar sesión</button>
      </form>
      <p id="loginMessage"></p>
      <div class="register-link">
        <p>¿No tienes cuenta? <a href="#/register">Regístrate aquí</a></p>
      </div>
    </div>
  `;

  // Usuarios base del sistema (si no existen en localStorage)
  const usuariosBase = [
    {
      email: 'ra.fernandez@duocuc.cl',
      password: '123',
      nombre: 'Raúl Fernández',
      rol: 'admin',
    },
    {
      email: 'ga.vidal@duocuc.cl',
      password: '123',
      nombre: 'Gabriel Vidal',
      rol: 'admin',
    },
  ];

  // Cargar/Inicializar usuarios en localStorage
  const usuarios = (() => {
    const stored = localStorage.getItem('users');
    if (stored) return JSON.parse(stored);
    localStorage.setItem('users', JSON.stringify(usuariosBase));
    return usuariosBase;
  })();

  const form = container.querySelector('#loginForm');
  const emailInput = container.querySelector('#email');
  const passwordInput = container.querySelector('#password');
  const emailError = container.querySelector('#emailError');
  const passwordError = container.querySelector('#passwordError');
  const submitBtn = container.querySelector('#submitBtn');
  const mensaje = container.querySelector('#loginMessage');

  // Función de validación del email
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
    clearError(emailInput, emailError);
    return true;
  };

  // Función de validación de la contraseña
  const validatePassword = (password) => {
    if (!password) {
      showError(passwordInput, passwordError, 'La contraseña es requerida');
      return false;
    }
    if (password.length < 3) {
      showError(
        passwordInput,
        passwordError,
        'La contraseña debe tener al menos 3 caracteres'
      );
      return false;
    }
    clearError(passwordInput, passwordError);
    return true;
  };

  // Función para mostrar errores
  const showError = (input, errorElement, message) => {
    input.parentElement.classList.add('error');
    errorElement.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" fill="currentColor"/>
    </svg>${message}`;
  };

  // Función para limpiar errores
  const clearError = (input, errorElement) => {
    input.parentElement.classList.remove('error');
    errorElement.textContent = '';
  };

  // Validación en tiempo real del email
  emailInput.addEventListener('input', () => {
    validateEmail(emailInput.value.trim());
  });

  // Validación en tiempo real de la contraseña
  passwordInput.addEventListener('input', () => {
    validatePassword(passwordInput.value.trim());
  });

  // Manejo del submit del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validar todos los campos
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    // Deshabilitar el botón y mostrar estado de carga
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    mensaje.textContent = '';

    try {
      // Esto va a verificar al usuario si existe en el arrays
      const user = usuarios.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        mensaje.textContent = '¡Bienvenido! Redirigiendo...';
        mensaje.className = 'success';

        // Guardar "remember me" si está marcado
        if (container.querySelector('#remember').checked) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        // Guardar usuario autenticado
        localStorage.setItem(
          'currentUser',
          JSON.stringify({
            email: user.email,
            nombre: user.nombre || user.email,
          })
        );

        // Redireccionar después de una pequeña animación
        setTimeout(() => {
          window.location.hash = '#/admin';
        }, 1500);
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (error) {
      mensaje.textContent = error.message || 'Usuario o contraseña incorrectos';
      mensaje.className = 'error';
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  });

  // Cargar email recordado si existe
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    container.querySelector('#remember').checked = true;
  }

  return container;
}
