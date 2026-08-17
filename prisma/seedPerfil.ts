import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    console.log('🌱 Creando perfiles de usuarios...');

    // ==========================================
    // ADMINISTRADOR
    // ==========================================

    await prisma.perfil.upsert({
        where: {
            usuarioId: 'usr-admin-id',
        },
        update: {},
        create: {
            usuarioId: 'usr-admin-id',
            nombre: 'Admin',
            apellidoPaterno: 'LMS',
            apellidoMaterno: null,
            telefono: '70000000',
            tipoDocumentoIdentidad: 'CI',
            numeroDocumento: '10000001',
            fechaNacimiento: null,
            genero: null,
            ciudad: 'La Paz',
            pais: 'Bolivia',
            ocupacion: 'Administrador',
            contactoEmergenciaNombre: null,
            contactoEmergenciaTelefono: null,
            fotografiaRuta: null,
        },
    });

    // ==========================================
    // DOCENTE
    // ==========================================

    await prisma.perfil.upsert({
        where: {
            usuarioId: 'usr-doc-id',
        },
        update: {},
        create: {
            usuarioId: 'usr-doc-id',
            nombre: 'Profesor',
            apellidoPaterno: 'LMS',
            apellidoMaterno: null,
            telefono: '70000001',
            tipoDocumentoIdentidad: 'CI',
            numeroDocumento: '10000002',
            fechaNacimiento: null,
            genero: null,
            ciudad: 'La Paz',
            pais: 'Bolivia',
            ocupacion: 'Docente',
            contactoEmergenciaNombre: null,
            contactoEmergenciaTelefono: null,
            fotografiaRuta: null,
        },
    });

    // ==========================================
    // ESTUDIANTE
    // ==========================================

    await prisma.perfil.upsert({
        where: {
            usuarioId: 'usr-est-id',
        },
        update: {},
        create: {
            usuarioId: 'usr-est-id',
            nombre: 'Estudiante',
            apellidoPaterno: 'LMS',
            apellidoMaterno: null,
            telefono: '70000002',
            tipoDocumentoIdentidad: 'CI',
            numeroDocumento: '10000003',
            fechaNacimiento: null,
            genero: null,
            ciudad: 'La Paz',
            pais: 'Bolivia',
            ocupacion: 'Estudiante',
            contactoEmergenciaNombre: null,
            contactoEmergenciaTelefono: null,
            fotografiaRuta: null,
        },
    });

    console.log('✅ Perfiles creados correctamente.');
}

main()
    .catch((error) => {
        console.error('❌ Error al crear perfiles:', error);
        process.exit(1);
    })
    .finally(async () => {
        await pool.end();
    });