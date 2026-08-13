import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProgresosCursosService } from 'src/modules/progreso-curso/application/services/progresos-cursos.service';
import { CreateProgresoCursoDto } from 'src/modules/progreso-curso/presentation/dto/create-progreso-curso.dto';
import { UpdateProgresoCursoDto } from 'src/modules/progreso-curso/presentation/dto/update-progreso-curso.dto';

@Controller('progreso-cursos')
export class ProgresosCursosController {
  constructor(private readonly progresosCursosService: ProgresosCursosService) {}

  @Get()
  findAll() {
    return this.progresosCursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progresosCursosService.findById(id);
  }

  @Post()
  create(@Body() data: CreateProgresoCursoDto) {
    return this.progresosCursosService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateProgresoCursoDto) {
    return this.progresosCursosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progresosCursosService.delete(id);
  }
}
