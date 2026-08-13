import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProgresosLeccionesService } from 'src/modules/progreso-leccion/application/services/progresos-lecciones.service';
import { CreateProgresoLeccionDto } from 'src/modules/progreso-leccion/presentation/dto/create-progreso-leccion.dto';
import { UpdateProgresoLeccionDto } from 'src/modules/progreso-leccion/presentation/dto/update-progreso-leccion.dto';

@Controller('progreso-lecciones')
export class ProgresosLeccionesController {
  constructor(
    private readonly progresoLeccionesService: ProgresosLeccionesService,
  ) {}

  @Get()
  findAll() {
    return this.progresoLeccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progresoLeccionesService.findById(id);
  }

  @Post()
  create(@Body() data: CreateProgresoLeccionDto) {
    return this.progresoLeccionesService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateProgresoLeccionDto) {
    return this.progresoLeccionesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progresoLeccionesService.delete(id);
  }
}
