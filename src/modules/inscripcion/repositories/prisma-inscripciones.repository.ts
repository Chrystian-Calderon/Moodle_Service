import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InscripcionesRepository } from 'src/modules/inscripcion/repositories/inscripciones.repository';

@Injectable()
export class PrismaInscripcionesRepository
  implements InscripcionesRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return this.prisma.inscripcion.findMany();
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