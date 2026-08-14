import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecursosLeccionDto } from './dto/create-recursos-leccion.dto';
import { UpdateRecursosLeccionDto } from './dto/update-recursos-leccion.dto';
import { RecursosLeccion } from './entities/recursos-leccion.entity';

@Injectable()
export class RecursosLeccionService {
  private recursos: RecursosLeccion[] = [];

  create(createRecursosLeccionDto: CreateRecursosLeccionDto) {
    const nuevoRecurso: RecursosLeccion = {
      id: Date.now().toString(),
      leccionId: createRecursosLeccionDto.leccionId,
      nombre: createRecursosLeccionDto.nombre,
      descripcion: createRecursosLeccionDto.descripcion,
      tipoRecurso: createRecursosLeccionDto.tipoRecurso,
      rutaRecurso: createRecursosLeccionDto.rutaRecurso,
      urlExterna: createRecursosLeccionDto.urlExterna,
      orden: createRecursosLeccionDto.orden ?? 0,
      creadoEn: new Date(),
      actualizadoEn: new Date(),
    };

    this.recursos.push(nuevoRecurso);

    return nuevoRecurso;
  }

  findAll() {
    return this.recursos;
  }

  findOne(id: string) {
    const recurso = this.recursos.find((recurso) => recurso.id === id);

    if (!recurso) {
      throw new NotFoundException('Recurso de lección no encontrado');
    }

    return recurso;
  }

  update(
    id: string,
    updateRecursosLeccionDto: UpdateRecursosLeccionDto,
  ) {
    const recurso = this.findOne(id);

    Object.assign(recurso, updateRecursosLeccionDto, {
      actualizadoEn: new Date(),
    });

    return recurso;
  }

  remove(id: string) {
    const recurso = this.findOne(id);

    this.recursos = this.recursos.filter(
      (recurso) => recurso.id !== id,
    );

    return {
      mensaje: 'Recurso de lección eliminado correctamente',
      recurso,
    };
  }
}