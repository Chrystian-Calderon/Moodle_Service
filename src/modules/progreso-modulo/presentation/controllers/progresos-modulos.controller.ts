import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProgresosModulosService } from 'src/modules/progreso-modulo/application/services/progresos-modulos.service';
import { CreateProgresoModuloDto } from 'src/modules/progreso-modulo/presentation/dto/create-progreso-modulo.dto';
import { UpdateProgresoModuloDto } from 'src/modules/progreso-modulo/presentation/dto/update-progreso-modulo.dto';

@Controller('progreso-modulos')
export class ProgresosModulosController {
  constructor(private readonly progresoModulosService: ProgresosModulosService) {}

  @Get()
  findAll() {
    return this.progresoModulosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progresoModulosService.findById(id);
  }

  @Post()
  create(@Body() data: CreateProgresoModuloDto) {
    return this.progresoModulosService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateProgresoModuloDto) {
    return this.progresoModulosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progresoModulosService.delete(id);
  }
}
