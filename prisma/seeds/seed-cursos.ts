import { PrismaClient } from '@prisma/client';

export async function seedCursos(prisma: PrismaClient) {
  // ─── 1. Crear categorías jerárquicas ───
  const categoriasData = [
    // Categorías principales
    { nombre: 'Tecnología y Desarrollo', slug: 'tecnologia-y-desarrollo' },
    { nombre: 'Ciencia y Datos', slug: 'ciencia-y-datos' },
    { nombre: 'Diseño y Creatividad', slug: 'diseno-y-creatividad' },
    { nombre: 'Seguridad y Operaciones', slug: 'seguridad-y-operaciones' },
    { nombre: 'Negocios y Profesiones', slug: 'negocios-y-profesiones' },
  ];

  // Subcategorías (con referencia al padre)
  const subcategoriasData = [
    // Tecnología y Desarrollo
    { nombre: 'Desarrollo Web', slug: 'desarrollo-web', padreSlug: 'tecnologia-y-desarrollo' },
    { nombre: 'Desarrollo Móvil', slug: 'desarrollo-movil', padreSlug: 'tecnologia-y-desarrollo' },

    // Ciencia y Datos
    { nombre: 'Ciencia de Datos', slug: 'ciencia-de-datos', padreSlug: 'ciencia-y-datos' },
    { nombre: 'Inteligencia Artificial', slug: 'inteligencia-artificial', padreSlug: 'ciencia-y-datos' },

    // Diseño y Creatividad
    { nombre: 'Diseño UX/UI', slug: 'diseno-ux-ui', padreSlug: 'diseno-y-creatividad' },

    // Seguridad y Operaciones
    { nombre: 'Ciberseguridad', slug: 'ciberseguridad', padreSlug: 'seguridad-y-operaciones' },
    { nombre: 'DevOps y Cloud', slug: 'devops-y-cloud', padreSlug: 'seguridad-y-operaciones' },

    // Negocios y Profesiones
    { nombre: 'Marketing Digital', slug: 'marketing-digital', padreSlug: 'negocios-y-profesiones' },
    { nombre: 'Finanzas y Negocios', slug: 'finanzas-y-negocios', padreSlug: 'negocios-y-profesiones' },
    { nombre: 'Habilidades Blandas', slug: 'habilidades-blandas', padreSlug: 'negocios-y-profesiones' },
  ];

  console.log('📂 Iniciando siembra de categorías y cursos...');

  // Crear categorías principales
  const categoriasMap: Record<string, string> = {};

  for (const cat of categoriasData) {
    const created = await prisma.categoria.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        nombre: cat.nombre,
        slug: cat.slug,
        categoriaPadreId: null,
      },
    });
    categoriasMap[cat.slug] = created.id;
    console.log(`  📁 ${cat.nombre}`);
  }

  // Crear subcategorías
  for (const sub of subcategoriasData) {
    const created = await prisma.categoria.upsert({
      where: { slug: sub.slug },
      update: {},
      create: {
        nombre: sub.nombre,
        slug: sub.slug,
        categoriaPadreId: categoriasMap[sub.padreSlug],
      },
    });
    categoriasMap[sub.slug] = created.id;
    console.log(`  📁   └─ ${sub.nombre}`);
  }

  // ─── 2. Crear cursos ───
  const cursos = [
    // ─── Desarrollo Web (10) ───
    { nombre: 'Fundamentos de HTML5 y CSS3', categoriaSlug: 'desarrollo-web', duracionHoras: 20, descripcionCorta: 'Aprende a crear páginas web con HTML5 y estilizar con CSS3 desde cero.', descripcionCompleta: 'Domina los bloques de construcción de la web. Este curso cubre estructura semántica, formularios, tablas, Flexbox, Grid y diseño responsive.' },
    { nombre: 'JavaScript Moderno: ES6+', categoriaSlug: 'desarrollo-web', duracionHoras: 35, descripcionCorta: 'Domina las características más importantes de JavaScript moderno.', descripcionCompleta: 'Arrow functions, destructuring, módulos, promises, async/await, clases y más. Incluye proyectos prácticos.' },
    { nombre: 'React.js desde Cero', categoriaSlug: 'desarrollo-web', duracionHoras: 40, descripcionCorta: 'Crea interfaces de usuario dinámicas con React.', descripcionCompleta: 'Componentes, hooks, estado, contexto, enrutamiento con React Router, y despliegue. Proyecto final incluido.' },
    { nombre: 'Node.js y Express: API RESTful', categoriaSlug: 'desarrollo-web', duracionHoras: 30, descripcionCorta: 'Construye servidores y APIs robustos con Node.js y Express.', descripcionCompleta: 'Rutas, middlewares, autenticación JWT, conexión a bases de datos, validación y buenas prácticas.' },
    { nombre: 'TypeScript para Desarrolladores', categoriaSlug: 'desarrollo-web', duracionHoras: 25, descripcionCorta: 'Agrega tipos a tu JavaScript y reduce errores en tiempo de compilación.', descripcionCompleta: 'Tipos, interfaces, generics, utilidades, configuración y integración con React y Node.js.' },
    { nombre: 'Next.js: Fullstack React', categoriaSlug: 'desarrollo-web', duracionHoras: 45, descripcionCorta: 'Construye aplicaciones fullstack con SSR, SSG y App Router.', descripcionCompleta: 'Server Components, API Routes, middleware, autenticación, bases de datos y despliegue en Vercel.' },
    { nombre: 'Tailwind CSS: Diseño Rápido', categoriaSlug: 'desarrollo-web', duracionHoras: 15, descripcionCorta: 'Estiliza tus proyectos de forma ultrarrápida con utility-first CSS.', descripcionCompleta: 'Clases utilitarias, responsive, temas personalizados, plugin de formularios y optimización de producción.' },
    { nombre: 'GraphQL: API Flexible', categoriaSlug: 'desarrollo-web', duracionHoras: 28, descripcionCorta: 'Crea APIs eficientes con GraphQL y Apollo Server.', descripcionCompleta: 'Schema, resolvers, queries, mutations, subscriptions, integración con React y Node.js.' },
    { nombre: 'Vue.js 3 y Composition API', categoriaSlug: 'desarrollo-web', duracionHoras: 32, descripcionCorta: 'Framework progresivo para construir interfaces reactivas.', descripcionCompleta: 'Reactividad, computed, watchers, Composition API, Pinia, Vue Router y despliegue.' },
    { nombre: 'Docker para Desarrolladores', categoriaSlug: 'desarrollo-web', duracionHoras: 22, descripcionCorta: 'Contenedoriza tus aplicaciones para desarrollo y producción.', descripcionCompleta: 'Dockerfile, docker-compose, volúmenes, redes, multi-stage builds y orquestación básica.' },

    // ─── Ciencia de Datos (8) ───
    { nombre: 'Python para Ciencia de Datos', categoriaSlug: 'ciencia-de-datos', duracionHoras: 38, descripcionCorta: 'Domina NumPy, Pandas y visualización de datos con Python.', descripcionCompleta: 'Estructuras de datos, limpieza, transformación, Matplotlib, Seaborn y análisis exploratorio.' },
    { nombre: 'Machine Learning con Scikit-Learn', categoriaSlug: 'ciencia-de-datos', duracionHoras: 50, descripcionCorta: 'Aprende algoritmos de ML y aplícalos a problemas reales.', descripcionCompleta: 'Regresión, clasificación, clustering, árboles de decisión, validación cruzada e ingeniería de características.' },
    { nombre: 'SQL y Bases de Datos', categoriaSlug: 'ciencia-de-datos', duracionHoras: 25, descripcionCorta: 'Consultas SQL avanzadas y diseño de bases de datos relacionales.', descripcionCompleta: 'JOINs, subconsultas, vistas, procedimientos almacenados, normalización y optimización de consultas.' },
    { nombre: 'Power BI: Dashboards Interactivos', categoriaSlug: 'ciencia-de-datos', duracionHoras: 20, descripcionCorta: 'Crea reportes y paneles de control profesionales.', descripcionCompleta: 'Modelado de datos, DAX, visualizaciones, publicación y compartición de informes.' },
    { nombre: 'Estadística para Analíticos', categoriaSlug: 'ciencia-de-datos', duracionHoras: 30, descripcionCorta: 'Fundamentos de estadística descriptiva e inferencial.', descripcionCompleta: 'Distribuciones, pruebas de hipótesis, regresión, ANOVA y análisis de correlación.' },
    { nombre: 'Deep Learning con TensorFlow', categoriaSlug: 'inteligencia-artificial', duracionHoras: 55, descripcionCorta: 'Redes neuronales, CNNs, RNNs y modelos avanzados.', descripcionCompleta: 'Keras, redes convolucionales, recurrentes, transfer learning y despliegue de modelos.' },
    { nombre: 'Análisis de Datos con R', categoriaSlug: 'ciencia-de-datos', duracionHoras: 28, descripcionCorta: 'Lenguaje estadístico para visualización y análisis.', descripcionCompleta: 'tidyverse, ggplot2, dplyr, modelado estadístico y reportes con RMarkdown.' },
    { nombre: 'MLOps: Deploy de Modelos', categoriaSlug: 'inteligencia-artificial', duracionHoras: 35, descripcionCorta: 'Lleva tus modelos de ML a producción de forma robusta.', descripcionCompleta: 'DVC, MLflow, contenedores, APIs de modelos, monitoreo y pipelines automatizados.' },

    // ─── Diseño UX/UI (7) ───
    { nombre: 'Fundamentos de UX/UI Design', categoriaSlug: 'diseno-ux-ui', duracionHoras: 22, descripcionCorta: 'Principios de diseño centrado en el usuario.', descripcionCompleta: 'User research, wireframing, prototyping, testing, design systems y accesibilidad.' },
    { nombre: 'Figma: Herramienta Profesional', categoriaSlug: 'diseno-ux-ui', duracionHoras: 18, descripcionCorta: 'Domina la herramienta de diseño colaborativo más popular.', descripcionCompleta: 'Componentes, variables, auto layout, prototipos, handoff y trabajo en equipo.' },
    { nombre: 'UI Design: Sistemas de Diseño', categoriaSlug: 'diseno-ux-ui', duracionHoras: 25, descripcionCorta: 'Crea y mantiene sistemas de diseño escalables.', descripcionCompleta: 'Tokens, componentes, patrones, documentación y gobernanza de diseño.' },
    { nombre: 'Motion Design para Interfaces', categoriaSlug: 'diseno-ux-ui', duracionHoras: 20, descripcionCorta: 'Añade animaciones significativas a tus productos.', descripcionCompleta: 'Principios de movimiento, micro-interacciones, After Effects, Lottie y código.' },
    { nombre: 'Accesibilidad Web (a11y)', categoriaSlug: 'diseno-ux-ui', duracionHoras: 15, descripcionCorta: 'Haz tu sitio web usable para todas las personas.', descripcionCompleta: 'WCAG, ARIA, testing de accesibilidad, herramientas de auditoría y checklist.' },
    { nombre: 'Investigación de Usuarios', categoriaSlug: 'diseno-ux-ui', duracionHoras: 18, descripcionCorta: 'Técnicas para entender a tu audiencia.', descripcionCompleta: 'Entrevistas, encuestas, card sorting, user testing, personas y journey maps.' },
    { nombre: 'Diseño de Productos Digitales', categoriaSlug: 'diseno-ux-ui', duracionHoras: 30, descripcionCorta: 'Del concepto al lanzamiento de un producto digital.', descripcionCompleta: 'Discovery, ideación, MVP, métricas, iteración y trabajo cross-functional.' },

    // ─── Ciberseguridad (5) ───
    { nombre: 'Fundamentos de Ciberseguridad', categoriaSlug: 'ciberseguridad', duracionHoras: 25, descripcionCorta: 'Principios esenciales para proteger sistemas y datos.', descripcionCompleta: 'Triada CIA, amenazas, vulnerabilidades, criptografía básica y marcos de seguridad.' },
    { nombre: 'Ethical Hacking y Pentesting', categoriaSlug: 'ciberseguridad', duracionHoras: 45, descripcionCorta: 'Aprende a hackear para proteger.', descripcionCompleta: 'Reconocimiento, escaneo, explotación, levantamiento de privilegios y reportes.' },
    { nombre: 'Seguridad en la Nube (AWS/Azure)', categoriaSlug: 'ciberseguridad', duracionHoras: 30, descripcionCorta: 'Protege infraestructuras cloud.', descripcionCompleta: 'IAM, seguridad de red, cifrado, cumplimiento y monitoreo en AWS y Azure.' },
    { nombre: 'Forense Digital', categoriaSlug: 'ciberseguridad', duracionHoras: 35, descripcionCorta: 'Análisis de incidentes y recolección de evidencia digital.', descripcionCompleta: 'Adquisición de evidencia, análisis de discos, logs, memoria y cadena de custodia.' },
    { nombre: 'Gestión de Incidentes de Seguridad', categoriaSlug: 'ciberseguridad', duracionHoras: 20, descripcionCorta: 'Responde y gestiona brechas de seguridad.', descripcionCompleta: 'Plan de respuesta, contención, eradicación, recuperación y lecciones aprendidas.' },

    // ─── DevOps y Cloud (6) ───
    { nombre: 'Git y GitHub: Control de Versiones', categoriaSlug: 'devops-y-cloud', duracionHoras: 12, descripcionCorta: 'Gestiona tu código como un profesional.', descripcionCompleta: 'Commits, branches, merge, rebase, pull requests, GitHub Actions y flujos de trabajo.' },
    { nombre: 'CI/CD con GitHub Actions', categoriaSlug: 'devops-y-cloud', duracionHoras: 18, descripcionCorta: 'Automatiza tu pipeline de integración y despliegue.', descripcionCompleta: 'Workflows, jobs, secrets, testing automatizado, build y deploy a producción.' },
    { nombre: 'AWS Cloud Practitioner', categoriaSlug: 'devops-y-cloud', duracionHoras: 40, descripcionCorta: 'Certificación fundamental de Amazon Web Services.', descripcionCompleta: 'EC2, S3, RDS, Lambda, IAM, VPC, costos y arquitectura en la nube.' },
    { nombre: 'Kubernetes desde Cero', categoriaSlug: 'devops-y-cloud', duracionHoras: 35, descripcionCorta: 'Orquesta contenedores en producción.', descripcionCompleta: 'Pods, deployments, services, ingress, Helm, y monitoreo con Prometheus.' },
    { nombre: 'Linux y Línea de Comandos', categoriaSlug: 'devops-y-cloud', duracionHoras: 20, descripcionCorta: 'Domina la terminal y la administración de servidores Linux.', descripcionCompleta: 'Shell, permisos, procesos, servicios, red, scripts bash y administración de paquetes.' },
    { nombre: 'Terraform: Infraestructura como Código', categoriaSlug: 'devops-y-cloud', duracionHoras: 28, descripcionCorta: 'Provisiona infraestructura de forma declarativa y replicable.', descripcionCompleta: 'Providers, recursos, módulos, estado remoto, workspaces y mejores prácticas.' },

    // ─── Marketing Digital (5) ───
    { nombre: 'Marketing Digital Completo', categoriaSlug: 'marketing-digital', duracionHoras: 35, descripcionCorta: 'Estrategias digitales para hacer crecer tu negocio.', descripcionCompleta: 'SEO, SEM, redes sociales, email marketing, analytics y embudos de conversión.' },
    { nombre: 'SEO: Posicionamiento en Google', categoriaSlug: 'marketing-digital', duracionHoras: 25, descripcionCorta: 'Aparece en los primeros resultados de búsqueda.', descripcionCompleta: 'Keyword research, SEO on-page, off-page, técnico, herramientas y métricas.' },
    { nombre: 'Google Ads: Publicidad PPC', categoriaSlug: 'marketing-digital', duracionHoras: 22, descripcionCorta: 'Campañas de pago por clic efectivas.', descripcionCompleta: 'Cuentas, campañas, grupos de anuncios, pujas, remarketing y optimización de conversiones.' },
    { nombre: 'Social Media Marketing', categoriaSlug: 'marketing-digital', duracionHoras: 20, descripcionCorta: 'Estrategia y ejecución en redes sociales.', descripcionCompleta: 'Contenido, calendarios, community management, métricas y publicidad pagada.' },
    { nombre: 'Email Marketing Automatizado', categoriaSlug: 'marketing-digital', duracionHoras: 18, descripcionCorta: 'Secuencias de email que convierten.', descripcionCompleta: 'Segmentación, automatización, A/B testing, deliverability y métricas clave.' },

    // ─── Finanzas y Negocios (5) ───
    { nombre: 'Finanzas Personales Inteligentes', categoriaSlug: 'finanzas-y-negocios', duracionHoras: 15, descripcionCorta: 'Toma el control de tu dinero.', descripcionCompleta: 'Presupuesto, ahorro, inversión, deuda y planificación financiera a largo plazo.' },
    { nombre: 'Análisis Financiero con Excel', categoriaSlug: 'finanzas-y-negocios', duracionHoras: 20, descripcionCorta: 'Modelos financieros y dashboards profesionales.', descripcionCompleta: 'Funciones avanzadas, tablas dinámicas, macros VBA y visualización de datos.' },
    { nombre: 'Emprendimiento: De Idea a Negocio', categoriaSlug: 'finanzas-y-negocios', duracionHoras: 28, descripcionCorta: 'Lanza tu startup con metodología probada.', descripcionCompleta: 'Lean Startup, validación, MVP, modelo de negocio, pitch deck y financiamiento.' },
    { nombre: 'Gestión de Proyectos con Scrum', categoriaSlug: 'finanzas-y-negocios', duracionHoras: 18, descripcionCorta: 'Metodología ágil para equipos productivos.', descripcionCompleta: 'Roles, eventos, artefactos, estimación, velocity y mejora continua.' },
    { nombre: 'Inversión en Criptomonedas', categoriaSlug: 'finanzas-y-negocios', duracionHoras: 22, descripcionCorta: 'Entiende el ecosistema crypto y sus oportunidades.', descripcionCompleta: 'Blockchain, DeFi, NFTs, trading, análisis técnico y gestión de riesgo.' },

    // ─── Desarrollo Móvil (4) ───
    { nombre: 'React Native: Apps Móviles', categoriaSlug: 'desarrollo-movil', duracionHoras: 40, descripcionCorta: 'Crea apps nativas para iOS y Android con React.', descripcionCompleta: 'Componentes, navegación, estado, APIs nativas, publicación en stores.' },
    { nombre: 'Flutter: UI Beautiful y Rápida', categoriaSlug: 'desarrollo-movil', duracionHoras: 38, descripcionCorta: 'Framework de Google para interfaces nativas multiplataforma.', descripcionCompleta: 'Widgets, Dart, animaciones, estado, Firebase y despliegue.' },
    { nombre: 'Kotlin para Android', categoriaSlug: 'desarrollo-movil', duracionHoras: 35, descripcionCorta: 'Desarrollo nativo moderno para Android.', descripcionCompleta: 'Sintaxis Kotlin, Android Studio, UI con Compose, Room, Retrofit y arquitectura MVVM.' },
    { nombre: 'Swift y SwiftUI para iOS', categoriaSlug: 'desarrollo-movil', duracionHoras: 35, descripcionCorta: 'Crea apps para iPhone y iPad con las últimas tecnologías de Apple.', descripcionCompleta: 'Swift, SwiftUI, Combine, Core Data, networking y publicación en App Store.' },

    // ─── Habilidades Blandas (5) ───
    { nombre: 'Comunicación Efectiva', categoriaSlug: 'habilidades-blandas', duracionHoras: 12, descripcionCorta: 'Expresa tus ideas con claridad y seguridad.', descripcionCompleta: 'Escucha activa, asertividad, comunicación no verbal, presentaciones y feedback.' },
    { nombre: 'Liderazgo y Gestión de Equipos', categoriaSlug: 'habilidades-blandas', duracionHoras: 20, descripcionCorta: 'Lidera equipos de alto rendimiento.', descripcionCompleta: 'Estilos de liderazgo, motivación, delegación, resolución de conflictos y coaching.' },
    { nombre: 'Pensamiento Crítico y Resolución de Problemas', categoriaSlug: 'habilidades-blandas', duracionHoras: 15, descripcionCorta: 'Toma mejores decisiones con análisis riguroso.', descripcionCompleta: 'Lógica, sesgos cognitivos, frameworks de decisión, creatividad y pensamiento sistémico.' },
    { nombre: 'Gestión del Tiempo y Productividad', categoriaSlug: 'habilidades-blandas', duracionHoras: 10, descripcionCorta: 'Haz más en menos tiempo.', descripcionCompleta: 'Priorización, time blocking, automatización, hábitos y herramientas de productividad.' },
    { nombre: 'Negociación y Persuasión', categoriaSlug: 'habilidades-blandas', duracionHoras: 16, descripcionCorta: 'Alcanza acuerdos beneficiosos para todas las partes.', descripcionCompleta: 'Preparación, BATNA, Técnica de Harvard, negotiation mapping y psicología de la persuasión.' },
  ];

  console.log('\n📚 Iniciando siembra de 50 cursos...');

  let contador = 0;

  for (const curso of cursos) {
    contador++;
    const numero = String(contador).padStart(3, '0');

    const slug = curso.nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const categoriaId = categoriasMap[curso.categoriaSlug];

    await prisma.curso.upsert({
      where: { slug },
      update: {},
      create: {
        nombre: curso.nombre,
        categoriaId,
        slug,
        descripcionCorta: curso.descripcionCorta,
        descripcionCompleta: curso.descripcionCompleta,
        duracionHoras: curso.duracionHoras,
        rutaPortada: null,
        rutaImagenSecundaria: null,
        estado: 'borrador',
        creadoPor: null,
      },
    });

    console.log(`  ✅ ${numero}/50 - ${curso.nombre} [${curso.categoriaSlug}]`);
  }

  console.log('\n🎉 ¡Categorías y 50 cursos sembrados con éxito!');
  console.log('--------------------------------------------------');
  console.log(`📂 Categorías principales: ${categoriasData.length}`);
  console.log(`📂 Subcategorías: ${subcategoriasData.length}`);
  console.log(`📚 Cursos: ${cursos.length}`);
  console.log('--------------------------------------------------');
}
