import { Controller, Get, Param, Post, Put, Delete, Body, Query } from '@nestjs/common';
import { InscripcionesService } from 'src/modules/inscripcion/inscripciones.service';
import { CreateInscripcionDto } from 'src/modules/inscripcion/dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from 'src/modules/inscripcion/dto/update-inscripcion.dto';
import { CreateInscripcionEstudiantesDto } from 'src/modules/inscripcion/dto/create-inscripcion-estudiantes.dto';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) { }

  @Get()
  findAll() {
    return this.inscripcionesService.findAll();
  }

  @Get('paginated')
  findAllPaginated(@Query('page') page = '1', @Query('limit') limit = '10', @Query('search') search?: string) {
    return this.inscripcionesService.findAllPaginated(Number(page), Number(limit), search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inscripcionesService.findById(id);
  }

  @Post()
  create(@Body() data: CreateInscripcionDto) {
    return this.inscripcionesService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateInscripcionDto) {
    return this.inscripcionesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inscripcionesService.delete(id);
  }

  @Delete(':idEstudiante/cursos/:idCurso')
  eliminarCursoInscripciones(@Param('idEstudiante') idEstudiante: string, @Param('idCurso') idCurso: string) {
    return this.inscripcionesService.eliminarCursoInscripciones(idEstudiante, idCurso);
  }

  @Delete(':id/cursos/:idCurso/modulos/:idModulo')
  eliminarModuloInscripciones(@Param('id') id: string, @Param('idCurso') idCurso: string, @Param('idModulo') idModulo: string) {
    return this.inscripcionesService.eliminarModuloInscripciones(id, idCurso, idModulo);
  }

  @Delete('all/:idEstudiante')
  eliminarTodasInscripciones(@Param('idEstudiante') idEstudiante: string) {
    return this.inscripcionesService.eliminarTodasInscripciones(idEstudiante);
  }

  // metodo crear inscripcion con varios estudianteId
  @Post('multiple')
  createMultiple(@Body() data: CreateInscripcionEstudiantesDto) {
    return this.inscripcionesService.createMultiple(data);
  }

  // metodo obtener inscripciones de un estudiante por estudianteId
  @Get('estudiante/:estudianteId')
  findByEstudianteInscripciones(@Param('estudianteId') estudianteId: string) {
    return this.inscripcionesService.findByEstudianteInscripciones(estudianteId);
  }
}
