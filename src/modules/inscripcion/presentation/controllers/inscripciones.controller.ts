import { Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { InscripcionesService } from 'src/modules/inscripcion/application/services/inscripciones.service';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) { }

  @Get()
  findAll() {
    return this.inscripcionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      message: `This action returns a #${id} inscripcion`,
    }
  }

  @Post()
  create() {
    return {
      message: 'This action creates a new inscripcion',
    }
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return {
      message: `This action updates a #${id} inscripcion`,
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return {
      message: `This action removes a #${id} inscripcion`,
    }
  }
}
