// // prisma/seed-all.ts
// //
// // Seed completo, configurado para Prisma 7 (requiere driver adapter).
// // Cubre 2-3 registros por modelo y arma un recorrido de ESTUDIANTE probable
// // para la línea de tiempo de lecciones: completada / desbloqueada / bloqueada.
// //
// // Requiere:
// //   npm install @prisma/adapter-pg pg bcrypt
// //   npm install -D @types/pg @types/bcrypt
// //
// // Correr con:
// //   npx tsx prisma/seed-all.ts
// // (o npx ts-node prisma/seed-all.ts si usas ts-node)

// import "dotenv/config"; // asegura que DATABASE_URL se cargue desde .env aunque tsx no lo haga solo
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "@prisma/client";
// import * as bcrypt from "bcrypt";

// if (!process.env.DATABASE_URL) {
//     throw new Error(
//         "DATABASE_URL no está definida. Revisa tu archivo .env en la raíz del proyecto.",
//     );
// }

// const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
// const prisma = new PrismaClient({ adapter });

// async function hash(password: string) {
//     return bcrypt.hash(password, 10);
// }

// async function main() {
//     console.log("Limpiando datos previos...");

//     await prisma.respuestaFormulario.deleteMany();
//     await prisma.opcionFormulario.deleteMany();
//     await prisma.preguntaFormulario.deleteMany();
//     await prisma.formularioLeccion.deleteMany();
//     await prisma.certificadoCurso.deleteMany();
//     await prisma.certificadoModulo.deleteMany();
//     await prisma.reglaCertificacionCurso.deleteMany();
//     await prisma.reglaCertificacionModulo.deleteMany();
//     await prisma.plantillaCertificado.deleteMany();
//     await prisma.progresoCurso.deleteMany();
//     await prisma.progresoModulo.deleteMany();
//     await prisma.progresoLeccion.deleteMany();
//     await prisma.inscripcion.deleteMany();
//     await prisma.recursosLeccion.deleteMany();
//     await prisma.leccion.deleteMany();
//     await prisma.modulo.deleteMany();
//     await prisma.curso.deleteMany();
//     await prisma.notificaciones.deleteMany();
//     await prisma.rolMenu.deleteMany();
//     await prisma.menu.deleteMany();
//     await prisma.usuarioRol.deleteMany();
//     await prisma.rolPermiso.deleteMany();
//     await prisma.permiso.deleteMany();
//     await prisma.rol.deleteMany();
//     await prisma.perfil.deleteMany();
//     await prisma.usuario.deleteMany();

//     // ==========================================================================
//     // 1. USUARIOS Y ACCESO
//     // ==========================================================================

//     console.log("Creando permisos...");
//     const permisosData = [
//         { nombre: "cursos.ver" },
//         { nombre: "cursos.crear" },
//         { nombre: "cursos.editar" },
//         { nombre: "modulos.crear" },
//         { nombre: "modulos.editar" },
//         { nombre: "lecciones.crear" },
//         { nombre: "lecciones.editar" },
//         { nombre: "lecciones.eliminar" },
//     ];

//     const permisos = await Promise.all(
//         permisosData.map((p) => prisma.permiso.create({ data: p })),
//     );
//     const [
//         permCursosVer,
//         permCursosCrear,
//         permCursosEditar,
//         permModulosCrear,
//         permModulosEditar,
//         permLeccionesCrear,
//         permLeccionesEditar,
//         permLeccionesEliminar,
//     ] = permisos;

//     console.log("Creando roles...");
//     const rolAdmin = await prisma.rol.create({
//         data: { nombre: "ADMINISTRADOR", descripcion: "Acceso total a la plataforma" },
//     });
//     const rolEstudiante = await prisma.rol.create({
//         data: { nombre: "ESTUDIANTE", descripcion: "Acceso a cursos comprados" },
//     });

//     console.log("Asignando permisos a roles...");
//     await prisma.rolPermiso.createMany({
//         data: [
//             { rolId: rolAdmin.id, permisoId: permCursosVer.id },
//             { rolId: rolAdmin.id, permisoId: permCursosCrear.id },
//             { rolId: rolAdmin.id, permisoId: permCursosEditar.id },
//             { rolId: rolAdmin.id, permisoId: permModulosCrear.id },
//             { rolId: rolAdmin.id, permisoId: permModulosEditar.id },
//             { rolId: rolAdmin.id, permisoId: permLeccionesCrear.id },
//             { rolId: rolAdmin.id, permisoId: permLeccionesEditar.id },
//             { rolId: rolAdmin.id, permisoId: permLeccionesEliminar.id },
//             { rolId: rolEstudiante.id, permisoId: permCursosVer.id },
//         ],
//     });

//     console.log("Creando usuarios...");
//     const passwordHash = await hash("Password123!");

//     const admin = await prisma.usuario.create({
//         data: {
//             username: "admin_lms",
//             correo: "admin@lms.test",
//             contrasenaHash: passwordHash,
//             estado: "activo",
//             correoVerificadoEn: new Date(),
//         },
//     });

//     const estudiante1 = await prisma.usuario.create({
//         data: {
//             username: "maria.estudiante",
//             correo: "maria@lms.test",
//             contrasenaHash: passwordHash,
//             estado: "activo",
//             correoVerificadoEn: new Date(),
//             ultimoAccesoEn: new Date(),
//         },
//     });

//     const estudiante2 = await prisma.usuario.create({
//         data: {
//             username: "carlos.estudiante",
//             correo: "carlos@lms.test",
//             contrasenaHash: passwordHash,
//             estado: "activo",
//             correoVerificadoEn: new Date(),
//         },
//     });

//     console.log("Creando perfiles...");
//     await prisma.perfil.createMany({
//         data: [
//             {
//                 usuarioId: admin.id,
//                 nombre: "Admin",
//                 apellidoPaterno: "Sistema",
//                 pais: "Bolivia",
//                 ciudad: "La Paz",
//             },
//             {
//                 usuarioId: estudiante1.id,
//                 nombre: "María",
//                 apellidoPaterno: "Quispe",
//                 apellidoMaterno: "Torrez",
//                 telefono: "70011122",
//                 pais: "Bolivia",
//                 ciudad: "La Paz",
//                 ocupacion: "Diseñadora",
//                 fechaNacimiento: new Date("1998-05-14"),
//             },
//             {
//                 usuarioId: estudiante2.id,
//                 nombre: "Carlos",
//                 apellidoPaterno: "Fernández",
//                 telefono: "70033344",
//                 pais: "Bolivia",
//                 ciudad: "Cochabamba",
//                 ocupacion: "Desarrollador junior",
//                 fechaNacimiento: new Date("2000-11-02"),
//             },
//         ],
//     });

//     console.log("Asignando roles a usuarios...");
//     await prisma.usuarioRol.createMany({
//         data: [
//             { usuarioId: admin.id, rolId: rolAdmin.id, asignadoPor: admin.id },
//             { usuarioId: estudiante1.id, rolId: rolEstudiante.id, asignadoPor: admin.id },
//             { usuarioId: estudiante2.id, rolId: rolEstudiante.id, asignadoPor: admin.id },
//         ],
//     });

//     console.log("Creando menús...");
//     const menuCursos = await prisma.menu.create({
//         data: { nombre: "Cursos", icono: "book", ruta: "/cursos", orden: 1 },
//     });
//     const menuAdmin = await prisma.menu.create({
//         data: { nombre: "Administración", icono: "settings", orden: 2 },
//     });
//     const menuUsuarios = await prisma.menu.create({
//         data: {
//             nombre: "Usuarios",
//             icono: "users",
//             ruta: "/usuario",
//             orden: 1,
//             menuPadreId: menuAdmin.id,
//         },
//     });

//     await prisma.rolMenu.createMany({
//         data: [
//             { rolId: rolAdmin.id, menuId: menuCursos.id },
//             { rolId: rolAdmin.id, menuId: menuAdmin.id },
//             { rolId: rolAdmin.id, menuId: menuUsuarios.id },
//             { rolId: rolEstudiante.id, menuId: menuCursos.id },
//         ],
//     });

//     console.log("Creando notificaciones...");
//     await prisma.notificaciones.createMany({
//         data: [
//             {
//                 usuarioId: estudiante1.id,
//                 tipo: "bienvenida",
//                 titulo: "¡Bienvenida a la plataforma!",
//                 contenido: "Tu inscripción a Inglés A1 fue activada.",
//             },
//             {
//                 usuarioId: estudiante1.id,
//                 tipo: "progreso",
//                 titulo: "¡Módulo completado!",
//                 contenido: "Completaste Inglés A1. Ya puedes avanzar a A2.",
//                 leidaEn: new Date(),
//             },
//             {
//                 usuarioId: estudiante2.id,
//                 tipo: "bienvenida",
//                 titulo: "¡Bienvenido a la plataforma!",
//                 contenido: "Tu inscripción a Fundamentos de Programación fue activada.",
//             },
//         ],
//     });

//     // ==========================================================================
//     // 2. CONTENIDO DEL CURSO
//     // ==========================================================================

//     console.log("Creando cursos...");
//     const cursoIngles = await prisma.curso.create({
//         data: {
//             nombre: "Inglés — UN MUNDO",
//             categoria: "Idiomas",
//             slug: "ingles-un-mundo",
//             descripcionCorta: "Aprende inglés desde cero hasta nivel intermedio.",
//             descripcionCompleta:
//                 "Curso de inglés estructurado en niveles independientes: puedes comprar solo el nivel que necesitas.",
//             duracionHoras: 80,
//             estado: "publicado",
//             creadoPor: admin.id,
//         },
//     });

//     const cursoProgramacion = await prisma.curso.create({
//         data: {
//             nombre: "Programación Full Stack",
//             categoria: "Tecnología",
//             slug: "programacion-full-stack",
//             descripcionCorta: "De cero a desarrollador full stack.",
//             descripcionCompleta: "Fundamentos de programación, backend con NestJS y frontend con React.",
//             duracionHoras: 120,
//             estado: "publicado",
//             creadoPor: admin.id,
//         },
//     });

//     console.log("Creando módulos...");
//     const moduloA1 = await prisma.modulo.create({
//         data: {
//             cursoId: cursoIngles.id,
//             nombre: "Inglés A1",
//             descripcion: "Nivel principiante: saludos, presente simple, vocabulario básico.",
//             fraseMotivacional: "¡Todo gran hablante empezó diciendo Hello!",
//             orden: 1,
//             otorgaCertificacion: true,
//             estaPublicado: true,
//         },
//     });

//     const moduloA2 = await prisma.modulo.create({
//         data: {
//             cursoId: cursoIngles.id,
//             nombre: "Inglés A2",
//             descripcion: "Nivel básico-intermedio: pasado simple, comparativos, conversación.",
//             fraseMotivacional: "Ya casi dominas las bases del idioma.",
//             orden: 2,
//             otorgaCertificacion: true,
//             estaPublicado: true,
//         },
//     });

//     const moduloFundamentos = await prisma.modulo.create({
//         data: {
//             cursoId: cursoProgramacion.id,
//             nombre: "Fundamentos de Programación",
//             descripcion: "Lógica, variables, estructuras de control.",
//             orden: 1,
//             otorgaCertificacion: true,
//             estaPublicado: true,
//         },
//     });

//     const moduloBackend = await prisma.modulo.create({
//         data: {
//             cursoId: cursoProgramacion.id,
//             nombre: "Backend con NestJS",
//             descripcion: "APIs REST, Prisma, autenticación con JWT.",
//             orden: 2,
//             otorgaCertificacion: true,
//             estaPublicado: true,
//         },
//     });

//     console.log("Creando lecciones...");

//     const leccionA1_1 = await prisma.leccion.create({
//         data: {
//             moduloId: moduloA1.id,
//             nombre: "Saludos y presentaciones",
//             descripcion: "Hello, Hi, my name is...",
//             contenidoHtml: "<p>En esta lección aprenderás a saludar y presentarte en inglés.</p>",
//             tipoLeccion: "video",
//             urlVideo: "https://www.youtube.com/watch?v=demo1",
//             proveedorVideo: "YouTube",
//             orden: 1,
//             esVistaPrevia: true,
//             requiereLeccionAnteriorCompletada: true,
//             estaPublicada: true,
//         },
//     });

//     const leccionA1_2 = await prisma.leccion.create({
//         data: {
//             moduloId: moduloA1.id,
//             nombre: "Presente simple",
//             descripcion: "I play, she plays, they play.",
//             contenidoHtml: "<p>Estructura y uso del presente simple en inglés.</p>",
//             tipoLeccion: "video",
//             urlVideo: "https://www.youtube.com/watch?v=demo2",
//             proveedorVideo: "YouTube",
//             orden: 2,
//             requiereLeccionAnteriorCompletada: true,
//             estaPublicada: true,
//         },
//     });

//     const leccionA1_3 = await prisma.leccion.create({
//         data: {
//             moduloId: moduloA1.id,
//             nombre: "Vocabulario: la familia",
//             descripcion: "Mother, father, brother, sister...",
//             contenidoHtml: "<p>Vocabulario esencial sobre miembros de la familia.</p>",
//             tipoLeccion: "lectura",
//             orden: 3,
//             requiereLeccionAnteriorCompletada: true,
//             estaPublicada: true,
//         },
//     });

//     const leccionA2_1 = await prisma.leccion.create({
//         data: {
//             moduloId: moduloA2.id,
//             nombre: "Pasado simple",
//             descripcion: "I played, she played...",
//             contenidoHtml: "<p>Formación del pasado simple con verbos regulares e irregulares.</p>",
//             tipoLeccion: "video",
//             urlVideo: "https://www.youtube.com/watch?v=demo3",
//             proveedorVideo: "YouTube",
//             orden: 1,
//             requiereLeccionAnteriorCompletada: true,
//             estaPublicada: true,
//         },
//     });

//     const leccionA2_2 = await prisma.leccion.create({
//         data: {
//             moduloId: moduloA2.id,
//             nombre: "Comparativos y superlativos",
//             descripcion: "Bigger, the biggest...",
//             contenidoHtml: "<p>Cómo comparar objetos y personas en inglés.</p>",
//             tipoLeccion: "html",
//             orden: 2,
//             requiereLeccionAnteriorCompletada: true,
//             estaPublicada: true,
//         },
//     });

//     const leccionFund_1 = await prisma.leccion.create({
//         data: {
//             moduloId: moduloFundamentos.id,
//             nombre: "¿Qué es un algoritmo?",
//             contenidoHtml: "<p>Introducción a la lógica de programación.</p>",
//             tipoLeccion: "video",
//             urlVideo: "https://www.youtube.com/watch?v=demo4",
//             proveedorVideo: "YouTube",
//             orden: 1,
//             esVistaPrevia: true,
//             estaPublicada: true,
//         },
//     });

//     const leccionFund_2 = await prisma.leccion.create({
//         data: {
//             moduloId: moduloFundamentos.id,
//             nombre: "Variables y tipos de datos",
//             contenidoHtml: "<p>String, number, boolean...</p>",
//             tipoLeccion: "video",
//             orden: 2,
//             estaPublicada: true,
//         },
//     });

//     console.log("Creando recursos de lección...");
//     await prisma.recursosLeccion.createMany({
//         data: [
//             {
//                 leccionId: leccionA1_1.id,
//                 nombre: "Guía de pronunciación (PDF)",
//                 tipoRecurso: "pdf",
//                 rutaRecurso: "/recursos/ingles-a1-pronunciacion.pdf",
//                 orden: 1,
//             },
//             {
//                 leccionId: leccionA1_2.id,
//                 nombre: "Ejercicios de presente simple",
//                 tipoRecurso: "enlace",
//                 urlExterna: "https://ejemplo.com/ejercicios-presente-simple",
//                 orden: 1,
//             },
//             {
//                 leccionId: leccionFund_1.id,
//                 nombre: "Diapositivas de la clase",
//                 tipoRecurso: "archivo",
//                 rutaRecurso: "/recursos/algoritmos-slides.pdf",
//                 orden: 1,
//             },
//         ],
//     });

//     // ==========================================================================
//     // 3. ACCESO Y PROGRESO DEL ESTUDIANTE
//     // ==========================================================================

//     console.log("Creando inscripciones...");

//     const inscripcionMariaA1 = await prisma.inscripcion.create({
//         data: {
//             moduloId: moduloA1.id,
//             estudianteId: estudiante1.id,
//             numeroInscripcion: "INS-0001",
//             estado: "completada",
//             porcentajeAvance: 100,
//             fechaFinalizacion: new Date(),
//             inscritoPor: admin.id,
//         },
//     });

//     const inscripcionMariaA2 = await prisma.inscripcion.create({
//         data: {
//             moduloId: moduloA2.id,
//             estudianteId: estudiante1.id,
//             numeroInscripcion: "INS-0002",
//             estado: "activa",
//             porcentajeAvance: 0,
//             inscritoPor: admin.id,
//         },
//     });

//     const inscripcionCarlosFund = await prisma.inscripcion.create({
//         data: {
//             moduloId: moduloFundamentos.id,
//             estudianteId: estudiante2.id,
//             numeroInscripcion: "INS-0003",
//             estado: "activa",
//             porcentajeAvance: 0,
//             inscritoPor: admin.id,
//         },
//     });

//     console.log("Creando progreso de lecciones...");
//     await prisma.progresoLeccion.createMany({
//         data: [
//             {
//                 inscripcionId: inscripcionMariaA1.id,
//                 leccionId: leccionA1_1.id,
//                 estado: "completada",
//                 porcentaje: 100,
//                 segundosVisualizados: 320,
//                 iniciadoEn: new Date("2026-08-01T10:00:00Z"),
//                 desbloqueadoEn: new Date("2026-08-01T10:00:00Z"),
//                 completadoEn: new Date("2026-08-01T10:06:00Z"),
//             },
//             {
//                 inscripcionId: inscripcionMariaA1.id,
//                 leccionId: leccionA1_2.id,
//                 estado: "completada",
//                 porcentaje: 100,
//                 segundosVisualizados: 410,
//                 iniciadoEn: new Date("2026-08-02T09:00:00Z"),
//                 desbloqueadoEn: new Date("2026-08-02T09:00:00Z"),
//                 completadoEn: new Date("2026-08-02T09:08:00Z"),
//             },
//             {
//                 inscripcionId: inscripcionMariaA1.id,
//                 leccionId: leccionA1_3.id,
//                 estado: "completada",
//                 porcentaje: 100,
//                 segundosVisualizados: 180,
//                 iniciadoEn: new Date("2026-08-03T09:00:00Z"),
//                 desbloqueadoEn: new Date("2026-08-03T09:00:00Z"),
//                 completadoEn: new Date("2026-08-03T09:05:00Z"),
//             },
//             {
//                 inscripcionId: inscripcionMariaA2.id,
//                 leccionId: leccionA2_1.id,
//                 estado: "bloqueada",
//                 porcentaje: 0,
//             },
//         ],
//     });

//     console.log("Creando progreso de módulos...");
//     await prisma.progresoModulo.createMany({
//         data: [
//             {
//                 inscripcionId: inscripcionMariaA1.id,
//                 estado: "completado",
//                 porcentaje: 100,
//                 leccionesTotales: 3,
//                 leccionesCompletadas: 3,
//                 completadoEn: new Date("2026-08-03T09:05:00Z"),
//             },
//             {
//                 inscripcionId: inscripcionMariaA2.id,
//                 estado: "en_progreso",
//                 porcentaje: 0,
//                 leccionesTotales: 2,
//                 leccionesCompletadas: 0,
//             },
//             {
//                 inscripcionId: inscripcionCarlosFund.id,
//                 estado: "en_progreso",
//                 porcentaje: 0,
//                 leccionesTotales: 2,
//                 leccionesCompletadas: 0,
//             },
//         ],
//     });

//     console.log("Creando progreso de cursos...");
//     await prisma.progresoCurso.createMany({
//         data: [
//             {
//                 cursoId: cursoIngles.id,
//                 estudianteId: estudiante1.id,
//                 modulosTotales: 2,
//                 modulosCompletados: 1,
//                 porcentaje: 50,
//                 minutosEstudiados: 45,
//                 ultimoAccesoEn: new Date(),
//             },
//             {
//                 cursoId: cursoProgramacion.id,
//                 estudianteId: estudiante2.id,
//                 modulosTotales: 2,
//                 modulosCompletados: 0,
//                 porcentaje: 0,
//                 minutosEstudiados: 0,
//             },
//         ],
//     });

//     // ==========================================================================
//     // 4. CERTIFICACIÓN
//     // ==========================================================================

//     console.log("Creando plantillas de certificado...");
//     const plantillaModulo = await prisma.plantillaCertificado.create({
//         data: {
//             nombre: "Certificado de módulo — estándar",
//             tipoCertificado: "modulo",
//             orientacion: "horizontal",
//             plantillaHtml: "<div>Certificado de {{nombreModulo}} para {{nombreEstudiante}}</div>",
//             creadoPor: admin.id,
//         },
//     });

//     const plantillaCurso = await prisma.plantillaCertificado.create({
//         data: {
//             nombre: "Certificado de curso — estándar",
//             tipoCertificado: "curso",
//             orientacion: "horizontal",
//             plantillaHtml: "<div>Certificado de {{nombreCurso}} para {{nombreEstudiante}}</div>",
//             creadoPor: admin.id,
//         },
//     });

//     console.log("Creando reglas de certificación...");
//     await prisma.reglaCertificacionModulo.createMany({
//         data: [
//             { moduloId: moduloA1.id, porcentajeLeccionesRequerido: 100 },
//             { moduloId: moduloA2.id, porcentajeLeccionesRequerido: 100 },
//         ],
//     });

//     await prisma.reglaCertificacionCurso.create({
//         data: { cursoId: cursoIngles.id, porcentajeModulosRequerido: 100 },
//     });

//     console.log("Creando certificados...");
//     await prisma.certificadoModulo.create({
//         data: {
//             inscripcionId: inscripcionMariaA1.id,
//             plantillaId: plantillaModulo.id,
//             codigoVerificacion: "VER-MOD-0001",
//             numeroCertificado: "CERT-MOD-0001",
//             titulo: "Certificado de Inglés A1",
//             rutaPdf: "/certificados/cert-mod-0001.pdf",
//         },
//     });

//     await prisma.certificadoCurso.create({
//         data: {
//             usuarioId: estudiante1.id,
//             cursoId: cursoIngles.id,
//             plantillaId: plantillaCurso.id,
//             codigoVerificacion: "VER-CUR-0001",
//             numeroCertificado: "CERT-CUR-0001",
//             titulo: "Certificado de Inglés — UN MUNDO",
//             estado: "borrador",
//         },
//     });

//     // ==========================================================================
//     // 5. CHECKPOINT DE LECCIÓN (FormularioLeccion)
//     // ==========================================================================

//     console.log("Creando formularios de lección (checkpoints)...");

//     const formularioA1_2 = await prisma.formularioLeccion.create({
//         data: {
//             leccionId: leccionA1_2.id,
//             titulo: "Verifica lo aprendido: Presente simple",
//         },
//     });

//     const formularioA1_3 = await prisma.formularioLeccion.create({
//         data: {
//             leccionId: leccionA1_3.id,
//             titulo: "Verifica lo aprendido: Vocabulario familiar",
//         },
//     });

//     console.log("Creando preguntas de formulario...");
//     const preguntaP1 = await prisma.preguntaFormulario.create({
//         data: {
//             formularioId: formularioA1_2.id,
//             enunciado: "¿Cuál es la forma correcta en tercera persona?",
//             orden: 1,
//         },
//     });

//     const preguntaP2 = await prisma.preguntaFormulario.create({
//         data: {
//             formularioId: formularioA1_3.id,
//             enunciado: "¿Cómo se dice 'hermana' en inglés?",
//             orden: 1,
//         },
//     });

//     console.log("Creando opciones de formulario...");
//     await prisma.opcionFormulario.create({
//         data: { preguntaFormularioId: preguntaP1.id, texto: "She play", esCorrecta: false, orden: 1 },
//     });
//     const opcionP1B = await prisma.opcionFormulario.create({
//         data: { preguntaFormularioId: preguntaP1.id, texto: "She plays", esCorrecta: true, orden: 2 },
//     });
//     await prisma.opcionFormulario.create({
//         data: { preguntaFormularioId: preguntaP1.id, texto: "She playing", esCorrecta: false, orden: 3 },
//     });

//     await prisma.opcionFormulario.create({
//         data: { preguntaFormularioId: preguntaP2.id, texto: "Brother", esCorrecta: false, orden: 1 },
//     });
//     const opcionP2B = await prisma.opcionFormulario.create({
//         data: { preguntaFormularioId: preguntaP2.id, texto: "Sister", esCorrecta: true, orden: 2 },
//     });

//     console.log("Creando respuestas de formulario...");

//     const progresoA1_2 = await prisma.progresoLeccion.findUniqueOrThrow({
//         where: { inscripcionId_leccionId: { inscripcionId: inscripcionMariaA1.id, leccionId: leccionA1_2.id } },
//     });
//     const progresoA1_3 = await prisma.progresoLeccion.findUniqueOrThrow({
//         where: { inscripcionId_leccionId: { inscripcionId: inscripcionMariaA1.id, leccionId: leccionA1_3.id } },
//     });

//     await prisma.respuestaFormulario.createMany({
//         data: [
//             {
//                 progresoLeccionId: progresoA1_2.id,
//                 preguntaFormularioId: preguntaP1.id,
//                 opcionFormularioId: opcionP1B.id,
//                 esCorrecta: true,
//             },
//             {
//                 progresoLeccionId: progresoA1_3.id,
//                 preguntaFormularioId: preguntaP2.id,
//                 opcionFormularioId: opcionP2B.id,
//                 esCorrecta: true,
//             },
//         ],
//     });

//     console.log("\n✅ Seed completo.");
//     console.log("----------------------------------------------------");
//     console.log("Login admin:       admin_lms / Password123!");
//     console.log("Login estudiante:  maria.estudiante / Password123!");
//     console.log("  -> Inglés A1: completado (3/3 lecciones + certificado)");
//     console.log("  -> Inglés A2: en progreso (lección 1 desbloqueada, lección 2 bloqueada)");
//     console.log("Login estudiante:  carlos.estudiante / Password123!");
//     console.log("  -> Fundamentos de Programación: recién inscrito");
//     console.log("----------------------------------------------------");
// }

// main()
//     .catch((e) => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });