import { IsNotEmpty, IsString } from "class-validator";

export class UpdateInscripcionDto {
  // @IsNotEmpty()
  // @IsString()
  // moduloId!: string;

  // @IsNotEmpty()
  // @IsString()
  // estudianteId!: string;

  estado?: string;
  estadoAcceso?: string;
  porcentajeAvance?: number;
  fechaFinalizacion?: Date;
  observaciones?: string;
}