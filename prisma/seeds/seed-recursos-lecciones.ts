import { PrismaClient } from '@prisma/client';

export async function seedRecursosLecciones(prisma: PrismaClient) {
  const URL_VIDEO = 'https://youtu.be/yP0PM-fpnXo';

  const lecciones = await prisma.leccion.findMany({
    select: { id: true, nombre: true, modulo: { select: { nombre: true } } },
    orderBy: { creadoEn: 'asc' },
  });

  console.log(`📎 Iniciando siembra de recursos para ${lecciones.length} lecciones...`);

  let contador = 0;

  for (const leccion of lecciones) {
    const numeroPdf = String(contador + 1).padStart(3, '0');
    const nombreLimpio = leccion.nombre
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Verificar si ya existen recursos para esta lección
    const recursosExistentes = await prisma.recursosLeccion.count({
      where: { leccionId: leccion.id },
    });

    if (recursosExistentes >= 2) {
      contador++;
      const numero = String(contador).padStart(3, '0');
      console.log(`  ⏭️  ${numero}/${lecciones.length} - ${leccion.nombre} [${leccion.modulo.nombre}] (ya existen ${recursosExistentes} recursos)`);
      continue;
    }

    // PDF del recurso
    await prisma.recursosLeccion.create({
      data: {
        leccionId: leccion.id,
        nombre: `Apunte: ${leccion.nombre}`,
        descripcion: `Material de apoyo en PDF para la lección "${leccion.nombre}".`,
        tipoRecurso: 'pdf',
        rutaRecurso: `src/assets/pdf/recurso-${numeroPdf}.pdf`,
        urlExterna: null,
        orden: 1,
      },
    });

    // Enlace del recurso
    await prisma.recursosLeccion.create({
      data: {
        leccionId: leccion.id,
        nombre: `Video complementario: ${leccion.nombre}`,
        descripcion: `Enlace a video complementario para reforzar la lección "${leccion.nombre}".`,
        tipoRecurso: 'enlace',
        rutaRecurso: null,
        urlExterna: URL_VIDEO,
        orden: 2,
      },
    });

    contador++;
    const numero = String(contador).padStart(3, '0');
    console.log(`  ✅ ${numero}/${lecciones.length} - ${leccion.nombre} [${leccion.modulo.nombre}]`);
  }

  const totalRecursos = lecciones.length * 2;

  console.log(`\n🎉 ¡${totalRecursos} recursos sembrados con éxito!`);
  console.log('--------------------------------------------------');
  console.log(`  📄 PDFs: recurso-001.pdf hasta recurso-${String(lecciones.length).padStart(3, '0')}.pdf`);
  console.log(`  🔗 Enlaces: ${URL_VIDEO}`);
  console.log('--------------------------------------------------');
}
