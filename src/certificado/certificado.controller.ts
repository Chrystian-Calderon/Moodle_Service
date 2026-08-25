import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  Body,
} from '@nestjs/common';

import { ListarCertificadosDto } from './dto/listar-certificados.dto';
import { AnularCertificadoDto } from './dto/anular-certificado.dto';
import { CertificadoService } from './certificado.service';

@Controller('certificados')
export class CertificadosController {
  constructor(
    private readonly certificadoService: CertificadoService,
  ) {}

  // ===================================================================
  // 1. LISTAR CERTIFICADOS
  // ===================================================================

  @Get()
  findAll(
    @Query() query: ListarCertificadosDto,
  ) {
    return this.certificadoService.findAll(query);
  }

  // ===================================================================
  // 3. BUSCAR CERTIFICADOS DE UN USUARIO
  // ===================================================================

  @Get('usuario/:usuarioId')
  async buscarPorUsuario(
    @Param('usuarioId') usuarioId: string,
  ) {
    return this.certificadoService.buscarPorUsuario(usuarioId);
  }

  // ===================================================================
  // 4. BUSCAR CERTIFICADO POR CÓDIGO
  // ===================================================================

  @Get('codigo/:codigo')
  async buscarPorCodigo(
    @Param('codigo') codigo: string,
  ) {
    return this.certificadoService.buscarPorCodigo(codigo);
  }

  // ===================================================================
  // 5. OBTENER CERTIFICADOS DE UN CURSO
  // ===================================================================

  @Get('curso/:cursoId')
  async buscarPorCurso(
    @Param('cursoId') cursoId: string,
  ) {
    return this.certificadoService.buscarPorCurso(cursoId);
  }

  // ===================================================================
  // 6. OBTENER CERTIFICADO DE UNA INSCRIPCIÓN
  // ===================================================================

  @Get('inscripcion/:inscripcionId')
  async buscarPorInscripcion(
    @Param('inscripcionId') inscripcionId: string,
  ) {
    return this.certificadoService.buscarPorInscripcion(inscripcionId);
  }

  // ===================================================================
  // 7. ANULAR CERTIFICADO
  // ===================================================================

  @Patch(':id/anular')
  async anularCertificado(
    @Param('id') id: string,
    @Body() dto: AnularCertificadoDto,
  ) {
    return this.certificadoService.anularCertificado(
      id,
      dto.motivoAnulacion,
    );
  }

  // ===================================================================
// 8. CONSULTAR ESTADO DEL CERTIFICADO
// ===================================================================

@Get(':id/estado')
async consultarEstado(
  @Param('id') id: string,
) {
  return this.certificadoService.consultarEstado(id);
}

  // ===================================================================
  // 2. BUSCAR CERTIFICADO POR ID
  // ===================================================================

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.certificadoService.findOne(id);
  }
}