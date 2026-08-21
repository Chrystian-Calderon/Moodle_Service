import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';
import { ListarCertificadosDto } from './dto/listar-certificados.dto';

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