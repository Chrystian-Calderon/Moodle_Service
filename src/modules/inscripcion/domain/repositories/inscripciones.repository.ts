export abstract class InscripcionesRepository {
  abstract findAll(): Promise<unknown[]>;

  abstract findById(id: string): Promise<unknown | null>;

  abstract create(data: unknown): Promise<unknown>;

  abstract update(id: string, data: unknown): Promise<unknown>;

  abstract delete(id: string): Promise<void>;
}