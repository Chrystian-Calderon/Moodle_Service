import { IsOptional } from 'class-validator';

export class UpdateProgresoCursoDto {
  @IsOptional()
  modulosTotales?: number;

  @IsOptional()
  modulosCompletados?: number;

  @IsOptional()
  porcentaje?: number;

  @IsOptional()
  minutosEstudiados?: number;

  @IsOptional()
  ultimoAccesoEn?: Date;

  @IsOptional()
  completadoEn?: Date;
}
