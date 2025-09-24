import {
  loadCurrentUser,
  loadUsers,
  removeUserByEmail,
  productsCache,
  loadProducts,
  addProduct,
  removeProductById,
  updateProductById,
  generateNewProductId,
} from "../../globalState.js";
import listOfCategories from "../../utils/listOfCategories.js";

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
    <div class="admin-actions">
      <a id="btn-back-home" class="btn-back" href="#/">← Volver al Home</a>
    </div>
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
    let selectedImageDataUrl = "";
    const rows = productsCache
      .map(
        (p) => `
      <tr>
        <td>${p.id}</td>
        <td>${p.title}</td>
        <td>$${Number(p.price).toFixed(2)}</td>
        <td class="td-actions">
          <button class="btn-edit-product" data-id="${p.id}">Editar</button>
          <button class="btn-remove-product" data-id="${p.id}">Eliminar</button>
        </td>
      </tr>
    `
      )
      .join("");

    const categoryOptions = listOfCategories
      .map((c) => `<option value="${c}">${c}</option>`)
      .join("");

    content.innerHTML = `
      <h2>Productos</h2>
      <form id=\"form-product\" class=\"admin-form\">\n\
        <input type=\"hidden\" id=\"id\" />\n\
        <label>\n\
          <span>Título</span>\n\
          <input type=\"text\" id=\"title\" placeholder=\"Título\" required />\n\
        </label>\n\
        <label>\n\
          <span>Precio</span>\n\
          <input type=\"number\" id=\"price\" placeholder=\"Precio\" step=\"0.01\" required />\n\
        </label>\n\
        <label>\n\
          <span>Categoría</span>\n\
          <select id=\"category\" required>\n\
            <option value=\"\" disabled selected>Selecciona</option>\n\
            ${categoryOptions}\n\
          </select>\n\
        </label>\n\
        <label>\n\
          <span>Descripción</span>\n\
          <textarea id=\"description\" placeholder=\"Descripción\" rows=\"3\"></textarea>\n\
        </label>\n\
        <label>\n\
          <span>Imagen (URL)</span>\n\
          <input type=\"url\" id=\"thumbnail\" placeholder=\"https://...\" />\n\
        </label>\n\
        <label>\n\
          <span>Subir imagen</span>\n\
          <input type=\"file\" id=\"imageFile\" accept=\"image/*\" />\n\
        </label>\n\
        <div class=\"image-preview-wrap\">\n\
          <img id=\"imagePreview\" class=\"image-preview\" alt=\"Vista previa\" hidden />\n\
        </div>\n\
        <div class=\"form-actions\">\n\
          <button type=\"submit\" id=\"submit-btn\">Agregar</button>\n\
          <button type=\"button\" id=\"cancel-edit\" class=\"btn-secondary\" hidden>Cancelar</button>\n\
        </div>\n\
      </form>
      <div class=\"table-wrapper\">\n\
        <table class=\"admin-table\">\n\
          <thead><tr><th>ID</th><th>Título</th><th>Precio</th><th>Acciones</th></tr></thead>\n\
          <tbody>${
            rows || '<tr><td colspan="4">Sin productos</td></tr>'
          }</tbody>\n\
        </table>\n\
      </div>
    `;

    const form = content.querySelector("#form-product");
    const cancelBtn = content.querySelector("#cancel-edit");
    const fileInput = form.querySelector("#imageFile");
    const imgPreview = form.querySelector("#imagePreview");

    function resetForm() {
      form.reset();
      form.querySelector("#id").value = "";
      form.querySelector("#submit-btn").textContent = "Agregar";
      cancelBtn.hidden = true;
      selectedImageDataUrl = "";
      if (imgPreview) {
        imgPreview.hidden = true;
        imgPreview.removeAttribute("src");
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const idRaw = form.querySelector("#id").value;
      const title = form.querySelector("#title").value.trim();
      const price = parseFloat(form.querySelector("#price").value);
      const category = form.querySelector("#category").value;
      const description = form.querySelector("#description").value.trim();
      const thumbnail = form.querySelector("#thumbnail").value.trim();

      if (!title || isNaN(price) || !category) return;

      if (idRaw) {
        const id = parseInt(idRaw);
        const ok = updateProductById(id, {
          title,
          price,
          category,
          description,
          thumbnail: selectedImageDataUrl || thumbnail || "",
          images: selectedImageDataUrl
            ? [selectedImageDataUrl]
            : thumbnail
            ? [thumbnail]
            : undefined,
        });
        if (ok) {
          resetForm();
        }
      } else {
        const newId = generateNewProductId();
        addProduct({
          id: newId,
          title,
          price,
          category,
          images: selectedImageDataUrl
            ? [selectedImageDataUrl]
            : thumbnail
            ? [thumbnail]
            : [],
          thumbnail: selectedImageDataUrl || thumbnail || "",
          description: description || "",
        });
        resetForm();
      }
      renderProducts();
    });

    cancelBtn.addEventListener("click", () => {
      resetForm();
    });

    fileInput.addEventListener("change", () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) {
        selectedImageDataUrl = "";
        if (imgPreview) {
          imgPreview.hidden = true;
          imgPreview.removeAttribute("src");
        }
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        selectedImageDataUrl = String(reader.result || "");
        if (selectedImageDataUrl && imgPreview) {
          imgPreview.src = selectedImageDataUrl;
          imgPreview.hidden = false;
        }
      };
      reader.readAsDataURL(file);
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

    content.querySelectorAll(".btn-edit-product").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.getAttribute("data-id"));
        const product = productsCache.find((p) => p.id === id);
        if (!product) return;
        form.querySelector("#id").value = product.id;
        form.querySelector("#title").value = product.title || "";
        form.querySelector("#price").value = product.price || "";
        form.querySelector("#category").value = product.category || "";
        form.querySelector("#description").value = product.description || "";
        const existingThumb =
          product.thumbnail || (product.images && product.images[0]) || "";
        form.querySelector("#thumbnail").value = existingThumb;
        if (existingThumb && imgPreview) {
          selectedImageDataUrl = existingThumb;
          imgPreview.src = existingThumb;
          imgPreview.hidden = false;
        } else if (imgPreview) {
          selectedImageDataUrl = "";
          imgPreview.hidden = true;
          imgPreview.removeAttribute("src");
        }
        form.querySelector("#submit-btn").textContent = "Guardar";
        cancelBtn.hidden = false;
        window.scrollTo({ top: 0, behavior: "smooth" });
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
