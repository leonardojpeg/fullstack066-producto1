/* Prompts IA (Gemini)

1- Genérame un array de 6 usuarios variados (campos: email, nombre, password, rol (este debe ser o ‘candidato’ o ‘empresa’)) y otro array para anuncios (campos: id (numérico, autoincremental, empieza en 1), tipo: (este debe ser ‘oferta’ o ‘demanda’), título, fecha, usuario (usaremos los usuarios del otro array), desc (Aquí va el texto de la oferta, ¿que se pide?)):

Respuesta: Arrays del archivo model.js
*/

/* Usuarios */
export const usuarios = [
    { email: 'ayto@riaza.es', nombre: 'Ayto. Riaza', password: '123', rol: 'empresa' },
    { email: 'marc@test.com', nombre: 'Marc_92', password: '456', rol: 'candidato' },
    { email: 'info@panesdelduero.es', nombre: 'Panes del Duero', password: '123', rol: 'empresa' },
    { email: 'contacto@turismorural.es', nombre: 'Turismo Rural', password: '123', rol: 'empresa' },
    { email: 'elena@edu.es', nombre: 'Elena_Edu', password: '123', rol: 'candidato' },
    { email: 'rrhh@maderassoria.com', nombre: 'Maderas Soria', password: '123', rol: 'empresa' }
];


/* Ofertas y demandas */
export const anuncios = [
    { id: 1, tipo: 'oferta', titulo: 'Pastor de ovejas', fecha: '2026-03-08', usuario: 'Ayto. Riaza', desc: 'Se busca pastor para rebaño comunal en Riaza. Experiencia necesaria.' },
    { id: 2, tipo: 'demanda', titulo: 'Desarrollador Web', fecha: '2026-03-07', usuario: 'Marc_92', desc: 'Busco pueblo que quiera expandir sus negocios locales en la red. Experiencia en HTML/CSS.' },
    { id: 3, tipo: 'oferta', titulo: 'Panadero/a', fecha: '2026-03-06', usuario: 'Panes del Duero', desc: 'Buscamos dependientes/as para panaderia nueva en Fresno de la Rivera.' },
    { id: 4, tipo: 'demanda', titulo: 'Clases Particulares', fecha: '2026-01-05', usuario: 'Elena_Edu', desc: 'Doy clases de refuerzo para primaria y secundaria a domicilio en la zona de Orellana la Vieja.' },
    { id: 5, tipo: 'oferta', titulo: 'Guía Turístico', fecha: '2026-01-04', usuario: 'Turismo Rural', desc: 'Rutas por el cañón del río Lobos durante el verano.' },
    { id: 6, tipo: 'oferta', titulo: 'Carpintero/a', fecha: '2026-01-03', usuario: 'Maderas Soria', desc: 'Buscamos oficial de primera para taller de muebles a medida en Ontavilla del Valcorba.' }
];