import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

export async function seedEstudiantes(prisma: PrismaClient) {
  const estudiantes = [
    { nombre: 'Carlos', apellidoPaterno: 'García', apellidoMaterno: 'López', genero: 'M', ciudad: 'Ciudad de México', pais: 'México', ocupacion: 'Ingeniero' },
    { nombre: 'María', apellidoPaterno: 'Rodríguez', apellidoMaterno: 'Sánchez', genero: 'F', ciudad: 'Guadalajara', pais: 'México', ocupacion: 'Diseñadora' },
    { nombre: 'Juan', apellidoPaterno: 'Martínez', apellidoMaterno: 'Hernández', genero: 'M', ciudad: 'Monterrey', pais: 'México', ocupacion: 'Desarrollador' },
    { nombre: 'Ana', apellidoPaterno: 'López', apellidoMaterno: 'García', genero: 'F', ciudad: 'Puebla', pais: 'México', ocupacion: 'Contadora' },
    { nombre: 'Pedro', apellidoPaterno: 'Hernández', apellidoMaterno: 'Martínez', genero: 'M', ciudad: 'Tijuana', pais: 'México', ocupacion: 'Arquitecto' },
    { nombre: 'Laura', apellidoPaterno: 'González', apellidoMaterno: 'Rodríguez', genero: 'F', ciudad: 'León', pais: 'México', ocupacion: 'Abogada' },
    { nombre: 'Miguel', apellidoPaterno: 'Sánchez', apellidoMaterno: 'López', genero: 'M', ciudad: 'Mérida', pais: 'México', ocupacion: 'Médico' },
    { nombre: 'Sofía', apellidoPaterno: 'Ramírez', apellidoMaterno: 'González', genero: 'F', ciudad: 'Querétaro', pais: 'México', ocupacion: 'Enfermera' },
    { nombre: 'Alejandro', apellidoPaterno: 'Torres', apellidoMaterno: 'Sánchez', genero: 'M', ciudad: 'San Luis Potosí', pais: 'México', ocupacion: 'Profesor' },
    { nombre: 'Valentina', apellidoPaterno: 'Flores', apellidoMaterno: 'Ramírez', genero: 'F', ciudad: 'Aguascalientes', pais: 'México', ocupacion: 'Psicóloga' },
    { nombre: 'Diego', apellidoPaterno: 'Rivera', apellidoMaterno: 'Torres', genero: 'M', ciudad: 'Morelia', pais: 'México', ocupacion: 'Chef' },
    { nombre: 'Camila', apellidoPaterno: 'Gómez', apellidoMaterno: 'Flores', genero: 'F', ciudad: 'Toluca', pais: 'México', ocupacion: 'Veterinaria' },
    { nombre: 'Andrés', apellidoPaterno: 'Díaz', apellidoMaterno: 'Gómez', genero: 'M', ciudad: 'Veracruz', pais: 'México', ocupacion: 'Piloto' },
    { nombre: 'Isabella', apellidoPaterno: 'Reyes', apellidoMaterno: 'Díaz', genero: 'F', ciudad: 'Cancún', pais: 'México', ocupacion: 'Guía turística' },
    { nombre: 'Sebastián', apellidoPaterno: 'Cruz', apellidoMaterno: 'Reyes', genero: 'M', ciudad: 'Oaxaca', pais: 'México', ocupacion: 'Artesano' },
    { nombre: 'Luciana', apellidoPaterno: 'Morales', apellidoMaterno: 'Cruz', genero: 'F', ciudad: 'Chihuahua', pais: 'México', ocupacion: 'Ingeniera' },
    { nombre: 'Mateo', apellidoPaterno: 'Ortiz', apellidoMaterno: 'Morales', genero: 'M', ciudad: 'Saltillo', pais: 'México', ocupacion: 'Electricista' },
    { nombre: 'Gabriela', apellidoPaterno: 'Gutiérrez', apellidoMaterno: 'Ortiz', genero: 'F', ciudad: 'Hermosillo', pais: 'México', ocupacion: 'Nutrióloga' },
    { nombre: 'Nicolás', apellidoPaterno: 'Castillo', apellidoMaterno: 'Gutiérrez', genero: 'M', ciudad: 'Culiacán', pais: 'México', ocupacion: 'Contador' },
    { nombre: 'Mariana', apellidoPaterno: 'Jiménez', apellidoMaterno: 'Castillo', genero: 'F', ciudad: 'Tampico', pais: 'México', ocupacion: 'Dentista' },
    { nombre: 'Tomás', apellidoPaterno: 'Vargas', apellidoMaterno: 'Jiménez', genero: 'M', ciudad: 'Acapulco', pais: 'México', ocupacion: 'Técnico' },
    { nombre: 'Daniela', apellidoPaterno: 'Ruiz', apellidoMaterno: 'Vargas', genero: 'F', ciudad: 'Pachuca', pais: 'México', ocupacion: 'Farmacéutica' },
    { nombre: 'Lucas', apellidoPaterno: 'Herrera', apellidoMaterno: 'Ruiz', genero: 'M', ciudad: 'Tuxtla Gutiérrez', pais: 'México', ocupacion: 'Biólogo' },
    { nombre: 'Paula', apellidoPaterno: 'Medina', apellidoMaterno: 'Herrera', genero: 'F', ciudad: 'Durango', pais: 'México', ocupacion: 'Química' },
    { nombre: 'Emilio', apellidoPaterno: 'Aguilar', apellidoMaterno: 'Medina', genero: 'M', ciudad: 'Zacatecas', pais: 'México', ocupacion: 'Mecánico' },
    { nombre: 'Regina', apellidoPaterno: 'Romero', apellidoMaterno: 'Aguilar', genero: 'F', ciudad: 'Aguascalientes', pais: 'México', ocupacion: 'Relaciones Públicas' },
    { nombre: 'Joaquín', apellidoPaterno: 'Vega', apellidoMaterno: 'Romero', genero: 'M', ciudad: 'Campeche', pais: 'México', ocupacion: 'Historiador' },
    { nombre: 'Victoria', apellidoPaterno: 'Mendoza', apellidoMaterno: 'Vega', genero: 'F', ciudad: 'La Paz', pais: 'México', ocupacion: 'Trabajadora Social' },
    { nombre: 'Felipe', apellidoPaterno: 'Silva', apellidoMaterno: 'Mendoza', genero: 'M', ciudad: 'Colima', pais: 'México', ocupacion: 'Fotógrafo' },
    { nombre: 'Ana Sofía', apellidoPaterno: 'Rojas', apellidoMaterno: 'Silva', genero: 'F', ciudad: 'Tepic', pais: 'México', ocupacion: 'Periodista' },
    { nombre: 'Santiago', apellidoPaterno: 'Córdoba', apellidoMaterno: 'Rojas', genero: 'M', ciudad: 'Villahermosa', pais: 'México', ocupacion: 'Ingeniero Civil' },
    { nombre: 'Emma', apellidoPaterno: 'Parra', apellidoMaterno: 'Córdoba', genero: 'F', ciudad: 'Tulancingo', pais: 'México', ocupacion: 'Maestra' },
    { nombre: 'Daniel', apellidoPaterno: 'Nieto', apellidoMaterno: 'Parra', genero: 'M', ciudad: 'Celaya', pais: 'México', ocupacion: 'Abogado' },
    { nombre: 'Sara', apellidoPaterno: 'Campos', apellidoMaterno: 'Nieto', genero: 'F', ciudad: 'Irapuato', pais: 'México', ocupacion: 'Bioquímica' },
    { nombre: 'Adrián', apellidoPaterno: 'Peña', apellidoMaterno: 'Campos', genero: 'M', ciudad: 'Guanajuato', pais: 'México', ocupacion: 'Periodista' },
    { nombre: 'Claudia', apellidoPaterno: 'Leal', apellidoMaterno: 'Peña', genero: 'F', ciudad: 'Querétaro', pais: 'México', ocupacion: 'Arquitecta' },
    { nombre: 'Óscar', apellidoPaterno: 'Salazar', apellidoMaterno: 'Leal', genero: 'M', ciudad: 'San Cristóbal', pais: 'México', ocupacion: 'Emprendedor' },
    { nombre: 'Fernanda', apellidoPaterno: 'Delgado', apellidoMaterno: 'Salazar', genero: 'F', ciudad: 'Playa del Carmen', pais: 'México', ocupacion: 'Diseñadora de Interiores' },
    { nombre: 'Raúl', apellidoPaterno: 'Ibarra', apellidoMaterno: 'Delgado', genero: 'M', ciudad: 'Cuernavaca', pais: 'México', ocupacion: 'Chef Pastelero' },
    { nombre: 'Alejandra', apellidoPaterno: 'Fuentes', apellidoMaterno: 'Ibarra', genero: 'F', ciudad: 'Puebla', pais: 'México', ocupacion: 'Musicóloga' },
    { nombre: 'Francisco', apellidoPaterno: 'Acosta', apellidoMaterno: 'Fuentes', genero: 'M', ciudad: 'Tlaxcala', pais: 'México', ocupacion: 'Ingeniero en Sistemas' },
    { nombre: 'Diana', apellidoPaterno: 'Navarro', apellidoMaterno: 'Acosta', genero: 'F', ciudad: 'Ixtapa', pais: 'México', ocupacion: 'Bióloga Marina' },
    { nombre: 'Eduardo', apellidoPaterno: 'Espinoza', apellidoMaterno: 'Navarro', genero: 'M', ciudad: 'Mazatlán', pais: 'México', ocupacion: 'Ingeniero Mecánico' },
    { nombre: 'Liliana', apellidoPaterno: 'Cervantes', apellidoMaterno: 'Espinoza', genero: 'F', ciudad: 'Los Cabos', pais: 'México', ocupacion: 'Guía de Turismo' },
    { nombre: 'Roberto', apellidoPaterno: 'Miranda', apellidoMaterno: 'Cervantes', genero: 'M', ciudad: 'Ensenada', pais: 'México', ocupacion: 'Vinicultor' },
    { nombre: 'Paola', apellidoPaterno: 'Sandoval', apellidoMaterno: 'Miranda', genero: 'F', ciudad: 'Texcoco', pais: 'México', ocupacion: 'Abogada Laboralista' },
    { nombre: 'Mauricio', apellidoPaterno: 'Luna', apellidoMaterno: 'Sandoval', genero: 'M', ciudad: 'Coatzacoalcos', pais: 'México', ocupacion: 'Petróleo' },
    { nombre: 'Adriana', apellidoPaterno: 'Ramos', apellidoMaterno: 'Luna', genero: 'F', ciudad: 'Minatitlán', pais: 'México', ocupacion: 'Administradora' },
    { nombre: 'Jorge', apellidoPaterno: 'Ochoa', apellidoMaterno: 'Ramos', genero: 'M', ciudad: 'Poza Rica', pais: 'México', ocupacion: 'Ingeniero Industrial' },
    { nombre: 'Monserrat', apellidoPaterno: 'Solís', apellidoMaterno: 'Ochoa', genero: 'F', ciudad: 'Cordoba', pais: 'México', ocupacion: 'Trilingüe' },
  ];

  console.log('🎓 Iniciando siembra de 50 estudiantes...');

  const passwordHash = await bcrypt.hash('estudiante123', 10);

  const rolEstudiante = await prisma.rol.upsert({
    where: { nombre: 'ESTUDIANTE' },
    update: {},
    create: {
      nombre: 'ESTUDIANTE',
      descripcion: 'Acceso a clases, tareas y perfil personal',
      estado: 'activo',
    },
  });

  for (let i = 0; i < estudiantes.length; i++) {
    const est = estudiantes[i];
    const numero = String(i + 1).padStart(3, '0');
    const username = `estudiante_${numero}`;
    const correo = `estudiante${numero}@lms.com`;

    const usuario = await prisma.usuario.upsert({
      where: { correo },
      update: {},
      create: {
        username,
        correo,
        contrasenaHash: passwordHash,
        estado: 'activo',
      },
    });

    await prisma.usuarioRol.upsert({
      where: { usuarioId_rolId: { usuarioId: usuario.id, rolId: rolEstudiante.id } },
      update: {},
      create: { usuarioId: usuario.id, rolId: rolEstudiante.id },
    });

    await prisma.perfil.upsert({
      where: { usuarioId: usuario.id },
      update: {},
      create: {
        usuarioId: usuario.id,
        nombre: est.nombre,
        apellidoPaterno: est.apellidoPaterno,
        apellidoMaterno: est.apellidoMaterno,
        genero: est.genero,
        ciudad: est.ciudad,
        pais: est.pais,
        ocupacion: est.ocupacion,
        tipoDocumentoIdentidad: 'INE',
        numeroDocumento: `DOC${numero}${Math.floor(100000 + Math.random() * 900000)}`,
        telefono: `55${Math.floor(10000000 + Math.random() * 90000000)}`,
      },
    });

    console.log(`  ✅ ${numero}/${estudiantes.length} - ${est.nombre} ${est.apellidoPaterno} (${correo})`);
  }

  console.log('\n🎉 ¡50 estudiantes sembrados con éxito!');
  console.log('--------------------------------------------------');
  console.log('🔑 Contraseña general: estudiante123');
  console.log('📧 Emails: estudiante001@lms.com hasta estudiante050@lms.com');
  console.log('--------------------------------------------------');
}