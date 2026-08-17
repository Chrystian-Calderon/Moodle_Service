import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProgresoLeccionDto {
  @IsString()
  @IsNotEmpty()
  inscripcionId!: string;

  @IsString()
  @IsNotEmpty()
  leccionId!: string;

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
