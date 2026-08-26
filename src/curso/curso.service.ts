import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CursoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  async create(
    createCursoDto: CreateCursoDto,
    portada?: Express.Multer.File,
    secundaria?: Express.Multer.File,
  ) {
    let rutaPortada: string | undefined;
    let rutaImagenSecundaria: string | undefined;

    if (portada) {
      const imagen = await this.cloudinaryService.uploadImage(
        portada,
        'lms/cursos',
      );

      rutaPortada = imagen.url;
    }

    if (secundaria) {
      const imagen = await this.cloudinaryService.uploadImage(
        secundaria,
        'lms/cursos',
      );

      rutaImagenSecundaria = imagen.url;
    }

    return this.prisma.curso.create({
      data: {
        ...createCursoDto,
        rutaPortada,
        rutaImagenSecundaria,
      },
    });
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    categoriaId?: string,
  ) {
    const pagina = Math.max(page, 1);
    const limite = Math.min(Math.max(limit, 1), 50);

    const skip = (pagina - 1) * limite;

    const categoria = categoriaId
      ? await this.prisma.categoria.findUnique({
        where: {
          id: categoriaId,
        },
        select: {
          id: true,
          categoriaPadreId: true,
        },
      })
      : null;

    let filtroCategoria = {};

    if (categoria) {
      if (categoria.categoriaPadreId === null) {
        filtroCategoria = {
          categoria: {
            categoriaPadreId: categoria.id,
          },
        };
      } else {
        filtroCategoria = {
          categoriaId: categoria.id,
        };
      }
    }

    const where = {
      estado: 'publicado',

      ...(search?.trim()
        ? {
          OR: [
            {
              nombre: {
                contains: search.trim(),
                mode: 'insensitive' as const,
              },
            },
            {
              descripcionCorta: {
                contains: search.trim(),
                mode: 'insensitive' as const,
              },
            },
            {
              descripcionCompleta: {
                contains: search.trim(),
                mode: 'insensitive' as const,
              },
            },
          ],
        }
        : {}),

      ...filtroCategoria,
    };

    const [cursos, total] = await Promise.all([
      this.prisma.curso.findMany({
        where,
        skip,
        take: limite,
        orderBy: {
          creadoEn: 'desc',
        },
      }),

      this.prisma.curso.count({
        where,
      }),
    ]);

    const totalPaginas = Math.ceil(total / limite);

    return {
      data: cursos,
      meta: {
        page: pagina,
        limit: limite,
        total,
        totalPages: totalPaginas,
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

  async update(
    id: string,
    updateCursoDto: UpdateCursoDto,
    portada?: Express.Multer.File,
    secundaria?: Express.Multer.File,
  ) {
    await this.findOne(id);

    let rutaPortada: string | undefined;
    let rutaImagenSecundaria: string | undefined;

    if (portada) {
      const imagen = await this.cloudinaryService.uploadImage(
        portada,
        'lms/cursos',
      );

      rutaPortada = imagen.url;
    }

    if (secundaria) {
      const imagen = await this.cloudinaryService.uploadImage(
        secundaria,
        'lms/cursos',
      );

      rutaImagenSecundaria = imagen.url;
    }

    return this.prisma.curso.update({
      where: { id },
      data: {
        ...updateCursoDto,

        ...(rutaPortada && {
          rutaPortada,
        }),

        ...(rutaImagenSecundaria && {
          rutaImagenSecundaria,
        }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.curso.update({
      where: { id },
      data: {
        estado: "inactivo",
      },
    });
  }

  async findCategorias() {
    return await this.prisma.categoria.findMany({
      where: {
        categoriaPadreId: null,
      },
      select: {
        id: true,
        nombre: true,
        slug: true,
      },
      orderBy: {
        nombre: "asc",
      },
    });
  }

  async findSubCategorias(categoriaId: string) {
    return await this.prisma.categoria.findMany({
      where: {
        categoriaPadreId: categoriaId,
      },
      select: {
        id: true,
        nombre: true,
        slug: true,
      },
      orderBy: {
        nombre: "asc",
      },
    });
  }

  // obtener todos los cursos sin paginación ni filtros con modulos (id, nombre)
  async obtenerCursos() {
    const cursos = await this.prisma.curso.findMany({
      select: {
        id: true,
        nombre: true,
        modulos: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });

    return cursos;
  }

  // subir imagen de un curso
  async subirImagenCurso(file: Express.Multer.File, cursoId: string) {
    const curso = await this.findOne(cursoId);

    if (!curso) {
      throw new NotFoundException('Curso no encontrado');
    }

    // subir imagen a cloudinary
    const imagen = await this.cloudinaryService.uploadImage(file, 'lms/cursos');

    // actualizar curso con url de la imagen y publicId
    return this.prisma.curso.update({
      where: { id: cursoId },
      data: {
        rutaPortada: imagen.url,
      },
    });
  }
}