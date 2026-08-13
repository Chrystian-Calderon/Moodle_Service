import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../decorator/decorator';
import { AuthenticatedUser } from '../types/authenticated-user';

interface AuthenticatedRequest {
    user: AuthenticatedUser;
}

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const permisoRequerido = this.reflector.getAllAndOverride<string>(
            PERMISSION_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!permisoRequerido) {
            return true;
        }

        const request =
            context.switchToHttp().getRequest<AuthenticatedRequest>();

        const usuario = request.user;

        if (!usuario) {
            throw new ForbiddenException('Usuario no autenticado');
        }

        const permisos = usuario.permisos;

        if (!permisos.includes(permisoRequerido)) {
            throw new ForbiddenException(
                `No tienes el permiso: ${permisoRequerido}`,
            );
        }

        return true;
    }
}