export abstract class ProgresoCursosRepository {
  abstract findAll(): Promise<unknown[]>;

  abstract findById(id: string): Promise<unknown | null>;

  abstract create(data: {
    cursoId: string;
    estudianteId: string;
    modulosTotales?: number;
    modulosCompletados?: number;
    porcentaje?: number;
    minutosEstudiados?: number;
    ultimoAccesoEn?: Date;
    completadoEn?: Date;
  }): Promise<unknown>;

  abstract update(id: string, data: unknown): Promise<unknown>;

  abstract delete(id: string): Promise<void>;
}
