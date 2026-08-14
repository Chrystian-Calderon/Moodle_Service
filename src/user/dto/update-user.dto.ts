import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
} from "class-validator";

export class UpdateUsuarioDto {
    @IsEmail()
    @IsNotEmpty()
    correo!: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    username?: string;

    @IsOptional()
    @IsString()
    estado?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    nombre?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    apellidoPaterno?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    apellidoMaterno?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    tipoDocumentoIdentidad?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    numeroDocumento?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    fechaNacimiento?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    genero?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    telefono?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    ciudad?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    pais?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    ocupacion?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    contactoEmergenciaNombre?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    contactoEmergenciaTelefono?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    rolId?: string;
}