import { Injectable, NotFoundException } from '@nestjs/common';
import { InscripcionesRepository } from 'src/modules/inscripcion/domain/repositories/inscripciones.repository';
import { CreateInscripcionDto } from 'src/modules/inscripcion/presentation/dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from '../../presentation/dto/update-inscripcion.dto';

@Injectable()
export class InscripcionesService {
  constructor(private readonly inscripcionesRepository: InscripcionesRepository) { }

  private generarNumeroInscripcion(): string {
    return `INS-${Date.now}`;
  }

  async findAll() {
    return this.inscripcionesRepository.findAll();
  }

  async findById(id: string) {
    return this.inscripcionesRepository.findById(id);
  }

  async create(data: CreateInscripcionDto) {
    const numeroInscripcion = this.generarNumeroInscripcion();
    return this.inscripcionesRepository.create({
      ...data,
      numeroInscripcion,
    });
  }

  async update(id: string, data: UpdateInscripcionDto) {
    const inscripcion = await this.inscripcionesRepository.findById(id);
    if (!inscripcion) {
      throw new NotFoundException(`Inscripcion with id ${id} not found`);
    }
    return this.inscripcionesRepository.update(id, data);
  }

  async delete(id: string) {
    return this.inscripcionesRepository.delete(id);
  }
}
