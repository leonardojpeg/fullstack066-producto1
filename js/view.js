export const view = {

    // 1. RENDERIZAR DASHBOARD (index.html)
    renderizarDashboard: (listaAnuncios) => {
        const contenedor = document.getElementById('contenedor-anuncios');
        if (!contenedor) return; // Seguridad: si no existe el div, no ejecuta

        contenedor.innerHTML = ''; // Limpiamos antes de pintar

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
            contenedor.innerHTML += cardHTML;
        });
    },

    // 2. RENDERIZAR TABLA DE USUARIOS (registro.html / gestion-ofertas-demandas.html)
    renderizarTablaUsuarios: (listaUsuarios) => {
        const tabla = document.getElementById('tabla-usuarios-body');
        if (!tabla) return;

        tabla.innerHTML = ''; 
        
        listaUsuarios.forEach(user => {
            const fila = `
                <tr class="align-middle text-black">
                    <td>${user.nombre}</td>
                    <td>${user.email}</td>
                    <td class="text-capitalize">${user.rol}</td> <td class="text-end">
                        <button class="btn btn-danger btn-sm px-4" onclick="borrarUsuario('${user.email}')">
                            Borrar
                        </button>
                    </td>
                </tr>
            `;
            tabla.innerHTML += fila;
        });
    }



};