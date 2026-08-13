import { Module } from '@nestjs/common';
import { ProgresosLeccionesController } from './presentation/controllers/progresos-lecciones.controller';
import { ProgresosLeccionesService } from './application/services/progresos-lecciones.service';
import { ProgresoLeccionesRepository } from './domain/repositories/progreso-lecciones.repository';
import { PrismaProgresoLeccionesRepository } from './infrastructure/repositories/prisma-progreso-lecciones.repository';

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
export class ProgresoLeccionModule {}
