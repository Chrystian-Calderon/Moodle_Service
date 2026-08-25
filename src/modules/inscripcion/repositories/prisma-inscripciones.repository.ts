import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InscripcionesRepository } from 'src/modules/inscripcion/repositories/inscripciones.repository';

@Injectable()
export class PrismaInscripcionesRepository
  implements InscripcionesRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return this.prisma.inscripcion.findMany({
      include: {
        modulo: {
          select: {
            nombre: true,
          }
        },
        estudiante: {
          select: {
            perfil: {
              select: {
                nombre: true,
              }
            }
          }
        }
      }
    });
  }

  async findById(id: string) {
    return this.prisma.inscripcion.findUnique({
      where: { id },
    });
  }

  async create(data: {
    moduloId: string;
    estudianteId: string;
    numeroInscripcion: string;
  }) {
    return this.prisma.inscripcion.create({
      data,
    });
  }

  async update(id: string, inscripcion: any) {
    return this.prisma.inscripcion.update({
      where: { id },
      data: inscripcion,
    });
  }

  async delete(id: string) {
    await this.prisma.inscripcion.delete({
      where: { id },
    });
  }

  // obtener inscripciones paginado
  async findEstudianteWithInscripciones(skip: number, take: number) {
    return this.prisma.usuario.findMany({
      where: {
        inscripciones: {
          some: {}
        },
      },
      skip,
      take,
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        correo: true,
        perfil: {
          select: {
            nombre: true,
            apellidoPaterno: true,
            apellidoMaterno: true,
          }
        },
        inscripciones: {
          orderBy: {
            modulo: {
              orden: "asc",
            }
          },
          select: {
            id: true,
            numeroInscripcion: true,
            estadoAcceso: true,
            modulo: {
              select: {
                id: true,
                nombre: true,
                orden: true,
                curso: {
                  select: {
                    id: true,
                    nombre: true,
                    categoria: {
                      select: {
                        nombre: true,
                      }
                    },
                  }
                }
              }
            }
          }
        }
      }
    });
  }
  async countEstudiantesWithInscripciones() {
    return this.prisma.usuario.count({
      where: {
        inscripciones: {
          some: {}
        },
      },
    });
  }

  // metodo crear inscripcion con varios estudianteId
  async createMultiple(data: {
    moduloId: string;
    estudianteIds: string[];
    numeroInscripciones: string[];
  }) {
    const { moduloId, estudianteIds, numeroInscripciones } = data;

    const inscripcionesData = estudianteIds.map((estudianteId, index) => ({
      moduloId,
      estudianteId,
      numeroInscripcion: numeroInscripciones[index],
    }));

    return this.prisma.inscripcion.createMany({
      data: inscripcionesData,
    });
  }

  // metodo obtener inscripciones de un estudiante por estudianteId
  async findByEstudianteId(estudianteId: string) {
    return this.prisma.inscripcion.findMany({
      where: { estudianteId },
      include: {
        modulo: {
          select: {
            id: true,
            nombre: true,
            orden: true,

            curso: {
              select: {
                id: true,
                nombre: true,
                categoria: {
                  select: {
                    nombre: true,
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        modulo: {
          orden: 'asc',
        }
      }
    });
  }
}