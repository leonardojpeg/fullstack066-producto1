// Para llamar en otros archivos .js:
// import { usuarios, ofertas, demandas } from "./datos.js";

// datos.js

// export let usuarios = [
//   { id: 1, email: "test@test.com", password: "1234" }
// ];

// export let ofertas = [
//   { id: 1, titulo: "Frontend Dev", empresa: "Tech", tipo: "oferta" }
// ];

// export let demandas = [
//   { id: 1, nombre: "Laura", descripcion: "Busco prácticas", tipo: "demanda" }
// ];

export let ofertas = [
    {
        id: 1,
        titulo: "Tractorista",
        empresa: "Campo Grande",
        ubicacion: "Tórrec"
    },
    {
        id: 2,
        titulo: "Ingeniero agrónomo",
        empresa: "Monmalo",
        ubicacion: "Agramunt"
    }
];

export let demandas = [
    {
        id: 1,
        nombre: "Laura Gómez",
        profesion: "Marketing Digital",
        disponibilidad: "Inmediata"
    },
    {
        id: 2,
        nombre: "Carlos Pérez",
        profesion: "Soporte IT",
        disponibilidad: "15 días"
    }
];

export let usuarios = [
    {
        id: 1,
        nombre: "Admin",
        email: "admin@empleoapp.com",
        password: "1234"
    },
    {
        id: 2,
        nombre: "Laura",
        email: "laura@correo.com",
        password: "1234"
    }
];