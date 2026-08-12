import { Injectable } from '@nestjs/common';
import { InscripcionesRepository } from 'src/modules/inscripcion/domain/repositories/inscripciones.repository';

@Injectable()
export class InscripcionesService {
  constructor(private readonly inscripcionesRepository: InscripcionesRepository) { }

  async findAll() {
    return this.inscripcionesRepository.findAll();
  }
}
