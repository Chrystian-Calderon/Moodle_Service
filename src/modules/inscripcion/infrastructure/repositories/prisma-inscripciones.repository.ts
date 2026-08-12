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

  async create(inscripcion: any) {
    return this.prisma.inscripcion.create({
      data: inscripcion,
    });
  }

  async update(id: string, inscripcion: any) {
    return this.prisma.inscripcion.update({
      where: { id },
      data: inscripcion,
    });
  }

  async delete(id: string) {
    throw new Error('Method not implemented.');
  }
}