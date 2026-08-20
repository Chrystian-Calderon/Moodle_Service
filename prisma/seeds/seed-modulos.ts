import { PrismaClient } from '@prisma/client';

export async function seedModulos(prisma: PrismaClient) {
  const modulos = [
    // ─── Desarrollo Web ───
    // Fundamentos de HTML5 y CSS3 → 1 módulo
    { cursoSlug: 'fundamentos-de-html5-y-css3', nombre: 'Introducción al Desarrollo Web', descripcion: 'Conceptos base de HTML5 y la estructura de una página web.', fraseMotivacional: 'Todo gran sitio web comienza con una sola línea de código.', orden: 1 },

    // JavaScript Moderno: ES6+ → 2 módulos
    { cursoSlug: 'javascript-moderno-es6', nombre: 'Sintaxis y Estructuras de Datos', descripcion: 'Variables, tipos, arrays, objetos y operadores en JavaScript.', fraseMotivacional: 'JavaScript es el lenguaje de la web. Domínalo y podrás construir cualquier cosa.', orden: 1 },
    { cursoSlug: 'javascript-moderno-es6', nombre: 'Funciones y Programación Asincrónica', descripcion: 'Arrow functions, promises, async/await y manejo del event loop.', fraseMotivacional: 'Asíncrono no es complicado, es simplemente aprender a esperar.', orden: 2 },

    // React.js desde Cero → 2 módulos
    { cursoSlug: 'reactjs-desde-cero', nombre: 'Componentes y JSX', descripcion: 'Creación de componentes funcionales, props y composición.', fraseMotivacional: 'React piensa en UI como piezas de LEGO. Ensámblalas a tu manera.', orden: 1 },
    { cursoSlug: 'reactjs-desde-cero', nombre: 'Hooks y Estado Global', descripcion: 'useState, useEffect, useContext y manejo de estado global.', fraseMotivacional: 'Los hooks son el corazón de React. Aprende a que late.', orden: 2 },

    // Node.js y Express → 1 módulo
    { cursoSlug: 'nodejs-y-express-api-restful', nombre: 'Servidores y Rutas con Express', descripcion: 'Creación de servidores HTTP, middlewares y sistema de rutas.', fraseMotivacional: 'Del lado del servidor es donde nacen las APIs que alimentan al mundo.', orden: 1 },

    // TypeScript → 1 módulo
    { cursoSlug: 'typescript-para-desarrolladores', nombre: 'Tipos, Interfaces y Generics', descripcion: 'Sistema de tipos estático, interfaces, tipos utilitarios y genéricos.', fraseMotivacional: 'TypeScript no te detiene, te protege.', orden: 1 },

    // Next.js → 2 módulos
    { cursoSlug: 'nextjs-fullstack-react', nombre: 'App Router y Server Components', descripcion: 'Navegación basada en archivos, Server Components y layouts.', fraseMotivacional: 'Next.js es React en su máxima expresión.', orden: 1 },
    { cursoSlug: 'nextjs-fullstack-react', nombre: 'API Routes y Autenticación', descripcion: 'Endpoints del servidor, middleware y manejo de sesiones.', fraseMotivacional: 'El fullstack ya no es un sueño, es tu realidad con Next.js.', orden: 2 },

    // Tailwind CSS → 1 módulo
    { cursoSlug: 'tailwind-css-diseno-rapido', nombre: 'Utility-First y Responsive Design', descripcion: 'Clases utilitarias, breakpoints y diseño adaptativo.', fraseMotivacional: 'Diseña más rápido, código más limpio. Eso es Tailwind.', orden: 1 },

    // GraphQL → 1 módulo
    { cursoSlug: 'graphql-api-flexible', nombre: 'Schema, Resolvers y Consultas', descripcion: 'Definición de tipos, resolución de queries y mutations.', fraseMotivacional: 'GraphQL te da el poder de pedir exactamente lo que necesitas.', orden: 1 },

    // Vue.js → 1 módulo
    { cursoSlug: 'vuejs-3-y-composition-api', nombre: 'Reactividad y Composition API', descripcion: 'ref, reactive, computed, watch y composición de lógica reutilizable.', fraseMotivacional: 'Vue es elegancia en cada línea de código.', orden: 1 },

    // Docker → 1 módulo
    { cursoSlug: 'docker-para-desarrolladores', nombre: 'Contenedores y Docker Compose', descripcion: 'Dockerfile, orquestación de servicios y volúmenes de datos.', fraseMotivacional: 'Si funciona en mi contenedor, funciona en cualquier lugar.', orden: 1 },

    // ─── Ciencia de Datos ───
    // Python para Ciencia de Datos → 1 módulo
    { cursoSlug: 'python-para-ciencia-de-datos', nombre: 'NumPy, Pandas y Visualización', descripcion: 'Estructuras de datos numéricas, manipulación de DataFrames y gráficos.', fraseMotivacional: 'Los datos sin análisis son solo ruido. Python te da la llave.', orden: 1 },

    // Machine Learning → 1 módulo
    { cursoSlug: 'machine-learning-con-scikit-learn', nombre: 'Algoritmos Supervisados y No Supervisados', descripcion: 'Regresión, clasificación, clustering y evaluación de modelos.', fraseMotivacional: 'La máquina aprende cuando tú le enseñas con datos.', orden: 1 },

    // SQL → 1 módulo
    { cursoSlug: 'sql-y-bases-de-datos', nombre: 'Consultas SQL y Diseño Relacional', descripcion: 'JOINs, subconsultas, normalización y optimización.', fraseMotivacional: 'SQL es el idioma universal de los datos.', orden: 1 },

    // Power BI → 1 módulo
    { cursoSlug: 'power-bi-dashboards-interactivos', nombre: 'Modelado y Visualización con DAX', descripcion: 'Transformación de datos, measures, KPIs y paneles interactivos.', fraseMotivacional: 'Un buen dashboard cuenta una historia con datos.', orden: 1 },

    // Estadística → 1 módulo
    { cursoSlug: 'estadistica-para-analiticos', nombre: 'Estadística Descriptiva e Inferencial', descripcion: 'Medidas de tendencia, distribuciones, pruebas de hipótesis y regresión.', fraseMotivacional: 'La estadística es el arte de encontrar patrones en el caos.', orden: 1 },

    // Deep Learning → 1 módulo
    { cursoSlug: 'deep-learning-con-tensorflow', nombre: 'Redes Neuronales y Arquitecturas Avanzadas', descripcion: 'CNNs, RNNs, transfer learning y despliegue de modelos.', fraseMotivacional: 'El deep learning imita al cerebro. Tú le das el propósito.', orden: 1 },

    // Análisis de Datos con R → 1 módulo
    { cursoSlug: 'analisis-de-datos-con-r', nombre: 'tidyverse y ggplot2', descripcion: 'Manipulación de datos con dplyr y visualización elegante.', fraseMotivacional: 'R fue creado para statisticians. Ahora es tuyo también.', orden: 1 },

    // MLOps → 1 módulo
    { cursoSlug: 'mlops-deploy-de-modelos', nombre: 'Pipelines y Monitoreo de Modelos', descripcion: 'CI/CD para ML, versionado de datos y observabilidad.', fraseMotivacional: 'Un modelo sin deploy es solo un experimento.', orden: 1 },

    // ─── Diseño y UX ───
    // Fundamentos UX/UI → 1 módulo
    { cursoSlug: 'fundamentos-de-uxui-design', nombre: 'User Research y Wireframing', descripcion: 'Investigación de usuarios, arquitectura de información y bocetos.', fraseMotivacional: 'Diseña para personas, no para pantallas.', orden: 1 },

    // Figma → 1 módulo
    { cursoSlug: 'figma-herramienta-profesional', nombre: 'Componentes, Variables y Prototipos', descripcion: 'Sistema de diseño, auto layout, variables y prototipos interactivos.', fraseMotivacional: 'Figma es tu lienzo digital. Pinta la experiencia perfecta.', orden: 1 },

    // UI Design Sistemas → 1 módulo
    { cursoSlug: 'ui-design-sistemas-de-diseno', nombre: 'Tokens, Componentes y Gobernanza', descripcion: 'Design tokens, patrones reutilizables y documentación.', fraseMotivacional: 'Un sistema de diseño es la memoria viva de tu producto.', orden: 1 },

    // Motion Design → 1 módulo
    { cursoSlug: 'motion-design-para-interfaces', nombre: 'Micro-interacciones y Animación', descripcion: 'Principios de movimiento, After Effects y Lottie.', fraseMotivacional: 'El movimiento le da vida a una interfaz estática.', orden: 1 },

    // Accesibilidad → 1 módulo
    { cursoSlug: 'accesibilidad-web-a11y', nombre: 'WCAG, ARIA y Testing de Accesibilidad', descripcion: 'Estándares de accesibilidad, roles ARIA y herramientas de auditoría.', fraseMotivacional: 'La accesibilidad no es un features, es un derecho.', orden: 1 },

    // Investigación de Usuarios → 1 módulo
    { cursoSlug: 'investigacion-de-usuarios', nombre: 'Entrevistas, Encuestas y User Testing', descripcion: 'Técnicas cualitativas y cuantitativas para entender a los usuarios.', fraseMotivacional: 'No adivines lo que el usuario quiere. Pregúntale.', orden: 1 },

    // Diseño de Productos Digitales → 1 módulo
    { cursoSlug: 'diseno-de-productos-digitales', nombre: 'Discovery, MVP e Iteración', descripcion: 'Validación de ideas, construir el mínimo viable y mejorar.', fraseMotivacional: 'Un producto digital se construye con empatía y datos.', orden: 1 },

    // ─── Ciberseguridad ───
    // Fundamentos de Ciberseguridad → 1 módulo
    { cursoSlug: 'fundamentos-de-ciberseguridad', nombre: 'Triada CIA y Modelo de Amenazas', descripcion: 'Confidencialidad, integridad, disponibilidad y actores de amenazas.', fraseMotivacional: 'La seguridad empieza por entender qué estás protegiendo.', orden: 1 },

    // Ethical Hacking → 1 módulo
    { cursoSlug: 'ethical-hacking-y-pentesting', nombre: 'Reconocimiento y Explotación', descripcion: 'Fase de reconocimiento, escaneo de vulnerabilidades y explotación.', fraseMotivacional: 'Para defender, primero piensa como atacante.', orden: 1 },

    // Seguridad en la Nube → 1 módulo
    { cursoSlug: 'seguridad-en-la-nube-awsazure', nombre: 'IAM, Red y Cifrado en Cloud', descripcion: 'Gestión de identidades, seguridad de red y cifrado de datos.', fraseMotivacional: 'En la nube, la seguridad es responsabilidad compartida.', orden: 1 },

    // Forense Digital → 1 módulo
    { cursoSlug: 'forense-digital', nombre: 'Adquisición y Análisis de Evidencia', descripcion: 'Captura forense, análisis de discos y cadena de custodia.', fraseMotivacional: 'Los bits nunca mienten. Solo necesitas saber dónde buscar.', orden: 1 },

    // Gestión de Incidentes → 1 módulo
    { cursoSlug: 'gestion-de-incidentes-de-seguridad', nombre: 'Respuesta, Contención y Recuperación', descripcion: 'Plan de respuesta a incidentes, contención y lecciones aprendidas.', fraseMotivacional: 'Todo incidente es una oportunidad de mejora.', orden: 1 },

    // ─── DevOps y Cloud ───
    // Git y GitHub → 1 módulo
    { cursoSlug: 'git-y-github-control-de-versiones', nombre: 'Commits, Branches y Pull Requests', descripcion: 'Flujos de trabajo con Git, branching strategies y revisión de código.', fraseMotivacional: 'Git es tu máquina del tiempo. Úsala con sabiduría.', orden: 1 },

    // CI/CD → 1 módulo
    { cursoSlug: 'cicd-con-github-actions', nombre: 'Workflows y Deploy Automatizado', descripcion: 'GitHub Actions, testing, build y despliegue continuo.', fraseMotivacional: 'Automatiza lo repetitivo. Céntrate en lo que importa.', orden: 1 },

    // AWS → 1 módulo
    { cursoSlug: 'aws-cloud-practitioner', nombre: 'Servicios Fundamentales de AWS', descripcion: 'EC2, S3, RDS, Lambda, IAM y arquitectura básica en la nube.', fraseMotivacional: 'AWS es el cimiento de la nube moderna. Conócelo a fondo.', orden: 1 },

    // Kubernetes → 1 módulo
    { cursoSlug: 'kubernetes-desde-cero', nombre: 'Pods, Deployments y Servicios', descripcion: 'Orquestación de contenedores, redes y despliegues.', fraseMotivacional: 'Kubernetes orquesta. Tú diriges.', orden: 1 },

    // Linux → 1 módulo
    { cursoSlug: 'linux-y-linea-de-comandos', nombre: 'Terminal, Permisos y Scripts Bash', descripcion: 'Navegación en terminal, gestión de archivos y scripting.', fraseMotivacional: 'La terminal es la herramienta más poderosa que nunca sabías que tenías.', orden: 1 },

    // Terraform → 1 módulo
    { cursoSlug: 'terraform-infraestructura-como-codigo', nombre: 'Providers, Recursos y Estado', descripcion: 'Declaración de infraestructura, módulos reutilizables y estado remoto.', fraseMotivacional: 'Define tu infraestructura como defines tu código.', orden: 1 },

    // ─── Marketing Digital ───
    // Marketing Digital → 1 módulo
    { cursoSlug: 'marketing-digital-completo', nombre: 'Estrategia Digital y Embudos', descripcion: 'Planificación de canales, embudos de conversión y métricas.', fraseMotivacional: 'El marketing digital es hacer lo correcto, en el momento correcto.', orden: 1 },

    // SEO → 1 módulo
    { cursoSlug: 'seo-posicionamiento-en-google', nombre: 'Keyword Research y SEO On-Page', descripcion: 'Investigación de palabras clave, optimización de contenido y estructura.', fraseMotivacional: 'Si no estás en Google, no existes para muchos.', orden: 1 },

    // Google Ads → 1 módulo
    { cursoSlug: 'google-ads-publicidad-ppc', nombre: 'Campañas, Pujas y Remarketing', descripcion: 'Estructura de campañas, estrategias de puja y audiencias.', fraseMotivacional: 'Cada clic cuenta. Haz que cada peso invertido valga.', orden: 1 },

    // Social Media → 1 módulo
    { cursoSlug: 'social-media-marketing', nombre: 'Contenido, Calendarios y Métricas', descripcion: 'Planificación de contenido, community management y analytics.', fraseMotivacional: 'Las redes sociales son una conversación, no un megáfono.', orden: 1 },

    // Email Marketing → 1 módulo
    { cursoSlug: 'email-marketing-automatizado', nombre: 'Segmentación y Automatización', descripcion: 'Flujos automatizados, segmentación de audiencia y A/B testing.', fraseMotivacional: 'El email sigue siendo el canal con mayor ROI. Úsalo bien.', orden: 1 },

    // ─── Finanzas y Negocios ───
    // Finanzas Personales → 1 módulo
    { cursoSlug: 'finanzas-personales-inteligentes', nombre: 'Presupuesto, Ahorro e Inversión', descripcion: 'Planificación financiera, control de gastos e inversiones básicas.', fraseMotivacional: 'Tu futuro financiero se construye hoy, con cada decisión.', orden: 1 },

    // Análisis Financiero Excel → 1 módulo
    { cursoSlug: 'analisis-financiero-con-excel', nombre: 'Modelos y Dashboards Financieros', descripcion: 'Funciones financieras, tablas dinámicas y macros VBA.', fraseMotivacional: 'Excel es la navaja suiza del análisis financiero.', orden: 1 },

    // Emprendimiento → 1 módulo
    { cursoSlug: 'emprendimiento-de-idea-a-negocio', nombre: 'Validación, MVP y Modelo de Negocio', descripcion: 'Lean Startup, canvas, pitch deck y métricas de tracción.', fraseMotivacional: 'Emprender es lanzarse al vacío y construir el paracaídas en el camino.', orden: 1 },

    // Scrum → 1 módulo
    { cursoSlug: 'gestion-de-proyectos-con-scrum', nombre: 'Roles, Eventos y Artefactos', descripcion: 'Product Owner, Scrum Master, sprints, backlog y retrospectivas.', fraseMotivacional: 'Scrum no es magia. Es disciplina con flexibilidad.', orden: 1 },

    // Criptomonedas → 1 módulo
    { cursoSlug: 'inversion-en-criptomonedas', nombre: 'Blockchain, DeFi y Trading', descripcion: 'Tecnología blockchain, finanzas descentralizadas y análisis técnico.', fraseMotivacional: 'Cripto no es una tendencia. Es una revolución financiera.', orden: 1 },

    // ─── Desarrollo Móvil ───
    // React Native → 1 módulo
    { cursoSlug: 'react-native-apps-moviles', nombre: 'Componentes Nativos y Navegación', descripcion: 'Componentes nativos, React Navigation y acceso a APIs del dispositivo.', fraseMotivacional: 'Una sola base de código, dos plataformas nativas.', orden: 1 },

    // Flutter → 1 módulo
    { cursoSlug: 'flutter-ui-beautiful-y-rapida', nombre: 'Widgets, Dart y Firebase', descripcion: 'Lenguaje Dart, widget tree, estado y integración con Firebase.', fraseMotivacional: 'Flutter dibuja cada pixel. Tú solo imagina.', orden: 1 },

    // Kotlin Android → 1 módulo
    { cursoSlug: 'kotlin-para-android', nombre: 'Kotlin, Compose y Arquitectura MVVM', descripcion: 'Sintaxis Kotlin, Jetpack Compose, Room y patrón MVVM.', fraseMotivacional: 'Kotlin es el futuro de Android. El presente también.', orden: 1 },

    // Swift iOS → 1 módulo
    { cursoSlug: 'swift-y-swiftui-para-ios', nombre: 'SwiftUI, Combine y Core Data', descripcion: ' framework declarativo, programación reactiva y persistencia local.', fraseMotivacional: 'Swift combina potencia y elegancia en un solo lenguaje.', orden: 1 },

    // ─── Habilidades Blandas ───
    // Comunicación → 1 módulo
    { cursoSlug: 'comunicacion-efectiva', nombre: 'Escucha Activa y Asertividad', descripcion: 'Técnicas de comunicación verbal, no verbal y feedback constructivo.', fraseMotivacional: 'Comunicar bien es el superpoder más subestimado.', orden: 1 },

    // Liderazgo → 1 módulo
    { cursoSlug: 'liderazgo-y-gestion-de-equipos', nombre: 'Estilos de Liderazgo y Motivación', descripcion: 'Liderazgo situacional, delegación, coaching y resolución de conflictos.', fraseMotivacional: 'Un líder no crea seguidores. Crea más líderes.', orden: 1 },

    // Pensamiento Crítico → 1 módulo
    { cursoSlug: 'pensamiento-critico-y-resolucion-de-problemas', nombre: 'Sesgos, Frameworks y Creatividad', descripcion: 'Identificación de sesgos, modelos mentales y técnicas de ideación.', fraseMotivacional: 'Pensar mejor es el upgrade más valioso que puedes darte.', orden: 1 },

    // Gestión del Tiempo → 1 módulo
    { cursoSlug: 'gestion-del-tiempo-y-productividad', nombre: 'Priorización y Hábitos Productivos', descripcion: 'Matriz de Eisenhower, time blocking, automatización y rutinas.', fraseMotivacional: 'No se trata de tener más tiempo. Se trata de usar mejor el que tienes.', orden: 1 },

    // Negociación → 1 módulo
    { cursoSlug: 'negociacion-y-persuasion', nombre: 'BATNA, Técnica de Harvard y Persuasión', descripcion: 'Preparación estratégica, intereses vs posiciones y principios de Cialdini.', fraseMotivacional: 'Negociar es encontrar estilo donde todos ganan.', orden: 1 },
  ];

  console.log('📦 Iniciando siembra de 50 módulos...');

  let contador = 0;

  for (const modulo of modulos) {
    contador++;
    const numero = String(contador).padStart(3, '0');

    const curso = await prisma.curso.findUnique({
      where: { slug: modulo.cursoSlug },
      select: { id: true, nombre: true },
    });

    if (!curso) {
      console.log(`  ⚠️  ${numero}/50 - Curso no encontrado: ${modulo.cursoSlug} — Saltando`);
      continue;
    }

    await prisma.modulo.create({
      data: {
        cursoId: curso.id,
        nombre: modulo.nombre,
        descripcion: modulo.descripcion,
        fraseMotivacional: modulo.fraseMotivacional,
        orden: modulo.orden,
        otorgaCertificacion: modulo.orden === 1 && contador <= 10,
        estaPublicado: false,
      },
    });

    console.log(`  ✅ ${numero}/50 - ${modulo.nombre} → ${curso.nombre}`);
  }

  const cursoConModulos = await prisma.curso.findMany({
    select: { nombre: true, _count: { select: { modulos: true } } },
    where: { modulos: { some: {} } },
    orderBy: { nombre: 'asc' },
  });

  console.log('\n🎉 ¡50 módulos sembrados con éxito!');
  console.log('--------------------------------------------------');
  console.log(`📚 Cursos con módulos: ${cursoConModulos.length}`);
  console.log('--------------------------------------------------');
}
