import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config'; // Asegura la lectura del .env
import { seedUsuarios } from './seeds/seed-users';
import { seedEstudiantes } from './seeds/seed-estudiantes';
import { seedCursos } from './seeds/seed-cursos';
import { seedModulos } from './seeds/seed-modulos';
import { seedLecciones } from './seeds/seed-lecciones';
import { seedRecursosLecciones } from './seeds/seed-recursos-lecciones';
import { seedFormularioLecciones } from './seeds/seed-formulario-leccion';
import { seedInscripciones } from './seeds/seed-inscripciones';
import { seedProgresoLecciones } from './seeds/seed-progreso-lecciones';
import { seedProgresoModulos } from './seeds/seed-progreso-modulos';
import { seedPermisos } from './seeds/seed-permisos';

// Configurar el cliente de Prisma 7 con el Driver Adapter para el script externo
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    // await seedUsuarios(prisma);
    // await seedEstudiantes(prisma);
    // await seedPermisos(prisma);
    // await seedCursos(prisma);
    await seedModulos(prisma);
    await seedLecciones(prisma);
    // await seedRecursosLecciones(prisma);
    // await seedFormularioLecciones(prisma);
    // await seedInscripciones(prisma);
    // await seedProgresoLecciones(prisma);
    // await seedProgresoModulos(prisma);
}

main()
    .catch((e) => {
        console.error('❌ Error fatal al ejecutar el Seeder:', e);
        process.exit(1);
    })
    .finally(async () => {
        await pool.end(); // Cerramos la conexión de forma segura
    });
