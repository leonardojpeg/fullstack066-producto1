# AgroJobs - Producto 1

Aplicación web frontend desarrollada como prototipo de gestión de ofertas y demandas de empleo en el sector agrícola.

## 🔗 Demo

Disponible en CodeSandbox:  
https://codesandbox.io/p/sandbox/github/leonardojpeg/fullstack066/tree/Leonardo-producto1

---

## 📌 Descripción del proyecto

AgroJobs es una aplicación web construida únicamente con HTML, CSS y JavaScript que permite:

- Visualizar ofertas de empleo y perfiles de candidatos
- Crear nuevas publicaciones (ofertas o demandas)
- Gestionar usuarios registrados
- Simular un sistema de login básico

El objetivo es demostrar el uso de JavaScript en el frontend aplicando conceptos como manipulación del DOM, eventos, arrays de datos y modularidad.

---

## ⚙️ Tecnologías utilizadas

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES Modules)
- CodeSandbox (entorno de ejecución)

---

## 🧠 Estructura del proyecto

El proyecto sigue una arquitectura modular simple:


/js
├── datos.js → Datos simulados (usuarios, ofertas, demandas)
├── login.js → Lógica de autenticación
├── landing.js → Dashboard principal
├── ofertas.js → CRUD de ofertas y demandas
├── usuarios.js → CRUD de usuarios
/css
└── style.css → Estilos personalizados


---

## 🔐 Sistema de login

El login se valida contra los datos almacenados en `datos.js`.

Si las credenciales son correctas:
- Se guarda el usuario en `sessionStorage`
- Se muestra el email en la navbar
- Se habilita el botón de "Cerrar sesión"

### Credenciales de prueba

```javascript
{
  id: 1,
  email: "admin@agrojobs.com",
  password: "1234"
},
{
  id: 2,
  email: "laura@correo.com",
  password: "1234"
},
{
  id: 3,
  email: "rrhh@campogrande.com",
  password: "1234"
}