import { Module } from '@nestjs/common';
import { ProgresosLeccionesController } from './progresos-lecciones.controller';
import { ProgresosLeccionesService } from './progresos-lecciones.service';
import { ProgresoLeccionesRepository } from './repositories/progreso-lecciones.repository';
import { PrismaProgresoLeccionesRepository } from './repositories/prisma-progreso-lecciones.repository';

@Module({
  controllers: [ProgresosLeccionesController],
  providers: [
    ProgresosLeccionesService,
    {
      provide: ProgresoLeccionesRepository,
      useClass: PrismaProgresoLeccionesRepository,
    },
  ],
})
export class ProgresoLeccionModule { }
