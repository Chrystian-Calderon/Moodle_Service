import { IsOptional, IsString } from 'class-validator';

export class UpdateProgresoLeccionDto {
  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  porcentaje?: number;

  @IsOptional()
  segundosVisualizados?: number;

  @IsOptional()
  iniciadoEn?: Date;

  @IsOptional()
  desbloqueadoEn?: Date;

  @IsOptional()
  ultimoAccesoEn?: Date;

  @IsOptional()
  completadoEn?: Date;
}
