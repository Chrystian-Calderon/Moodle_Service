import { IsString } from "class-validator";

export class CreateStudentDto {
  @IsString()
  nombre!: string;

  @IsString()
  correo!: string;

  @IsString()
  numeroDocumento!: string;
}