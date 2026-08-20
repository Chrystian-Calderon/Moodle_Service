import { PrismaClient } from '@prisma/client';

export async function seedProgresoModulos(prisma: PrismaClient) {
  const inscripciones = await prisma.inscripcion.findMany({
    select: {
      id: true,
      moduloId: true,
      modulo: { select: { nombre: true } },
      estudiante: { select: { username: true } },
    },
    orderBy: { creadoEn: 'asc' },
  });

  console.log(`📦 Iniciando siembra de progreso de módulos para ${inscripciones.length} inscripciones...`);

  let contador = 0;

  for (const inscripcion of inscripciones) {
    const lecciones = await prisma.leccion.findMany({
      where: { moduloId: inscripcion.moduloId },
      select: { id: true },
    });

    const progresosLecciones = await prisma.progresoLeccion.findMany({
      where: {
        inscripcionId: inscripcion.id,
        leccionId: { in: lecciones.map((l) => l.id) },
      },
      select: { estado: true },
    });

    const leccionesTotales = progresosLecciones.length;
    const leccionesCompletadas = progresosLecciones.filter((p) => p.estado === 'completada').length;
    const porcentaje = leccionesTotales > 0 ? parseFloat(((leccionesCompletadas / leccionesTotales) * 100).toFixed(1)) : 0;

    let estado: string;
    let completadoEn: Date | null = null;

    if (porcentaje === 100) {
      estado = 'completado';
      completadoEn = randomDate(5);
    } else if (porcentaje >= 50) {
      estado = 'en_progreso';
    } else if (porcentaje > 0) {
      estado = 'en_progreso';
    } else {
      estado = 'iniciado';
    }

    await prisma.progresoModulo.upsert({
      where: { inscripcionId: inscripcion.id },
      update: {},
      create: {
        inscripcionId: inscripcion.id,
        estado,
        porcentaje,
        leccionesTotales,
        leccionesCompletadas,
        completadoEn,
      },
    });

    // Actualizar el porcentaje de avance en la inscripción
    await prisma.inscripcion.update({
      where: { id: inscripcion.id },
      data: { porcentajeAvance: porcentaje },
    });

    contador++;
    console.log(`  ✅ ${inscripcion.estudiante.username} → ${inscripcion.modulo.nombre} [${leccionesCompletadas}/${leccionesTotales}] ${porcentaje}%`);
  }

  console.log(`\n🎉 ¡${contador} progresos de módulos sembrados con éxito!`);
  console.log('--------------------------------------------------');
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(diasAtras: number): Date {
  const ahora = new Date();
  const dias = randomInt(0, diasAtras);
  ahora.setDate(ahora.getDate() - dias);
  return ahora;
}
