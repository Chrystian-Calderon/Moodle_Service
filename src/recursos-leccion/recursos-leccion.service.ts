import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateRecursoLeccionDto } from "./dto/create-recursos-leccion.dto";
import { UpdateRecursoLeccionDto } from "./dto/update-recursos-leccion.dto";

@Injectable()
export class RecursoLeccionService {
  constructor(private readonly prisma: PrismaService) { }

  async create(leccionId: string, dto: CreateRecursoLeccionDto) {
    const leccion = await this.prisma.leccion.findUnique({ where: { id: leccionId } });
    if (!leccion) {
      throw new NotFoundException("Lección no encontrada");
    }

    return this.prisma.recursosLeccion.create({ data: { ...dto, leccionId } });
  }

  async findByLeccion(leccionId: string) {
    return this.prisma.recursosLeccion.findMany({
      where: { leccionId },
      orderBy: { orden: "asc" },
    });
  }

  async findOne(id: string) {
    const recurso = await this.prisma.recursosLeccion.findUnique({ where: { id } });
    if (!recurso) {
      throw new NotFoundException("Recurso no encontrado");
    }
    return recurso;
  }

  async update(id: string, dto: UpdateRecursoLeccionDto) {
    await this.findOne(id);
    return this.prisma.recursosLeccion.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.recursosLeccion.delete({ where: { id } });
  }
}