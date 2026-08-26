import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ListarCertificadosDto } from './dto/listar-certificados.dto';
import * as crypto from 'crypto';
import { CertificadoPdfService } from './certificado-pdf.service';
import { CertificadoPdfData } from './types/certificado-pdf-data';

const MAX_INTENTOS_IMPRESION = 10;

@Injectable()
export class CertificadoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly certificadoPdfService: CertificadoPdfService,
  ) { }

  private async generarCodigoVerificacion(): Promise<string> {
    while (true) {
      const numero = crypto
        .randomInt(100000, 1000000)
        .toString();

      const codigo = `ELT-${numero}`;

      const existente = await this.prisma.certificado.findUnique({
        where: {
          codigoVerificacion: codigo,
        },
      });
      if (!existente) {
        return codigo;
      }
    }
  }


  private generarNumeroCertificado(): string {
    const año = new Date().getFullYear();

    return `ELT-${año}-${Date.now()}`;
  }

  async findAll(query: ListarCertificadosDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const buscar = query.buscar?.trim();

    const skip = (page - 1) * limit;

    const where = buscar
      ? {
        titulo: {
          contains: buscar,
          mode: 'insensitive' as const,
        },
      }
      : {};

    const [certificados, total] = await Promise.all([
      this.prisma.certificado.findMany({
        where,
        skip,
        take: limit,

        orderBy: {
          fechaEmision: 'desc',
        },

        include: {
          usuario: {
            select: {
              id: true,
              username: true,
              correo: true,
            },
          },

          curso: {
            select: {
              id: true,
              nombre: true,
              slug: true,
            },
          },

          inscripcion: {
            select: {
              id: true,
              numeroInscripcion: true,
              fechaInscripcion: true,
              estado: true,
              porcentajeAvance: true,

              modulo: {
                select: {
                  id: true,
                  nombre: true,
                },
              },
            },
          },
        },
      }),

      this.prisma.certificado.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: certificados,

      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async findOne(id: string) {
    const certificado = await this.prisma.certificado.findUnique({
      where: {
        id,
      },

      include: {
        usuario: {
          select: {
            id: true,
            username: true,
            correo: true,
          },
        },

        curso: {
          select: {
            id: true,
            nombre: true,
            slug: true,
          },
        },

        inscripcion: {
          select: {
            id: true,
            numeroInscripcion: true,
            fechaInscripcion: true,
            estado: true,
            porcentajeAvance: true,

            modulo: {
              select: {
                id: true,
                nombre: true,
                cursoId: true,
              },
            },
          },
        },
      },
    });

    if (!certificado) {
      throw new NotFoundException(`No se encontró el certificado con ID: ${id}`);
    }

    return certificado;
  }

  async buscarPorUsuario(usuarioId: string) {
    const certificados = await this.prisma.certificado.findMany({
      where: {
        usuarioId,
      },

      orderBy: {
        fechaEmision: 'desc',
      },

      include: {
        usuario: {
          select: {
            id: true,
            username: true,
            correo: true,
          },
        },

        curso: {
          select: {
            id: true,
            nombre: true,
            slug: true,
          },
        },

        inscripcion: {
          select: {
            id: true,
            numeroInscripcion: true,
            fechaInscripcion: true,
            estado: true,
            porcentajeAvance: true,

            modulo: {
              select: {
                id: true,
                nombre: true,
                cursoId: true,
              },
            },
          },
        },
      },
    });

    return certificados;
  }

  async buscarPorCodigo(codigo: string) {
    const certificado = await this.prisma.certificado.findUnique({
      where: {
        codigoVerificacion: codigo,
      },

      include: {
        usuario: {
          select: {
            id: true,
            username: true,
          },
        },

        curso: {
          select: {
            id: true,
            nombre: true,
            slug: true,
          },
        },

        inscripcion: {
          select: {
            id: true,
            numeroInscripcion: true,
            estado: true,
            porcentajeAvance: true,

            modulo: {
              select: {
                id: true,
                nombre: true,
              },
            },
          },
        },
      },
    });

    if (!certificado) {
      throw new NotFoundException(`No se encontró el certificado con código: ${codigo}`);
    }

    return certificado;
  }

  async buscarPorCurso(cursoId: string) {
    const certificados = await this.prisma.certificado.findMany({
      where: {
        cursoId,
      },

      orderBy: {
        fechaEmision: 'desc',
      },

      include: {
        usuario: {
          select: {
            id: true,
            username: true,
            correo: true,
          },
        },

        curso: {
          select: {
            id: true,
            nombre: true,
            slug: true,
          },
        },

        inscripcion: {
          select: {
            id: true,
            numeroInscripcion: true,
            estado: true,
            porcentajeAvance: true,
          },
        },
      },
    });

    return certificados;
  }

  async buscarPorInscripcion(inscripcionId: string) {
    const certificado = await this.prisma.certificado.findUnique({
      where: {
        inscripcionId,
      },

      include: {
        usuario: {
          select: {
            id: true,
            username: true,
            correo: true,
          },
        },

        inscripcion: {
          select: {
            id: true,
            numeroInscripcion: true,
            estado: true,
            porcentajeAvance: true,
            fechaInscripcion: true,
            fechaFinalizacion: true,

            modulo: {
              select: {
                id: true,
                nombre: true,
                cursoId: true,
              },
            },
          },
        },

        curso: {
          select: {
            id: true,
            nombre: true,
            slug: true,
          },
        },
      },
    });

    if (!certificado) {
      throw new NotFoundException(`No se encontró el certificado para la inscripción: ${inscripcionId}`,);
    }

    return certificado;
  }


  async anularCertificado(id: string, motivoAnulacion: string,) {
    const certificado = await this.prisma.certificado.findUnique({
      where: {
        id,
      },
    });

    if (!certificado) {
      throw new NotFoundException(`No se encontró el certificado con ID: ${id}`,);
    }

    if (certificado.estado === 'anulado') {
      throw new BadRequestException('El certificado ya se encuentra anulado',);
    }

    const certificadoAnulado =
      await this.prisma.certificado.update({
        where: {
          id,
        },

        data: {
          estado: 'anulado',
          anuladoEn: new Date(),
          motivoAnulacion,
        },
      });

    return certificadoAnulado;
  }

  async consultarEstado(id: string) {
    const certificado =
      await this.prisma.certificado.findUnique({
        where: {
          id,
        },

        select: {
          id: true,
          numeroCertificado: true,
          codigoVerificacion: true,
          titulo: true,
          tipo: true,
          estado: true,
          fechaEmision: true,
          anuladoEn: true,
          motivoAnulacion: true,
        },
      });

    if (!certificado) {
      throw new NotFoundException(`No se encontró el certificado con ID: ${id}`);
    }

    return {
      id: certificado.id,
      numeroCertificado: certificado.numeroCertificado,
      codigoVerificacion: certificado.codigoVerificacion,
      titulo: certificado.titulo,
      tipo: certificado.tipo,
      estado: certificado.estado,
      fechaEmision: certificado.fechaEmision,
      anuladoEn: certificado.anuladoEn,
      motivoAnulacion: certificado.motivoAnulacion,
    };
  }

  async imprimirCertificado(id: string) {
    const certificado =
      await this.prisma.certificado.findUnique({
        where: {
          id,
        },
      });

    if (!certificado) {
      throw new NotFoundException(`No se encontró el certificado con ID: ${id}`);
    }

    if (certificado.estado === 'anulado') {
      throw new BadRequestException('No se puede imprimir un certificado anulado');
    }

    if (
      certificado.intentos >= MAX_INTENTOS_IMPRESION
    ) {
      throw new BadRequestException(`Se alcanzó el máximo de ${MAX_INTENTOS_IMPRESION} intentos de impresión`,);
    }

    const certificadoActualizado =
      await this.prisma.certificado.update({
        where: {
          id,
        },

        data: {
          intentos: {
            increment: 1,
          },
        },
      });

    return {
      success: true,
      message: 'Certificado autorizado para impresión',

      data: {
        id: certificadoActualizado.id,
        numeroCertificado:
          certificadoActualizado.numeroCertificado,
        titulo: certificadoActualizado.titulo,
        estado: certificadoActualizado.estado,
        intentos: Number(
          certificadoActualizado.intentos,
        ),
        maximoIntentos: MAX_INTENTOS_IMPRESION,
        intentosRestantes: MAX_INTENTOS_IMPRESION - Number(certificadoActualizado.intentos),
        rutaPdf: certificadoActualizado.rutaPdf,
      },
    };
  }

  async emitirCertificadoModulo(
    inscripcionId: string,
  ) {
    const inscripcion =
      await this.prisma.inscripcion.findUnique({
        where: {
          id: inscripcionId,
        },

        include: {
          estudiante: {
            include: {
              perfil: true,
            },
          },

          modulo: {
            include: {
              curso: true,
            },
          },
        },
      });

    if (!inscripcion) {
      throw new NotFoundException('Inscripción no encontrada');
    }

    const certificadoExistente =
      await this.prisma.certificado.findUnique({
        where: {
          inscripcionId,
        },
      });

    if (certificadoExistente) {
      return certificadoExistente;
    }

    const codigoVerificacion =
      await this.generarCodigoVerificacion();

    const numeroCertificado =
      this.generarNumeroCertificado();

    const certificado =
      await this.prisma.certificado.create({
        data: {
          tipo: 'modulo',

          usuarioId:
            inscripcion.estudianteId,

          inscripcionId:
            inscripcion.id,

          cursoId: null,

          codigoVerificacion,

          numeroCertificado,

          titulo:
            `Certificado de participación - ${inscripcion.modulo.nombre}`,

          fechaEmision: new Date(),

          estado: 'emitido',

          urlVerificacion:
            `http://localhost:5173/verificar/${codigoVerificacion}`,
        },
      });

    return {
      id: certificado.id,

      tipo: certificado.tipo,

      nombre:
        `${inscripcion.estudiante.perfil?.nombre ?? ''} ` +
        `${inscripcion.estudiante.perfil?.apellidoPaterno ?? ''} ` +
        `${inscripcion.estudiante.perfil?.apellidoMaterno ?? ''}`
          .trim(),

      modulo: inscripcion.modulo.nombre,

      curso: inscripcion.modulo.curso.nombre,

      fecha: certificado.fechaEmision,

      codigoVerificacion:
        certificado.codigoVerificacion,

      numeroCertificado:
        certificado.numeroCertificado,

      urlVerificacion:
        certificado.urlVerificacion,

      titulo: certificado.titulo,
    };
  }

  async verificarYEmitirCertificadoCurso(
    estudianteId: string,
    cursoId: string,
  ) {
    const certificadoExistente =
      await this.prisma.certificado.findFirst({
        where: {
          usuarioId: estudianteId,
          cursoId,
          tipo: 'curso',
        },
      });

    if (certificadoExistente) {
      return certificadoExistente;
    }

    const codigoVerificacion = await this.generarCodigoVerificacion();

    const numeroCertificado = this.generarNumeroCertificado();

    return this.prisma.certificado.create({
      data: {
        tipo: 'curso',
        usuarioId: estudianteId,
        inscripcionId: null,
        cursoId,
        codigoVerificacion,
        numeroCertificado,
        titulo: 'Certificado de aprobación del curso',
        fechaEmision: new Date(),
        estado: 'emitido',
        urlVerificacion: `http://localhost:5173/verificar/${codigoVerificacion}`,
      },
    });
  }


  async descargarCertificado(id: string) {
    const certificado = await this.prisma.certificado.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            id: true,
            username: true,
            correo: true,
            perfil: {
              select: { nombre: true, apellidoPaterno: true, apellidoMaterno: true, numeroDocumento: true },
            },
          },
        },
        curso: { select: { id: true, nombre: true, slug: true } },
        inscripcion: {
          select: {
            id: true,
            numeroInscripcion: true,
            fechaInscripcion: true,
            fechaFinalizacion: true,
            estado: true,
            porcentajeAvance: true,
            modulo: { select: { id: true, nombre: true } },
          },
        },
      },
    });

    if (!certificado) {
      throw new NotFoundException(`No se encontró el certificado con ID: ${id}`);
    }

    if (certificado.estado === 'anulado') {
      throw new BadRequestException('No se puede descargar un certificado anulado');
    }

    const nombre = [
      certificado.usuario.perfil?.nombre,
      certificado.usuario.perfil?.apellidoPaterno,
      certificado.usuario.perfil?.apellidoMaterno,
    ]
      .filter(Boolean)
      .join(' ');

    const pdfData: CertificadoPdfData = {
      id: certificado.id,
      tipo: certificado.tipo,
      nombre,
      modulo: certificado.inscripcion?.modulo?.nombre ?? '',
      curso: certificado.curso?.nombre ?? '',
      fecha: certificado.fechaEmision,
      codigoVerificacion: certificado.codigoVerificacion,
      numeroCertificado: certificado.numeroCertificado,
      urlVerificacion: certificado.urlVerificacion ?? '',
      titulo: certificado.titulo,
    };

    const buffer = await this.certificadoPdfService.generarPdf(pdfData);

    return {
      buffer,
      filename: `certificado-${certificado.numeroCertificado}.pdf`,
    };
  }

}
