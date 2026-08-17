export abstract class ProgresoModulosRepository {
  abstract findAll(): Promise<unknown[]>;

  abstract findById(id: string): Promise<unknown | null>;

  abstract create(data: {
    inscripcionId: string;
    estado?: string;
    porcentaje?: number;
    leccionesTotales?: number;
    leccionesCompletadas?: number;
    completadoEn?: Date;
  }): Promise<unknown>;

  abstract update(id: string, data: unknown): Promise<unknown>;

  abstract delete(id: string): Promise<void>;
}
