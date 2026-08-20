/*
  Warnings:

  - You are about to drop the `certificados_curso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `certificados_modulo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "certificados_curso" DROP CONSTRAINT "certificados_curso_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "certificados_curso" DROP CONSTRAINT "certificados_curso_plantillaId_fkey";

-- DropForeignKey
ALTER TABLE "certificados_curso" DROP CONSTRAINT "certificados_curso_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "certificados_modulo" DROP CONSTRAINT "certificados_modulo_inscripcionId_fkey";

-- DropForeignKey
ALTER TABLE "certificados_modulo" DROP CONSTRAINT "certificados_modulo_plantillaId_fkey";

-- DropTable
DROP TABLE "certificados_curso";

-- DropTable
DROP TABLE "certificados_modulo";

-- CreateTable
CREATE TABLE "certificados" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "inscripcionId" TEXT,
    "cursoId" TEXT,
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

    CONSTRAINT "certificados_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "certificados_inscripcionId_key" ON "certificados"("inscripcionId");

-- CreateIndex
CREATE UNIQUE INDEX "certificados_codigoVerificacion_key" ON "certificados"("codigoVerificacion");

-- CreateIndex
CREATE UNIQUE INDEX "certificados_numeroCertificado_key" ON "certificados"("numeroCertificado");

-- CreateIndex
CREATE UNIQUE INDEX "certificados_usuarioId_cursoId_key" ON "certificados"("usuarioId", "cursoId");

-- AddForeignKey
ALTER TABLE "certificados" ADD CONSTRAINT "certificados_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados" ADD CONSTRAINT "certificados_inscripcionId_fkey" FOREIGN KEY ("inscripcionId") REFERENCES "inscripciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados" ADD CONSTRAINT "certificados_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados" ADD CONSTRAINT "certificados_plantillaId_fkey" FOREIGN KEY ("plantillaId") REFERENCES "plantillas_certificado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
