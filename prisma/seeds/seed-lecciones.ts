import { PrismaClient } from '@prisma/client';

export async function seedLecciones(prisma: PrismaClient) {
  const modulosConLecciones: Record<string, { nombre: string; descripcion: string; tipoLeccion: string; orden: number; esVistaPrevia?: boolean }[]> = {
    // ─── Desarrollo Web ───
    'Introducción al Desarrollo Web': [
      { nombre: '¿Qué es HTML y por qué aprenderlo?', descripcion: 'Historia de la web, role de HTML y cómo los navegadores interpretan el código.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Estructura semántica de una página', descripcion: 'Etiquetas header, nav, main, section, article, footer y su importancia.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Formularios y validaciones básicas', descripcion: 'Inputs, selects, textareas, validación HTML5 y accesibilidad.', tipoLeccion: 'video', orden: 3 },
      { nombre: 'CSS Flexbox: Diseño Flexible', descripcion: 'Contenedores flex, ejes, alineación y distribución de elementos.', tipoLeccion: 'video', orden: 4 },
      { nombre: 'Actividad: Tu primera página web', descripcion: 'Construye una página personal aplicando HTML5 y CSS3.', tipoLeccion: 'actividad', orden: 5 },
    ],
    'Sintaxis y Estructuras de Datos': [
      { nombre: 'Variables: var, let y const', descripcion: 'Diferencias, scope, hoisting y mejores prácticas de declaracion.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Tipos de datos y operadores', descripcion: 'String, Number, Boolean, null, undefined, object y operadores lógicos.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Arrays y métodos de transformación', descripcion: 'map, filter, reduce, find, sort y spread operator.', tipoLeccion: 'video', orden: 3 },
      { nombre: 'Objetos y desestructuración', descripcion: 'Creación, acceso, spread, rest y destructuring de objetos.', tipoLeccion: 'video', orden: 4 },
    ],
    'Funciones y Programación Asincrónica': [
      { nombre: 'Arrow Functions y closures', descripcion: 'Sintaxis reducida, lexical this y funciones de retorno implícito.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Promesas y encadenamiento', descripcion: 'new Promise, then, catch, finally y patrones de encadenamiento.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Async/Await y manejo de errores', descripcion: 'Syntactic sugar para promesas, try/catch y flujos paralelos.', tipoLeccion: 'video', orden: 3 },
      { nombre: 'El event loop explicado', descripcion: 'Call stack, web APIs, callback queue y microtask queue.', tipoLeccion: 'video', orden: 4 },
    ],
    'Componentes y JSX': [
      { nombre: '¿Qué es React y por qué usarlo?', descripcion: 'Filosofía de React, virtual DOM y ecosistema.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'JSX: JavaScript + XML', descripcion: 'Sintaxis JSX, expresiones, condicionales y listas.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Componentes funcionales y props', descripcion: 'Creación de componentes, paso de datos y composición.', tipoLeccion: 'video', orden: 3 },
      { nombre: 'Eventos y formularios en React', descripcion: 'Manejo de eventos, formularios controlados y validación.', tipoLeccion: 'video', orden: 4 },
    ],
    'Hooks y Estado Global': [
      { nombre: 'useState: Estado local', descripcion: 'Inicialización, actualización funcional y arrays/objetos en estado.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'useEffect: Efectos secundarios', descripcion: 'Ciclo de vida, dependencias, limpieza y patrones comunes.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'useContext: Estado compartido', descripcion: 'Crear contexto, proveer valores y consumir contexto.', tipoLeccion: 'video', orden: 3 },
      { nombre: 'Custom hooks: Reutilización de lógica', descripcion: 'Extracción de lógica compleja en hooks reutilizables.', tipoLeccion: 'video', orden: 4 },
    ],
    'Servidores y Rutas con Express': [
      { nombre: 'Configuración de un servidor Express', descripcion: 'Instalación, primer servidor, middleware básico y estructura de proyecto.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Sistema de rutas y métodos HTTP', descripcion: 'GET, POST, PUT, DELETE, parámetros de ruta y query strings.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Middlewares: El poder de Express', descripcion: 'Middlewares de aplicación, rutas, errores y third-party.', tipoLeccion: 'video', orden: 3 },
    ],
    'Tipos, Interfaces y Generics': [
      { nombre: 'Configuración de TypeScript', descripcion: 'tsconfig.json, compilación, tipos básicos y type inference.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Interfaces y tipos personalizados', descripcion: 'Definición de interfaces, tipos literales, uniones e intersecciones.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Generics: Código reutilizable', descripcion: 'Parámetros de tipo, restricciones y patrones avanzados.', tipoLeccion: 'video', orden: 3 },
    ],
    'App Router y Server Components': [
      { nombre: 'Estructura de archivos y routing', descripcion: 'page.tsx, layout.tsx, loading.tsx y convenciones de carpetas.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Server Components vs Client Components', descripcion: 'Cuándo usar cada uno, directivas use client y server.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Layouts anidados y paraleles', descripcion: 'Layouts compartidos, route groups y layouts paralelos.', tipoLeccion: 'video', orden: 3 },
      { nombre: 'Data fetching en Server Components', descripcion: 'fetch nativo, caching, revalidación y streaming.', tipoLeccion: 'video', orden: 4 },
    ],
    'API Routes y Autenticación': [
      { nombre: 'API Routes y Route Handlers', descripcion: 'Creación de endpoints, métodos HTTP y manejo de requests.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Middlewares de Next.js', descripcion: 'Middleware a nivel de aplicación, rewrites, redirects y authenticación.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Autenticación con JWT y sesiones', descripcion: 'Tokens, refresh tokens, cookies y protección de rutas.', tipoLeccion: 'video', orden: 3 },
    ],
    'Utility-First y Responsive Design': [
      { nombre: 'Filosofía Utility-First', descripcion: 'Por qué utilidades en lugar de clases semánticas y cómo funcionan.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Diseño responsive con breakpoints', descripcion: 'Prefijos sm, md, lg, xl y diseño mobile-first.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Personalización y temas', descripcion: 'tailwind.config.js, colores personalizados y modo oscuro.', tipoLeccion: 'video', orden: 3 },
    ],
    'Schema, Resolvers y Consultas': [
      { nombre: 'Fundamentos de GraphQL', descripcion: 'Schema, tipos, queries, mutations y la diferencia con REST.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Resolvers y manejo de datos', descripcion: 'Funciones resolver, argumentos, contexto y resolución de datos.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Integración con Apollo Server', descripcion: 'Configuración, playground, testing y buenas prácticas.', tipoLeccion: 'video', orden: 3 },
    ],
    'Reactividad y Composition API': [
      { nombre: 'Introducción a Vue 3', descripcion: 'Filosofía, opciones API vs composition API y ecosistema.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'ref y reactive', descripcion: 'Reactividad primitiva, unwrapping y casos de uso.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'computed, watch y lifecycle hooks', descripcion: 'Propiedades computadas, observadores y ciclo de vida.', tipoLeccion: 'video', orden: 3 },
    ],
    'Contenedores y Docker Compose': [
      { nombre: '¿Qué es Docker y por qué importa?', descripcion: 'Contenedores vs máquinas virtuales, Docker Engine y arquitectura.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Dockerfile: Imagenes personalizadas', descripcion: 'Instrucciones, multi-stage builds, optimización y mejores prácticas.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Docker Compose: Multi-servicio', descripcion: 'docker-compose.yml, redes, volúmenes y orquestación local.', tipoLeccion: 'video', orden: 3 },
    ],
    'NumPy, Pandas y Visualización': [
      { nombre: 'Introducción a NumPy', descripcion: 'Arrays, operaciones vectorizadas, indexación y funciones matemáticas.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Pandas: Series y DataFrames', descripcion: 'Lectura de datos, selección, filtrado y transformación.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Visualización con Matplotlib y Seaborn', descripcion: 'Gráficos de líneas, barras, dispersión, heatmaps y personalización.', tipoLeccion: 'video', orden: 3 },
    ],
    'Algoritmos Supervisados y No Supervisados': [
      { nombre: 'Regresión lineal y logística', descripcion: 'Modelos de predicción, evaluación de rendimiento y métricas.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Clasificación: Árboles y Random Forest', descripcion: 'Árboles de decisión, ensemble methods y feature importance.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Clustering: K-Means y DBSCAN', descripcion: 'Agrupamiento no supervisado, selección de K y evaluación.', tipoLeccion: 'video', orden: 3 },
    ],
    'Consultas SQL y Diseño Relacional': [
      { nombre: 'JOINs: Conectando tablas', descripcion: 'INNER, LEFT, RIGHT, FULL y CROSS JOIN con ejemplos prácticos.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Subconsultas y funciones de ventana', descripcion: 'Subqueries correlacionadas, CTEs, ROW_NUMBER y PARTITION BY.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Normalización y diseño de esquemas', descripcion: 'Formas normales, claves primarias/foráneas y relaciones.', tipoLeccion: 'video', orden: 3 },
    ],
    'Modelado y Visualización con DAX': [
      { nombre: 'Modelado de datos en Power BI', descripcion: 'Relaciones, cardinalidad, jerarquías y best practices.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'DAX: Measures y Calculated Columns', descripcion: 'Funciones de tiempo, filters, iterators y patrones avanzados.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Dashboards interactivos', descripcion: 'Visualizaciones, filtros, segmentación y publicación.', tipoLeccion: 'video', orden: 3 },
    ],
    'Estadística Descriptiva e Inferencial': [
      { nombre: 'Medidas de tendencia y dispersión', descripcion: 'Media, mediana, moda, varianza, desviación estándar y rango.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Distribuciones de probabilidad', descripcion: 'Normal, binomial, Poisson y su aplicación práctica.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Pruebas de hipótesis', descripcion: 'H₀ vs H₁, p-value, intervalos de confianza y tipos de error.', tipoLeccion: 'video', orden: 3 },
    ],
    'Redes Neuronales y Arquitecturas Avanzadas': [
      { nombre: 'Perceptrones y redes neuronales', descripcion: 'Neuronas, pesos, funciones de activación y backpropagation.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'CNNs: Redes convolucionales', descripcion: 'Capas de convolución, pooling, arquitecturas populares y transfer learning.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'RNNs y modelos secuenciales', descripcion: 'LSTM, GRU, atención y Transformers.', tipoLeccion: 'video', orden: 3 },
    ],
    'tidyverse y ggplot2': [
      { nombre: 'El ecosistema tidyverse', descripcion: 'dplyr, tidyr, readr y pipe operator (%>%)', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Transformación de datos con dplyr', descripcion: 'filter, select, mutate, summarise, arrange y group_by.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Visualización con ggplot2', descripcion: 'Grammar of graphics, capas, facets, themes y exportación.', tipoLeccion: 'video', orden: 3 },
    ],
    'Pipelines y Monitoreo de Modelos': [
      { nombre: 'CI/CD para Machine Learning', descripcion: 'Automatización de entrenamiento, testing y despliegue.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Versionado de datos y modelos', descripcion: 'DVC, MLflow, experiment tracking y reproducibilidad.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Monitoreo y observabilidad', descripcion: 'Data drift, model degradation, alertas y dashboards.', tipoLeccion: 'video', orden: 3 },
    ],
    'User Research y Wireframing': [
      { nombre: 'Introducción al UX Research', descripcion: 'Por qué investigar, tipos de investigación y cuando hacerlo.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Técnicas de investigación', descripcion: 'Entrevistas, encuestas, observación y análisis competitivo.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Wireframing y prototipado', descripcion: 'Bocetos de baja y alta fidelidad, herramientas y flujo de usuario.', tipoLeccion: 'video', orden: 3 },
    ],
    'Componentes, Variables y Prototipos': [
      { nombre: 'Fundamentos de Figma', descripcion: 'Interfaz, frames, shapes, texto y navegación del canvas.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Componentes y Auto Layout', descripcion: 'Creación de componentes, variants, instancias y auto layout.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Prototipos interactivos', descripcion: 'Conexiones, animaciones, overlays y presentación de prototipos.', tipoLeccion: 'video', orden: 3 },
    ],
    'Tokens, Componentes y Gobernanza': [
      { nombre: 'Design Tokens fundamentales', descripcion: 'Colores, tipografía, espaciado y elevation como tokens.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Patrones de componentes', descripcion: 'Botones, cards, modals, forms y patrones de navegación.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Documentación y gobernanza', descripcion: 'Storybook, guías de estilo y procesos de contribución.', tipoLeccion: 'video', orden: 3 },
    ],
    'Micro-interacciones y Animación': [
      { nombre: 'Principios del motion design', descripcion: 'Timing, easing, ritmo y anticipación en interfaces.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Micro-interacciones efectivas', descripcion: 'Botones, hover states, loading y feedback visual.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Lottie y animación en código', descripcion: 'Exportar desde After Effects, integrar Lottie y CSS animations.', tipoLeccion: 'video', orden: 3 },
    ],
    'WCAG, ARIA y Testing de Accesibilidad': [
      { nombre: 'Estándares WCAG 2.1', descripcion: 'Principios POUR, niveles de conformidad y criterios clave.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Roles ARIA y semántica', descripcion: 'Landmarks, roles, states, properties y reglas de uso.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Herramientas de testing', descripcion: 'Lighthouse, axe, NVDA, VoiceOver y auditorías automatizadas.', tipoLeccion: 'video', orden: 3 },
    ],
    'Entrevistas, Encuestas y User Testing': [
      { nombre: 'Diseño de entrevistas', descripcion: 'Preguntas abiertas, sesgos, grabación y análisis de resultados.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Encuestas y cuestionarios', descripcion: 'Tipos de preguntas, distribución, muestreo y análisis cuantitativo.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'User testing moderado y no moderado', descripcion: 'Tareas, métricas, think-aloud y herramientas de grabación.', tipoLeccion: 'video', orden: 3 },
    ],
    'Discovery, MVP e Iteración': [
      { nombre: 'Fase de Discovery', descripcion: 'Mapa de stakeholders, oportunidades, hipótesis y validación.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Construcción del MVP', descripcion: 'Definición de features, priorización y criterios de éxito.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Iteración basada en datos', descripcion: 'Métricas, A/B testing, feedback loops y mejora continua.', tipoLeccion: 'video', orden: 3 },
    ],
    'Triada CIA y Modelo de Amenazas': [
      { nombre: 'Confidencialidad, Integridad y Disponibilidad', descripcion: 'Definición de cada pilar, amenazas comunes y controles básicos.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Actores de amenazas y motivations', descripcion: 'Hacktivistas, state-sponsored, criminales organizados y script kiddies.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Vulnerabilidades y superficies de ataque', descripcion: 'CVEs, CWEs, OWASP Top 10 y hardening de sistemas.', tipoLeccion: 'video', orden: 3 },
    ],
    'Reconocimiento y Explotación': [
      { nombre: 'Fase de reconocimiento', descripcion: 'OSINT, enumeración, fingerprinting y recolección de información.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Escaneo y enumeración de servicios', descripcion: 'Nmap, Nikto, enum4linux y detección de vulnerabilidades.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Explotación y post-explotación', descripcion: 'Metasploit, payloads, pivoting y mantenimiento de acceso.', tipoLeccion: 'video', orden: 3 },
    ],
    'IAM, Red y Cifrado en Cloud': [
      { nombre: 'Gestión de identidades (IAM)', descripcion: 'Usuarios, roles, políticas, MFA y principio de menor privilegio.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Seguridad de red en la nube', descripcion: 'Security groups, NACLs, VPC, WAF y DDoS protection.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Cifrado y gestión de secretos', descripcion: 'KMS, Secrets Manager, encryption at rest y in transit.', tipoLeccion: 'video', orden: 3 },
    ],
    'Adquisición y Análisis de Evidencia': [
      { nombre: 'Fundamentos de forense digital', descripcion: 'Cadena de custodia, adquisición volátil y no volátil.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Análisis de discos y archivos', descripcion: 'Hashing, recovered files, metadata y timeline analysis.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Análisis de memoria y logs', descripcion: 'Volatility, RAM dumps, log analysis y correlación de eventos.', tipoLeccion: 'video', orden: 3 },
    ],
    'Respuesta, Contención y Recuperación': [
      { nombre: 'Plan de respuesta a incidentes', descripcion: 'Fases, roles, comunicación y documentación.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Contención y eradicación', descripcion: 'Aislamiento de sistemas, eliminación de amenazas y forense.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Recuperación y lecciones aprendidas', descripcion: 'Restauración, validación, post-mortem y mejora de procesos.', tipoLeccion: 'video', orden: 3 },
    ],
    'Commits, Branches y Pull Requests': [
      { nombre: 'Fundamentos de Git', descripcion: 'Repositorio, staging area, commits y historial.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Branching y merging', descripcion: 'Crear branches, merge, rebase y resolución de conflictos.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Pull Requests y code review', descripcion: 'Flujo de PR, revisión de código, checks y merge.', tipoLeccion: 'video', orden: 3 },
    ],
    'Workflows y Deploy Automatizado': [
      { nombre: 'GitHub Actions desde cero', descripcion: 'YAML, triggers, jobs, steps y runners.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Testing automatizado en CI', descripcion: 'Ejecución de tests, coverage reports y status checks.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Deploy a producción', descripcion: 'Deploy a Vercel, AWS, Docker Hub y entornos de staging.', tipoLeccion: 'video', orden: 3 },
    ],
    'Servicios Fundamentales de AWS': [
      { nombre: 'EC2, S3 y RDS', descripcion: 'Computación, almacenamiento y bases de datos gestionadas.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Lambda, API Gateway y DynamoDB', descripcion: 'Serverless, APIs y bases de datos NoSQL.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'IAM, VPC y CloudWatch', descripcion: 'Seguridad, red y monitoreo en AWS.', tipoLeccion: 'video', orden: 3 },
    ],
    'Pods, Deployments y Servicios': [
      { nombre: 'Arquitectura de Kubernetes', descripcion: 'Control plane, nodes, pods, namespaces y objetos básicos.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Deployments y ReplicaSets', descripcion: 'Declaraciones YAML, rolling updates, rollback y escalado.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Services, Ingress y ConfigMaps', descripcion: 'Exposición de aplicaciones, routing y configuración.', tipoLeccion: 'video', orden: 3 },
    ],
    'Terminal, Permisos y Scripts Bash': [
      { nombre: 'Navegación en la terminal', descripcion: 'cd, ls, pwd, find, grep y manejo de archivos.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Permisos y gestión de usuarios', descripcion: 'chmod, chown, grupos, sudo y seguridad básica.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Scripts Bash automatizados', descripcion: 'Variables, condicionales, loops y scripts de mantenimiento.', tipoLeccion: 'video', orden: 3 },
    ],
    'Providers, Recursos y Estado': [
      { nombre: 'Conceptos fundamentales de Terraform', descripcion: 'HCL, providers, recursos y ciclo de vida.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Estado y lock file', descripcion: 'tfstate, state management, backends remotos y workspaces.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Módulos y reutilización', descripcion: 'Creación de módulos, inputs, outputs y registro.', tipoLeccion: 'video', orden: 3 },
    ],
    'Estrategia Digital y Embudos': [
      { nombre: 'Planificación estratégica', descripcion: 'Análisis FODA, buyer persona, objetivos SMART y KPIs.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Embudos de conversión', descripcion: 'TOFU, MOFU, BOFU, touchpoints y métricas por etapa.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Canales digitales integrados', descripcion: 'SEO, redes sociales, email, paid media y owned media.', tipoLeccion: 'video', orden: 3 },
    ],
    'Keyword Research y SEO On-Page': [
      { nombre: 'Investigación de palabras clave', descripcion: 'Herramientas, volumen, intención de búsqueda y competencia.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'SEO On-Page y estructura', descripcion: 'Title tags, meta descriptions, headings, URLs y contenido.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'SEO técnico básico', descripcion: 'Velocidad, mobile-first, sitemaps, robots.txt y schema markup.', tipoLeccion: 'video', orden: 3 },
    ],
    'Campañas, Pujas y Remarketing': [
      { nombre: 'Estructura de cuentas y campañas', descripcion: 'Grupos de anuncios, keywords, match types y calidad de anuncio.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Estrategias de puja y presupuesto', descripcion: 'Manual, automatizado, CPA objetivo y ROAS.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Remarketing y audiencias', descripcion: 'Listas de remarketing, similares, audiencias de intención y YouTube ads.', tipoLeccion: 'video', orden: 3 },
    ],
    'Contenido, Calendarios y Métricas': [
      { nombre: 'Estrategia de contenido', descripcion: 'Pilares de contenido, formats, storytelling y branded content.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Calendario editorial', descripcion: 'Planificación, frecuencia, herramientas y gestión de contenido.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Analytics en redes sociales', descripcion: 'Métricas de alcance, engagement, conversiones y reportes.', tipoLeccion: 'video', orden: 3 },
    ],
    'Segmentación y Automatización': [
      { nombre: 'Segmentación de audiencia', descripcion: 'Criterios, etiquetas, dinámica y segmentos predictivos.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Flujos automatizados', descripcion: 'Welcome series, abandoned cart, re-engagement y lead nurturing.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'A/B testing y optimización', descripcion: 'Subject lines, contenido, horarios y métricas de conversión.', tipoLeccion: 'video', orden: 3 },
    ],
    'Presupuesto, Ahorro e Inversión': [
      { nombre: 'Creación de presupuesto personal', descripcion: 'Método 50/30/20, tracking de gastos y apps de presupuesto.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Fondo de emergencia y ahorro', descripcion: 'Cómo construir un fondo de emergencia y automatizar el ahorro.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Inversión para principiantes', descripcion: 'Acciones, bonos, fondos indexados, ETFs y diversificación.', tipoLeccion: 'video', orden: 3 },
    ],
    'Modelos y Dashboards Financieros': [
      { nombre: 'Funciones financieras en Excel', descripcion: 'VAN, TIR, NPV, PMT, FV y flujos de caja descontados.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Tablas dinámicas y análisis', descripcion: 'Crear, configurar, agrupar y calcular con tablas dinámicas.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Macros VBA para automatización', descripcion: 'Grabación de macros, programación básica y automatización de reportes.', tipoLeccion: 'video', orden: 3 },
    ],
    'Validación, MVP y Modelo de Negocio': [
      { nombre: 'Lean Startup y validación', descripcion: 'Hipótesis, experimentos, build-measure-learn y pivot.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Business Model Canvas', descripcion: 'Bloques del modelo, propuesta de valor, canales y estructura de costos.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Pitch Deck efectivo', descripcion: 'Estructura, storytelling, datos clave y consejos de presentación.', tipoLeccion: 'video', orden: 3 },
    ],
    'Roles, Eventos y Artefactos': [
      { nombre: 'Roles en Scrum', descripcion: 'Product Owner, Scrum Master, Development Team y responsabilidades.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Eventos de Scrum', descripcion: 'Sprint Planning, Daily, Review, Retrospective y refinement.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Artefactos y estimación', descripcion: 'Product Backlog, Sprint Backlog, Increment y story points.', tipoLeccion: 'video', orden: 3 },
    ],
    'Blockchain, DeFi y Trading': [
      { nombre: 'Fundamentos de Blockchain', descripcion: 'Distributed ledger, consenso, minado y tipos de blockchain.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'DeFi y finanzas descentralizadas', descripcion: 'DApps, lending, DEXs, yield farming y riesgos.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Trading y análisis técnico', descripcion: 'Gráficos de velas, tendencias, soporte/resistencia y gestión de riesgo.', tipoLeccion: 'video', orden: 3 },
    ],
    'Componentes Nativos y Navegación': [
      { nombre: 'Setup y primer componente', descripcion: 'Expo CLI, estructura del proyecto y componentes básicos.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'React Navigation', descripcion: 'Stack, tabs, drawer, passing params y deep linking.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Acceso a APIs nativas', descripcion: 'Cámara, geolocalización, notificaciones y almacenamiento local.', tipoLeccion: 'video', orden: 3 },
    ],
    'Widgets, Dart y Firebase': [
      { nombre: 'Introducción a Dart', descripcion: 'Sintaxis, null safety, async/await y orientación a objetos.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Widget tree y estado', descripcion: 'StatelessWidget, StatefulWidget, setState y gestores de estado.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Integración con Firebase', descripcion: 'Auth, Firestore, Storage y Cloud Messaging.', tipoLeccion: 'video', orden: 3 },
    ],
    'Kotlin, Compose y Arquitectura MVVM': [
      { nombre: 'Kotlin esenciales', descripcion: 'Null safety, extension functions, coroutines y patrones.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Jetpack Compose', descripcion: 'Composables, estado, animaciones y theming.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Arquitectura MVVM y Room', descripcion: 'ViewModel, LiveData, Repository y persistencia local.', tipoLeccion: 'video', orden: 3 },
    ],
    'SwiftUI, Combine y Core Data': [
      { nombre: 'Swift moderno', descripcion: 'Optionals, closures, structs, protocols y error handling.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'SwiftUI declarativo', descripcion: 'Views, modifiers, state, binding y navigation.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Combine y Core Data', descripcion: 'Publishers, subscribers, pipelines y persistencia.', tipoLeccion: 'video', orden: 3 },
    ],
    'Escucha Activa y Asertividad': [
      { nombre: 'La escucha activa como habilidad', descripcion: 'Atención plena, empatía, preguntas abiertas y reformulación.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Comunicación asertiva', descripcion: 'Expresar necesidades, decir no, feedback y manejo de conflictos.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Comunicación no verbal', descripcion: 'Lenguaje corporal, tono de voz, contacto visual y espacio personal.', tipoLeccion: 'video', orden: 3 },
    ],
    'Estilos de Liderazgo y Motivación': [
      { nombre: 'Estilos de liderazgo', descripcion: 'Autoritario, democrático, situacional, transformacional y servant.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Motivación de equipos', descripcion: 'Teoría de Herzberg, recompensas intrínsecas y extrínsecas.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Delegación efectiva', descripcion: 'Criterios de delegación, empowerment y seguimiento.', tipoLeccion: 'video', orden: 3 },
    ],
    'Sesgos, Frameworks y Creatividad': [
      { nombre: 'Sesgos cognitivos comunes', descripcion: 'Anclaje, disponibilidad, confirmación y efecto halo.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Modelos mentales para decidir', descripcion: 'Segundo orden, inverso, probabilidades y rulers de pensamiento.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Técnicas de creatividad', descripcion: 'Brainstorming, SCAMPER, Six Thinking Hats y design thinking.', tipoLeccion: 'video', orden: 3 },
    ],
    'Priorización y Hábitos Productivos': [
      { nombre: 'Matriz de Eisenhower y Pareto', descripcion: 'Priorizar por urgencia/importancia y la regla 80/20.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Time blocking y Pomodoro', descripcion: 'Bloques de tiempo, sesiones de foco y descansos estratégicos.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Hábitos y automatización', descripcion: 'Cue-routine-reward, automatización de tareas y herramientas.', tipoLeccion: 'video', orden: 3 },
    ],
    'BATNA, Técnica de Harvard y Persuasión': [
      { nombre: 'Preparación estratégica', descripcion: 'BATNA, WATNA, zona de acuerdo y análisis de intereses.', tipoLeccion: 'video', orden: 1, esVistaPrevia: true },
      { nombre: 'Técnica de Harvard', descripcion: 'Separar personas del problema, enfocarse en intereses, generar opciones.', tipoLeccion: 'video', orden: 2 },
      { nombre: 'Principios de persuasión', descripcion: 'Reciprocidad, compromiso, prueba social, autoridad, escasez y encanto.', tipoLeccion: 'video', orden: 3 },
    ],
  };

  const moduloNombres = Object.keys(modulosConLecciones);
  const totalLecciones = moduloNombres.reduce((sum, key) => sum + modulosConLecciones[key].length, 0);

  console.log(`📖 Iniciando siembra de ${totalLecciones} lecciones en ${moduloNombres.length} módulos...`);

  let contador = 0;

  for (const nombreModulo of moduloNombres) {
    const modulo = await prisma.modulo.findFirst({
      where: { nombre: nombreModulo },
      select: { id: true, nombre: true },
    });

    if (!modulo) {
      console.log(`  ⚠️  Módulo no encontrado: ${nombreModulo} — Saltando`);
      continue;
    }

    const lecciones = modulosConLecciones[nombreModulo];

    for (const leccion of lecciones) {
      contador++;
      const numero = String(contador).padStart(3, '0');

      await prisma.leccion.create({
        data: {
          moduloId: modulo.id,
          nombre: leccion.nombre,
          descripcion: leccion.descripcion,
          contenidoHtml: `<p>${leccion.descripcion}</p>`,
          tipoLeccion: leccion.tipoLeccion,
          orden: leccion.orden,
          esVistaPrevia: leccion.esVistaPrevia ?? false,
          requiereLeccionAnteriorCompletada: leccion.orden > 1,
          estaPublicada: false,
        },
      });

      console.log(`  ✅ ${numero}/${totalLecciones} - ${leccion.nombre} → ${modulo.nombre}`);
    }
  }

  console.log(`\n🎉 ¡${totalLecciones} lecciones sembradas con éxito!`);
  console.log('--------------------------------------------------');
}
