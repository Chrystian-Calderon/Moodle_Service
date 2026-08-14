import { Module } from '@nestjs/common';
import { RecursosLeccionService } from './recursos-leccion.service';
import { RecursosLeccionController } from './recursos-leccion.controller';

@Module({
  controllers: [RecursosLeccionController],
  providers: [RecursosLeccionService],
})
export class RecursosLeccionModule {}
