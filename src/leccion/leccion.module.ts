import { Module } from '@nestjs/common';
import { LeccionService } from './leccion.service';
import { LeccionController } from './leccion.controller';

@Module({
  controllers: [LeccionController],
  providers: [LeccionService],
})
export class LeccionModule {}
