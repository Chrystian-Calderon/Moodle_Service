import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { InscripcionModule } from './modules/inscripcion/inscripcion.module';
import { RolsModule } from './rols/rols.module';
import { PermissionsModule } from './permissions/permissions.module';
import { MenusModule } from './menus/menus.module';
import { ModuloModule } from './modulo/modulo.module';
import { LeccionModule } from './leccion/leccion.module';
import { RecursosLeccionModule } from './recursos-leccion/recursos-leccion.module';
import { CursoModule } from './curso/curso.module';
import { ProgresoLeccionModule } from './modules/progreso-leccion/progreso-leccion.module';
import { ProgresoModuloModule } from './modules/progreso-modulo/progreso-modulo.module';
import { ProgresoCursoModule } from './modules/progreso-curso/progreso-curso.module';
import { FormularioModule } from './formulario/formulario.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    RolsModule,
    PermissionsModule, MenusModule,
    ModuloModule, LeccionModule, RecursosLeccionModule, CursoModule,
    InscripcionModule,
    ProgresoLeccionModule,
    ProgresoModuloModule,
    ProgresoCursoModule,
    FormularioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
