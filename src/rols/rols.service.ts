import { Injectable } from '@nestjs/common';
import { AssignPermissionDto } from './dto/create-rol.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class RolsService {

  constructor(private readonly prisma: PrismaService) { }
  create(createRolDto: any) {
    return 'This action adds a new rol';
  }

  findAll() {
    return `This action returns all rols`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rol`;
  }

  update(id: number, updateRolDto: any) {
    return `This action updates a #${id} rol`;
  }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }

  async asignarPermisoRol(assignPermissionDto: AssignPermissionDto) {
    const { rolId, permisoId } = assignPermissionDto;
    return this.prisma.rolPermiso.upsert({
      where: {
        rolId_permisoId: {
          rolId,
          permisoId
        },
      },
      update: {},
      create: {
        rolId,
        permisoId,
      }
    })
  }
}
