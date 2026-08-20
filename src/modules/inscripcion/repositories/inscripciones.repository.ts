export abstract class InscripcionesRepository {
  abstract findAll(): Promise<unknown[]>;

  abstract findById(id: string): Promise<unknown | null>;

  abstract create(data: {
    moduloId: string;
    estudianteId: string;
    numeroInscripcion: string;
  }): Promise<unknown>;

  abstract update(id: string, data: unknown): Promise<unknown>;

  abstract delete(id: string): Promise<void>;

  // metodo obtener inscripciones paginado
  abstract findAllPaginated(page: number, limit: number): Promise<{
    data: unknown[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>;

  // metodo crear inscripcion con varios estudianteId
  abstract createMultiple(data: {
    moduloId: string;
    estudianteIds: string[];
    numeroInscripciones: string[];
  }): Promise<unknown>;

  // metodo obtener inscripciones de un estudiante por estudianteId
  abstract findByEstudianteId(estudianteId: string): Promise<unknown[]>;
}