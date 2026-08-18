import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) { }

  canActivate(context: ExecutionContext): boolean {

    const requiredPermissions =
      this.reflector.getAllAndOverride<string[]>(
        PERMISSIONS_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      );

    // Endpoint sin @Permissions()
    if (!requiredPermissions) {
      return true;
    }

    const request =
      context.switchToHttp().getRequest();

    const user = request.user;

    if (!user) {
      throw new ForbiddenException(
        'Usuario no autenticado',
      );
    }

    const userPermissions: string[] =
      user.permisos ?? [];

    const hasPermission =
      requiredPermissions.every(
        permission =>
          userPermissions.includes(permission),
      );

    if (!hasPermission) {
      throw new ForbiddenException(
        'No tienes permisos para realizar esta acción',
      );
    }

    return true;
  }
}