// import { PrismaClient } from '@prisma/client';
// import { PrismaPg } from '@prisma/adapter-pg';


// // ======================================================
// // CONEXIÓN
// // ======================================================

// const connectionString = process.env.DATABASE_URL;

// if (!connectionString) {
//   throw new Error(
//     'No se encontró DATABASE_URL. Ejecuta el seed cargando el archivo .env.',
//   );
// }

// const adapter = new PrismaPg({
//   connectionString,
// });

// const prisma = new PrismaClient({
//   adapter,
// });

// // ======================================================
// // SEED
// // ======================================================

// async function main() {
//   console.log('');
//   console.log('🌱 Iniciando seed de contenido de cursos...');
//   console.log('');

//   // ====================================================
//   // 1. CURSOS
//   // ====================================================

//   console.log('📚 Creando cursos...');

//   const cursoFacial = await prisma.curso.upsert({
//     where: {
//       id: 'curso-prueba-facial',
//     },
//     update: {
//       nombre: 'Limpieza Facial Profesional',
//       categoria: 'Estética Facial',
//       slug: 'prueba-limpieza-facial-profesional',
//       descripcionCorta:
//         'Curso corto para aprender los fundamentos de la limpieza facial.',
//       descripcionCompleta:
//         'Curso práctico organizado por módulos para conocer la piel, preparar el área de trabajo y desarrollar un protocolo básico de limpieza facial profesional.',
//       duracionHoras: 8,
//       rutaPortada: '/uploads/cursos/limpieza-facial.jpg',
//       rutaImagenSecundaria:
//         '/uploads/cursos/limpieza-facial-secundaria.jpg',
//       estado: 'publicado',
//       creadoPor: 'SEED_CURSO',
//     },
//     create: {
//       id: 'curso-prueba-facial',
//       nombre: 'Limpieza Facial Profesional',
//       categoria: 'Estética Facial',
//       slug: 'prueba-limpieza-facial-profesional',
//       descripcionCorta:
//         'Curso corto para aprender los fundamentos de la limpieza facial.',
//       descripcionCompleta:
//         'Curso práctico organizado por módulos para conocer la piel, preparar el área de trabajo y desarrollar un protocolo básico de limpieza facial profesional.',
//       duracionHoras: 8,
//       rutaPortada: '/uploads/cursos/limpieza-facial.jpg',
//       rutaImagenSecundaria:
//         '/uploads/cursos/limpieza-facial-secundaria.jpg',
//       estado: 'publicado',
//       creadoPor: 'SEED_CURSO',
//     },
//   });

//   const cursoMaquillaje = await prisma.curso.upsert({
//     where: {
//       id: 'curso-prueba-maquillaje',
//     },
//     update: {
//       nombre: 'Maquillaje Profesional Básico',
//       categoria: 'Maquillaje',
//       slug: 'prueba-maquillaje-profesional-basico',
//       descripcionCorta:
//         'Curso introductorio de técnicas básicas de maquillaje profesional.',
//       descripcionCompleta:
//         'Curso corto para aprender preparación de la piel, selección de productos y aplicación básica de maquillaje profesional.',
//       duracionHoras: 10,
//       rutaPortada: '/uploads/cursos/maquillaje-basico.jpg',
//       rutaImagenSecundaria:
//         '/uploads/cursos/maquillaje-basico-secundaria.jpg',
//       estado: 'publicado',
//       creadoPor: 'SEED_CURSO',
//     },
//     create: {
//       id: 'curso-prueba-maquillaje',
//       nombre: 'Maquillaje Profesional Básico',
//       categoria: 'Maquillaje',
//       slug: 'prueba-maquillaje-profesional-basico',
//       descripcionCorta:
//         'Curso introductorio de técnicas básicas de maquillaje profesional.',
//       descripcionCompleta:
//         'Curso corto para aprender preparación de la piel, selección de productos y aplicación básica de maquillaje profesional.',
//       duracionHoras: 10,
//       rutaPortada: '/uploads/cursos/maquillaje-basico.jpg',
//       rutaImagenSecundaria:
//         '/uploads/cursos/maquillaje-basico-secundaria.jpg',
//       estado: 'publicado',
//       creadoPor: 'SEED_CURSO',
//     },
//   });

//   console.log(`   ✅ ${cursoFacial.nombre}`);
//   console.log(`   ✅ ${cursoMaquillaje.nombre}`);

//   // ====================================================
//   // 2. MÓDULOS DEL CURSO FACIAL
//   // ====================================================

//   console.log('');
//   console.log('📦 Creando módulos...');

//   const moduloFacial1 = await prisma.modulo.upsert({
//     where: {
//       id: 'modulo-facial-1',
//     },
//     update: {
//       cursoId: cursoFacial.id,
//       nombre: 'Fundamentos de la piel',
//       descripcion:
//         'Conceptos fundamentales que se deben conocer antes de realizar una limpieza facial.',
//       fraseMotivacional:
//         'Conocer la piel es el primer paso para trabajar correctamente.',
//       rutaImagen: '/uploads/modulos/fundamentos-piel.jpg',
//       orden: 1,
//       otorgaCertificacion: false,
//       estaPublicado: true,
//     },
//     create: {
//       id: 'modulo-facial-1',
//       cursoId: cursoFacial.id,
//       nombre: 'Fundamentos de la piel',
//       descripcion:
//         'Conceptos fundamentales que se deben conocer antes de realizar una limpieza facial.',
//       fraseMotivacional:
//         'Conocer la piel es el primer paso para trabajar correctamente.',
//       rutaImagen: '/uploads/modulos/fundamentos-piel.jpg',
//       orden: 1,
//       otorgaCertificacion: false,
//       estaPublicado: true,
//     },
//   });

//   const moduloFacial2 = await prisma.modulo.upsert({
//     where: {
//       id: 'modulo-facial-2',
//     },
//     update: {
//       cursoId: cursoFacial.id,
//       nombre: 'Protocolo de limpieza facial',
//       descripcion:
//         'Desarrollo paso a paso de un protocolo básico de limpieza facial.',
//       fraseMotivacional:
//         'La técnica mejora cuando existe conocimiento y práctica.',
//       rutaImagen: '/uploads/modulos/protocolo-facial.jpg',
//       orden: 2,
//       otorgaCertificacion: true,
//       estaPublicado: true,
//     },
//     create: {
//       id: 'modulo-facial-2',
//       cursoId: cursoFacial.id,
//       nombre: 'Protocolo de limpieza facial',
//       descripcion:
//         'Desarrollo paso a paso de un protocolo básico de limpieza facial.',
//       fraseMotivacional:
//         'La técnica mejora cuando existe conocimiento y práctica.',
//       rutaImagen: '/uploads/modulos/protocolo-facial.jpg',
//       orden: 2,
//       otorgaCertificacion: true,
//       estaPublicado: true,
//     },
//   });

//   // ====================================================
//   // MÓDULOS DEL CURSO DE MAQUILLAJE
//   // ====================================================

//   const moduloMaquillaje1 = await prisma.modulo.upsert({
//     where: {
//       id: 'modulo-maquillaje-1',
//     },
//     update: {
//       cursoId: cursoMaquillaje.id,
//       nombre: 'Preparación de la piel',
//       descripcion:
//         'Preparación adecuada del rostro antes de aplicar maquillaje.',
//       fraseMotivacional:
//         'Un buen maquillaje comienza con una piel correctamente preparada.',
//       rutaImagen: '/uploads/modulos/preparacion-piel.jpg',
//       orden: 1,
//       otorgaCertificacion: false,
//       estaPublicado: true,
//     },
//     create: {
//       id: 'modulo-maquillaje-1',
//       cursoId: cursoMaquillaje.id,
//       nombre: 'Preparación de la piel',
//       descripcion:
//         'Preparación adecuada del rostro antes de aplicar maquillaje.',
//       fraseMotivacional:
//         'Un buen maquillaje comienza con una piel correctamente preparada.',
//       rutaImagen: '/uploads/modulos/preparacion-piel.jpg',
//       orden: 1,
//       otorgaCertificacion: false,
//       estaPublicado: true,
//     },
//   });

//   const moduloMaquillaje2 = await prisma.modulo.upsert({
//     where: {
//       id: 'modulo-maquillaje-2',
//     },
//     update: {
//       cursoId: cursoMaquillaje.id,
//       nombre: 'Aplicación del maquillaje',
//       descripcion:
//         'Técnicas básicas para realizar un maquillaje social profesional.',
//       fraseMotivacional:
//         'Cada detalle aporta equilibrio al resultado final.',
//       rutaImagen: '/uploads/modulos/aplicacion-maquillaje.jpg',
//       orden: 2,
//       otorgaCertificacion: true,
//       estaPublicado: true,
//     },
//     create: {
//       id: 'modulo-maquillaje-2',
//       cursoId: cursoMaquillaje.id,
//       nombre: 'Aplicación del maquillaje',
//       descripcion:
//         'Técnicas básicas para realizar un maquillaje social profesional.',
//       fraseMotivacional:
//         'Cada detalle aporta equilibrio al resultado final.',
//       rutaImagen: '/uploads/modulos/aplicacion-maquillaje.jpg',
//       orden: 2,
//       otorgaCertificacion: true,
//       estaPublicado: true,
//     },
//   });

//   console.log('   ✅ 4 módulos creados');

//   // ====================================================
//   // 3. LECCIONES
//   // ====================================================

//   console.log('');
//   console.log('🎬 Creando lecciones...');

//   const leccionFacial1 = await prisma.leccion.upsert({
//     where: {
//       id: 'leccion-facial-1',
//     },
//     update: {
//       moduloId: moduloFacial1.id,
//       nombre: '¿Qué es la piel?',
//       descripcion:
//         'Introducción a la estructura y funciones principales de la piel.',
//       contenidoHtml:
//         '<p>En esta lección conocerás los conceptos básicos de la piel.</p>',
//       tipoLeccion: 'video',
//       urlVideo: 'https://example.com/video/piel',
//       proveedorVideo: 'externo',
//       orden: 1,
//       esVistaPrevia: true,
//       requiereLeccionAnteriorCompletada: false,
//       estaPublicada: true,
//     },
//     create: {
//       id: 'leccion-facial-1',
//       moduloId: moduloFacial1.id,
//       nombre: '¿Qué es la piel?',
//       descripcion:
//         'Introducción a la estructura y funciones principales de la piel.',
//       contenidoHtml:
//         '<p>En esta lección conocerás los conceptos básicos de la piel.</p>',
//       tipoLeccion: 'video',
//       urlVideo: 'https://example.com/video/piel',
//       proveedorVideo: 'externo',
//       orden: 1,
//       esVistaPrevia: true,
//       requiereLeccionAnteriorCompletada: false,
//       estaPublicada: true,
//     },
//   });

//   const leccionFacial2 = await prisma.leccion.upsert({
//     where: {
//       id: 'leccion-facial-2',
//     },
//     update: {
//       moduloId: moduloFacial1.id,
//       nombre: 'Tipos de piel',
//       descripcion:
//         'Características de la piel normal, seca, grasa y mixta.',
//       contenidoHtml:
//         '<p>Aprenderás a reconocer las características generales de cada tipo de piel.</p>',
//       tipoLeccion: 'video',
//       urlVideo: 'https://example.com/video/tipos-piel',
//       proveedorVideo: 'externo',
//       orden: 2,
//       esVistaPrevia: false,
//       requiereLeccionAnteriorCompletada: true,
//       estaPublicada: true,
//     },
//     create: {
//       id: 'leccion-facial-2',
//       moduloId: moduloFacial1.id,
//       nombre: 'Tipos de piel',
//       descripcion:
//         'Características de la piel normal, seca, grasa y mixta.',
//       contenidoHtml:
//         '<p>Aprenderás a reconocer las características generales de cada tipo de piel.</p>',
//       tipoLeccion: 'video',
//       urlVideo: 'https://example.com/video/tipos-piel',
//       proveedorVideo: 'externo',
//       orden: 2,
//       esVistaPrevia: false,
//       requiereLeccionAnteriorCompletada: true,
//       estaPublicada: true,
//     },
//   });

//   const leccionFacial3 = await prisma.leccion.upsert({
//     where: {
//       id: 'leccion-facial-3',
//     },
//     update: {
//       moduloId: moduloFacial2.id,
//       nombre: 'Preparación del área de trabajo',
//       descripcion:
//         'Organización de materiales antes de iniciar el procedimiento.',
//       contenidoHtml:
//         '<p>Preparación básica del espacio y materiales necesarios.</p>',
//       tipoLeccion: 'texto',
//       orden: 1,
//       esVistaPrevia: false,
//       requiereLeccionAnteriorCompletada: false,
//       estaPublicada: true,
//     },
//     create: {
//       id: 'leccion-facial-3',
//       moduloId: moduloFacial2.id,
//       nombre: 'Preparación del área de trabajo',
//       descripcion:
//         'Organización de materiales antes de iniciar el procedimiento.',
//       contenidoHtml:
//         '<p>Preparación básica del espacio y materiales necesarios.</p>',
//       tipoLeccion: 'texto',
//       orden: 1,
//       esVistaPrevia: false,
//       requiereLeccionAnteriorCompletada: false,
//       estaPublicada: true,
//     },
//   });

//   const leccionFacial4 = await prisma.leccion.upsert({
//     where: {
//       id: 'leccion-facial-4',
//     },
//     update: {
//       moduloId: moduloFacial2.id,
//       nombre: 'Limpieza facial paso a paso',
//       descripcion:
//         'Secuencia general del procedimiento de limpieza facial.',
//       contenidoHtml:
//         '<p>Desarrollo paso a paso del protocolo de limpieza facial.</p>',
//       tipoLeccion: 'video',
//       urlVideo: 'https://example.com/video/limpieza-facial',
//       proveedorVideo: 'externo',
//       orden: 2,
//       esVistaPrevia: false,
//       requiereLeccionAnteriorCompletada: true,
//       estaPublicada: true,
//     },
//     create: {
//       id: 'leccion-facial-4',
//       moduloId: moduloFacial2.id,
//       nombre: 'Limpieza facial paso a paso',
//       descripcion:
//         'Secuencia general del procedimiento de limpieza facial.',
//       contenidoHtml:
//         '<p>Desarrollo paso a paso del protocolo de limpieza facial.</p>',
//       tipoLeccion: 'video',
//       urlVideo: 'https://example.com/video/limpieza-facial',
//       proveedorVideo: 'externo',
//       orden: 2,
//       esVistaPrevia: false,
//       requiereLeccionAnteriorCompletada: true,
//       estaPublicada: true,
//     },
//   });

//   const leccionMaquillaje1 = await prisma.leccion.upsert({
//     where: {
//       id: 'leccion-maquillaje-1',
//     },
//     update: {
//       moduloId: moduloMaquillaje1.id,
//       nombre: 'Limpieza e hidratación',
//       descripcion:
//         'Preparación inicial de la piel antes del maquillaje.',
//       contenidoHtml:
//         '<p>Prepararemos correctamente la piel antes de comenzar.</p>',
//       tipoLeccion: 'video',
//       urlVideo: 'https://example.com/video/preparacion-piel',
//       proveedorVideo: 'externo',
//       orden: 1,
//       esVistaPrevia: true,
//       requiereLeccionAnteriorCompletada: false,
//       estaPublicada: true,
//     },
//     create: {
//       id: 'leccion-maquillaje-1',
//       moduloId: moduloMaquillaje1.id,
//       nombre: 'Limpieza e hidratación',
//       descripcion:
//         'Preparación inicial de la piel antes del maquillaje.',
//       contenidoHtml:
//         '<p>Prepararemos correctamente la piel antes de comenzar.</p>',
//       tipoLeccion: 'video',
//       urlVideo: 'https://example.com/video/preparacion-piel',
//       proveedorVideo: 'externo',
//       orden: 1,
//       esVistaPrevia: true,
//       requiereLeccionAnteriorCompletada: false,
//       estaPublicada: true,
//     },
//   });

//   const leccionMaquillaje2 = await prisma.leccion.upsert({
//     where: {
//       id: 'leccion-maquillaje-2',
//     },
//     update: {
//       moduloId: moduloMaquillaje1.id,
//       nombre: 'Uso del primer',
//       descripcion:
//         'Importancia y aplicación correcta del primer.',
//       contenidoHtml:
//         '<p>Conocerás cuándo y cómo utilizar un primer.</p>',
//       tipoLeccion: 'texto',
//       orden: 2,
//       esVistaPrevia: false,
//       requiereLeccionAnteriorCompletada: true,
//       estaPublicada: true,
//     },
//     create: {
//       id: 'leccion-maquillaje-2',
//       moduloId: moduloMaquillaje1.id,
//       nombre: 'Uso del primer',
//       descripcion:
//         'Importancia y aplicación correcta del primer.',
//       contenidoHtml:
//         '<p>Conocerás cuándo y cómo utilizar un primer.</p>',
//       tipoLeccion: 'texto',
//       orden: 2,
//       esVistaPrevia: false,
//       requiereLeccionAnteriorCompletada: true,
//       estaPublicada: true,
//     },
//   });

//   const leccionMaquillaje3 = await prisma.leccion.upsert({
//     where: {
//       id: 'leccion-maquillaje-3',
//     },
//     update: {
//       moduloId: moduloMaquillaje2.id,
//       nombre: 'Aplicación de base',
//       descripcion:
//         'Técnicas básicas para conseguir una aplicación uniforme.',
//       contenidoHtml:
//         '<p>Veremos herramientas y técnicas para aplicar correctamente la base.</p>',
//       tipoLeccion: 'video',
//       urlVideo: 'https://example.com/video/aplicacion-base',
//       proveedorVideo: 'externo',
//       orden: 1,
//       esVistaPrevia: false,
//       requiereLeccionAnteriorCompletada: false,
//       estaPublicada: true,
//     },
//     create: {
//       id: 'leccion-maquillaje-3',
//       moduloId: moduloMaquillaje2.id,
//       nombre: 'Aplicación de base',
//       descripcion:
//         'Técnicas básicas para conseguir una aplicación uniforme.',
//       contenidoHtml:
//         '<p>Veremos herramientas y técnicas para aplicar correctamente la base.</p>',
//       tipoLeccion: 'video',
//       urlVideo: 'https://example.com/video/aplicacion-base',
//       proveedorVideo: 'externo',
//       orden: 1,
//       esVistaPrevia: false,
//       requiereLeccionAnteriorCompletada: false,
//       estaPublicada: true,
//     },
//   });

//   const leccionMaquillaje4 = await prisma.leccion.upsert({
//     where: {
//       id: 'leccion-maquillaje-4',
//     },
//     update: {
//       moduloId: moduloMaquillaje2.id,
//       nombre: 'Maquillaje final',
//       descripcion:
//         'Integración de las técnicas aprendidas en un maquillaje completo.',
//       contenidoHtml:
//         '<p>Realizaremos un maquillaje social básico paso a paso.</p>',
//       tipoLeccion: 'video',
//       urlVideo: 'https://example.com/video/maquillaje-final',
//       proveedorVideo: 'externo',
//       orden: 2,
//       esVistaPrevia: false,
//       requiereLeccionAnteriorCompletada: true,
//       estaPublicada: true,
//     },
//     create: {
//       id: 'leccion-maquillaje-4',
//       moduloId: moduloMaquillaje2.id,
//       nombre: 'Maquillaje final',
//       descripcion:
//         'Integración de las técnicas aprendidas en un maquillaje completo.',
//       contenidoHtml:
//         '<p>Realizaremos un maquillaje social básico paso a paso.</p>',
//       tipoLeccion: 'video',
//       urlVideo: 'https://example.com/video/maquillaje-final',
//       proveedorVideo: 'externo',
//       orden: 2,
//       esVistaPrevia: false,
//       requiereLeccionAnteriorCompletada: true,
//       estaPublicada: true,
//     },
//   });

//   console.log('   ✅ 8 lecciones creadas');

//   // ====================================================
//   // 4. RECURSOS DE LECCIÓN
//   // ====================================================

//   console.log('');
//   console.log('📎 Creando recursos...');

//   const recursos = [
//     {
//       id: 'recurso-facial-1',
//       leccionId: leccionFacial1.id,
//       nombre: 'Guía básica de la piel',
//       descripcion: 'Material complementario de la lección.',
//       tipoRecurso: 'pdf',
//       rutaRecurso: '/uploads/recursos/guia-piel.pdf',
//       urlExterna: null,
//       orden: 1,
//     },
//     {
//       id: 'recurso-facial-2',
//       leccionId: leccionFacial2.id,
//       nombre: 'Ficha de tipos de piel',
//       descripcion: 'Resumen visual de los diferentes tipos de piel.',
//       tipoRecurso: 'pdf',
//       rutaRecurso: '/uploads/recursos/tipos-piel.pdf',
//       urlExterna: null,
//       orden: 1,
//     },
//     {
//       id: 'recurso-facial-3',
//       leccionId: leccionFacial3.id,
//       nombre: 'Checklist de materiales',
//       descripcion: 'Lista de materiales para preparar el área.',
//       tipoRecurso: 'pdf',
//       rutaRecurso: '/uploads/recursos/materiales-facial.pdf',
//       urlExterna: null,
//       orden: 1,
//     },
//     {
//       id: 'recurso-facial-4',
//       leccionId: leccionFacial4.id,
//       nombre: 'Protocolo de limpieza facial',
//       descripcion: 'Resumen descargable del protocolo.',
//       tipoRecurso: 'pdf',
//       rutaRecurso: '/uploads/recursos/protocolo-facial.pdf',
//       urlExterna: null,
//       orden: 1,
//     },
//     {
//       id: 'recurso-maquillaje-1',
//       leccionId: leccionMaquillaje1.id,
//       nombre: 'Preparación de la piel',
//       descripcion: 'Guía previa al maquillaje.',
//       tipoRecurso: 'pdf',
//       rutaRecurso: '/uploads/recursos/preparacion-piel.pdf',
//       urlExterna: null,
//       orden: 1,
//     },
//     {
//       id: 'recurso-maquillaje-2',
//       leccionId: leccionMaquillaje2.id,
//       nombre: 'Guía de primer',
//       descripcion: 'Material complementario sobre el primer.',
//       tipoRecurso: 'pdf',
//       rutaRecurso: '/uploads/recursos/primer.pdf',
//       urlExterna: null,
//       orden: 1,
//     },
//     {
//       id: 'recurso-maquillaje-3',
//       leccionId: leccionMaquillaje3.id,
//       nombre: 'Guía de bases',
//       descripcion: 'Material sobre tipos y aplicación de base.',
//       tipoRecurso: 'pdf',
//       rutaRecurso: '/uploads/recursos/bases.pdf',
//       urlExterna: null,
//       orden: 1,
//     },
//     {
//       id: 'recurso-maquillaje-4',
//       leccionId: leccionMaquillaje4.id,
//       nombre: 'Material de práctica',
//       descripcion: 'Material complementario para práctica.',
//       tipoRecurso: 'enlace',
//       rutaRecurso: null,
//       urlExterna: 'https://example.com/material-maquillaje',
//       orden: 1,
//     },
//   ];

//   for (const recurso of recursos) {
//     await prisma.recursosLeccion.upsert({
//       where: {
//         id: recurso.id,
//       },
//       update: recurso,
//       create: recurso,
//     });
//   }

//   console.log('   ✅ 8 recursos creados');

//   // ====================================================
//   // RESUMEN
//   // ====================================================

//   console.log('');
//   console.log('==============================================');
//   console.log('✅ SEED DE CURSOS COMPLETADO');
//   console.log('==============================================');
//   console.log('📚 Cursos:    2');
//   console.log('📦 Módulos:   4');
//   console.log('🎬 Lecciones: 8');
//   console.log('📎 Recursos:  8');
//   console.log('==============================================');
// }

// main()
//   .catch((error) => {
//     console.error('');
//     console.error('❌ Error al ejecutar seed-curso.ts');
//     console.error(error);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });