import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedUsuarios(prisma: PrismaClient) {
  console.log('🌱 Creando usuarios...');
  const passwordHash = bcrypt.hashSync('12345678', 10);

  // ==========================================
  // ADMINISTRADOR
  // ==========================================
  const rolAdmin = await prisma.rol.upsert({
    where: { nombre: 'ADMINISTRADOR' },
    update: {},
    create: {
      nombre: 'ADMINISTRADOR',
      descripcion: 'Acceso completo al sistema',
      estado: 'activo',
    },
  });

  const admin1 = await prisma.usuario.upsert({
    where: { correo: 'admin@lms.test' },
    update: {},
    create: {
      username: 'admin',
      correo: 'admin@lms.test',
      contrasenaHash: passwordHash,
      estado: 'activo',
    },
  });

  const ralf = await prisma.usuario.upsert({
    where: { correo: 'ralf@lms.test' },
    update: {},
    create: {
      username: 'ralf',
      correo: 'ralf@lms.test',
      contrasenaHash: passwordHash,
      estado: 'activo',
    },
  });

  await prisma.usuarioRol.upsert({
    where: { usuarioId_rolId: { usuarioId: admin1.id, rolId: rolAdmin.id } },
    update: {},
    create: {
      usuarioId: admin1.id,
      rolId: rolAdmin.id,
    },
  });

  await prisma.usuarioRol.upsert({
    where: { usuarioId_rolId: { usuarioId: ralf.id, rolId: rolAdmin.id } },
    update: {},
    create: {
      usuarioId: ralf.id,
      rolId: rolAdmin.id,
    },
  });
}