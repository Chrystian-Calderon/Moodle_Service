import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { InscripcionesService } from 'src/modules/inscripcion/application/services/inscripciones.service';
import { CreateInscripcionDto } from 'src/modules/inscripcion/presentation/dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from 'src/modules/inscripcion/presentation/dto/update-inscripcion.dto';

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
}
