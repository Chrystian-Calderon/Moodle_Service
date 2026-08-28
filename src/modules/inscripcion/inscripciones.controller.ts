import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';

import { InscripcionesService } from 'src/modules/inscripcion/inscripciones.service';
import { CreateInscripcionDto } from 'src/modules/inscripcion/dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from 'src/modules/inscripcion/dto/update-inscripcion.dto';
import { CreateInscripcionEstudiantesDto } from 'src/modules/inscripcion/dto/create-inscripcion-estudiantes.dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { Permission } from 'src/common/decorator/decorator';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(
    private readonly inscripcionesService: InscripcionesService,
  ) { }


  @Get()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission('inscripciones.ver')
  findAll() {
    return this.inscripcionesService.findAll();
  }

  @Get('paginated')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission('inscripciones.ver')
  findAllPaginated(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string,
  ) {
    return this.inscripcionesService.findAllPaginated(
      Number(page),
      Number(limit),
      search,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission('inscripciones.ver')
  findOne(@Param('id') id: string) {
    return this.inscripcionesService.findById(id);
  }

  @Get('estudiante/:estudianteId')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  findByEstudianteInscripciones(
    @Param('estudianteId') estudianteId: string,
  ) {
    return this.inscripcionesService.findByEstudianteInscripciones(
      estudianteId,
    );
  }


  @Post()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission('inscripciones.crear')
  create(@Body() data: CreateInscripcionDto) {
    return this.inscripcionesService.create(data);
  }

  @Post('multiple')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission('inscripciones.crear')
  createMultiple(@Body() data: CreateInscripcionEstudiantesDto) {
    return this.inscripcionesService.createMultiple(data);
  }


  @Put(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission('inscripciones.editar')
  update(
    @Param('id') id: string,
    @Body() data: UpdateInscripcionDto,
  ) {
    return this.inscripcionesService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission('inscripciones.eliminar')
  remove(@Param('id') id: string) {
    return this.inscripcionesService.delete(id);
  }

  @Delete(':idEstudiante/cursos/:idCurso')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission('inscripciones.eliminar')
  eliminarCursoInscripciones(
    @Param('idEstudiante') idEstudiante: string,
    @Param('idCurso') idCurso: string,
  ) {
    return this.inscripcionesService.eliminarCursoInscripciones(
      idEstudiante,
      idCurso,
    );
  }

  @Delete(':id/cursos/:idCurso/modulos/:idModulo')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission('inscripciones.eliminar')
  eliminarModuloInscripciones(
    @Param('id') id: string,
    @Param('idCurso') idCurso: string,
    @Param('idModulo') idModulo: string,
  ) {
    return this.inscripcionesService.eliminarModuloInscripciones(
      id,
      idCurso,
      idModulo,
    );
  }

  @Delete('all/:idEstudiante')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission('inscripciones.eliminar')
  eliminarTodasInscripciones(
    @Param('idEstudiante') idEstudiante: string,
  ) {
    return this.inscripcionesService.eliminarTodasInscripciones(
      idEstudiante,
    );
  }
}
