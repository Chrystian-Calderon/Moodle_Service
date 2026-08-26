import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProgresoModuloResultado } from './type/ProgresoModuloResultado';
import { CertificadoService } from 'src/certificado/certificado.service';

@Injectable()
export class ProgresoService {

  constructor(private readonly prisma: PrismaService,
    private readonly certificadoService: CertificadoService
  ) { }

  async recalcularProgresoModulo(inscripcionId: string) {
    const inscripcion = await this.prisma.inscripcion.findUnique({
      where: {
        id: inscripcionId,
      },
      include: {
        modulo: {
          select: {
            id: true,
            nombre: true,
            cursoId: true,
          },
        },
      },
    });

    if (!inscripcion) {
      throw new NotFoundException("Inscripción no encontrada");
    }

    const leccionesTotales = await this.prisma.leccion.count({
      where: {
        moduloId: inscripcion.moduloId,
        estaPublicada: true,
      },
    });

    const leccionesCompletadas =
      await this.prisma.progresoLeccion.count({
        where: {
          inscripcionId: inscripcion.id,
          completadoEn: {
            not: null,
          },
          leccion: {
            estaPublicada: true,
          },
        },
      });

    const porcentaje =
      leccionesTotales === 0
        ? 0
        : Number(
          ((leccionesCompletadas / leccionesTotales) * 100).toFixed(2),
        );

    const completado =
      leccionesTotales > 0 &&
      leccionesCompletadas >= leccionesTotales;

    const estado = completado ? "completado" : "en_progreso";

    const progresoExistente =
      await this.prisma.progresoModulo.findUnique({
        where: {
          inscripcionId: inscripcion.id,
        },
      });

    const completadoEn = completado
      ? progresoExistente?.completadoEn ?? new Date()
      : null;

    const progresoModulo =
      await this.prisma.progresoModulo.upsert({
        where: {
          inscripcionId: inscripcion.id,
        },

        update: {
          estado,
          porcentaje,
          leccionesTotales,
          leccionesCompletadas,
          completadoEn,
        },

        create: {
          inscripcionId: inscripcion.id,
          estado,
          porcentaje,
          leccionesTotales,
          leccionesCompletadas,
          completadoEn,
        },
      });

    await this.prisma.inscripcion.update({
      where: {
        id: inscripcion.id,
      },
      data: {
        porcentajeAvance: porcentaje,
        fechaFinalizacion: completado
          ? progresoModulo.completadoEn
          : null,
      },
    });

    if (completado) {
      await this.certificadoService.emitirCertificadoModulo(
        inscripcion.id,
      );

      await this.certificadoService.verificarYEmitirCertificadoCurso(
        inscripcion.estudianteId,
        inscripcion.modulo.cursoId,
      );
    }

    return {
      id: progresoModulo.id,
      inscripcionId: progresoModulo.inscripcionId,

      modulo: inscripcion.modulo,

      estado: progresoModulo.estado,
      porcentaje: progresoModulo.porcentaje,

      leccionesTotales: progresoModulo.leccionesTotales,
      leccionesCompletadas:
        progresoModulo.leccionesCompletadas,

      leccionesPendientes:
        progresoModulo.leccionesTotales -
        progresoModulo.leccionesCompletadas,

      completadoEn: progresoModulo.completadoEn,
      actualizadoEn: progresoModulo.actualizadoEn,
    };
  }

  async obtenerPorModuloYUsuario(moduloId: string, estudianteId: string,) {
    const inscripcion =
      await this.prisma.inscripcion.findFirst({
        where: { moduloId, estudianteId },
      });

    if (!inscripcion) {
      throw new NotFoundException("El estudiante no está inscrito en este módulo",);
    }

    return this.recalcularProgresoModulo(inscripcion.id);
  }

  async obtenerPorInscripcion(inscripcionId: string,) {
    return this.recalcularProgresoModulo(inscripcionId);
  }

  async obtenerPorUsuario(
    estudianteId: string,
  ): Promise<ProgresoModuloResultado[]> {
    const inscripciones =
      await this.prisma.inscripcion.findMany({
        where: {
          estudianteId,
        },
        select: {
          id: true,
        },
      });

    const progresos: ProgresoModuloResultado[] = [];

    for (const inscripcion of inscripciones) {
      const progreso =
        await this.recalcularProgresoModulo(
          inscripcion.id,
        );

      progresos.push(progreso);
    }

    return progresos;
  }

  async obtenerResumenModulo(moduloId: string) {
    const modulo = await this.prisma.modulo.findUnique({
      where: {
        id: moduloId,
      },
      select: {
        id: true,
        nombre: true,
        cursoId: true,
      },
    });

    if (!modulo) {
      throw new NotFoundException("Módulo no encontrado");
    }

    const leccionesTotales =
      await this.prisma.leccion.count({
        where: {
          moduloId,
          estaPublicada: true,
        },
      });

    const estudiantesInscritos =
      await this.prisma.inscripcion.count({
        where: {
          moduloId,
        },
      });

    return {
      modulo,
      leccionesTotales,
      estudiantesInscritos,
    };
  }


}
