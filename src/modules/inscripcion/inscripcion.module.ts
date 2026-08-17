import { Module } from '@nestjs/common';
import { InscripcionesController } from './presentation/controllers/inscripciones.controller';
import { InscripcionesService } from './application/services/inscripciones.service';

import { PrismaInscripcionesRepository } from './infrastructure/repositories/prisma-inscripciones.repository';
import { InscripcionesRepository } from './domain/repositories/inscripciones.repository';
import { UserModule } from 'src/user/user.module';
import { ModuloModule } from 'src/modulo/modulo.module';

@Module({
  imports: [ModuloModule, UserModule],
  controllers: [InscripcionesController],
  providers: [InscripcionesService,
    {
      provide: InscripcionesRepository,
      useClass: PrismaInscripcionesRepository,
    }
  ]
})
export class InscripcionModule { }
