import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeccionDto } from './dto/create-leccion.dto';
import { UpdateLeccionDto } from './dto/update-leccion.dto';

@Injectable()
export class LeccionService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLeccionDto: CreateLeccionDto) {
    return this.prisma.leccion.create({
      data: createLeccionDto,
    });
  }

  findAll() {
    return this.prisma.leccion.findMany({
      orderBy: {
        orden: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const leccion = await this.prisma.leccion.findUnique({
      where: { id },
    });

    if (!leccion) {
      throw new NotFoundException('Lección no encontrada');
    }

    return leccion;
  }

  async findRecursos(id: string) {
    await this.findOne(id);

    return this.prisma.recursosLeccion.findMany({
      where: {
        leccionId: id,
      },
      orderBy: {
        orden: 'asc',
      },
    });
  }

  async update(id: string, updateLeccionDto: UpdateLeccionDto) {
    await this.findOne(id);

    return this.prisma.leccion.update({
      where: { id },
      data: updateLeccionDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.leccion.delete({
      where: { id },
    });
  }
}