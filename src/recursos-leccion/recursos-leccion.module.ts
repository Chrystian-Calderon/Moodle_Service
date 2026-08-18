import { Module } from '@nestjs/common';
import { RecursoLeccionService } from './recursos-leccion.service';
import { RecursoLeccionController } from './recursos-leccion.controller';
import { RecursoLeccionItemController } from './recurso-leccion-item.controller';


@Module({
  controllers: [RecursoLeccionController, RecursoLeccionItemController],
  providers: [RecursoLeccionService],
})
export class RecursosLeccionModule { }
