type EstudianteConInscripciones = {
  id: string;
  correo: string;

  perfil: {
    nombre: string | null;
    apellidoPaterno: string | null;
    apellidoMaterno: string | null;
  } | null;

  inscripciones: {
    id: string;
    numeroInscripcion: string;
    estadoAcceso: string;

    modulo: {
      id: string;
      nombre: string;
      orden: number;

      curso: {
        id: string;
        nombre: string;
        categoria: string | null;
      };
    };
  }[];
};

type InscripcionConModuloCurso = {
  id: string;
  numeroInscripcion: string;
  estado: string;
  estadoAcceso: string;
  porcentajeAvance: number;

  modulo: {
    id: string;
    nombre: string;
    orden: number;

    curso: {
      id: string;
      nombre: string;
      categoria: string | null;
    };
  };
};

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
  abstract findEstudianteWithInscripciones(skip: number, take: number): Promise<EstudianteConInscripciones[]>;
  abstract countEstudiantesWithInscripciones(): Promise<number>;

  // metodo crear inscripcion con varios estudianteId
  abstract createMultiple(data: {
    moduloId: string;
    estudianteIds: string[];
    numeroInscripciones: string[];
  }): Promise<unknown>;

  // metodo obtener inscripciones de un estudiante por estudianteId
  abstract findByEstudianteId(estudianteId: string): Promise<InscripcionConModuloCurso[]>;
}