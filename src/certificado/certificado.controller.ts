import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  Body,
  Res,
  StreamableFile
} from '@nestjs/common';
import { ListarCertificadosDto } from './dto/listar-certificados.dto';
import { AnularCertificadoDto } from './dto/anular-certificado.dto';
import { CertificadoService } from './certificado.service';
import type { Response } from 'express';

@Controller('certificados')
export class CertificadosController {
  constructor(
    private readonly certificadoService: CertificadoService,
  ) { }

  @Get()
  findAll(@Query() query: ListarCertificadosDto) {
    return this.certificadoService.findAll(query);
  }


  @Get('usuario/:usuarioId')
  async buscarPorUsuario(@Param('usuarioId') usuarioId: string) {
    return this.certificadoService.buscarPorUsuario(usuarioId);
  }

  @Get('codigo/:codigo')
  async buscarPorCodigo(@Param('codigo') codigo: string) {
    return this.certificadoService.buscarPorCodigo(codigo);
  }

  @Get('curso/:cursoId')
  async buscarPorCurso(@Param('cursoId') cursoId: string) {
    return this.certificadoService.buscarPorCurso(cursoId);
  }

  @Get('inscripcion/:inscripcionId')
  async buscarPorInscripcion(@Param('inscripcionId') inscripcionId: string) {
    return this.certificadoService.buscarPorInscripcion(inscripcionId);
  }

  @Patch(':id/anular')
  async anularCertificado(@Param('id') id: string, @Body() dto: AnularCertificadoDto) {
    return this.certificadoService.anularCertificado(id, dto.motivoAnulacion);
  }

  @Get(':id/estado')
  async consultarEstado(@Param('id') id: string) {
    return this.certificadoService.consultarEstado(id);
  }

  @Get(':id/descargar')
  async descargarCertificado(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { buffer, filename } = await this.certificadoService.descargarCertificado(id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': buffer.length,
    });

    return new StreamableFile(buffer);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificadoService.findOne(id);
  }

}