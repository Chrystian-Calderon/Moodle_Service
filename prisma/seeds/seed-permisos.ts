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

  RECURSOS_LECCIONES: {
    VER: 'recursos_lecciones.ver',
    CREAR: 'recursos_lecciones.crear',
    EDITAR: 'recursos_lecciones.editar',
    ELIMINAR: 'recursos_lecciones.eliminar',
  },

  CERTIFICADOS: {
    VER: 'certificados.ver',
  },
} as const;

function getAllPermissions(): {
  nombre: string;
  descripcion: string;
  grupo: string;
  accion: string;
}[] {
  const permisos: {
    nombre: string;
    descripcion: string;
    grupo: string;
    accion: string;
  }[] = [];

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

  console.log('🔑 Iniciando siembra limpia de permisos...');

  const rolAdmin = await prisma.rol.findUnique({
    where: { nombre: 'ADMINISTRADOR' },
  });

  const rolEstudiante = await prisma.rol.findUnique({
    where: { nombre: 'ESTUDIANTE' },
  });

  if (!rolAdmin || !rolEstudiante) {
    console.log(
      '⚠️ Roles ADMINISTRADOR o ESTUDIANTE no encontrados. Ejecuta primero los seeds de roles/usuarios.',
    );
    return;
  }

  console.log('🗑️ Eliminando relaciones de permisos...');

  await prisma.rolPermiso.deleteMany({});

  console.log('🗑️ Eliminando permisos existentes...');

  await prisma.permiso.deleteMany({});

  console.log('🔑 Creando permisos...');

  const permisosMap: Record<string, string> = {};

  for (const permiso of permisosData) {
    const created = await prisma.permiso.create({
      data: {
        nombre: permiso.nombre,
        descripcion: permiso.descripcion,
        estado: 'activo',
      },
    });

    permisosMap[permiso.nombre] = created.id;

    console.log(`  🔑 ${permiso.nombre}`);
  }

  console.log('\n👤 Asignando todos los permisos a ADMINISTRADOR...');

  for (const permiso of permisosData) {
    await prisma.rolPermiso.create({
      data: {
        rolId: rolAdmin.id,
        permisoId: permisosMap[permiso.nombre],
      },
    });
  }

  console.log(
    `  ✅ ${permisosData.length} permisos asignados a ADMINISTRADOR`,
  );

  const permisosEstudiante = [
    'cursos.ver',
    'modulos.ver',
    'lecciones.ver',
    'formularios.ver',
    'recursos_lecciones.ver',
    'certificados.ver',
  ];

  console.log('\n👨‍🎓 Asignando permisos a ESTUDIANTE...');

  for (const nombrePermiso of permisosEstudiante) {
    const permisoId = permisosMap[nombrePermiso];

    if (!permisoId) {
      console.log(`  ⚠️ Permiso ${nombrePermiso} no encontrado.`);
      continue;
    }

    await prisma.rolPermiso.create({
      data: {
        rolId: rolEstudiante.id,
        permisoId,
      },
    });

    console.log(`  ✅ ${nombrePermiso}`);
  }

  console.log('\n🎉 ¡Permisos sembrados con éxito!');
  console.log('--------------------------------------------------');
  console.log(`🔑 Permisos totales: ${permisosData.length}`);
  console.log(`👤 ADMINISTRADOR: ${permisosData.length} permisos`);
  console.log(
    `👨‍🎓 ESTUDIANTE: ${permisosEstudiante.length} permisos`,
  );
  console.log('--------------------------------------------------');
}