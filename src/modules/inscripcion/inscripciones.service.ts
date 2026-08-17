import { Injectable, NotFoundException } from '@nestjs/common';
import { InscripcionesRepository } from 'src/modules/inscripcion/repositories/inscripciones.repository';
import { CreateInscripcionDto } from 'src/modules/inscripcion/dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { CreateInscripcionEstudiantesDto } from './dto/create-inscripcion-estudiantes.dto';
import { ModuloService } from 'src/modulo/modulo.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InscripcionesService {
  constructor(
    private readonly inscripcionesRepository: InscripcionesRepository,
    private readonly moduloService: ModuloService,
    private readonly usuarioService: UserService,
  ) { }

  private generarNumeroInscripcion(): string {
    return `INS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  async findAll() {
    return this.inscripcionesRepository.findAll();
  }

  async findById(id: string) {
    return this.inscripcionesRepository.findById(id);
  }

  async create(data: CreateInscripcionDto) {
    const [modulo, estudiante] = await Promise.all([
      this.moduloService.findOne(data.moduloId),
      this.usuarioService.findOne(data.estudianteId)
    ]);

    if (!modulo) throw new NotFoundException('Módulo no encontrado1');
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');

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

  // metodo crear inscripcion con varios estudianteId
  async createMultiple(data: CreateInscripcionEstudiantesDto) {
    const numeroInscripciones = data.estudianteIds.map(() => this.generarNumeroInscripcion());

    return this.inscripcionesRepository.createMultiple({
      ...data,
      numeroInscripciones,
    });
  }

  // metodo obtener inscripciones de un estudiante por estudianteId
  async findByEstudianteId(estudianteId: string) {
    return this.inscripcionesRepository.findByEstudianteId(estudianteId);
  }
}
