"use strict";

import { anuncios, usuarios } from './model.js';
import { view } from './view.js';

document.addEventListener('DOMContentLoaded', () => {
    

    // --- 1. LÓGICA DEL DASHBOARD (index.html) ---
    // Solo se ejecuta si existe el contenedor de anuncios
    const contenedorAnuncios = document.getElementById('contenedor-anuncios');
    if (contenedorAnuncios) {
        const numOfertas = anuncios.filter(a => a.tipo === 'oferta').length;
        const numDemandas = anuncios.filter(a => a.tipo === 'demanda').length;
        const numUsuarios = usuarios.length;

        // Actualizamos los contadores y las tarjetas
        view.actualizarEstadisticas(numOfertas, numDemandas, numUsuarios);
        view.renderizarDashboard(anuncios);
    }


    
    // --- 2. LÓGICA DE GESTIÓN DE USUARIOS (registro.html) ---
    const tablaUsuarios = document.getElementById('tabla-usuarios-body');
    if (tablaUsuarios) {
        view.renderizarTablaUsuarios(usuarios);
    }

    // --- 3. FORMULARIO DE REGISTRO ---
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();

            const nuevoUsuario = {
                nombre: document.getElementById('reg-nombre').value,
                email: document.getElementById('reg-email').value,
                password: document.getElementById('reg-pass').value,
                rol: document.getElementById('reg-rol').value
            };

            // Añadimos al Modelo (memoria)
            usuarios.push(nuevoUsuario);

            // Actualizamos la Vista
            view.renderizarTablaUsuarios(usuarios);
            formRegistro.reset();
            alert('Usuario registrado correctamente.');
        });
    }

    // --- 4. LÓGICA DE LOGIN (login.html) ---
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const pass = document.getElementById('login-pass').value;

            // Buscamos en el array de usuarios del modelo
            const user = usuarios.find(u => u.email === email && u.password === pass);

            if (user) {
                //Guardamos el valor email del usuario como item 'usuarioActivo' del sessionStorage
                sessionStorage.setItem('usuarioActivo', user.email);
                //Devolvemos a la pagina "index.html"
                window.location.href = 'index.html';
            } else {
                alert('Email o contraseña incorrectos.');
            }
        });
    }

    // --- 5. ACTUALIZAR NAVBAR (En todas las páginas) para que aparezca el usuario al hacer login ---
    const userDisplay = document.getElementById('user-display');
    const sesion = sessionStorage.getItem('usuarioActivo');
    if (sesion && userDisplay) {
        userDisplay.textContent = sesion;
    }

    // --- 6. LÓGICA DE GESTIÓN DE ANUNCIOS (gestion-ofertas-demandas.html) ---
    const tablaAnuncios = document.getElementById('contenedor-gestion-anuncios');
    if (tablaAnuncios) {
        view.renderizarTablaGestionAnuncios(anuncios);
    }

    const formAnuncio = document.getElementById('form-anuncio');
    if (formAnuncio) {
        formAnuncio.addEventListener('submit', (e) => {
            e.preventDefault();

            const sesionActual = sessionStorage.getItem('usuarioActivo') || 'Anónimo';

            const nuevoAnuncio = {
                id: Date.now(), // Genera un ID único basado en el tiempo
                tipo: document.getElementById('anu-tipo').value,
                titulo: document.getElementById('anu-titulo').value,
                fecha: new Date().toLocaleDateString('es-ES'),
                usuario: sesionActual,
                desc: document.getElementById('anu-desc').value
            };

            anuncios.push(nuevoAnuncio);
            view.renderizarTablaGestionAnuncios(anuncios);
            formAnuncio.reset();
            alert('¡Anuncio publicado en Savia Nueva!');
        });
    }
});

// --- 7. FUNCIÓN GLOBAL DE BORRADO ---
// La sacamos al objeto window para que el onclick del HTML la vea
window.borrarUsuario = (email) => {
    const index = usuarios.findIndex(u => u.email === email);
    if (index !== -1) {
        if(confirm(`¿Seguro que quieres borrar a ${email}?`)) {
            usuarios.splice(index, 1);
            view.renderizarTablaUsuarios(usuarios);
        }
    }
};

// 8. BORRAR ANUNCIO (Gestión)
window.borrarAnuncio = (id) => {
    const index = anuncios.findIndex(a => a.id === id);
    if (index !== -1) {
        if(confirm('¿Eliminar esta publicación?')) {
            anuncios.splice(index, 1);
            view.renderizarTablaGestionAnuncios(anuncios);
        }
    }
};