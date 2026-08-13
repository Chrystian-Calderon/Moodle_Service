import { Injectable, NotFoundException } from '@nestjs/common';
import { ProgresoLeccionesRepository } from 'src/modules/progreso-leccion/domain/repositories/progreso-lecciones.repository';
import { CreateProgresoLeccionDto } from 'src/modules/progreso-leccion/presentation/dto/create-progreso-leccion.dto';
import { UpdateProgresoLeccionDto } from 'src/modules/progreso-leccion/presentation/dto/update-progreso-leccion.dto';

@Injectable()
export class ProgresosLeccionesService {
  constructor(
    private readonly progresoLeccionesRepository: ProgresoLeccionesRepository,
  ) {}

  async findAll() {
    return this.progresoLeccionesRepository.findAll();
  }

  async findById(id: string) {
    return this.progresoLeccionesRepository.findById(id);
  }

  async create(data: CreateProgresoLeccionDto) {
    return this.progresoLeccionesRepository.create(data);
  }

  async update(id: string, data: UpdateProgresoLeccionDto) {
    const progresoLeccion = await this.progresoLeccionesRepository.findById(id);
    if (!progresoLeccion) {
      throw new NotFoundException(`ProgresoLeccion with id ${id} not found`);
    }

    return this.progresoLeccionesRepository.update(id, data);
  }

  async delete(id: string) {
    return this.progresoLeccionesRepository.delete(id);
  }
}
