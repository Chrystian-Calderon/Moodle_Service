import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.plantillaCertificado.upsert({
        where: {
            id: 'plantilla-modulo',
        },
        update: {},
        create: {
            id: 'plantilla-modulo',
            nombre: 'Certificado de módulo',
            tipoCertificado: 'modulo',
            rutaFondo: 'uploads/certificados/certificado-modulo.png',
            estado: 'activa',
        },
    });

    await prisma.plantillaCertificado.upsert({
        where: {
            id: 'plantilla-curso',
        },
        update: {},
        create: {
            id: 'plantilla-curso',
            nombre: 'Certificado de curso',
            tipoCertificado: 'curso',
            rutaFondo: 'uploads/certificados/certificado-curso.png',
            estado: 'activa',
        },
    });

    console.log('Plantillas de certificados creadas correctamente');
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });