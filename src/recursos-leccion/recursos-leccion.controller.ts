import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { RecursosLeccionService } from './recursos-leccion.service';
import { CreateRecursosLeccionDto } from './dto/create-recursos-leccion.dto';
import { UpdateRecursosLeccionDto } from './dto/update-recursos-leccion.dto';

@Controller('recursos-leccion')
export class RecursosLeccionController {
  constructor(
    private readonly recursosLeccionService: RecursosLeccionService,
  ) {}

  @Post()
  create(@Body() createRecursosLeccionDto: CreateRecursosLeccionDto) {
    return this.recursosLeccionService.create(createRecursosLeccionDto);
  }

  @Get()
  findAll() {
    return this.recursosLeccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recursosLeccionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecursosLeccionDto: UpdateRecursosLeccionDto,
  ) {
    return this.recursosLeccionService.update(
      id,
      updateRecursosLeccionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recursosLeccionService.remove(id);
  }
}