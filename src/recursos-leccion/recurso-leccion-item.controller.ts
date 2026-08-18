import { Controller, Get, Patch, Param, Delete, Body } from "@nestjs/common";
import { RecursoLeccionService } from "./recursos-leccion.service";
import { UpdateRecursoLeccionDto } from "./dto/update-recursos-leccion.dto";

@Controller("recursos-leccion")
export class RecursoLeccionItemController {
    constructor(private readonly recursoService: RecursoLeccionService) { }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.recursoService.findOne(id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() dto: UpdateRecursoLeccionDto) {
        return this.recursoService.update(id, dto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.recursoService.remove(id);
    }
}