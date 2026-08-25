import { PrismaClient } from '@prisma/client';

export const PERMISSIONS = {
  USUARIOS: {
    VER: 'usuarios.ver',
    CREAR: 'usuarios.crear',
    EDITAR: 'usuarios.editar',
    ELIMINAR: 'usuarios.eliminar',
  },
  CURSOS: {
    VER: 'cursos.ver',
    CREAR: 'cursos.crear',
    EDITAR: 'cursos.editar',
    ELIMINAR: 'cursos.eliminar',
  },
  MODULOS: {
    VER: 'modulos.ver',
    CREAR: 'modulos.crear',
    EDITAR: 'modulos.editar',
    ELIMINAR: 'modulos.eliminar',
  },
  LECCIONES: {
    VER: 'lecciones.ver',
    CREAR: 'lecciones.crear',
    EDITAR: 'lecciones.editar',
    ELIMINAR: 'lecciones.eliminar',
  },
  FORMULARIOS: {
    VER: 'formularios.ver',
    CREAR: 'formularios.crear',
    EDITAR: 'formularios.editar',
    ELIMINAR: 'formularios.eliminar',
  },
  INSCRIPCIONES: {
    VER: 'inscripciones.ver',
    CREAR: 'inscripciones.crear',
    EDITAR: 'inscripciones.editar',
    ELIMINAR: 'inscripciones.eliminar',
  },
  ROLES: {
    VER: 'roles.ver',
    CREAR: 'roles.crear',
    EDITAR: 'roles.editar',
    ELIMINAR: 'roles.eliminar',
  },
  PERMISOS: {
    VER: 'permisos.ver',
    CREAR: 'permisos.crear',
    EDITAR: 'permisos.editar',
    ELIMINAR: 'permisos.eliminar',
  },
} as const;

type PermisoGroup = typeof PERMISSIONS;
type PermisoAction = 'VER' | 'CREAR' | 'EDITAR' | 'ELIMINAR';

function getAllPermissions(): { nombre: string; descripcion: string; grupo: string; accion: string }[] {
  const permisos: { nombre: string; descripcion: string; grupo: string; accion: string }[] = [];

  for (const [grupo, actions] of Object.entries(PERMISSIONS)) {
    for (const [accion, nombre] of Object.entries(actions)) {
      permisos.push({
        nombre,
        descripcion: `${accion.charAt(0) + accion.slice(1).toLowerCase()} ${grupo.toLowerCase()}`,
        grupo,
        accion,
      });
    }
  }

  return permisos;
}

export async function seedPermisos(prisma: PrismaClient) {
  const permisosData = getAllPermissions();

  console.log('🔑 Iniciando siembra de permisos...');

  // Crear permisos
  const permisosMap: Record<string, string> = {};

  for (const permiso of permisosData) {
    const created = await prisma.permiso.upsert({
      where: { nombre: permiso.nombre },
      update: {},
      create: {
        nombre: permiso.nombre,
        descripcion: permiso.descripcion,
        estado: 'activo',
      },
    });
    permisosMap[permiso.nombre] = created.id;
    console.log(`  🔑 ${permiso.nombre}`);
  }

  // Obtener roles
  const rolAdmin = await prisma.rol.findUnique({ where: { nombre: 'ADMINISTRADOR' } });
  const rolEstudiante = await prisma.rol.findUnique({ where: { nombre: 'ESTUDIANTE' } });

  if (!rolAdmin || !rolEstudiante) {
    console.log('  ⚠️  Roles ADMINISTRADOR o ESTUDIANTE no encontrados. Asegúrate de ejecutar seed-estudiantes primero.');
    return;
  }

  // Asignar permisos a ADMINISTRADOR (todos)
  console.log('\n👤 Asignando permisos a ADMINISTRADOR...');
  for (const permiso of permisosData) {
    await prisma.rolPermiso.upsert({
      where: { rolId_permisoId: { rolId: rolAdmin.id, permisoId: permisosMap[permiso.nombre] } },
      update: {},
      create: {
        rolId: rolAdmin.id,
        permisoId: permisosMap[permiso.nombre],
      },
    });
  }
  console.log(`  ✅ ${permisosData.length} permisos asignados a ADMINISTRADOR`);

  // Asignar permisos a ESTUDIANTE (solo ver)
  console.log('\n👨‍🎓 Asignando permisos a ESTUDIANTE...');
  const permisosVer = permisosData.filter((p) => p.accion === 'VER');
  for (const permiso of permisosVer) {
    await prisma.rolPermiso.upsert({
      where: { rolId_permisoId: { rolId: rolEstudiante.id, permisoId: permisosMap[permiso.nombre] } },
      update: {},
      create: {
        rolId: rolEstudiante.id,
        permisoId: permisosMap[permiso.nombre],
      },
    });
  }
  console.log(`  ✅ ${permisosVer.length} permisos de lectura asignados a ESTUDIANTE`);

  console.log('\n🎉 ¡Permisos sembrados con éxito!');
  console.log('--------------------------------------------------');
  console.log(`  🔑 Permisos totales: ${permisosData.length}`);
  console.log(`  👤 ADMINISTRADOR: ${permisosData.length} permisos (todos)`);
  console.log(`  👨‍🎓 ESTUDIANTE: ${permisosVer.length} permisos (solo ver)`);
  console.log('--------------------------------------------------');
}
