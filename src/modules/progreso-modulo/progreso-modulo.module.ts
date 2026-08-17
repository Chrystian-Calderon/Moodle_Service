import { Module } from '@nestjs/common';
import { ProgresosModulosController } from './presentation/controllers/progresos-modulos.controller';
import { ProgresosModulosService } from './progresos-modulos.service';
import { ProgresoModulosRepository } from './repositories/progreso-modulos.repository';
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
export class ProgresoModuloModule { }
