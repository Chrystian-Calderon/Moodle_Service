import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProgresoLeccionesRepository } from 'src/modules/progreso-leccion/repositories/progreso-lecciones.repository';

@Injectable()
export class PrismaProgresoLeccionesRepository
  implements ProgresoLeccionesRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return this.prisma.progresoLeccion.findMany();
  }

  async findById(id: string) {
    return this.prisma.progresoLeccion.findUnique({
      where: { id },
    });
  }

  async create(data: {
    inscripcionId: string;
    leccionId: string;
    estado?: string;
    porcentaje?: number;
    segundosVisualizados?: number;
    iniciadoEn?: Date;
    desbloqueadoEn?: Date;
    ultimoAccesoEn?: Date;
    completadoEn?: Date;
  }) {
    return this.prisma.progresoLeccion.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return this.prisma.progresoLeccion.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.prisma.progresoLeccion.delete({
      where: { id },
    });
  }
}
