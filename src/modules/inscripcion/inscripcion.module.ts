import { Module } from '@nestjs/common';
import { InscripcionesController } from './presentation/controllers/inscripciones.controller';
import { InscripcionesService } from './application/services/inscripciones.service';

import { PrismaInscripcionesRepository } from './infrastructure/repositories/prisma-inscripciones.repository';
import { InscripcionesRepository } from './domain/repositories/inscripciones.repository';

@Module({
  controllers: [InscripcionesController],
  providers: [InscripcionesService,
    {
      provide: InscripcionesRepository,
      useClass: PrismaInscripcionesRepository,
    }
  ]
})
export class InscripcionModule { }
