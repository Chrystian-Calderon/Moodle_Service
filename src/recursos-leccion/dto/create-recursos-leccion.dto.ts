export class CreateRecursosLeccionDto {
  leccionId!: string;
  nombre!: string;
  descripcion?: string;
  tipoRecurso!: string;
  rutaRecurso?: string;
  urlExterna?: string;
  orden?: number;
}