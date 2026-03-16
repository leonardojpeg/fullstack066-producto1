/*
IA utilizada: ChatGPT
Prompt 1: Crea funciones reutilizables para comprobar sesión en una app frontend.
Prompt 2: Genera una función para mostrar el usuario logueado en la navbar.
Prompt 3: Crea una utilidad para cerrar sesión con sessionStorage.
Prompt 4: Propón una función para generar IDs simples en arrays de objetos.
*/

export function obtenerUsuarioActivo() {
  return JSON.parse(sessionStorage.getItem("usuarioActivo"));
}

export function guardarUsuarioActivo(usuario) {
  sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));
}

export function cerrarSesion() {
  sessionStorage.removeItem("usuarioActivo");
  window.location.href = "login.html";
}

export function protegerRuta() {
  const usuarioActivo = obtenerUsuarioActivo();
  if (!usuarioActivo) {
    window.location.href = "login.html";
  }
}

export function pintarUsuarioNavbar() {
  const usuarioActivo = obtenerUsuarioActivo();
  const elemento = document.querySelector("#usuarioNavbar");

  if (usuarioActivo && elemento) {
    elemento.textContent = usuarioActivo.email;
  }
}

export function generarNuevoId(array) {
  if (array.length === 0) return 1;
  return Math.max(...array.map(item => item.id)) + 1;
}

export function mostrarAlerta(texto, tipo = "success") {
  const contenedor = document.querySelector("#alertasApp");
  if (!contenedor) return;

  const alerta = document.createElement("div");
  alerta.className = `alert alert-${tipo} shadow fade show mb-2`;
  alerta.setAttribute("role", "alert");
  alerta.textContent = texto;

  contenedor.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 3000);
}