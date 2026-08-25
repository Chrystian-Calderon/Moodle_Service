import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';
import { ListarCertificadosDto } from './dto/listar-certificados.dto';

const MAX_INTENTOS_IMPRESION = 3;

@Injectable()
export class CertificadoService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // ============================================================
  // 1. LISTAR CERTIFICADOS CON PAGINACIÓN Y BÚSQUEDA
  // ============================================================

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

          plantilla: {
            select: {
              id: true,
              nombre: true,
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

  // ============================================================
  // 2. BUSCAR CERTIFICADO POR ID
  // ============================================================

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

        plantilla: {
          select: {
            id: true,
            nombre: true,
            tipoCertificado: true,
            orientacion: true,
          },
        },
      },
    });

    if (!certificado) {
      throw new NotFoundException(
        `No se encontró el certificado con ID: ${id}`,
      );
    }

    return certificado;
  }

  // ============================================================
  // 3. BUSCAR CERTIFICADOS DE UN USUARIO
  // ============================================================

  async buscarPorUsuario(usuarioId: string) {
    const certificados = await this.prisma.certificado.findMany({
      where: {
        usuarioId: usuarioId,
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

        plantilla: {
          select: {
            id: true,
            nombre: true,
            tipoCertificado: true,
            orientacion: true,
          },
        },
      },
    });

    return certificados;
  }

  // ===================================================================
// 4. BUSCAR CERTIFICADO POR CÓDIGO DE VERIFICACIÓN
// ===================================================================

async buscarPorCodigo(codigo: string) {
  const certificado = await this.prisma.certificado.findUnique({
    where: {
      codigoVerificacion: codigo,
    },
    include: {
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

  if (!certificado) {
    throw new NotFoundException(
      `No se encontró el certificado con código: ${codigo}`,
    );
  }

  return certificado;
}

// ===================================================================
// 5. OBTENER CERTIFICADOS DE UN CURSO
// ===================================================================

async buscarPorCurso(cursoId: string) {
  const certificados = await this.prisma.certificado.findMany({
    where: {
      cursoId: cursoId,
    },
    orderBy: {
      fechaEmision: 'desc',
    },
    include: {
      usuario: {
        select: {
          id: true,
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

// ===================================================================
// 6. OBTENER CERTIFICADO DE UNA INSCRIPCIÓN
// ===================================================================

async buscarPorInscripcion(inscripcionId: string) {
  const certificado = await this.prisma.certificado.findUnique({
    where: {
      inscripcionId: inscripcionId,
    },
    include: {
      usuario: {
        select: {
          id: true,
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
        },
      },
      curso: {
        select: {
          id: true,
          nombre: true,
          slug: true,
        },
      },
      plantilla: true,
    },
  });

  if (!certificado) {
    throw new NotFoundException(
      `No se encontró el certificado para la inscripción: ${inscripcionId}`,
    );
  }

  return certificado;
}

// ===================================================================
// 7. ANULAR CERTIFICADO
// ===================================================================

async anularCertificado(
  id: string,
  motivoAnulacion: string,
) {
  const certificado = await this.prisma.certificado.findUnique({
    where: {
      id: id,
    },
  });

  if (!certificado) {
    throw new NotFoundException(
      `No se encontró el certificado con ID: ${id}`,
    );
  }

  // Verificar si ya está anulado
  if (certificado.estado === 'anulado') {
    throw new BadRequestException(
      'El certificado ya se encuentra anulado',
    );
  }

  const certificadoAnulado = await this.prisma.certificado.update({
    where: {
      id: id,
    },
    data: {
      estado: 'anulado',
      anuladoEn: new Date(),
      motivoAnulacion: motivoAnulacion,
    },
  });

  return certificadoAnulado;
}

// ===================================================================
// 8. CONSULTAR ESTADO DEL CERTIFICADO
// ===================================================================

async consultarEstado(id: string) {
  const certificado = await this.prisma.certificado.findUnique({
    where: {
      id: id,
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
    throw new NotFoundException(
      `No se encontró el certificado con ID: ${id}`,
    );
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

  const certificado = await this.prisma.certificado.findUnique({
    where: {
      id,
    },
  });

  if (!certificado) {
    throw new NotFoundException(
      `No se encontró el certificado con ID: ${id}`,
    );
  }

  // Verificar si el certificado está anulado
  if (certificado.estado === 'anulado') {
    throw new BadRequestException(
      'No se puede imprimir un certificado anulado',
    );
  }

  // Verificar límite máximo
  if (certificado.intentos >= MAX_INTENTOS_IMPRESION) {
    throw new BadRequestException(
      `Se alcanzó el máximo de ${MAX_INTENTOS_IMPRESION} intentos de impresión`,
    );
  }

  // Incrementar el contador en 1
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
      intentos: certificadoActualizado.intentos,
      maximoIntentos: MAX_INTENTOS_IMPRESION,
      intentosRestantes:
        MAX_INTENTOS_IMPRESION -
        certificadoActualizado.intentos,
      rutaPdf: certificadoActualizado.rutaPdf,
    },
  };
}

  // ============================================================
  // MÉTODOS PENDIENTES
  // ============================================================

  create(createCertificadoDto: CreateCertificadoDto) {
    return 'Pendiente';
  }

  update(
    id: string,
    updateCertificadoDto: UpdateCertificadoDto,
  ) {
    return 'Pendiente';
  }

  remove(id: string) {
    return 'Pendiente';
  }
}


