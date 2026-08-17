import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUsuarioDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { };

  async create(createUserDto: CreateUserDto) {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      numeroDocumento,
      rolId,
    } = createUserDto;

    const baseUsername = `${nombre}.${apellidoPaterno}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9.]/g, '');

    let username = baseUsername;
    let contador = 1;

    while (
      await this.prisma.usuario.findUnique({
        where: { username },
      })
    ) {
      username = `${baseUsername}${contador}`;
      contador++;
    }
    const contrasenaHash = await bcrypt.hash(
      numeroDocumento,
      10,
    );
    const usuario = await this.prisma.$transaction(
      async (tx) => {
        const nuevoUsuario = await tx.usuario.create({
          data: {
            username,
            correo,
            contrasenaHash,
            estado: 'pendiente',

            perfil: {
              create: {
                nombre,
                apellidoPaterno,
                apellidoMaterno,
                numeroDocumento,
              },
            },
          },
        });

        await tx.usuarioRol.create({
          data: {
            usuarioId: nuevoUsuario.id,
            rolId,
          },
        });

        return nuevoUsuario;
      },
    );

    return {
      id: usuario.id,
      username: usuario.username,
      correo: usuario.correo,
      estado: usuario.estado,
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return await this.prisma.usuario.findUnique({
      where: {
        id: id.toString(),
      },
    });
  }

  async actualizarUsuario(id: string, data: UpdateUsuarioDto) {
    return await this.prisma.$transaction(async (tx) => {
      await tx.usuario.update({
        where: {
          id,
        },
        data: {
          ...(data.correo !== undefined && {
            correo: data.correo,
          }),
          ...(data.username !== undefined && {
            username: data.username,
          }),
          ...(data.estado !== undefined && {
            estado: data.estado,
          }),
        },
      });

      const fechaNacimiento = data.fechaNacimiento
        ? new Date(data.fechaNacimiento)
        : null;

      const fechaNacimientoValida =
        fechaNacimiento &&
          !Number.isNaN(fechaNacimiento.getTime())
          ? fechaNacimiento
          : null;

      await tx.perfil.upsert({
        where: {
          usuarioId: id,
        },
        update: {
          ...(data.nombre !== undefined && {
            nombre: data.nombre,
          }),
          ...(data.apellidoPaterno !== undefined && {
            apellidoPaterno: data.apellidoPaterno,
          }),
          ...(data.apellidoMaterno !== undefined && {
            apellidoMaterno: data.apellidoMaterno,
          }),
          ...(data.tipoDocumentoIdentidad !== undefined && {
            tipoDocumentoIdentidad:
              data.tipoDocumentoIdentidad,
          }),
          ...(data.numeroDocumento !== undefined && {
            numeroDocumento: data.numeroDocumento,
          }),
          ...(data.telefono !== undefined && {
            telefono: data.telefono,
          }),
          ...(data.fechaNacimiento !== undefined && {
            fechaNacimiento: fechaNacimientoValida,
          }),
          ...(data.genero !== undefined && {
            genero: data.genero,
          }),
          ...(data.ciudad !== undefined && {
            ciudad: data.ciudad,
          }),
          ...(data.pais !== undefined && {
            pais: data.pais,
          }),
          ...(data.ocupacion !== undefined && {
            ocupacion: data.ocupacion,
          }),
          ...(data.contactoEmergenciaNombre !== undefined && {
            contactoEmergenciaNombre:
              data.contactoEmergenciaNombre,
          }),
          ...(data.contactoEmergenciaTelefono !== undefined && {
            contactoEmergenciaTelefono:
              data.contactoEmergenciaTelefono,
          }),
        },
        create: {
          usuarioId: id,
          nombre: data.nombre ?? "",
          apellidoPaterno: data.apellidoPaterno,
          apellidoMaterno: data.apellidoMaterno,
          tipoDocumentoIdentidad:
            data.tipoDocumentoIdentidad,
          numeroDocumento: data.numeroDocumento,
          telefono: data.telefono,
          fechaNacimiento: fechaNacimientoValida,
          genero: data.genero,
          ciudad: data.ciudad,
          pais: data.pais,
          ocupacion: data.ocupacion,
          contactoEmergenciaNombre:
            data.contactoEmergenciaNombre,
          contactoEmergenciaTelefono:
            data.contactoEmergenciaTelefono,
        },
      });

      if (data.rolId) {
        await tx.usuarioRol.deleteMany({
          where: {
            usuarioId: id,
          },
        });

        await tx.usuarioRol.create({
          data: {
            usuarioId: id,
            rolId: data.rolId,
          },
        });
      }

      return tx.usuario.findUnique({
        where: {
          id,
        },
        include: {
          perfil: true,
          roles: {
            include: {
              rol: true,
            },
          },
        },
      });
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async buscarPorCorreo(correo: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        correo,
      },
      include: {
        roles: {
          include: {
            rol: {
              include: {
                permisos: {
                  include: {
                    permiso: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return usuario;
  }

  async buscarPorId(id: string) {
    return await this.prisma.usuario.findUnique({
      where: {
        id,
      },
      include: {
        perfil: true,
        roles: {
          include: {
            rol: {
              include: {
                permisos: {
                  include: {
                    permiso: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async buscarDetallePorId(id: string) {
    return await this.prisma.usuario.findUnique({
      where: {
        id,
      },
      include: {
        perfil: true,
        roles: {
          include: {
            rol: true,
          },
        },
      },
    });
  }

  async actualizarPassword(id: string, newPassword: string) {
    await this.prisma.usuario.update({
      where: {
        id,
      },
      data: {
        contrasenaHash: newPassword,
        estado: "activo",
      }
    }
    );
  }

  async ObtenerTodosPaginado(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [usuarios, total] = await Promise.all([
      this.prisma.usuario.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          username: true,
          correo: true,
          estado: true,
          correoVerificadoEn: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      }),
      this.prisma.usuario.count(),
    ])

    return {
      data: usuarios,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      }
    }
  }

  async buscarUsuarios(q: string) {
    const palabras = q
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (palabras.length === 0) {
      return [];
    }

    const usuarios = await this.prisma.usuario.findMany({
      where: {
        roles: {
          some: {
            rolId: 'rol-est-id',
          },
        },

        AND: palabras.map((palabra) => ({
          OR: [
            {
              username: {
                contains: palabra,
                mode: 'insensitive',
              },
            },
            {
              correo: {
                contains: palabra,
                mode: 'insensitive',
              },
            },
            {
              perfil: {
                nombre: {
                  contains: palabra,
                  mode: 'insensitive',
                },
              },
            },
            {
              perfil: {
                apellidoPaterno: {
                  contains: palabra,
                  mode: 'insensitive',
                },
              },
            },
            {
              perfil: {
                apellidoMaterno: {
                  contains: palabra,
                  mode: 'insensitive',
                },
              },
            },
          ],
        })),
      },

      select: {
        id: true,
      },

      take: 20,
    });

    return usuarios;
  }

  async DesactivarUsuario(id: string) {
    await this.prisma.usuario.update({
      where: {
        id,
      },
      data: {
        estado: "inactivo",
      }
    }
    )
  }

  async ObtenerEstudiantes() {
    const estudiantes = await this.prisma.usuario.findMany({
      where: {
        roles: {
          some: {
            rol: {
              nombre: 'ESTUDIANTE',
            },
          },
        },
      },
    });

    return estudiantes;
  }
}
