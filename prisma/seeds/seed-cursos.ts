import { PrismaClient } from '@prisma/client';

export async function seedCursos(prisma: PrismaClient) {
  const cursos = [
    // ─── Desarrollo Web (10) ───
    { nombre: 'Fundamentos de HTML5 y CSS3', categoria: 'Desarrollo Web', duracionHoras: 20, descripcionCorta: 'Aprende a crear páginas web con HTML5 y estilizar con CSS3 desde cero.', descripcionCompleta: 'Domina los bloques de construcción de la web. Este curso cubre estructura semántica, formularios, tablas, Flexbox, Grid y diseño responsive.' },
    { nombre: 'JavaScript Moderno: ES6+', categoria: 'Desarrollo Web', duracionHoras: 35, descripcionCorta: 'Domina las características más importantes de JavaScript moderno.', descripcionCompleta: 'Arrow functions, destructuring, módulos, promises, async/await, clases y más. Incluye proyectos prácticos.' },
    { nombre: 'React.js desde Cero', categoria: 'Desarrollo Web', duracionHoras: 40, descripcionCorta: 'Crea interfaces de usuario dinámicas con React.', descripcionCompleta: 'Componentes, hooks, estado, contexto, enrutamiento con React Router, y despliegue. Proyecto final incluido.' },
    { nombre: 'Node.js y Express: API RESTful', categoria: 'Desarrollo Web', duracionHoras: 30, descripcionCorta: 'Construye servidores y APIs robustos con Node.js y Express.', descripcionCompleta: 'Rutas, middlewares, autenticación JWT, conexión a bases de datos, validación y buenas prácticas.' },
    { nombre: 'TypeScript para Desarrolladores', categoria: 'Desarrollo Web', duracionHoras: 25, descripcionCorta: 'Agrega tipos a tu JavaScript y reduce errores en tiempo de compilación.', descripcionCompleta: 'Tipos, interfaces, generics, utilidades, configuración y integración con React y Node.js.' },
    { nombre: 'Next.js: Fullstack React', categoria: 'Desarrollo Web', duracionHoras: 45, descripcionCorta: 'Construye aplicaciones fullstack con SSR, SSG y App Router.', descripcionCompleta: 'Server Components, API Routes, middleware, autenticación, bases de datos y despliegue en Vercel.' },
    { nombre: 'Tailwind CSS: Diseño Rápido', categoria: 'Desarrollo Web', duracionHoras: 15, descripcionCorta: 'Estiliza tus proyectos de forma ultrarrápida con utility-first CSS.', descripcionCompleta: 'Clases utilitarias, responsive, temas personalizados, plugin de formularios y optimización de producción.' },
    { nombre: 'GraphQL: API Flexible', categoria: 'Desarrollo Web', duracionHoras: 28, descripcionCorta: 'Crea APIs eficientes con GraphQL y Apollo Server.', descripcionCompleta: 'Schema, resolvers, queries, mutations, subscriptions, integración con React y Node.js.' },
    { nombre: 'Vue.js 3 y Composition API', categoria: 'Desarrollo Web', duracionHoras: 32, descripcionCorta: 'Framework progresivo para construir interfaces reactivas.', descripcionCompleta: 'Reactividad, computed, watchers, Composition API, Pinia, Vue Router y despliegue.' },
    { nombre: 'Docker para Desarrolladores', categoria: 'Desarrollo Web', duracionHoras: 22, descripcionCorta: 'Contenedoriza tus aplicaciones para desarrollo y producción.', descripcionCompleta: 'Dockerfile, docker-compose, volúmenes, redes, multi-stage builds y orquestación básica.' },

    // ─── Ciencia de Datos (8) ───
    { nombre: 'Python para Ciencia de Datos', categoria: 'Ciencia de Datos', duracionHoras: 38, descripcionCorta: 'Domina NumPy, Pandas y visualización de datos con Python.', descripcionCompleta: 'Estructuras de datos, limpieza, transformación, Matplotlib, Seaborn y análisis exploratorio.' },
    { nombre: 'Machine Learning con Scikit-Learn', categoria: 'Ciencia de Datos', duracionHoras: 50, descripcionCorta: 'Aprende algoritmos de ML y aplícalos a problemas reales.', descripcionCompleta: 'Regresión, clasificación, clustering, árboles de decisión, validación cruzada e ingeniería de características.' },
    { nombre: 'SQL y Bases de Datos', categoria: 'Ciencia de Datos', duracionHoras: 25, descripcionCorta: 'Consultas SQL avanzadas y diseño de bases de datos relacionales.', descripcionCompleta: 'JOINs, subconsultas, vistas, procedimientos almacenados, normalización y optimización de consultas.' },
    { nombre: 'Power BI: Dashboards Interactivos', categoria: 'Ciencia de Datos', duracionHoras: 20, descripcionCorta: 'Crea reportes y paneles de control profesionales.', descripcionCompleta: 'Modelado de datos, DAX, visualizaciones, publicación y compartición de informes.' },
    { nombre: 'Estadística para Analíticos', categoria: 'Ciencia de Datos', duracionHoras: 30, descripcionCorta: 'Fundamentos de estadística descriptiva e inferencial.', descripcionCompleta: 'Distribuciones, pruebas de hipótesis, regresión, ANOVA y análisis de correlación.' },
    { nombre: 'Deep Learning con TensorFlow', categoria: 'Ciencia de Datos', duracionHoras: 55, descripcionCorta: 'Redes neuronales, CNNs, RNNs y modelos avanzados.', descripcionCompleta: 'Keras, redes convolucionales, recurrentes, transfer learning y despliegue de modelos.' },
    { nombre: 'Análisis de Datos con R', categoria: 'Ciencia de Datos', duracionHoras: 28, descripcionCorta: 'Lenguaje estadístico para visualización y análisis.', descripcionCompleta: 'tidyverse, ggplot2, dplyr, modelado estadístico y reportes con RMarkdown.' },
    { nombre: 'MLOps: Deploy de Modelos', categoria: 'Ciencia de Datos', duracionHoras: 35, descripcionCorta: 'Lleva tus modelos de ML a producción de forma robusta.', descripcionCompleta: 'DVC, MLflow, contenedores, APIs de modelos, monitoreo y pipelines automatizados.' },

    // ─── Diseño y UX (7) ───
    { nombre: 'Fundamentos de UX/UI Design', categoria: 'Diseño y UX', duracionHoras: 22, descripcionCorta: 'Principios de diseño centrado en el usuario.', descripcionCompleta: 'User research, wireframing, prototyping, testing, design systems y accesibilidad.' },
    { nombre: 'Figma: Herramienta Profesional', categoria: 'Diseño y UX', duracionHoras: 18, descripcionCorta: 'Domina la herramienta de diseño colaborativo más popular.', descripcionCompleta: 'Componentes, variables, auto layout, prototipos, handoff y trabajo en equipo.' },
    { nombre: 'UI Design: Sistemas de Diseño', categoria: 'Diseño y UX', duracionHoras: 25, descripcionCorta: 'Crea y mantiene sistemas de diseño escalables.', descripcionCompleta: 'Tokens, componentes, patrones, documentación y gobernanza de diseño.' },
    { nombre: 'Motion Design para Interfaces', categoria: 'Diseño y UX', duracionHoras: 20, descripcionCorta: 'Añade animaciones significativas a tus productos.', descripcionCompleta: 'Principios de movimiento, micro-interacciones, After Effects, Lottie y código.' },
    { nombre: 'Accesibilidad Web (a11y)', categoria: 'Diseño y UX', duracionHoras: 15, descripcionCorta: 'Haz tu sitio web usable para todas las personas.', descripcionCompleta: 'WCAG, ARIA, testing de accesibilidad, herramientas de auditoría y checklist.' },
    { nombre: 'Investigación de Usuarios', categoria: 'Diseño y UX', duracionHoras: 18, descripcionCorta: 'Técnicas para entender a tu audiencia.', descripcionCompleta: 'Entrevistas, encuestas, card sorting, user testing, personas y journey maps.' },
    { nombre: 'Diseño de Productos Digitales', categoria: 'Diseño y UX', duracionHoras: 30, descripcionCorta: 'Del concepto al lanzamiento de un producto digital.', descripcionCompleta: 'Discovery, ideación, MVP, métricas, iteración y trabajo cross-functional.' },

    // ─── Ciberseguridad (5) ───
    { nombre: 'Fundamentos de Ciberseguridad', categoria: 'Ciberseguridad', duracionHoras: 25, descripcionCorta: 'Principios esenciales para proteger sistemas y datos.', descripcionCompleta: 'Triada CIA, amenazas, vulnerabilidades, criptografía básica y marcos de seguridad.' },
    { nombre: 'Ethical Hacking y Pentesting', categoria: 'Ciberseguridad', duracionHoras: 45, descripcionCorta: 'Aprende a hackear para proteger.', descripcionCompleta: 'Reconocimiento, escaneo, explotación, levantamiento de privilegios y reportes.' },
    { nombre: 'Seguridad en la Nube (AWS/Azure)', categoria: 'Ciberseguridad', duracionHoras: 30, descripcionCorta: 'Protege infraestructuras cloud.', descripcionCompleta: 'IAM, seguridad de red, cifrado, cumplimiento y monitoreo en AWS y Azure.' },
    { nombre: 'Forense Digital', categoria: 'Ciberseguridad', duracionHoras: 35, descripcionCorta: 'Análisis de incidentes y recolección de evidencia digital.', descripcionCompleta: 'Adquisición de evidencia, análisis de discos, logs, memoria y cadena de custodia.' },
    { nombre: 'Gestión de Incidentes de Seguridad', categoria: 'Ciberseguridad', duracionHoras: 20, descripcionCorta: 'Responde y gestiona brechas de seguridad.', descripcionCompleta: 'Plan de respuesta, contención, eradicación, recuperación y lecciones aprendidas.' },

    // ─── DevOps y Cloud (6) ───
    { nombre: 'Git y GitHub: Control de Versiones', categoria: 'DevOps y Cloud', duracionHoras: 12, descripcionCorta: 'Gestiona tu código como un profesional.', descripcionCompleta: 'Commits, branches, merge, rebase, pull requests, GitHub Actions y flujos de trabajo.' },
    { nombre: 'CI/CD con GitHub Actions', categoria: 'DevOps y Cloud', duracionHoras: 18, descripcionCorta: 'Automatiza tu pipeline de integración y despliegue.', descripcionCompleta: 'Workflows, jobs, secrets, testing automatizado, build y deploy a producción.' },
    { nombre: 'AWS Cloud Practitioner', categoria: 'DevOps y Cloud', duracionHoras: 40, descripcionCorta: 'Certificación fundamental de Amazon Web Services.', descripcionCompleta: 'EC2, S3, RDS, Lambda, IAM, VPC, costos y arquitectura en la nube.' },
    { nombre: 'Kubernetes desde Cero', categoria: 'DevOps y Cloud', duracionHoras: 35, descripcionCorta: 'Orquesta contenedores en producción.', descripcionCompleta: 'Pods, deployments, services, ingress, Helm, y monitoreo con Prometheus.' },
    { nombre: 'Linux y Línea de Comandos', categoria: 'DevOps y Cloud', duracionHoras: 20, descripcionCorta: 'Domina la terminal y la administración de servidores Linux.', descripcionCompleta: 'Shell, permisos, procesos, servicios, red, scripts bash y administración de paquetes.' },
    { nombre: 'Terraform: Infraestructura como Código', categoria: 'DevOps y Cloud', duracionHoras: 28, descripcionCorta: 'Provisiona infraestructura de forma declarativa y replicable.', descripcionCompleta: 'Providers, recursos, módulos, estado remoto, workspaces y mejores prácticas.' },

    // ─── Marketing Digital (5) ───
    { nombre: 'Marketing Digital Completo', categoria: 'Marketing Digital', duracionHoras: 35, descripcionCorta: 'Estrategias digitales para hacer crecer tu negocio.', descripcionCompleta: 'SEO, SEM, redes sociales, email marketing, analytics y embudos de conversión.' },
    { nombre: 'SEO: Posicionamiento en Google', categoria: 'Marketing Digital', duracionHoras: 25, descripcionCorta: 'Aparece en los primeros resultados de búsqueda.', descripcionCompleta: 'Keyword research, SEO on-page, off-page, técnico, herramientas y métricas.' },
    { nombre: 'Google Ads: Publicidad PPC', categoria: 'Marketing Digital', duracionHoras: 22, descripcionCorta: 'Campañas de pago por clic efectivas.', descripcionCompleta: 'Cuentas, campañas, grupos de anuncios, pujas, remarketing y optimización de conversiones.' },
    { nombre: 'Social Media Marketing', categoria: 'Marketing Digital', duracionHoras: 20, descripcionCorta: 'Estrategia y ejecución en redes sociales.', descripcionCompleta: 'Contenido, calendarios, community management, métricas y publicidad pagada.' },
    { nombre: 'Email Marketing Automatizado', categoria: 'Marketing Digital', duracionHoras: 18, descripcionCorta: 'Secuencias de email que convierten.', descripcionCompleta: 'Segmentación, automatización, A/B testing, deliverability y métricas clave.' },

    // ─── Finanzas y Negocios (5) ───
    { nombre: 'Finanzas Personales Inteligentes', categoria: 'Finanzas y Negocios', duracionHoras: 15, descripcionCorta: 'Toma el control de tu dinero.', descripcionCompleta: 'Presupuesto, ahorro, inversión, deuda y planificación financiera a largo plazo.' },
    { nombre: 'Análisis Financiero con Excel', categoria: 'Finanzas y Negocios', duracionHoras: 20, descripcionCorta: 'Modelos financieros y dashboards profesionales.', descripcionCompleta: 'Funciones avanzadas, tablas dinámicas, macros VBA y visualización de datos.' },
    { nombre: 'Emprendimiento: De Idea a Negocio', categoria: 'Finanzas y Negocios', duracionHoras: 28, descripcionCorta: 'Lanza tu startup con metodología probada.', descripcionCompleta: 'Lean Startup, validación, MVP, modelo de negocio, pitch deck y financiamiento.' },
    { nombre: 'Gestión de Proyectos con Scrum', categoria: 'Finanzas y Negocios', duracionHoras: 18, descripcionCorta: 'Metodología ágil para equipos productivos.', descripcionCompleta: 'Roles, eventos, artefactos, estimación, velocity y mejora continua.' },
    { nombre: 'Inversión en Criptomonedas', categoria: 'Finanzas y Negocios', duracionHoras: 22, descripcionCorta: 'Entiende el ecosistema crypto y sus oportunidades.', descripcionCompleta: 'Blockchain, DeFi, NFTs, trading, análisis técnico y gestión de riesgo.' },

    // ─── Desarrollo Móvil (4) ───
    { nombre: 'React Native: Apps Móviles', categoria: 'Desarrollo Móvil', duracionHoras: 40, descripcionCorta: 'Crea apps nativas para iOS y Android con React.', descripcionCompleta: 'Componentes, navegación, estado, APIs nativas, publicación en stores.' },
    { nombre: 'Flutter: UI Beautiful y Rápida', categoria: 'Desarrollo Móvil', duracionHoras: 38, descripcionCorta: 'Framework de Google para interfaces nativas multiplataforma.', descripcionCompleta: 'Widgets, Dart, animaciones, estado, Firebase y despliegue.' },
    { nombre: 'Kotlin para Android', categoria: 'Desarrollo Móvil', duracionHoras: 35, descripcionCorta: 'Desarrollo nativo moderno para Android.', descripcionCompleta: 'Sintaxis Kotlin, Android Studio, UI con Compose, Room, Retrofit y arquitectura MVVM.' },
    { nombre: 'Swift y SwiftUI para iOS', categoria: 'Desarrollo Móvil', duracionHoras: 35, descripcionCorta: 'Crea apps para iPhone y iPad con las últimas tecnologías de Apple.', descripcionCompleta: 'Swift, SwiftUI, Combine, Core Data, networking y publicación en App Store.' },

    // ─── Habilidades Blandas (5) ───
    { nombre: 'Comunicación Efectiva', categoria: 'Habilidades Blandas', duracionHoras: 12, descripcionCorta: 'Expresa tus ideas con claridad y seguridad.', descripcionCompleta: 'Escucha activa, asertividad, comunicación no verbal, presentaciones y feedback.' },
    { nombre: 'Liderazgo y Gestión de Equipos', categoria: 'Habilidades Blandas', duracionHoras: 20, descripcionCorta: 'Lidera equipos de alto rendimiento.', descripcionCompleta: 'Estilos de liderazgo, motivación, delegación, resolución de conflictos y coaching.' },
    { nombre: 'Pensamiento Crítico y Resolución de Problemas', categoria: 'Habilidades Blandas', duracionHoras: 15, descripcionCorta: 'Toma mejores decisiones con análisis riguroso.', descripcionCompleta: 'Lógica, sesgos cognitivos, frameworks de decisión, creatividad y pensamiento sistémico.' },
    { nombre: 'Gestión del Tiempo y Productividad', categoria: 'Habilidades Blandas', duracionHoras: 10, descripcionCorta: 'Haz más en menos tiempo.', descripcionCompleta: 'Priorización, time blocking, automatización, hábitos y herramientas de productividad.' },
    { nombre: 'Negociación y Persuasión', categoria: 'Habilidades Blandas', duracionHoras: 16, descripcionCorta: 'Alcanza acuerdos beneficiosos para todas las partes.', descripcionCompleta: 'Preparación, BATNA, Técnica de Harvard, negotiation mapping y psicología de la persuasión.' },
  ];

  console.log('📚 Iniciando siembra de 50 cursos...');

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

    await prisma.curso.upsert({
      where: { slug },
      update: {},
      create: {
        nombre: curso.nombre,
        categoria: curso.categoria,
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

    console.log(`  ✅ ${numero}/50 - ${curso.nombre} [${curso.categoria}]`);
  }

  const categorias = Array.from(new Set(cursos.map((c) => c.categoria)));

  console.log('\n🎉 ¡50 cursos sembrados con éxito!');
  console.log('--------------------------------------------------');
  console.log(`📂 Categorías: ${categorias.length}`);
  categorias.forEach((cat) => {
    const total = cursos.filter((c) => c.categoria === cat).length;
    console.log(`   - ${cat}: ${total} cursos`);
  });
  console.log('--------------------------------------------------');
}
