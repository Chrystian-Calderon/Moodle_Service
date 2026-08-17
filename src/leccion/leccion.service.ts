import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateLeccionDto } from "./dto/create-leccion.dto";
import { UpdateLeccionDto } from "./dto/update-leccion.dto";
import { QueryLeccionDto } from "./dto/query-leccion.dto";

@Injectable()
export class LeccionService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateLeccionDto) {
    const modulo = await this.prisma.modulo.findUnique({ where: { id: dto.moduloId } });
    if (!modulo) {
      throw new NotFoundException("El módulo indicado no existe");
    }

    return this.prisma.leccion.create({ data: dto });
  }

  async findByModulo(moduloId: string, query: QueryLeccionDto) {
    const modulo = await this.prisma.modulo.findUnique({ where: { id: moduloId } });
    if (!modulo) {
      throw new NotFoundException("Módulo no encontrado");
    }

    const { nombre, tipoLeccion, estaPublicada } = query;

    const where: Prisma.LeccionWhereInput = {
      moduloId,
      ...(nombre && { nombre: { contains: nombre, mode: "insensitive" } }),
      ...(tipoLeccion && { tipoLeccion }),
      estaPublicada: estaPublicada !== undefined ? estaPublicada : true,
    };

    return this.prisma.leccion.findMany({
      where,
      orderBy: { orden: "asc" },
      include: { recursos: { orderBy: { orden: "asc" } } },
    });
  }

  async findByModuloConProgreso(moduloId: string, estudianteId: string) {
    const modulo = await this.prisma.modulo.findUnique({ where: { id: moduloId } });
    if (!modulo) {
      throw new NotFoundException("Módulo no encontrado");
    }

    const lecciones = await this.prisma.leccion.findMany({
      where: { moduloId, estaPublicada: true },
      orderBy: { orden: "asc" },
      include: { recursos: { orderBy: { orden: "asc" } } },
    });

    const inscripcion = await this.prisma.inscripcion.findFirst({
      where: { moduloId, estudianteId },
    });

    if (!inscripcion) {
      return lecciones.map((leccion) => ({
        ...leccion,
        completada: false,
        bloqueada: !leccion.esVistaPrevia,
        motivoBloqueo: leccion.esVistaPrevia ? null : "no_inscrito",
      }));
    }

    const progresos = await this.prisma.progresoLeccion.findMany({
      where: { inscripcionId: inscripcion.id },
    });

    const progresoPorLeccion = new Map(progresos.map((p) => [p.leccionId, p]));

    return lecciones.map((leccion, index) => {
      const progreso = progresoPorLeccion.get(leccion.id);
      const completada = !!progreso?.completadoEn;

      if (leccion.esVistaPrevia) {
        return { ...leccion, completada, bloqueada: false, motivoBloqueo: null };
      }

      if (index === 0) {
        return { ...leccion, completada, bloqueada: false, motivoBloqueo: null };
      }

      if (!leccion.requiereLeccionAnteriorCompletada) {
        return { ...leccion, completada, bloqueada: false, motivoBloqueo: null };
      }

      const anterior = lecciones[index - 1];
      const progresoAnterior = progresoPorLeccion.get(anterior.id);
      const anteriorCompletada = !!progresoAnterior?.completadoEn;

      return {
        ...leccion,
        completada,
        bloqueada: !anteriorCompletada,
        motivoBloqueo: anteriorCompletada ? null : "leccion_anterior_pendiente",
      };
    });
  }

  async findOne(id: string) {
    const leccion = await this.prisma.leccion.findUnique({
      where: { id },
      include: { recursos: { orderBy: { orden: "asc" } }, modulo: { select: { id: true, nombre: true, cursoId: true } } },
    });

    if (!leccion) {
      throw new NotFoundException("Lección no encontrada");
    }

    return leccion;
  }

  async update(id: string, dto: UpdateLeccionDto) {
    await this.findOne(id);
    return this.prisma.leccion.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.leccion.update({ where: { id }, data: { estaPublicada: false } });
  }

  async restore(id: string) {
    await this.findOne(id);
    return this.prisma.leccion.update({ where: { id }, data: { estaPublicada: true } });
  }

  async marcarCompletada(leccionId: string, estudianteId: string) {
    const leccion = await this.findOne(leccionId);

    const inscripcion = await this.prisma.inscripcion.findFirst({
      where: { moduloId: leccion.moduloId, estudianteId },
    });

    if (!inscripcion) {
      throw new NotFoundException("No tienes una inscripción activa en este módulo");
    }

    const lecciones = await this.prisma.leccion.findMany({
      where: { moduloId: leccion.moduloId, estaPublicada: true },
      orderBy: { orden: "asc" },
    });

    const index = lecciones.findIndex((l) => l.id === leccionId);

    if (index > 0 && leccion.requiereLeccionAnteriorCompletada) {
      const anterior = lecciones[index - 1];
      const progresoAnterior = await this.prisma.progresoLeccion.findUnique({
        where: { inscripcionId_leccionId: { inscripcionId: inscripcion.id, leccionId: anterior.id } },
      });

      if (!progresoAnterior?.completadoEn) {
        throw new NotFoundException("Debes completar la lección anterior primero");
      }
    }

    return this.prisma.progresoLeccion.upsert({
      where: { inscripcionId_leccionId: { inscripcionId: inscripcion.id, leccionId } },
      update: { estado: "completada", porcentaje: 100, completadoEn: new Date(), desbloqueadoEn: new Date() },
      create: {
        inscripcionId: inscripcion.id,
        leccionId,
        estado: "completada",
        porcentaje: 100,
        desbloqueadoEn: new Date(),
        completadoEn: new Date(),
      },
    });
  }
}