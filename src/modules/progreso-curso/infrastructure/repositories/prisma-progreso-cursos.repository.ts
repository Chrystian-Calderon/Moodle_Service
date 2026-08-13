import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProgresoCursosRepository } from 'src/modules/progreso-curso/domain/repositories/progreso-cursos.repository';

@Injectable()
export class PrismaProgresoCursosRepository implements ProgresoCursosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.progresoCurso.findMany();
  }

  async findById(id: string) {
    return this.prisma.progresoCurso.findUnique({
      where: { id },
    });
  }

  async create(data: {
    cursoId: string;
    estudianteId: string;
    modulosTotales?: number;
    modulosCompletados?: number;
    porcentaje?: number;
    minutosEstudiados?: number;
    ultimoAccesoEn?: Date;
    completadoEn?: Date;
  }) {
    return this.prisma.progresoCurso.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return this.prisma.progresoCurso.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.prisma.progresoCurso.delete({
      where: { id },
    });
  }
}
