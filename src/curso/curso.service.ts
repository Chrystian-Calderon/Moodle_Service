import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCursoDto: CreateCursoDto) {
    return this.prisma.curso.create({
      data: createCursoDto,
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const pagina = Math.max(page, 1);
    const limite = Math.min(Math.max(limit, 1), 50);

    const skip = (pagina - 1) * limite;

    const [cursos, total] = await this.prisma.$transaction([
      this.prisma.curso.findMany({
        skip,
        take: limite,
        orderBy: {
          creadoEn: 'desc',
        },
      }),

      this.prisma.curso.count(),
    ]);

    const totalPaginas = Math.ceil(total / limite);

    return {
      data: cursos,
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas,
        tienePaginaAnterior: pagina > 1,
        tienePaginaSiguiente: pagina < totalPaginas,
      },
    };
  }

  async findOne(id: string) {
    const curso = await this.prisma.curso.findUnique({
      where: { id },
    });

    if (!curso) {
      throw new NotFoundException('Curso no encontrado');
    }

    return curso;
  }

  async findModulos(id: string) {
  await this.findOne(id);

  return this.prisma.modulo.findMany({
    where: {
      cursoId: id,
    },
    orderBy: {
      orden: 'asc',
    },
  });
}
  async update(id: string, updateCursoDto: UpdateCursoDto) {
    await this.findOne(id);

    return this.prisma.curso.update({
      where: { id },
      data: updateCursoDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.curso.delete({
      where: { id },
    });
  }
}