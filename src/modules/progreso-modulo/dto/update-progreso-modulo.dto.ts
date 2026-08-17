import { IsOptional, IsString } from 'class-validator';

export class UpdateProgresoModuloDto {
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
