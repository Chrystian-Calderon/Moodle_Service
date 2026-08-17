import {
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateCursoDto {
  @IsString()
  nombre!: string;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsString()
  slug!: string;

  @IsOptional()
  @IsString()
  descripcionCorta?: string;

  @IsOptional()
  @IsString()
  descripcionCompleta?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  duracionHoras?: number;

  @IsOptional()
  @IsString()
  rutaPortada?: string;

  @IsOptional()
  @IsString()
  rutaImagenSecundaria?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  creadoPor?: string;
}