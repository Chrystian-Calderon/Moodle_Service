import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';


import { ListarCertificadosDto } from './dto/listar-certificados.dto';
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
// 2. BUSCAR CERTIFICADO POR ID
// ===================================================================

@Get(':id')
findOne(
  @Param('id') id: string,
) {
  return this.certificadoService.findOne(id);
}
}