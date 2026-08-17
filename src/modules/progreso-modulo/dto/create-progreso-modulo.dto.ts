import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProgresoModuloDto {
  @IsString()
  @IsNotEmpty()
  inscripcionId!: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  porcentaje?: number;

  @IsOptional()
  leccionesTotales?: number;

  @IsOptional()
  leccionesCompletadas?: number;

  @IsOptional()
  completadoEn?: Date;
}
