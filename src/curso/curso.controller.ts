import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permission.guard';
import { Permission } from 'src/auth/enums/permission.enum';
import { Permissions } from 'src/auth/decorators/permission.decorator';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) { }

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(createCursoDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,

    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,

    @Query('search')
    search?: string,

    @Query('categoria')
    categoria?: string,
  ) {
    return this.cursoService.findAll(
      page,
      limit,
      search,
      categoria,
    );
  }

  @Get('curso-modulos')
  @UseGuards(PermissionsGuard)
  @Permissions(Permission.CURSO_VER)
  obtenerCursos() {
    return this.cursoService.obtenerCursos();
  }

  @Get(':id/modulos')
  findModulos(@Param('id') id: string) {
    return this.cursoService.findModulos(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCursoDto: UpdateCursoDto,
  ) {
    return this.cursoService.update(id, updateCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoService.remove(id);
  }

  @Get('/cat/categorias')
  findCategorias() {
    return this.cursoService.findCategorias();
  }
}