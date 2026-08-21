import { PrismaClient } from '@prisma/client';

export async function seedFormularioLecciones(prisma: PrismaClient) {
  const lecciones = await prisma.leccion.findMany({
    select: { id: true, nombre: true, modulo: { select: { nombre: true } } },
    orderBy: { creadoEn: 'asc' },
  });

  console.log(`📝 Iniciando siembra de formularios para ${lecciones.length} lecciones...`);

  let contador = 0;

  for (const leccion of lecciones) {
    contador++;
    const numero = String(contador).padStart(3, '0');

    await prisma.formularioLeccion.upsert({
      where: { leccionId: leccion.id },
      update: {},
      create: {
        leccionId: leccion.id,
        titulo: `Evaluación: ${leccion.nombre}`,
        estado: 'activo',
      },
    });

    console.log(`  ✅ ${numero}/${lecciones.length} - ${leccion.nombre} [${leccion.modulo.nombre}]`);
  }

  console.log(`\n🎉 ¡${lecciones.length} formularios sembrados con éxito!`);
  console.log('--------------------------------------------------');
}
