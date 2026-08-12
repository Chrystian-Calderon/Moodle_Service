/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasenaHash" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'activo',
    "correoVerificadoEn" TIMESTAMP(3),
    "ultimoAccesoEn" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfiles" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidoPaterno" TEXT,
    "apellidoMaterno" TEXT,
    "telefono" TEXT,
    "tipoDocumentoIdentidad" TEXT,
    "numeroDocumento" TEXT,
    "fechaNacimiento" TIMESTAMP(3),
    "genero" TEXT,
    "ciudad" TEXT,
    "pais" TEXT,
    "ocupacion" TEXT,
    "contactoEmergenciaNombre" TEXT,
    "contactoEmergenciaTelefono" TEXT,
    "fotografiaRuta" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "perfiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'activo',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_roles" (
    "usuarioId" TEXT NOT NULL,
    "rolId" TEXT NOT NULL,
    "asignadoPor" TEXT,
    "asignadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_roles_pkey" PRIMARY KEY ("usuarioId","rolId")
);

-- CreateTable
CREATE TABLE "menus" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "icono" TEXT,
    "ruta" TEXT,
    "menuPadreId" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT 'activo',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rol_menus" (
    "rolId" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,

    CONSTRAINT "rol_menus_pkey" PRIMARY KEY ("rolId","menuId")
);

-- CreateTable
CREATE TABLE "notificaciones" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "urlAccion" TEXT,
    "datosJson" JSONB,
    "leidaEn" TIMESTAMP(3),
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notificaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cursos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT,
    "slug" TEXT NOT NULL,
    "descripcionCorta" TEXT,
    "descripcionCompleta" TEXT,
    "duracionHoras" INTEGER,
    "rutaPortada" TEXT,
    "rutaImagenSecundaria" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'borrador',
    "creadoPor" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modulos" (
    "id" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "fraseMotivacional" TEXT,
    "rutaImagen" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "otorgaCertificacion" BOOLEAN NOT NULL DEFAULT false,
    "estaPublicado" BOOLEAN NOT NULL DEFAULT false,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "modulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecciones" (
    "id" TEXT NOT NULL,
    "moduloId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "contenidoHtml" TEXT,
    "tipoLeccion" TEXT NOT NULL,
    "urlVideo" TEXT,
    "proveedorVideo" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "esVistaPrevia" BOOLEAN NOT NULL DEFAULT false,
    "requiereLeccionAnteriorCompletada" BOOLEAN NOT NULL DEFAULT true,
    "estaPublicada" BOOLEAN NOT NULL DEFAULT false,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lecciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recursos_leccion" (
    "id" TEXT NOT NULL,
    "leccionId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipoRecurso" TEXT NOT NULL,
    "rutaRecurso" TEXT,
    "urlExterna" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recursos_leccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inscripciones" (
    "id" TEXT NOT NULL,
    "moduloId" TEXT NOT NULL,
    "estudianteId" TEXT NOT NULL,
    "numeroInscripcion" TEXT NOT NULL,
    "fechaInscripcion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL DEFAULT 'activa',
    "estadoAcceso" TEXT NOT NULL DEFAULT 'habilitado',
    "porcentajeAvance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fechaFinalizacion" TIMESTAMP(3),
    "observaciones" TEXT,
    "inscritoPor" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inscripciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progreso_lecciones" (
    "id" TEXT NOT NULL,
    "inscripcionId" TEXT NOT NULL,
    "leccionId" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'bloqueada',
    "porcentaje" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "segundosVisualizados" INTEGER NOT NULL DEFAULT 0,
    "iniciadoEn" TIMESTAMP(3),
    "desbloqueadoEn" TIMESTAMP(3),
    "ultimoAccesoEn" TIMESTAMP(3),
    "completadoEn" TIMESTAMP(3),
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "progreso_lecciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progreso_modulos" (
    "id" TEXT NOT NULL,
    "inscripcionId" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'en_progreso',
    "porcentaje" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "leccionesTotales" INTEGER NOT NULL DEFAULT 0,
    "leccionesCompletadas" INTEGER NOT NULL DEFAULT 0,
    "completadoEn" TIMESTAMP(3),
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "progreso_modulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progreso_cursos" (
    "id" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "estudianteId" TEXT NOT NULL,
    "modulosTotales" INTEGER NOT NULL DEFAULT 0,
    "modulosCompletados" INTEGER NOT NULL DEFAULT 0,
    "porcentaje" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "minutosEstudiados" INTEGER NOT NULL DEFAULT 0,
    "ultimoAccesoEn" TIMESTAMP(3),
    "completadoEn" TIMESTAMP(3),
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "progreso_cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plantillas_certificado" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipoCertificado" TEXT NOT NULL,
    "rutaFondo" TEXT,
    "plantillaHtml" TEXT,
    "orientacion" TEXT NOT NULL DEFAULT 'horizontal',
    "estado" TEXT NOT NULL DEFAULT 'activa',
    "creadoPor" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plantillas_certificado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reglas_certificacion_modulo" (
    "id" TEXT NOT NULL,
    "moduloId" TEXT NOT NULL,
    "porcentajeLeccionesRequerido" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "estado" TEXT NOT NULL DEFAULT 'activa',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reglas_certificacion_modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reglas_certificacion_curso" (
    "id" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "porcentajeModulosRequerido" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "estado" TEXT NOT NULL DEFAULT 'activa',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reglas_certificacion_curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificados_modulo" (
    "id" TEXT NOT NULL,
    "inscripcionId" TEXT NOT NULL,
    "plantillaId" TEXT NOT NULL,
    "codigoVerificacion" TEXT NOT NULL,
    "numeroCertificado" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "fechaEmision" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rutaPdf" TEXT,
    "urlVerificacion" TEXT,
    "hashVerificacion" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'emitido',
    "emitidoPor" TEXT,
    "anuladoEn" TIMESTAMP(3),
    "motivoAnulacion" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certificados_modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificados_curso" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "plantillaId" TEXT NOT NULL,
    "codigoVerificacion" TEXT NOT NULL,
    "numeroCertificado" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "fechaEmision" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rutaPdf" TEXT,
    "urlVerificacion" TEXT,
    "hashVerificacion" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'emitido',
    "emitidoPor" TEXT,
    "anuladoEn" TIMESTAMP(3),
    "motivoAnulacion" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certificados_curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formularios_leccion" (
    "id" TEXT NOT NULL,
    "leccionId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'activo',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "formularios_leccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preguntas_formulario" (
    "id" TEXT NOT NULL,
    "formularioId" TEXT NOT NULL,
    "enunciado" TEXT NOT NULL,
    "tipoPregunta" TEXT NOT NULL DEFAULT 'opcion_unica',
    "orden" INTEGER NOT NULL DEFAULT 0,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "preguntas_formulario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opciones_formulario" (
    "id" TEXT NOT NULL,
    "preguntaFormularioId" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "esCorrecta" BOOLEAN NOT NULL DEFAULT false,
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "opciones_formulario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "respuestas_formulario" (
    "id" TEXT NOT NULL,
    "progresoLeccionId" TEXT NOT NULL,
    "preguntaFormularioId" TEXT NOT NULL,
    "opcionFormularioId" TEXT,
    "esCorrecta" BOOLEAN NOT NULL DEFAULT false,
    "respondidoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "respuestas_formulario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_username_key" ON "usuarios"("username");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "perfiles_usuarioId_key" ON "perfiles"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "roles_nombre_key" ON "roles"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "cursos_slug_key" ON "cursos"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "inscripciones_numeroInscripcion_key" ON "inscripciones"("numeroInscripcion");

-- CreateIndex
CREATE UNIQUE INDEX "progreso_lecciones_inscripcionId_leccionId_key" ON "progreso_lecciones"("inscripcionId", "leccionId");

-- CreateIndex
CREATE UNIQUE INDEX "progreso_modulos_inscripcionId_key" ON "progreso_modulos"("inscripcionId");

-- CreateIndex
CREATE UNIQUE INDEX "progreso_cursos_cursoId_estudianteId_key" ON "progreso_cursos"("cursoId", "estudianteId");

-- CreateIndex
CREATE UNIQUE INDEX "reglas_certificacion_modulo_moduloId_key" ON "reglas_certificacion_modulo"("moduloId");

-- CreateIndex
CREATE UNIQUE INDEX "reglas_certificacion_curso_cursoId_key" ON "reglas_certificacion_curso"("cursoId");

-- CreateIndex
CREATE UNIQUE INDEX "certificados_modulo_inscripcionId_key" ON "certificados_modulo"("inscripcionId");

-- CreateIndex
CREATE UNIQUE INDEX "certificados_modulo_codigoVerificacion_key" ON "certificados_modulo"("codigoVerificacion");

-- CreateIndex
CREATE UNIQUE INDEX "certificados_modulo_numeroCertificado_key" ON "certificados_modulo"("numeroCertificado");

-- CreateIndex
CREATE UNIQUE INDEX "certificados_curso_codigoVerificacion_key" ON "certificados_curso"("codigoVerificacion");

-- CreateIndex
CREATE UNIQUE INDEX "certificados_curso_numeroCertificado_key" ON "certificados_curso"("numeroCertificado");

-- CreateIndex
CREATE UNIQUE INDEX "certificados_curso_usuarioId_cursoId_key" ON "certificados_curso"("usuarioId", "cursoId");

-- CreateIndex
CREATE UNIQUE INDEX "formularios_leccion_leccionId_key" ON "formularios_leccion"("leccionId");

-- AddForeignKey
ALTER TABLE "perfiles" ADD CONSTRAINT "perfiles_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_roles" ADD CONSTRAINT "usuario_roles_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_roles" ADD CONSTRAINT "usuario_roles_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_menuPadreId_fkey" FOREIGN KEY ("menuPadreId") REFERENCES "menus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol_menus" ADD CONSTRAINT "rol_menus_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol_menus" ADD CONSTRAINT "rol_menus_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificaciones" ADD CONSTRAINT "notificaciones_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulos" ADD CONSTRAINT "modulos_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecciones" ADD CONSTRAINT "lecciones_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "modulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recursos_leccion" ADD CONSTRAINT "recursos_leccion_leccionId_fkey" FOREIGN KEY ("leccionId") REFERENCES "lecciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripciones" ADD CONSTRAINT "inscripciones_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "modulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripciones" ADD CONSTRAINT "inscripciones_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progreso_lecciones" ADD CONSTRAINT "progreso_lecciones_inscripcionId_fkey" FOREIGN KEY ("inscripcionId") REFERENCES "inscripciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progreso_lecciones" ADD CONSTRAINT "progreso_lecciones_leccionId_fkey" FOREIGN KEY ("leccionId") REFERENCES "lecciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progreso_modulos" ADD CONSTRAINT "progreso_modulos_inscripcionId_fkey" FOREIGN KEY ("inscripcionId") REFERENCES "inscripciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progreso_cursos" ADD CONSTRAINT "progreso_cursos_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progreso_cursos" ADD CONSTRAINT "progreso_cursos_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reglas_certificacion_modulo" ADD CONSTRAINT "reglas_certificacion_modulo_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "modulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reglas_certificacion_curso" ADD CONSTRAINT "reglas_certificacion_curso_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados_modulo" ADD CONSTRAINT "certificados_modulo_inscripcionId_fkey" FOREIGN KEY ("inscripcionId") REFERENCES "inscripciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados_modulo" ADD CONSTRAINT "certificados_modulo_plantillaId_fkey" FOREIGN KEY ("plantillaId") REFERENCES "plantillas_certificado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados_curso" ADD CONSTRAINT "certificados_curso_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados_curso" ADD CONSTRAINT "certificados_curso_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados_curso" ADD CONSTRAINT "certificados_curso_plantillaId_fkey" FOREIGN KEY ("plantillaId") REFERENCES "plantillas_certificado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formularios_leccion" ADD CONSTRAINT "formularios_leccion_leccionId_fkey" FOREIGN KEY ("leccionId") REFERENCES "lecciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preguntas_formulario" ADD CONSTRAINT "preguntas_formulario_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "formularios_leccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opciones_formulario" ADD CONSTRAINT "opciones_formulario_preguntaFormularioId_fkey" FOREIGN KEY ("preguntaFormularioId") REFERENCES "preguntas_formulario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respuestas_formulario" ADD CONSTRAINT "respuestas_formulario_progresoLeccionId_fkey" FOREIGN KEY ("progresoLeccionId") REFERENCES "progreso_lecciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respuestas_formulario" ADD CONSTRAINT "respuestas_formulario_preguntaFormularioId_fkey" FOREIGN KEY ("preguntaFormularioId") REFERENCES "preguntas_formulario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respuestas_formulario" ADD CONSTRAINT "respuestas_formulario_opcionFormularioId_fkey" FOREIGN KEY ("opcionFormularioId") REFERENCES "opciones_formulario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
