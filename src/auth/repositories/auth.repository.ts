export abstract class AuthRepository {
  abstract findUserByEmail(
    correo: string,
  ): Promise<unknown | null>;


}