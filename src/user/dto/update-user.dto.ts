export class UpdateUsuarioDto {
    correo: string;
    username?: string;

    nombre?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    tipoDocumentoIdentidad?: string;
    numeroDocumento?: string;
    fechaNacimiento?: string;
    genero?: string;
    telefono?: string;
    ciudad?: string;
    pais?: string;
    ocupacion?: string;
    contactoEmergenciaNombre?: string;
    contactoEmergenciaTelefono?: string;

    rolId?: string;
}