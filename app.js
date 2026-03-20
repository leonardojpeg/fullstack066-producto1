import {datos} from './datos.js';
const contenedor = document.getElementById('plantilla_anuncios');
const listaContenedor = document.getElementById('lista-ofertas-demandas');
const listaContenedor2 = document.getElementById('lista-usuarios');

//* Función que imprime el contenido de datos.js en cada contenedor (plantilla)
function datosTarjetas(listas, tipo) {
       if (!contenedor) return;
    let colorClase = tipo;
    if (tipo === 'Oferta') {
        colorClase = "ofertas-color"; 
    } else {
        colorClase = "demandas-color"; 
    }
    listas.forEach(item => {
        const tarjetaHTML = `
            <div class="col-md-10 col-lg-10 mb-4">
                <div class="card h-100 shadow-sm border-${colorClase}">
                    <div class="card-header bg-${colorClase} text-black ">
                        ${tipo.toUpperCase()}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${item.titulo}</h5>
                        <p class="text-muted small">${item.fecha}</p>
                        <p class="card-text">${item.descripcion}</p>
                        <p class="card-text">${item.categoria}</p>
                        <p class="card-text small"><p>📍${item.ubicacion}</p>
                        <p class="card-text small">Publicado por: ${item.publicacion_usuario}</p>
                    </div>
                    <div class="card-footer bg-transparent border-0">
                        <button class="btn btn-outline-dark btn-sm">Más información</button>
                    </div>
                </div>
            </div>
        `;
        // La añadimos al contenedor
        contenedor.innerHTML += tarjetaHTML;
    });
}

function cargarPublicaciones() {
    if (!listaContenedor) return;
    
    listaContenedor.innerHTML = ""; // Limpiamos el "placeholder"

    // Unimos ambos arrays para listarlos todos, o puedes listarlos por separado
    const todasLasPublicaciones = [...datos.ofertasTrabajo, ...datos.demandasTrabajo];

    todasLasPublicaciones.forEach(pub => {
        // Determinamos si es oferta o demanda para el estilo (opcional)
        const esOferta = datos.ofertasTrabajo.includes(pub);
        const badgeColor = esOferta ? 'text-bg-success' : 'text-bg-info';
        const tipoLabel = esOferta ? 'Oferta' : 'Demanda';

        const itemHTML = `
            <div class="list-group-item list-group-item-action mb-2 shadow-sm border rounded">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 fw-bold">${pub.titulo}</h5>
                    <small class="badge ${badgeColor}">${tipoLabel}</small>
                </div>
                <p class="mb-1">${pub.descripcion}</p>
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <small class="text-muted">📍 ${pub.ubicacion} | 📅 ${pub.fecha}</small>
                    <small class="fw-semibold">Por: ${pub.publicacion_usuario}</small>
                </div>
            </div>
        `;
        listaContenedor.innerHTML += itemHTML;
    });
}

function cargarUsuarios() {
    if (!listaContenedor2) return;
    listaContenedor2.innerHTML = "";

    datos.UsusariosRegistrados.forEach((usuario, index) => {
        const isActive = index === 0 ? 'active' : '';
        
        const userHTML = `
            <a href="#" class="list-group-item list-group-item-action ${isActive}">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${usuario.nombre}</h5>
                    <small>${isActive ? 'Nuevo' : 'ID: ' + usuario.id}</small>
                </div>
                <p class="mb-1">${usuario.email}</p>
                <small class="text-body-secondary">Registrado en el sistema</small>
            </a>
        `;
        listaContenedor2.innerHTML += userHTML;
    });
}

// Ejecutamos la función para ambos arrays
datosTarjetas(datos.ofertasTrabajo, 'Oferta');
datosTarjetas(datos.demandasTrabajo, 'Demanda');
cargarPublicaciones();
cargarUsuarios();