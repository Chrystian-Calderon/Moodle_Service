import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedUsuarios(prisma: PrismaClient) {
  console.log('🌱 Creando usuarios...');
  const passwordHash = bcrypt.hashSync('12345678', 10);

  // ==========================================
  // ADMINISTRADOR
  // ==========================================

  await prisma.usuario.upsert({
    where: { correo: 'admin@lms.test' },
    update: {},
    create: {
      username: 'admin',
      correo: 'admin@lms.test',
      contrasenaHash: passwordHash,
      estado: 'activo',
    },
  });

  await prisma.usuario.upsert({
    where: { correo: 'ralf@lms.test' },
    update: {},
    create: {
      username: 'ralf',
      correo: 'ralf@lms.test',
      contrasenaHash: passwordHash,
      estado: 'activo',
    },
  });
}