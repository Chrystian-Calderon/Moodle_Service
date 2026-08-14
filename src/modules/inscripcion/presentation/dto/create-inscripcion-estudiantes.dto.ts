import { IsNotEmpty, IsString } from "class-validator";

export class CreateInscripcionEstudiantesDto {
  @IsString()
  @IsNotEmpty()
  moduloId!: string;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  estudianteIds!: string[];
}