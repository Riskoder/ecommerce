import {
  loadCurrentUser,
  loadUsers,
  removeUserByEmail,
  productsCache,
  loadProducts,
  addProduct,
  removeProductById,
} from "../../globalState.js";

export async function Admin() {
  const container = document.createElement("div");
  container.classList.add("container-admin");

  const user = loadCurrentUser();
  const users = loadUsers();
  await loadProducts();

  const adminName = user?.nombre || user?.email || "Admin";

  container.innerHTML = `
  <section>
    <h1>Panel de Administración</h1>
    <p>Bienvenido, <strong>${adminName}</strong></p>
  </section>

  <section id="admin-sections">
    <nav class="admin-nav">
      <button id="tab-users">Usuarios</button>
      <button id="tab-products">Productos</button>
    </nav>
    <div id="admin-content"></div>
  </section>
  `;

  const content = container.querySelector("#admin-content");
  const tabUsers = container.querySelector("#tab-users");
  const tabProducts = container.querySelector("#tab-products");

  function renderUsers() {
    const list = users
      .map(
        (u) => `
      <li>
        <span>${u.nombre || u.email}</span>
        <button class="btn-remove-user" data-email="${
          u.email
        }">Eliminar</button>
      </li>
    `
      )
      .join("");
    content.innerHTML = `
      <h2>Lista de usuarios</h2>
      <ul>${list || "<li>No hay usuarios</li>"}</ul>
      <small>Solo se permite eliminar usuarios.</small>
    `;

    content.querySelectorAll(".btn-remove-user").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const email = e.currentTarget.getAttribute("data-email");
        if (confirm(`¿Eliminar usuario ${email}?`)) {
          removeUserByEmail(email);
          // actualizar vista local
          const idx = users.findIndex((u) => u.email === email);
          if (idx >= 0) users.splice(idx, 1);
          renderUsers();
        }
      });
    });
  }

  function renderProducts() {
    const rows = productsCache
      .map(
        (p) => `
      <tr>
        <td>${p.id}</td>
        <td>${p.title}</td>
        <td>${p.price}</td>
        <td><button class="btn-remove-product" data-id="${p.id}">Eliminar</button></td>
      </tr>
    `
      )
      .join("");

    content.innerHTML = `
      <h2>Productos</h2>
      <form id="form-add-product">
        <input type="text" id="title" placeholder="Título" required />
        <input type="number" id="price" placeholder="Precio" required />
        <button type="submit">Agregar</button>
      </form>
      <table>
        <thead><tr><th>ID</th><th>Título</th><th>Precio</th><th></th></tr></thead>
        <tbody>${rows || '<tr><td colspan="4">Sin productos</td></tr>'}</tbody>
      </table>
    `;

    content
      .querySelector("#form-add-product")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const title = content.querySelector("#title").value.trim();
        const price = parseFloat(content.querySelector("#price").value);
        if (!title || isNaN(price)) return;
        const newId = Date.now();
        addProduct({
          id: newId,
          title,
          price,
          category: "new",
          images: [],
          thumbnail: "",
          description: "",
        });
        renderProducts();
      });

    content.querySelectorAll(".btn-remove-product").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.getAttribute("data-id"));
        if (confirm(`¿Eliminar producto ${id}?`)) {
          removeProductById(id);
          renderProducts();
        }
      });
    });
  }

  // Tabs behavior
  tabUsers.addEventListener("click", renderUsers);
  tabProducts.addEventListener("click", renderProducts);

  // Default
  renderUsers();

  return container;
}
