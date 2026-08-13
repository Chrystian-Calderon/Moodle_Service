import { Module } from '@nestjs/common';
import { ProgresosModulosController } from './presentation/controllers/progresos-modulos.controller';
import { ProgresosModulosService } from './application/services/progresos-modulos.service';
import { ProgresoModulosRepository } from './domain/repositories/progreso-modulos.repository';
import { PrismaProgresoModulosRepository } from './infrastructure/repositories/prisma-progreso-modulos.repository';

@Module({
  controllers: [ProgresosModulosController],
  providers: [
    ProgresosModulosService,
    {
      provide: ProgresoModulosRepository,
      useClass: PrismaProgresoModulosRepository,
    },
  ],
})
export class ProgresoModuloModule {}
