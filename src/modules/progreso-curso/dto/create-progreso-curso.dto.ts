import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProgresoCursoDto {
  @IsString()
  @IsNotEmpty()
  cursoId!: string;

  @IsString()
  @IsNotEmpty()
  estudianteId!: string;

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
