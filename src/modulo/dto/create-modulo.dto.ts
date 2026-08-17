export class CreateModuloDto {
  cursoId!: string;
  nombre!: string;
  descripcion?: string;
  fraseMotivacional?: string;
  rutaImagen?: string;
  orden?: number;
  otorgaCertificacion?: boolean;
  estaPublicado?: boolean;
}