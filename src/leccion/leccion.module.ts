import { Module } from "@nestjs/common";
import { LeccionService } from "./leccion.service";
import { LeccionController } from "./leccion.controller";
import { RecursoLeccionService } from "src/recursos-leccion/recursos-leccion.service";
import { RecursoLeccionController } from "src/recursos-leccion/recursos-leccion.controller";
import { RecursoLeccionItemController } from "src/recursos-leccion/recurso-leccion-item.controller";
import { ProgresoModule } from "src/progreso/progreso.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { RecursosLeccionModule } from "src/recursos-leccion/recursos-leccion.module";
import { CertificadosModule } from "src/certificado/certificado.module";

@Module({
  imports: [CloudinaryModule, RecursosLeccionModule, ProgresoModule, CertificadosModule],
  controllers: [LeccionController, RecursoLeccionController, RecursoLeccionItemController],
  providers: [LeccionService, RecursoLeccionService],
})
export class LeccionModule { }