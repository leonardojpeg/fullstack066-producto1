/*
IA utilizada: ChatGPT
Prompt 1: Crea un script para gestionar usuarios con alta, listado y baja usando arrays.
Prompt 2: Añade validación de email, contraseña y rol en un formulario frontend.
Prompt 3: Renderiza usuarios en tarjetas Bootstrap con botón eliminar.
Prompt 4: Impide crear usuarios duplicados por correo electrónico.
*/

import {
  obtenerUsuarios,
  agregarUsuario,
  eliminarUsuario
} from "./datos.js";

import {
  protegerRuta,
  pintarUsuarioNavbar,
  cerrarSesion,
  generarNuevoId,
  obtenerUsuarioActivo,
  mostrarAlerta
} from "./utils.js";

protegerRuta();
pintarUsuarioNavbar();

document.querySelector("#btnCerrarSesion").addEventListener("click", cerrarSesion);

const formulario = document.querySelector("#formUsuario");
const contenedor = document.querySelector("#contenedorUsuarios");
const mensaje = document.querySelector("#mensajeUsuario");

const nombreInput = document.querySelector("#nombre");
const emailInput = document.querySelector("#emailUsuario");
const passwordInput = document.querySelector("#passwordUsuario");
const rolInput = document.querySelector("#rol");

renderizarUsuarios();

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  limpiarErrores();

  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const rol = rolInput.value.trim();

  if (!nombre || !email || !password || !rol) {
    mostrarMensaje("Todos los campos son obligatorios.");

    if (!nombre) nombreInput.classList.add("is-invalid");
    if (!email) emailInput.classList.add("is-invalid");
    if (!password) passwordInput.classList.add("is-invalid");
    if (!rol) rolInput.classList.add("is-invalid");

    return;
  }

  if (nombre.length < 3) {
    mostrarMensaje("El nombre debe tener al menos 3 caracteres.");
    nombreInput.classList.add("is-invalid");
    return;
  }

  if (!validarEmail(email)) {
    mostrarMensaje("Introduce un correo válido.");
    emailInput.classList.add("is-invalid");
    return;
  }

  if (password.length < 4) {
    mostrarMensaje("La contraseña debe tener al menos 4 caracteres.");
    passwordInput.classList.add("is-invalid");
    return;
  }

  const usuarios = obtenerUsuarios();
  const yaExiste = usuarios.some(usuario => usuario.email.toLowerCase() === email.toLowerCase());

  if (yaExiste) {
    mostrarMensaje("Ya existe un usuario con ese correo.");
    emailInput.classList.add("is-invalid");
    return;
  }

  const nuevoUsuario = {
    id: generarNuevoId(usuarios),
    nombre,
    email,
    password,
    rol
  };

  agregarUsuario(nuevoUsuario);
  formulario.reset();
  ocultarMensaje();
  limpiarErrores();
  renderizarUsuarios();
  mostrarAlerta("Usuario creado correctamente");
});

function renderizarUsuarios() {
  const usuarios = obtenerUsuarios();
  const usuarioActivo = obtenerUsuarioActivo();

  contenedor.innerHTML = "";

  usuarios.forEach(usuario => {
    const columna = document.createElement("div");
    columna.className = "col-12 col-md-6";

    const badgeRol = usuario.rol === "admin" ? "bg-dark" : "bg-primary";

    columna.innerHTML = `
      <div class="card card-usuario fade-in">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <span class="badge ${badgeRol} px-3 py-2">${usuario.rol}</span>
            <button class="btn btn-danger btn-sm" data-id="${usuario.id}">
              Eliminar
            </button>
          </div>

          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="mb-0">${usuario.nombre}</h5>
            <i class="bi bi-person-circle fs-4 text-muted"></i>
          </div>

          <p class="meta-publicacion mb-2">
            <i class="bi bi-envelope me-2"></i>
            <strong>Email:</strong> ${usuario.email}
          </p>

          <p class="meta-publicacion mb-0">
            <i class="bi bi-hash me-2"></i>
            <strong>ID:</strong> ${usuario.id}
          </p>
        </div>
      </div>
    `;

    contenedor.appendChild(columna);
  });

  const botonesEliminar = document.querySelectorAll("[data-id]");
  botonesEliminar.forEach(boton => {
    boton.addEventListener("click", function () {
      const id = Number(this.dataset.id);

      if (usuarioActivo && usuarioActivo.id === id) {
        mostrarMensaje("No puedes eliminar el usuario que tiene la sesión iniciada.");
        return;
      }

      const confirmar = confirm("¿Seguro que quieres eliminar este usuario?");

      if (confirmar) {
        eliminarUsuario(id);
        renderizarUsuarios();
        mostrarAlerta("Usuario eliminado correctamente", "warning");
      }
    });
  });

  if (usuarios.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12">
        <div class="card card-usuario p-4 text-center">
          <div class="card-body">
            <i class="bi bi-people fs-1 mb-3 text-muted"></i>
            <h5>No hay usuarios registrados</h5>
            <p class="text-muted-custom mb-0">
              Añade un usuario para empezar a gestionar la plataforma.
            </p>
          </div>
        </div>
      </div>
    `;
  }
}

function mostrarMensaje(texto) {
  mensaje.textContent = texto;
  mensaje.classList.remove("alerta-oculta");
}

function ocultarMensaje() {
  mensaje.classList.add("alerta-oculta");
}

function limpiarErrores() {
  document
    .querySelectorAll("#formUsuario .is-invalid")
    .forEach(input => input.classList.remove("is-invalid"));

  mensaje.classList.add("alerta-oculta");
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

document
  .querySelectorAll("#formUsuario input, #formUsuario select")
  .forEach(input => {
    input.addEventListener("input", () => {
      input.classList.remove("is-invalid");
      mensaje.classList.add("alerta-oculta");
    });

    input.addEventListener("change", () => {
      input.classList.remove("is-invalid");
      mensaje.classList.add("alerta-oculta");
    });
  });