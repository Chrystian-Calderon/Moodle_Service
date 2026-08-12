import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
    @IsNotEmpty({ message: 'El correo electrónico es requerido' })
    correo!: string;

    @MinLength(1, { message: 'La contraseña es requerida' })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    password!: string;
}
