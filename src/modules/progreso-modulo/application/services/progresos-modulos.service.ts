import { Injectable, NotFoundException } from '@nestjs/common';
import { ProgresoModulosRepository } from 'src/modules/progreso-modulo/domain/repositories/progreso-modulos.repository';
import { CreateProgresoModuloDto } from 'src/modules/progreso-modulo/presentation/dto/create-progreso-modulo.dto';
import { UpdateProgresoModuloDto } from 'src/modules/progreso-modulo/presentation/dto/update-progreso-modulo.dto';

@Injectable()
export class ProgresosModulosService {
  constructor(
    private readonly progresoModulosRepository: ProgresoModulosRepository,
  ) {}

  async findAll() {
    return this.progresoModulosRepository.findAll();
  }

  async findById(id: string) {
    return this.progresoModulosRepository.findById(id);
  }

  async create(data: CreateProgresoModuloDto) {
    return this.progresoModulosRepository.create(data);
  }

  async update(id: string, data: UpdateProgresoModuloDto) {
    const progresoModulo = await this.progresoModulosRepository.findById(id);
    if (!progresoModulo) {
      throw new NotFoundException(`ProgresoModulo with id ${id} not found`);
    }

    return this.progresoModulosRepository.update(id, data);
  }

  async delete(id: string) {
    return this.progresoModulosRepository.delete(id);
  }
}
