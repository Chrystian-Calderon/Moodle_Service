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
    const studentUser = await prisma.usuario.upsert({
        where: { correo: 'estudiante@lms.com' },
        update: { contrasenaHash: passwordHash },
        create: {
            id: 'usr-est-id',
            username: 'estudiante_lms',
            correo: 'estudiante@lms.com',
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
        where: { usuarioId_rolId: { usuarioId: studentUser.id, rolId: rolStudent.id } },
        update: {},
        create: { usuarioId: studentUser.id, rolId: rolStudent.id },
    });

    console.log('\n✅ ¡LMS sembrado con éxito en tu base de datos de Neon!');
    console.log('--------------------------------------------------');
    console.log('🔑 Cuentas disponibles (Contraseña para todas: password123):');
    console.log('   - Admin:    admin@lms.com');
    console.log('   - Profesor: profesor@lms.com');
    console.log('   - Alumno:   estudiante@lms.com');
    console.log('--------------------------------------------------');
}

main()
    .catch((e) => {
        console.error('❌ Error fatal al ejecutar el Seeder:', e);
        process.exit(1);
    })
    .finally(async () => {
        await pool.end(); // Cerramos la conexión de forma segura
    });
