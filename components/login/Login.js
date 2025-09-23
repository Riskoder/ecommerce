export function Login() {
  const container = document.createElement("div");
  container.classList.add("container-login");

  container.innerHTML = `
    <div class="login-box">
      <h1>STYLEPOINT</h1>
      <p>Inicia sesión en tu cuenta</p>
      <form id="loginForm">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" placeholder="ejemplo@email.com" required />

        <label for="password">Contraseña</label>
        <input type="password" id="password" placeholder="••••••••" required />

        <div class="options">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      <p id="loginMessage"></p>
    </div>
  `;

  // Usuarios base del sistema (si no existen en localStorage)
  const usuariosBase = [
    {
      email: "ra.fernandez@duocuc.cl",
      password: "123",
      nombre: "Raúl Fernández",
    },
    { email: "ga.vidal@duocuc.cl", password: "123", nombre: "Gabriel Vidal" },
  ];

  // Cargar/Inicializar usuarios en localStorage
  const usuarios = (() => {
    const stored = localStorage.getItem("users");
    if (stored) return JSON.parse(stored);
    localStorage.setItem("users", JSON.stringify(usuariosBase));
    return usuariosBase;
  })();

  // Esta parte del codigo es para capturar o tomar lo que escribio la persona
  const form = container.querySelector("#loginForm");
  const mensaje = container.querySelector("#loginMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // Esto va a verificar al usuario si existe en el arrays
    const user = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      mensaje.textContent = "✅ Sesión correcta, redirigiendo...";
      mensaje.style.color = "green";

      // Acá le donde va a ir el usuario
      setTimeout(() => {
        // Guardar usuario autenticado
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            email: user.email,
            nombre: user.nombre || user.email,
          })
        );
        window.location.hash = "#/admin";
      }, 1500);
    } else {
      mensaje.textContent = "❌ Usuario o contraseña incorrectos";
      mensaje.style.color = "red";
    }
  });

  return container;
}
