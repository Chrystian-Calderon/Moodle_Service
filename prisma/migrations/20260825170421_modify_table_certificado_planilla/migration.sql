/*
  Warnings:

  - You are about to drop the column `creadoPor` on the `plantillas_certificado` table. All the data in the column will be lost.
  - You are about to drop the column `orientacion` on the `plantillas_certificado` table. All the data in the column will be lost.
  - You are about to drop the column `plantillaHtml` on the `plantillas_certificado` table. All the data in the column will be lost.
  - Made the column `rutaFondo` on table `plantillas_certificado` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "plantillas_certificado" DROP COLUMN "creadoPor",
DROP COLUMN "orientacion",
DROP COLUMN "plantillaHtml",
ALTER COLUMN "rutaFondo" SET NOT NULL;
