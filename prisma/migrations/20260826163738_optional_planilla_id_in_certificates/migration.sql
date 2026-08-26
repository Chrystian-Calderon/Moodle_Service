-- DropForeignKey
ALTER TABLE "certificados" DROP CONSTRAINT "certificados_plantillaId_fkey";

-- AlterTable
ALTER TABLE "certificados" ALTER COLUMN "plantillaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "certificados" ADD CONSTRAINT "certificados_plantillaId_fkey" FOREIGN KEY ("plantillaId") REFERENCES "plantillas_certificado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
