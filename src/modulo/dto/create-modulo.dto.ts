import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
} from 'class-validator';

export class CreateModuloDto {
  @IsString()
  @IsNotEmpty()
  cursoId!: string;

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  fraseMotivacional?: string;

  @IsOptional()
  @IsString()
  rutaImagen?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  orden?: number;

  @IsOptional()
  @IsBoolean()
  otorgaCertificacion?: boolean;

  @IsOptional()
  @IsBoolean()
  estaPublicado?: boolean;
}