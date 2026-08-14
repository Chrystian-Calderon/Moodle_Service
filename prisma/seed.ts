import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config'; // Asegura la lectura del .env

// Configurar el cliente de Prisma 7 con el Driver Adapter para el script externo
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando la siembra completa del LMS...');

    // Encriptar la contraseña común para los tres usuarios de prueba
    const passwordHash = await bcrypt.hash('password123', 10);

    // ==========================================
    // 1. SEMBRAR ROLES DEL SISTEMA
    // ==========================================
    console.log('👥 Creando roles...');

    const rolAdmin = await prisma.rol.upsert({
        where: { nombre: 'ADMINISTRADOR' },
        update: {},
        create: {
            id: 'rol-admin-id',
            nombre: 'ADMINISTRADOR',
            descripcion: 'Acceso total y administrativo al LMS',
            estado: 'activo',
        },
    });

    const rolTeacher = await prisma.rol.upsert({
        where: { nombre: 'DOCENTE' },
        update: {},
        create: {
            id: 'rol-doc-id',
            nombre: 'DOCENTE',
            descripcion: 'Gestión de cursos, calificaciones y alumnos',
            estado: 'activo',
        },
    });

    const rolStudent = await prisma.rol.upsert({
        where: { nombre: 'ESTUDIANTE' },
        update: {},
        create: {
            id: 'rol-est-id',
            nombre: 'ESTUDIANTE',
            descripcion: 'Acceso a clases, tareas y perfil personal',
            estado: 'activo',
        },
    });

    // ==========================================
    // 2. SEMBRAR USUARIOS DE PRUEBA
    // ==========================================
    console.log('👤 Creando usuarios...');

    // A. Usuario Administrador
    const adminUser = await prisma.usuario.upsert({
        where: { correo: 'admin@lms.com' },
        update: { contrasenaHash: passwordHash },
        create: {
            id: 'usr-admin-id',
            username: 'admin_lms',
            correo: 'admin@lms.com',
            contrasenaHash: passwordHash,
            estado: 'activo',
        },
    });

    // B. Usuario Docente (Profesor)
    const teacherUser = await prisma.usuario.upsert({
        where: { correo: 'profesor@lms.com' },
        update: { contrasenaHash: passwordHash },
        create: {
            id: 'usr-doc-id',
            username: 'profesor_lms',
            correo: 'profesor@lms.com',
            contrasenaHash: passwordHash,
            estado: 'activo',
        },
    });

    // C. Usuario Estudiante (Alumno)
    const studentUser1 = await prisma.usuario.upsert({
        where: { correo: 'estudiante1@lms.com' },
        update: { contrasenaHash: passwordHash },
        create: {
            id: 'usr-est1-id',
            username: 'estudiante1_lms',
            correo: 'estudiante1@lms.com',
            contrasenaHash: passwordHash,
            estado: 'activo',
        },
    });

    const studentUser2 = await prisma.usuario.upsert({
        where: { correo: 'estudiante2@lms.com' },
        update: { contrasenaHash: passwordHash },
        create: {
            id: 'usr-est2-id',
            username: 'estudiante2_lms',
            correo: 'estudiante2@lms.com',
            contrasenaHash: passwordHash,
            estado: 'activo',
        },
    });

    const studentUser3 = await prisma.usuario.upsert({
        where: { correo: 'estudiante3@lms.com' },
        update: { contrasenaHash: passwordHash },
        create: {
            id: 'usr-est3-id',
            username: 'estudiante3_lms',
            correo: 'estudiante3@lms.com',
            contrasenaHash: passwordHash,
            estado: 'activo',
        },
    });

    // ==========================================
    // 3. ASIGNAR ROLES A LOS USUARIOS
    // ==========================================
    console.log('🔗 Asignando roles correspondientes...');

    // Asignar Administrador
    await prisma.usuarioRol.upsert({
        where: { usuarioId_rolId: { usuarioId: adminUser.id, rolId: rolAdmin.id } },
        update: {},
        create: { usuarioId: adminUser.id, rolId: rolAdmin.id },
    });

    // Asignar Docente
    await prisma.usuarioRol.upsert({
        where: { usuarioId_rolId: { usuarioId: teacherUser.id, rolId: rolTeacher.id } },
        update: {},
        create: { usuarioId: teacherUser.id, rolId: rolTeacher.id },
    });

    // Asignar Estudiante
    await prisma.usuarioRol.upsert({
        where: { usuarioId_rolId: { usuarioId: studentUser1.id, rolId: rolStudent.id } },
        update: {},
        create: { usuarioId: studentUser1.id, rolId: rolStudent.id },
    });

    await prisma.usuarioRol.upsert({
        where: { usuarioId_rolId: { usuarioId: studentUser2.id, rolId: rolStudent.id } },
        update: {},
        create: { usuarioId: studentUser2.id, rolId: rolStudent.id },
    });

    await prisma.usuarioRol.upsert({
        where: { usuarioId_rolId: { usuarioId: studentUser3.id, rolId: rolStudent.id } },
        update: {},
        create: { usuarioId: studentUser3.id, rolId: rolStudent.id },
    });

    console.log('\n✅ ¡LMS sembrado con éxito en tu base de datos de Neon!');
    console.log('--------------------------------------------------');
    console.log('🔑 Cuentas disponibles (Contraseña para todas: password123):');
    console.log('   - Admin:    admin@lms.com');
    console.log('   - Profesor: profesor@lms.com');
    console.log('   - Alumno:   estudiante@lms.com');
    console.log('--------------------------------------------------');

    const curso = await prisma.curso.upsert({
        where: {
            slug: 'curso-programacion-web',
        },
        update: {},
        create: {
            nombre: 'Curso de Programación Web',
            categoria: 'Desarrollo Web',
            slug: 'curso-programacion-web',
            descripcionCorta: 'Aprende desarrollo web desde cero.',
            descripcionCompleta:
                'Curso práctico para aprender los fundamentos del desarrollo web.',
            duracionHoras: 40,
            rutaPortada: '/images/cursos/programacion-web.jpg',
            rutaImagenSecundaria:
                '/images/cursos/programacion-web-secundaria.jpg',
            estado: 'publicado',
            creadoPor: 'admin',
        },
    });

    const modulo1 = await prisma.modulo.upsert({
        where: {
            id: 'modulo-prueba-001',
        },
        update: {},
        create: {
            id: 'modulo-prueba-001',
            cursoId: curso.id,
            nombre: 'Introducción al Desarrollo Web',
            descripcion:
                'Conoce los conceptos fundamentales del desarrollo web.',
            fraseMotivacional: '¡Comencemos a construir!',
            rutaImagen: '/images/modulos/introduccion-web.jpg',
            orden: 1,
            otorgaCertificacion: false,
            estaPublicado: true,
        },
    });

    const modulo2 = await prisma.modulo.upsert({
        where: {
            id: 'modulo-prueba-002',
        },
        update: {},
        create: {
            id: 'modulo-prueba-002',
            cursoId: curso.id,
            nombre: 'HTML y CSS',
            descripcion:
                'Aprende a estructurar y diseñar páginas web.',
            fraseMotivacional:
                'Cada línea de código te acerca a tu objetivo.',
            rutaImagen: '/images/modulos/html-css.jpg',
            orden: 2,
            otorgaCertificacion: false,
            estaPublicado: true,
        },
    });

    await prisma.inscripcion.upsert({
        where: {
            numeroInscripcion: 'INS-PRUEBA-001',
        },
        update: {},
        create: {
            moduloId: modulo1.id,

            estudianteId: studentUser1.id,

            numeroInscripcion: 'INS-PRUEBA-001',

            estado: 'activa',
            estadoAcceso: 'habilitado',
            porcentajeAvance: 0,

            observaciones: 'Inscripción de prueba',

            inscritoPor: 'adminUser.id',
        },
    });
}

main()
    .catch((e) => {
        console.error('❌ Error fatal al ejecutar el Seeder:', e);
        process.exit(1);
    })
    .finally(async () => {
        await pool.end(); // Cerramos la conexión de forma segura
    });
