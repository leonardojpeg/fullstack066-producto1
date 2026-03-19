import { ofertas, demandas } from "./datos.js";

const contenedor = document.getElementById("contenedor-tarjetas");

function pintarTarjetas() {
    let html = "";

    ofertas.forEach(oferta => {
        html += `
            <div class="col-md-6 col-lg-4">
                <div class="card border-primary h-100">
                    <div class="card-body">
                        <h5 class="card-title">${oferta.titulo}</h5>
                        <p class="card-text"><strong>Empresa:</strong> ${oferta.empresa}</p>
                        <p class="card-text"><strong>Ubicación:</strong> ${oferta.ubicacion}</p>
                        <span class="badge bg-primary">Oferta</span>
                    </div>
                </div>
            </div>
        `;
    });

    demandas.forEach(demanda => {
        html += `
            <div class="col-md-6 col-lg-4">
                <div class="card border-success h-100">
                    <div class="card-body">
                        <h5 class="card-title">${demanda.nombre}</h5>
                        <p class="card-text"><strong>Busca:</strong> ${demanda.profesion}</p>
                        <p class="card-text"><strong>Disponibilidad:</strong> ${demanda.disponibilidad}</p>
                        <span class="badge bg-success">Demanda</span>
                    </div>
                </div>
            </div>
        `;
    });

    contenedor.innerHTML = html;
}

pintarTarjetas();