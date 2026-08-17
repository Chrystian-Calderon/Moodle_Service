<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Moodle Service API

API RESTful para gestión de plataforma LMS (Learning Management System) desarrollada con NestJS, Prisma ORM y PostgreSQL.

---

## Tabla de Contenidos

1. [Descripción](#descripción)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Módulos](#módulos)
   - [Autenticación (Auth)](#1-autenticación-auth)
   - [Usuarios (User)](#2-usuarios-user)
   - [Roles (Rols)](#3-roles-rols)
   - [Permisos (Permissions)](#4-permisos-permissions)
   - [Menús (Menus)](#5-menus-menus)
   - [Cursos (Curso)](#6-cursos-curso)
   - [Módulos de Curso (Modulo)](#7-módulos-de-curso-modulo)
   - [Lecciones (Leccion)](#8-lecciones-leccion)
   - [Recursos de Lección (Recursos Leccion)](#9-recursos-de-lección-recursos-leccion)
   - [Inscripción](#10-inscripción)
   - [Progreso de Curso](#11-progreso-de-curso)
   - [Progreso de Módulo](#12-progreso-de-módulo)
   - [Progreso de Lección](#13-progreso-de-lección)
4. [Infraestructura](#infraestructura)
   - [Prisma (ORM)](#prisma-orm)
   - [Servicios Comunes (Common)](#servicios-comunes-common)
5. [Configuración e Instalación](#configuración-e-instalación)
6. [Scripts Disponibles](#scripts-disponibles)
7. [Base de Datos](#base-de-datos)
8. [Licencia](#licencia)

---

## Descripción

Moodle Service API es el backend del sistema LMS que permite la gestión de cursos, módulos, lecciones, usuarios y seguimiento del progreso de aprendizaje. La API expone endpoints RESTful para ser consumidos por un frontend (app web o móvil).

---

## Estructura del Proyecto

```
src/
├── app.module.ts                 # Módulo raíz de la aplicación
├── main.ts                       # Punto de entrada
├── auth/                         # Módulo de autenticación (JWT, Guards, Strategies)
├── user/                         # Gestión de usuarios
├── rols/                         # Gestión de roles
├── permissions/                  # Gestión de permisos
├── menus/                        # Gestión de menús
├── curso/                        # Gestión de cursos
├── modulo/                       # Gestión de módulos de cursos
├── leccion/                      # Gestión de lecciones
├── recursos-leccion/             # Recursos asociados a lecciones
├── modules/                      # Módulos compuestos
│   ├── inscripcion/              # Inscripciones de usuarios a cursos
│   ├── progreso-curso/           # Seguimiento de progreso en cursos
│   ├── progreso-modulo/          # Seguimiento de progreso en módulos
│   └── progreso-leccion/         # Seguimiento de progreso en lecciones
├── prisma/                       # Servicio de conexión a base de datos
└── common/                       # Utilidades compartidas
    ├── decorator/
    ├── filters/
    ├── guards/
    └── types/
```

---

## Módulos

### 1. Autenticación (Auth)
**Ruta base:** `/auth`

Gestiona la autenticación de usuarios mediante JWT (JSON Web Tokens).

| Archivo | Descripción |
|---------|-------------|
| `auth.controller.ts` | Endpoints de login, registro, refresh token |
| `auth.service.ts` | Lógica de autenticación y validación |
| `auth.module.ts` | Configuración del módulo |
| `dto/` | Data Transfer Objects para requests |
| `guards/` | Guards de autenticación (JwtAuthGuard) |
| `strategies/` | Estrategias de Passport (JwtStrategy) |

---

### 2. Usuarios (User)
**Ruta base:** `/users`

CRUD completo de usuarios del sistema.

| Archivo | Descripción |
|---------|-------------|
| `user.controller.ts` | Endpoints de usuarios |
| `user.service.ts` | Lógica de negocio |
| `user.module.ts` | Configuración del módulo |
| `dto/` | DTOs para crear/actualizar usuarios |
| `entities/` | Entidades/interfaz de usuario |

---

### 3. Roles (Rols)
**Ruta base:** `/rols`

Gestión de roles del sistema (admin, profesor, estudiante, etc.).

| Archivo | Descripción |
|---------|-------------|
| `rols.controller.ts` | Endpoints de roles |
| `rols.service.ts` | Lógica de negocio |
| `rols.module.ts` | Configuración del módulo |

---

### 4. Permisos (Permissions)
**Ruta base:** `/permissions`

Gestión de permisos asociados a roles.

| Archivo | Descripción |
|---------|-------------|
| `permissions.controller.ts` | Endpoints de permisos |
| `permissions.service.ts` | Lógica de negocio |
| `permissions.module.ts` | Configuración del módulo |

---

### 5. Menús (Menus)
**Ruta base:** `/menus`

Gestión de menús de navegación del sistema.

| Archivo | Descripción |
|---------|-------------|
| `menus.controller.ts` | Endpoints de menús |
| `menus.service.ts` | Lógica de negocio |
| `menus.module.ts` | Configuración del módulo |

---

### 6. Cursos (Curso)
**Ruta base:** `/cursos`

CRUD de cursos disponibles en la plataforma.

| Archivo | Descripción |
|---------|-------------|
| `curso.controller.ts` | Endpoints de cursos |
| `curso.service.ts` | Lógica de negocio |
| `curso.module.ts` | Configuración del módulo |
| `dto/` | DTOs para crear/actualizar cursos |
| `entities/` | Entidades/interfaz de curso |

---

### 7. Módulos de Curso (Modulo)
**Ruta base:** `/modulos`

Gestión de módulos que componen un curso.

| Archivo | Descripción |
|---------|-------------|
| `modulo.controller.ts` | Endpoints de módulos |
| `modulo.service.ts` | Lógica de negocio |
| `modulo.module.ts` | Configuración del módulo |

---

### 8. Lecciones (Leccion)
**Ruta base:** `/lecciones`

Gestión de lecciones dentro de un módulo.

| Archivo | Descripción |
|---------|-------------|
| `leccion.controller.ts` | Endpoints de lecciones |
| `leccion.service.ts` | Lógica de negocio |
| `leccion.module.ts` | Configuración del módulo |

---

### 9. Recursos de Lección (Recursos Leccion)
**Ruta base:** `/recursos-leccion`

Gestión de recursos (archivos, enlaces, documentos) asociados a lecciones.

| Archivo | Descripción |
|---------|-------------|
| `recursos-leccion.controller.ts` | Endpoints de recursos |
| `recursos-leccion.service.ts` | Lógica de negocio |
| `recursos-leccion.module.ts` | Configuración del módulo |

---

### 10. Inscripción
**Ruta base:** `/inscripciones`

Gestión de inscripciones de usuarios a cursos.

| Archivo | Descripción |
|---------|-------------|
| `inscripciones.controller.ts` | Endpoints de inscripciones |
| `inscripciones.service.ts` | Lógica de negocio |
| `inscripcion.module.ts` | Configuración del módulo |
| `repositories/` | Capa de acceso a datos |
| `dto/` | DTOs para inscripciones |
| `entities/` | Entidades de inscripción |

---

### 11. Progreso de Curso
**Ruta base:** `/progresos-cursos`

Seguimiento del progreso general de un usuario en un curso.

| Archivo | Descripción |
|---------|-------------|
| `progresos-cursos.controller.ts` | Endpoints de progreso |
| `progresos-cursos.service.ts` | Lógica de negocio |
| `progreso-curso.module.ts` | Configuración del módulo |
| `repositories/` | Capa de acceso a datos |

---

### 12. Progreso de Módulo
**Ruta base:** `/progresos-modulos`

Seguimiento del progreso de un usuario en módulos específicos.

| Archivo | Descripción |
|---------|-------------|
| `progresos-modulos.controller.ts` | Endpoints de progreso |
| `progresos-modulos.service.ts` | Lógica de negocio |
| `progreso-modulo.module.ts` | Configuración del módulo |
| `repositories/` | Capa de acceso a datos |

---

### 13. Progreso de Lección
**Ruta base:** `/progresos-lecciones`

Seguimiento del progreso de un usuario en lecciones específicas.

| Archivo | Descripción |
|---------|-------------|
| `progresos-lecciones.controller.ts` | Endpoints de progreso |
| `progresos-lecciones.service.ts` | Lógica de negocio |
| `progreso-leccion.module.ts` | Configuración del módulo |
| `repositories/` | Capa de acceso a datos |

---

## Infraestructura

### Prisma ORM
**Directorio:** `src/prisma/`

Servicio centralizado de conexión a la base de datos PostgreSQL.

| Archivo | Descripción |
|---------|-------------|
| `prisma.service.ts` | Servicio de conexión y manejo de transacciones |
| `prisma.module.ts` | Módulo global de Prisma |

**Schema:** `prisma/schema.prisma`

### Servicios Comunes (Common)
**Directorio:** `src/common/`

Utilidades compartidas entre módulos.

| Subdirectorio | Descripción |
|---------------|-------------|
| `decorator/` | Decoradores personalizados |
| `filters/` | Filtros de excepciones |
| `guards/` | Guards de autorización |
| `types/` | Tipos e interfaces compartidas |

---

## Configuración e Instalación

### Prerrequisitos
- Node.js >= 18
- PostgreSQL
- pnpm

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con los valores de tu base de datos

# Ejecutar migraciones de Prisma
npx prisma migrate dev

# Generar cliente Prisma
npx prisma generate
```

### Variables de Entorno (`.env`)

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/moodle_db"
JWT_SECRET="tu-secreto-jwt"
JWT_EXPIRATION="1h"
```

---

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm run start` | Iniciar en modo desarrollo |
| `pnpm run start:dev` | Iniciar con hot-reload (watch mode) |
| `pnpm run start:debug` | Iniciar en modo debug |
| `pnpm run start:prod` | Iniciar en modo producción |
| `pnpm run build` | Compilar el proyecto |
| `pnpm run lint` | Ejecutar linter (ESLint) |
| `pnpm run format` | Formatear código con Prettier |
| `pnpm run test` | Ejecutar tests unitarios |
| `pnpm run test:e2e` | Ejecutar tests end-to-end |
| `pnpm run test:cov` | Ejecutar tests con cobertura |

---

## Base de Datos

### Esquema de Relaciones

```
User ──┬── Rol ──── Permissions
       │
       ├── Inscripción ── Curso ── Modulo ── Leccion ── RecursosLeccion
       │                      │         │         │
       │                      │         │         └── ProgresoLeccion
       │                      │         └── ProgresoModulo
       │                      └── ProgresoCurso
       │
       └── Menus
```

### Comandos de Prisma

```bash
# Crear migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Abrir Prisma Studio (UI visual)
npx prisma studio

# Resetear base de datos
npx prisma migrate reset

# Sembrar datos iniciales
npx prisma db seed
```

---

## Licencia

Este proyecto es privado. Todos los derechos reservados.
