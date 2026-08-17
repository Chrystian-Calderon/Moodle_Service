import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { CreateRecursoLeccionDto } from "./dto/create-recursos-leccion.dto";
import { RecursoLeccionService } from "./recursos-leccion.service";

@Controller("lecciones/:leccionId/recursos")
export class RecursoLeccionController {
  constructor(private readonly recursoService: RecursoLeccionService) { }

  @Post()
  create(@Param("leccionId") leccionId: string, @Body() dto: CreateRecursoLeccionDto) {
    return this.recursoService.create(leccionId, dto);
  }

  @Get()
  findByLeccion(@Param("leccionId") leccionId: string) {
    return this.recursoService.findByLeccion(leccionId);
  }
}