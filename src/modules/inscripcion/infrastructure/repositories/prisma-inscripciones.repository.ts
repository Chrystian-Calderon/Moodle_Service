import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InscripcionesRepository } from 'src/modules/inscripcion/domain/repositories/inscripciones.repository';

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
}