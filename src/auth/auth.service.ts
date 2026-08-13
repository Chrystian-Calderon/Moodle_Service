import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { MenusService } from 'src/menus/menus.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly menusService: MenusService
    ) { }

    async login(loginDto: LoginDto) {
        const { correo, password } = loginDto;
        const usuario = await this.userService.buscarPorCorreo(correo);
        if (!usuario || usuario.estado != "activo") {
            throw new UnauthorizedException("Credenciales Incorrectas");
        }
        const passwordValido = await bcrypt.compare(password, usuario.contrasenaHash);
        if (!passwordValido) {
            throw new UnauthorizedException("Credenciales Incorrectas");
        }
        const nombresRoles = usuario.roles.map((item) => item.rol.nombre);

        const permisos = usuario.roles.flatMap((item) =>
            item.rol.permisos.map((rolPermiso) => rolPermiso.permiso.nombre),
        );

        const rolIds = usuario.roles.map((item) => item.rolId);

        const menus = await this.menusService.obtenerMenusPorRoles(rolIds);


        const payload = {
            sub: usuario.id,
            username: usuario.username,
            roles: nombresRoles,
            permisos,
        }

        return {
            access_token: await this.jwtService.signAsync(payload, { expiresIn: '1h' }),
            usuario: {
                id: usuario.id,
                username: usuario.username,
                correo: usuario.correo,
                estado: usuario.estado,
                rol: nombresRoles,
                permisos,
                menus,
            }
        }
    }
}
