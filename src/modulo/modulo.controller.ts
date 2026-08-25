import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { QueryModuloDto } from './dto/query-modulo.dto';
import { QueryModuloCursoDto } from './dto/query-modulo-curso.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('modulos')
export class ModuloController {
  constructor(private readonly moduloService: ModuloService) { }

  @Post()
  @UseInterceptors(FileInterceptor('rutaImagen'))
  create(
    @Body() createModuloDto: CreateModuloDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.moduloService.create(createModuloDto, file);
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
  @UseInterceptors(FileInterceptor('rutaImagen'))
  update(
    @Param('id') id: string,
    @Body() updateModuloDto: UpdateModuloDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.moduloService.update(id, updateModuloDto, file);
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