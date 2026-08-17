import { IsNotEmpty, IsString } from "class-validator";

export class CreateInscripcionDto {
  @IsString()
  @IsNotEmpty()
  moduloId!: string;

  @IsString()
  @IsNotEmpty()
  estudianteId!: string;
}