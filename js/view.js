/* Prompts IA (Gemini)

1. Quiero comprobar en el caso de esta lista, si no hay ningún anuncio publicado para printear un mensaje de "No tienes anuncios". ¿Que se te ocurre? (Se adjunta la función renderizarTablaGestionAnuncios)
Respuesta: if (listaAnuncios.length === 0) ... soy bobo... 

2. Al eliminar un usuario, se me duplica la tabla (se adjunta el código de la función renderizarTablaUsuarios y de la función de borrado del controller.js)
Respuesta: Uso del tabla.innerHTML = ''; (limpieza de datos) antes de empezar el bucle forEach. Se aplica a TODOS los bucles.

*/


export const view = {

    // 1. RENDERIZAR DASHBOARD (index.html)
    renderizarDashboard: (listaAnuncios) => {
        const contenedorDash = document.getElementById('contenedor-anuncios');
        if (!contenedorDash) return; // Seguridad: si no existe el div, no ejecuta

        contenedorDash.innerHTML = ''; // Limpiamos antes de pintar

        listaAnuncios.forEach(anuncio => {
            // Diferenciamos color según el tipo
            const colorClase = anuncio.tipo === 'oferta' ? 'card-oferta' : 'card-demanda';
            
            const cardHTML = `
                <div class="col-md-4">
                    <div class="card ${colorClase} h-100 p-3 shadow-sm" style="border-radius: 20px; border: none;">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h4 class="fw-bold">${anuncio.titulo}</h4>
                                <p class="small mb-2">${anuncio.fecha}</p>
                            </div>
                        </div>
                        <div class="card-body px-0">
                            <p class="card-text text-white">${anuncio.desc}</p>
                        </div>
                        <div class="card-footer bg-transparent border-0 px-0 pt-0">
                            <hr class="text-white-50">
                            <p class="small mb-0">Publicado por: <strong>${anuncio.usuario}</strong></p>
                        </div>
                    </div>
                </div>
            `;
            contenedorDash.innerHTML += cardHTML;
        });
    },

    // 2. RENDERIZAR TABLA DE USUARIOS (registro.html)
    renderizarTablaUsuarios: (listaUsuarios) => {
        const tabla = document.getElementById('tabla-usuarios-body');
        if (!tabla) return;

        tabla.innerHTML = ''; 
        
        listaUsuarios.forEach(user => {
            const fila = `
                <tr class="align-middle text-black">
                    <td>${user.nombre}</td>
                    <td class="d-none d-md-table-cell">${user.email}</td>
                    <td class="text-capitalize">${user.rol}</td> 
                    <td class="text-center">
                        <button class="btn btn-danger btn-sm px-4" onclick="borrarUsuario('${user.email}')">
                            Borrar
                        </button>
                    </td>
                </tr>
            `;
            tabla.innerHTML += fila;
        });
    },

    // 3. RENDERIZAR TABLA DE ANUNCIOS (gestion-ofertas-demandas.html)
    renderizarTablaGestionAnuncios: (listaAnuncios) => {
        const contenedor = document.getElementById('contenedor-gestion-anuncios');
        if (!contenedor) return;

        contenedor.innerHTML = ''; 

        // Si no hay anuncios, mostramos un mensaje
        if (listaAnuncios.length === 0) {
            contenedor.innerHTML = `<div class="col-12 text-black-50 fs-5 my-5">Aún no has publicado ningún anuncio.</div>`;
            return;
        }

        listaAnuncios.forEach(anuncio => {
            // Lógica para elegir el color del borde según el tipo
            const esOferta = anuncio.tipo.toLowerCase() === 'oferta';
            const colorBorde = esOferta ? 'border-success' : 'border-primary';
            const textoTipo = esOferta ? 'Busco Trabajador' : 'Busco Empleo';

            const tarjetaHtml = `
                <div class="col-md-6 col-lg-4">
                    <div class="card card-mis-ofertas h-100 shadow-sm border-2 ${colorBorde}">
                        <div class="card-body d-flex flex-column text-start">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h5 class="card-title fw-bold text-black mb-0">${anuncio.titulo}</h5>
                                <span class="badge-anuncio badge text-uppercase ${esOferta ? 'bg-success text-white' : 'bg-primary'} fw-bold">
                                    ${textoTipo}
                                </span>
                            </div>
                            
                            <p class="text-muted small mb-3">Publicado el: ${anuncio.fecha}</p>
                            <p class="card-text text-dark flex-grow-1">${anuncio.desc || 'Sin descripción.'}</p>
                            
                            <div class="d-flex justify-content-end mt-3 pt-3 border-top border-light">
                                <button class="btn btn-danger btn-sm px-4 fw-bold shadow-sm" onclick="borrarAnuncio(${anuncio.id})">
                                    <i class="bi bi-trash"></i> Borrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            contenedor.innerHTML += tarjetaHtml;
        });
    },

    // 4. INTRODUCIR CANTIDADES TARJETAS RESUMEN DASHBOARD (index.html)
    actualizarEstadisticas: (numOfertas, numDemandas, numUsuarios) => {
        const o = document.getElementById('total-ofertas');
        const d = document.getElementById('total-demandas');
        const u = document.getElementById('total-usuarios');
        
        if (o) o.textContent = numOfertas;
        if (d) d.textContent = numDemandas;
        if (u) u.textContent = numUsuarios;
    },

};