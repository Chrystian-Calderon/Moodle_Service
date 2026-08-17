import { Module } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { ModuloController } from './modulo.controller';

@Module({
  controllers: [ModuloController],
  providers: [ModuloService],
})
export class ModuloModule {}
