/*
IA utilizada: ChatGPT
Prompt 1: Mejora un script de login con validaciones de formulario en JavaScript.
Prompt 2: Añade validación de email y contraseña con feedback visual Bootstrap.
Prompt 3: Implementa mensajes de error dinámicos en el DOM.
Prompt 4: Usa sessionStorage para guardar el usuario logueado.
*/

import { obtenerUsuarios } from "./datos.js";
import { guardarUsuarioActivo } from "./utils.js";

const form = document.querySelector("#loginForm");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const mensaje = document.querySelector("#mensajeLogin");

form.addEventListener("submit", function(e) {

  e.preventDefault();
  limpiarErrores();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if(!email || !password){
    mostrarError("Todos los campos son obligatorios");

    if(!email) emailInput.classList.add("is-invalid");
    if(!password) passwordInput.classList.add("is-invalid");

    return;
  }

  if(!validarEmail(email)){
    mostrarError("Introduce un email válido");
    emailInput.classList.add("is-invalid");
    return;
  }

  const usuarios = obtenerUsuarios();

  const usuario = usuarios.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if(!usuario){
    mostrarError("Usuario o contraseña incorrectos");
    emailInput.classList.add("is-invalid");
    passwordInput.classList.add("is-invalid");
    return;
  }

  guardarUsuarioActivo(usuario);

  window.location.href = "dashboard.html";

});

function validarEmail(email){
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function mostrarError(texto){
  mensaje.textContent = texto;
  mensaje.classList.remove("alerta-oculta");
}

function limpiarErrores(){

  mensaje.classList.add("alerta-oculta");

  emailInput.classList.remove("is-invalid");
  passwordInput.classList.remove("is-invalid");

}

document
.querySelectorAll("#loginForm input")
.forEach(input => {

  input.addEventListener("input", () => {

    input.classList.remove("is-invalid");
    mensaje.classList.add("alerta-oculta");

  });

});