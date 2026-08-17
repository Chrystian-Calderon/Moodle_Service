import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';

@Injectable()
export class ModuloService {
  constructor(private readonly prisma: PrismaService) {}

  create(createModuloDto: CreateModuloDto) {
    return this.prisma.modulo.create({
      data: createModuloDto,
    });
  }

  findAll() {
    return this.prisma.modulo.findMany({
      orderBy: {
        orden: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const modulo = await this.prisma.modulo.findUnique({
      where: { id },
    });

    if (!modulo) {
      throw new NotFoundException('Módulo no encontrado');
    }

    return modulo;
  }

  async findLecciones(id: string) {
    await this.findOne(id);

    return this.prisma.leccion.findMany({
      where: {
        moduloId: id,
      },
      orderBy: {
        orden: 'asc',
      },
    });
  }

  async update(id: string, updateModuloDto: UpdateModuloDto) {
    await this.findOne(id);

    return this.prisma.modulo.update({
      where: { id },
      data: updateModuloDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.modulo.delete({
      where: { id },
    });
  }
}