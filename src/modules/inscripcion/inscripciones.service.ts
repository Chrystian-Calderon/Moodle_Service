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

    // buscar si el estudiante ya está inscrito en el módulo
    const inscripcionesExistentes = await this.inscripcionesRepository.findByEstudianteId(data.estudianteId);
    const yaInscrito = inscripcionesExistentes.some((inscripcion: any) => inscripcion.moduloId === data.moduloId);

    if (yaInscrito) {
      throw new NotFoundException('El estudiante ya está inscrito en este módulo');
    }

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

  async findAllPaginated(page: number, limit: number) {
    return this.inscripcionesRepository.findAllPaginated(page, limit);
  }

  // metodo crear inscripcion con varios estudianteId
  async createMultiple(data: CreateInscripcionEstudiantesDto) {
    const [modulo, estudiantes] = await Promise.all([
      this.moduloService.findOne(data.moduloId),
      Promise.all(data.estudianteIds.map(id => this.usuarioService.findOne(id)))
    ]);

    if (!modulo) throw new NotFoundException('Módulo no encontrado');
    const estudiantesExistentes = estudiantes.filter(estudiante => estudiante !== null);

    // buscar si alguno de los estudiantes están inscritos
    const inscripcionesExistentes = await Promise.all(estudiantesExistentes.map(estudiante => this.inscripcionesRepository.findByEstudianteId(estudiante.id)));
    const estudiantesYaInscritos = inscripcionesExistentes.flat().filter((inscripcion: any) => inscripcion.moduloId === data.moduloId);

    // filtrar los estudiantes
    const estudiantesNoInscritos = estudiantesExistentes.filter(estudiante => !estudiantesYaInscritos.some((inscripcion: any) => inscripcion.estudianteId === estudiante.id));
    const numeroInscripciones = estudiantesNoInscritos.map(() => this.generarNumeroInscripcion());

    return this.inscripcionesRepository.createMultiple({
      moduloId: data.moduloId,
      estudianteIds: estudiantesNoInscritos.map(estudiante => estudiante.id),
      numeroInscripciones,
    });
  }

  // metodo obtener inscripciones de un estudiante por estudianteId
  async findByEstudianteId(estudianteId: string) {
    return this.inscripcionesRepository.findByEstudianteId(estudianteId);
  }
}
