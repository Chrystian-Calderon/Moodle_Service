import { PrismaClient } from '@prisma/client';

export async function seedProgresoLecciones(prisma: PrismaClient) {
  const inscripciones = await prisma.inscripcion.findMany({
    select: {
      id: true,
      moduloId: true,
      modulo: { select: { nombre: true } },
      estudiante: { select: { username: true } },
    },
    orderBy: { creadoEn: 'asc' },
  });

  console.log(`📊 Iniciando siembra de progreso de lecciones para ${inscripciones.length} inscripciones...`);

  let contador = 0;

  for (const inscripcion of inscripciones) {
    const lecciones = await prisma.leccion.findMany({
      where: { moduloId: inscripcion.moduloId },
      select: { id: true, nombre: true, tipoLeccion: true, orden: true },
      orderBy: { orden: 'asc' },
    });

    for (const leccion of lecciones) {
      contador++;

      let estado: string;
      let porcentaje: number;
      let segundosVisualizados: number;
      let iniciadoEn: Date | null = null;
      let completadoEn: Date | null = null;
      let desbloqueadoEn: Date | null = null;
      let ultimoAccesoEn: Date | null = null;

      if (leccion.tipoLeccion === 'video') {
        const random = Math.random();
        if (random < 0.35) {
          // 35% completado
          estado = 'completada';
          porcentaje = 100;
          segundosVisualizados = randomInt(600, 3600);
          iniciadoEn = randomDate(30);
          completadoEn = randomDate(5);
          desbloqueadoEn = randomDate(35);
          ultimoAccesoEn = completadoEn;
        } else if (random < 0.70) {
          // 35% en progreso
          estado = 'en_progreso';
          porcentaje = randomFloat(20, 85);
          segundosVisualizados = randomInt(120, 1800);
          iniciadoEn = randomDate(20);
          completadoEn = null;
          desbloqueadoEn = randomDate(25);
          ultimoAccesoEn = randomDate(3);
        } else if (random < 0.85) {
          // 15% desbloqueada (no iniciada)
          estado = 'desbloqueada';
          porcentaje = 0;
          segundosVisualizados = 0;
          iniciadoEn = null;
          completadoEn = null;
          desbloqueadoEn = randomDate(15);
          ultimoAccesoEn = null;
        } else {
          // 15% bloqueada
          estado = 'bloqueada';
          porcentaje = 0;
          segundosVisualizados = 0;
          iniciadoEn = null;
          completadoEn = null;
          desbloqueadoEn = null;
          ultimoAccesoEn = null;
        }
      } else {
        // Actividad
        const random = Math.random();
        if (random < 0.40) {
          estado = 'completada';
          porcentaje = 100;
          segundosVisualizados = 0;
          iniciadoEn = randomDate(25);
          completadoEn = randomDate(5);
          desbloqueadoEn = randomDate(30);
          ultimoAccesoEn = completadoEn;
        } else if (random < 0.65) {
          estado = 'en_progreso';
          porcentaje = randomFloat(10, 90);
          segundosVisualizados = 0;
          iniciadoEn = randomDate(15);
          completadoEn = null;
          desbloqueadoEn = randomDate(20);
          ultimoAccesoEn = randomDate(3);
        } else {
          estado = 'desbloqueada';
          porcentaje = 0;
          segundosVisualizados = 0;
          iniciadoEn = null;
          completadoEn = null;
          desbloqueadoEn = randomDate(10);
          ultimoAccesoEn = null;
        }
      }

      await prisma.progresoLeccion.upsert({
        where: {
          inscripcionId_leccionId: {
            inscripcionId: inscripcion.id,
            leccionId: leccion.id,
          },
        },
        update: {
          estado,
          porcentaje,
          segundosVisualizados,
          iniciadoEn,
          desbloqueadoEn,
          ultimoAccesoEn,
          completadoEn,
        },
        create: {
          inscripcionId: inscripcion.id,
          leccionId: leccion.id,
          estado,
          porcentaje,
          segundosVisualizados,
          iniciadoEn,
          desbloqueadoEn,
          ultimoAccesoEn,
          completadoEn,
        },
      });
    }

    const numIns = String(contador).padStart(4, '0');
    console.log(`  ✅ ${inscripcion.estudiante.username} → ${inscripcion.modulo.nombre} (${lecciones.length} lecciones)`);
  }

  console.log(`\n🎉 ¡${contador} progresos de lecciones sembrados con éxito!`);
  console.log('--------------------------------------------------');
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

function randomDate(diasAtras: number): Date {
  const ahora = new Date();
  const dias = randomInt(0, diasAtras);
  const horas = randomInt(0, 23);
  const minutos = randomInt(0, 59);
  ahora.setDate(ahora.getDate() - dias);
  ahora.setHours(horas, minutos, 0, 0);
  return ahora;
}
