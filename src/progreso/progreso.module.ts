import { Module } from '@nestjs/common';
import { ProgresoService } from './progreso.service';
import { ProgresoController } from './progreso.controller';
import { CertificadosModule } from 'src/certificado/certificado.module';

@Module({
  imports: [CertificadosModule],
  controllers: [ProgresoController],
  providers: [ProgresoService],
  exports: [ProgresoService],
})
export class ProgresoModule { }
