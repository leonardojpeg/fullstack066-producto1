/*
IA utilizada: ChatGPT
Prompt 1: Crea un script para mostrar datos dinámicos en un dashboard usando localStorage o arrays de objetos.
Prompt 2: Cuenta ofertas, demandas y usuarios para mostrarlos en tarjetas.
Prompt 3: Renderiza publicaciones recientes en cards Bootstrap con iconos y mejor presentación visual.
Prompt 4: Ordena publicaciones por fecha y añade comprobación de sesión y cierre de sesión.
*/

import { obtenerPublicaciones, obtenerUsuarios } from "./datos.js";
import { protegerRuta, pintarUsuarioNavbar, cerrarSesion } from "./utils.js";

protegerRuta();
pintarUsuarioNavbar();

const btnCerrarSesion = document.querySelector("#btnCerrarSesion");
const numOfertas = document.querySelector("#numOfertas");
const numDemandas = document.querySelector("#numDemandas");
const numUsuarios = document.querySelector("#numUsuarios");
const contenedorRecientes = document.querySelector("#contenedorRecientes");

btnCerrarSesion.addEventListener("click", cerrarSesion);

renderizarDashboard();

function renderizarDashboard() {
  const publicaciones = obtenerPublicaciones();
  const usuarios = obtenerUsuarios();

  const ofertas = publicaciones.filter(publicacion => publicacion.tipo === "oferta");
  const demandas = publicaciones.filter(publicacion => publicacion.tipo === "demanda");

  numOfertas.textContent = ofertas.length;
  numDemandas.textContent = demandas.length;
  numUsuarios.textContent = usuarios.length;

  renderizarRecientes(publicaciones);
}

function renderizarRecientes(publicaciones) {
  contenedorRecientes.innerHTML = "";

  const publicacionesOrdenadas = [...publicaciones].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  publicacionesOrdenadas.slice(0, 6).forEach(publicacion => {
    const columna = document.createElement("div");
    columna.className = "col-12 col-md-6 col-xl-4";

    const claseTipo = publicacion.tipo === "oferta" ? "border-oferta" : "border-demanda";
    const badgeTipo = publicacion.tipo === "oferta" ? "badge-oferta" : "badge-demanda";
    const iconoTipo =
      publicacion.tipo === "oferta"
        ? "bi bi-briefcase-fill"
        : "bi bi-person-workspace";

    columna.innerHTML = `
      <div class="card card-publicacion ${claseTipo} h-100 fade-in">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <span class="badge ${badgeTipo} text-white px-3 py-2">
              ${publicacion.tipo.toUpperCase()}
            </span>
            <i class="${iconoTipo} fs-4 text-muted"></i>
          </div>

          <h5 class="card-title">${publicacion.titulo}</h5>
          <p class="card-text text-muted-custom">${publicacion.descripcion}</p>

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

    contenedorRecientes.appendChild(columna);
  });

  if (publicacionesOrdenadas.length === 0) {
    contenedorRecientes.innerHTML = `
      <div class="col-12">
        <div class="card card-publicacion p-4 text-center">
          <div class="card-body">
            <i class="bi bi-inbox fs-1 mb-3 text-muted"></i>
            <h5>No hay publicaciones todavía</h5>
            <p class="text-muted-custom mb-0">
              Crea una oferta o una demanda para empezar a ver actividad en el dashboard.
            </p>
          </div>
        </div>
      </div>
    `;
  }
}