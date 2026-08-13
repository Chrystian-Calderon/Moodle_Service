export abstract class ProgresoLeccionesRepository {
  abstract findAll(): Promise<unknown[]>;

  abstract findById(id: string): Promise<unknown | null>;

  abstract create(data: {
    inscripcionId: string;
    leccionId: string;
    estado?: string;
    porcentaje?: number;
    segundosVisualizados?: number;
    iniciadoEn?: Date;
    desbloqueadoEn?: Date;
    ultimoAccesoEn?: Date;
    completadoEn?: Date;
  }): Promise<unknown>;

  abstract update(id: string, data: unknown): Promise<unknown>;

  abstract delete(id: string): Promise<void>;
}
