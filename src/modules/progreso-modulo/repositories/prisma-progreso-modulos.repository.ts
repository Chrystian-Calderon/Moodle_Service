import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProgresoModulosRepository } from 'src/modules/progreso-modulo/repositories/progreso-modulos.repository';

@Injectable()
export class PrismaProgresoModulosRepository
  implements ProgresoModulosRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return this.prisma.progresoModulo.findMany();
  }

  async findById(id: string) {
    return this.prisma.progresoModulo.findUnique({
      where: { id },
    });
  }

  async create(data: {
    inscripcionId: string;
    estado?: string;
    porcentaje?: number;
    leccionesTotales?: number;
    leccionesCompletadas?: number;
    completadoEn?: Date;
  }) {
    return this.prisma.progresoModulo.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return this.prisma.progresoModulo.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.prisma.progresoModulo.delete({
      where: { id },
    });
  }
}
