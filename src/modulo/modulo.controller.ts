import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { QueryModuloDto } from './dto/query-modulo.dto';
import { QueryModuloCursoDto } from './dto/query-modulo-curso.dto';

@Controller('modulos')
export class ModuloController {
  constructor(private readonly moduloService: ModuloService) { }

  @Post()
  create(@Body() createModuloDto: CreateModuloDto) {
    return this.moduloService.create(createModuloDto);
  }

  @Get()
  findAll(@Query() query: QueryModuloDto) {
    return this.moduloService.findAll(query);
  }

  @Get('curso/:cursoId')
  findByCurso(
    @Param('cursoId') cursoId: string,
    @Query() query: QueryModuloCursoDto,
  ) {
    return this.moduloService.findByCurso(cursoId, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduloService.findOne(id);
  }

  @Get(':id/lecciones')
  findLecciones(@Param('id') id: string) {
    return this.moduloService.findLecciones(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuloDto: UpdateModuloDto) {
    return this.moduloService.update(id, updateModuloDto);
  }

  @Patch(':id/restaurar')
  restore(@Param('id') id: string) {
    return this.moduloService.restore(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduloService.remove(id);
  }
}