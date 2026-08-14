export class CreateCursoDto {
  nombre!: string;
  categoria?: string;
  slug!: string;
  descripcionCorta?: string;
  descripcionCompleta?: string;
  duracionHoras?: number;
  rutaPortada?: string;
  rutaImagenSecundaria?: string;
  estado?: string;
  creadoPor?: string;
}