import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { InscripcionesService } from 'src/modules/inscripcion/application/services/inscripciones.service';
import { CreateInscripcionDto } from 'src/modules/inscripcion/presentation/dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from 'src/modules/inscripcion/presentation/dto/update-inscripcion.dto';
import { CreateInscripcionEstudiantesDto } from 'src/modules/inscripcion/presentation/dto/create-inscripcion-estudiantes.dto';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) { }

  @Get()
  findAll() {
    return this.inscripcionesService.findAll();
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

  // metodo crear inscripcion con varios estudianteId
  @Post('multiple')
  createMultiple(@Body() data: CreateInscripcionEstudiantesDto) {
    console.log('data', data);
    return this.inscripcionesService.createMultiple(data);
  }

  // metodo obtener inscripciones de un estudiante por estudianteId
  @Get('estudiante/:estudianteId')
  findByEstudianteId(@Param('estudianteId') estudianteId: string) {
    return this.inscripcionesService.findByEstudianteId(estudianteId);
  }
}
