const usuariosIniciales = [
  {
    id: 1,
    nombre: "Administrador",
    email: "admin@techconnect.com",
    password: "1234",
    rol: "admin"
  },
  {
    id: 2,
    nombre: "Lucía Gómez",
    email: "lucia@techconnect.com",
    password: "1234",
    rol: "usuario"
  }
];

const publicacionesIniciales = [
  {
    id: 1,
    tipo: "oferta",
    titulo: "Desarrollador Frontend Junior",
    descripcion: "Se busca perfil junior con conocimientos de HTML, CSS y JavaScript.",
    autor: "Tech Solutions",
    ubicacion: "Barcelona",
    categoria: "Frontend",
    fecha: "2026-03-16"
  }
];

function inicializarDatos() {
  if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
  }

  if (!localStorage.getItem("publicaciones")) {
    localStorage.setItem("publicaciones", JSON.stringify(publicacionesIniciales));
  }
}

inicializarDatos();

export function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

export function obtenerPublicaciones() {
  return JSON.parse(localStorage.getItem("publicaciones")) || [];
}

export function agregarUsuario(nuevoUsuario) {
  const usuarios = obtenerUsuarios();
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

export function eliminarUsuario(id) {
  const usuarios = obtenerUsuarios().filter(usuario => usuario.id !== id);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

export function agregarPublicacion(nuevaPublicacion) {
  const publicaciones = obtenerPublicaciones();
  publicaciones.push(nuevaPublicacion);
  localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
}

export function eliminarPublicacion(id) {
  const publicaciones = obtenerPublicaciones().filter(publicacion => publicacion.id !== id);
  localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
}