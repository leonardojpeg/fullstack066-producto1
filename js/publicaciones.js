/*
IA utilizada: ChatGPT
Prompt 1: Crea un script para añadir publicaciones desde un formulario a un array de objetos.
Prompt 2: Genera una función para renderizar ofertas y demandas en cards Bootstrap.
Prompt 3: Añade una función para eliminar publicaciones por id.
Prompt 4: Valida campos de formulario y vuelve a pintar el DOM.
*/

import {
  obtenerPublicaciones,
  agregarPublicacion,
  eliminarPublicacion
} from "./datos.js";

import {
  protegerRuta,
  pintarUsuarioNavbar,
  cerrarSesion,
  generarNuevoId,
  mostrarAlerta
} from "./utils.js";

protegerRuta();
pintarUsuarioNavbar();

document.querySelector("#btnCerrarSesion").addEventListener("click", cerrarSesion);

const formulario = document.querySelector("#formPublicacion");
const contenedor = document.querySelector("#contenedorPublicaciones");
const mensaje = document.querySelector("#mensajePublicacion");
const contador = document.querySelector("#contadorPublicaciones");

const tipoInput = document.querySelector("#tipo");
const tituloInput = document.querySelector("#titulo");
const descripcionInput = document.querySelector("#descripcion");
const autorInput = document.querySelector("#autor");
const ubicacionInput = document.querySelector("#ubicacion");
const categoriaInput = document.querySelector("#categoria");

renderizarPublicaciones();

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  limpiarErrores();

  const tipo = tipoInput.value.trim();
  const titulo = tituloInput.value.trim();
  const descripcion = descripcionInput.value.trim();
  const autor = autorInput.value.trim();
  const ubicacion = ubicacionInput.value.trim();
  const categoria = categoriaInput.value.trim();

  if (!tipo) {
    mostrarMensaje("Debes seleccionar el tipo de publicación.");
    tipoInput.classList.add("is-invalid");
    return;
  }

  if (titulo.length < 5) {
    mostrarMensaje("El título debe tener al menos 5 caracteres.");
    tituloInput.classList.add("is-invalid");
    return;
  }

  if (descripcion.length < 15) {
    mostrarMensaje("La descripción debe tener al menos 15 caracteres.");
    descripcionInput.classList.add("is-invalid");
    return;
  }

  if (autor.length < 3) {
    mostrarMensaje("El autor debe tener al menos 3 caracteres.");
    autorInput.classList.add("is-invalid");
    return;
  }

  if (!ubicacion) {
    mostrarMensaje("Debes indicar una ubicación.");
    ubicacionInput.classList.add("is-invalid");
    return;
  }

  if (!categoria) {
    mostrarMensaje("Debes indicar una categoría.");
    categoriaInput.classList.add("is-invalid");
    return;
  }

  const publicaciones = obtenerPublicaciones();

  const nuevaPublicacion = {
    id: generarNuevoId(publicaciones),
    tipo,
    titulo,
    descripcion,
    autor,
    ubicacion,
    categoria,
    fecha: new Date().toISOString().split("T")[0]
  };

  agregarPublicacion(nuevaPublicacion);
  formulario.reset();
  ocultarMensaje();
  renderizarPublicaciones();
  mostrarAlerta("Publicación creada correctamente");
});

function renderizarPublicaciones() {
  const publicaciones = obtenerPublicaciones();
  contenedor.innerHTML = "";

  if (contador) {
    contador.textContent = publicaciones.length;
  }

  const publicacionesOrdenadas = [...publicaciones].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  publicacionesOrdenadas.forEach(publicacion => {
    const columna = document.createElement("div");
    columna.className = "col-12";

    const claseTipo = publicacion.tipo === "oferta" ? "border-oferta" : "border-demanda";
    const badgeTipo = publicacion.tipo === "oferta" ? "badge-oferta" : "badge-demanda";
    const iconoTipo =
      publicacion.tipo === "oferta"
        ? "bi bi-briefcase-fill"
        : "bi bi-person-workspace";

    columna.innerHTML = `
      <div class="card card-publicacion ${claseTipo} fade-in">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <span class="badge ${badgeTipo} text-white px-3 py-2">
              ${publicacion.tipo.toUpperCase()}
            </span>
            <button class="btn btn-danger btn-sm" data-id="${publicacion.id}">
              Eliminar
            </button>
          </div>

          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="mb-0">${publicacion.titulo}</h5>
            <i class="${iconoTipo} fs-4 text-muted"></i>
          </div>

          <p class="text-muted-custom">${publicacion.descripcion}</p>

          <hr class="linea-divisora">

          <p class="meta-publicacion mb-2">
            <i class="bi bi-building me-2"></i>
            <strong>Autor:</strong> ${publicacion.autor}
          </p>

          <p class="meta-publicacion mb-2">
            <i class="bi bi-geo-alt me-2"></i>
            <strong>Ubicación:</strong> ${publicacion.ubicacion}
          </p>

          <p class="meta-publicacion mb-2">
            <i class="bi bi-tag me-2"></i>
            <strong>Categoría:</strong> ${publicacion.categoria}
          </p>

          <p class="meta-publicacion mb-0">
            <i class="bi bi-calendar-event me-2"></i>
            <strong>Fecha:</strong> ${publicacion.fecha}
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

      const confirmar = confirm("¿Seguro que quieres eliminar esta publicación?");

      if (confirmar) {
        eliminarPublicacion(id);
        renderizarPublicaciones();
        mostrarAlerta("Publicación eliminada correctamente", "warning");
      }
    });
  });

  if (publicacionesOrdenadas.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12">
        <div class="card card-publicacion p-4 text-center">
          <div class="card-body">
            <i class="bi bi-inbox fs-1 mb-3 text-muted"></i>
            <h5>No hay publicaciones registradas</h5>
            <p class="text-muted-custom mb-0">
              Crea una nueva oferta o demanda para empezar.
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
    .querySelectorAll("#formPublicacion .is-invalid")
    .forEach(input => input.classList.remove("is-invalid"));

  mensaje.classList.add("alerta-oculta");
}

document
  .querySelectorAll("#formPublicacion input, #formPublicacion textarea, #formPublicacion select")
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