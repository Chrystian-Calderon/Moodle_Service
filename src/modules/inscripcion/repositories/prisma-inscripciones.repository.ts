import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InscripcionesRepository } from 'src/modules/inscripcion/repositories/inscripciones.repository';

type ModuloAgrupado = {
  id: string;
  nombre: string;
  orden: number;
};

type CursoAgrupado = {
  id: string;
  nombre: string;
  categoria: string | null;
  modulos: ModuloAgrupado[];
};

type EstudianteAgrupado = {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  estadoAcceso: string;
  numeroInscripcion: string;
  correo: string;
  cursos: Map<string, CursoAgrupado>;
};

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
  async findAllPaginated(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [inscripciones, total] = await Promise.all([
      this.prisma.inscripcion.findMany({
        skip,
        take: limit,
        orderBy: [
          {
            estudianteId: 'asc',
          },
          {
            modulo: {
              orden: 'asc',
            }
          }
        ],
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
                  categoria: true,
                }
              }
            }
          },
          estudiante: {
            select: {
              id: true,
              correo: true,
              perfil: {
                select: {
                  nombre: true,
                  apellidoPaterno: true,
                  apellidoMaterno: true,
                }
              }
            }
          }
        }
      }),
      this.prisma.inscripcion.count(),
    ]);

    const inscripcionesGroupedByEstudiante = new Map<string, EstudianteAgrupado>();

    for (const inscripcion of inscripciones) {
      const estudianteId = inscripcion.estudiante.id;

      if (!inscripcionesGroupedByEstudiante.has(estudianteId)) {
        inscripcionesGroupedByEstudiante.set(estudianteId, {
          id: estudianteId,
          nombre: inscripcion.estudiante.perfil?.nombre ?? '',
          apellidoPaterno: inscripcion.estudiante.perfil?.apellidoPaterno ?? '',
          apellidoMaterno: inscripcion.estudiante.perfil?.apellidoMaterno ?? '',
          correo: inscripcion.estudiante.correo,
          estadoAcceso: inscripcion.estadoAcceso,
          numeroInscripcion: inscripcion.numeroInscripcion,
          cursos: new Map<string, CursoAgrupado>(),
        });
      }

      const estudiante = inscripcionesGroupedByEstudiante.get(estudianteId);

      if (!estudiante) continue;

      const cursoId = inscripcion.modulo.curso.id;
      let curso = estudiante.cursos.get(cursoId);

      if (!curso) {
        curso = {
          id: cursoId,
          nombre: inscripcion.modulo.curso.nombre,
          categoria: inscripcion.modulo.curso.categoria,
          modulos: [],
        };
        estudiante.cursos.set(cursoId, curso);
      }

      curso.modulos.push({
        id: inscripcion.modulo.id,
        nombre: inscripcion.modulo.nombre,
        orden: inscripcion.modulo.orden,
      });
    }

    const resultado = Array.from(inscripcionesGroupedByEstudiante.values()).map(estudiante => ({
      ...estudiante,

      cursos: Array.from(estudiante.cursos.values()).map(curso => ({
        ...curso,

        modulos: curso.modulos.sort(
          (a, b) => a.orden - b.orden
        ),
      })),
    }));

    return {
      data: resultado,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      }
    };
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
    });
  }
}