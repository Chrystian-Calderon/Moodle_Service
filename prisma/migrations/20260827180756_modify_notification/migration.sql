/*
  Warnings:

  - You are about to drop the column `datosJson` on the `notificaciones` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notificaciones" DROP COLUMN "datosJson",
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'pendiente';
