export interface AuthenticatedUser {
    id: string;
    username: string;
    correo: string;
    roles: string[];
    permisos: string[];
}

export interface AuthenticatedRequest {
    user: AuthenticatedUser;
}