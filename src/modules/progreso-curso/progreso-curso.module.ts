import { Module } from '@nestjs/common';
import { ProgresosCursosController } from './progresos-cursos.controller';
import { ProgresosCursosService } from './progresos-cursos.service';
import { ProgresoCursosRepository } from './repositories/progreso-cursos.repository';
import { PrismaProgresoCursosRepository } from './repositories/prisma-progreso-cursos.repository';

@Module({
  controllers: [ProgresosCursosController],
  providers: [
    ProgresosCursosService,
    {
      provide: ProgresoCursosRepository,
      useClass: PrismaProgresoCursosRepository,
    },
  ],
})
export class ProgresoCursoModule { }
