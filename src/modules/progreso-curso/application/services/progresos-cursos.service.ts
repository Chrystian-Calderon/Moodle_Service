import { Injectable, NotFoundException } from '@nestjs/common';
import { ProgresoCursosRepository } from 'src/modules/progreso-curso/domain/repositories/progreso-cursos.repository';
import { CreateProgresoCursoDto } from 'src/modules/progreso-curso/presentation/dto/create-progreso-curso.dto';
import { UpdateProgresoCursoDto } from 'src/modules/progreso-curso/presentation/dto/update-progreso-curso.dto';

@Injectable()
export class ProgresosCursosService {
  constructor(
    private readonly progresoCursosRepository: ProgresoCursosRepository,
  ) {}

  async findAll() {
    return this.progresoCursosRepository.findAll();
  }

  async findById(id: string) {
    return this.progresoCursosRepository.findById(id);
  }

  async create(data: CreateProgresoCursoDto) {
    return this.progresoCursosRepository.create(data);
  }

  async update(id: string, data: UpdateProgresoCursoDto) {
    const progresoCurso = await this.progresoCursosRepository.findById(id);
    if (!progresoCurso) {
      throw new NotFoundException(`ProgresoCurso with id ${id} not found`);
    }

    return this.progresoCursosRepository.update(id, data);
  }

  async delete(id: string) {
    return this.progresoCursosRepository.delete(id);
  }
}
