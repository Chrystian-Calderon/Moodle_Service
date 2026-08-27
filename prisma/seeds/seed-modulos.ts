import { PrismaClient } from '@prisma/client';

export async function seedModulos(prisma: PrismaClient) {
  const modulos = [
    // ─── Desarrollo Web ───
    // Fundamentos de HTML5 y CSS3 → 5 módulos
    { cursoSlug: 'fundamentos-de-html5-y-css3', nombre: 'Introducción al Desarrollo Web', descripcion: 'Conceptos base de HTML5 y la estructura de una página web.', fraseMotivacional: 'Todo gran sitio web comienza con una sola línea de código.', orden: 1 },
    { cursoSlug: 'fundamentos-de-html5-y-css3', nombre: 'HTML Semántico y Formularios', descripcion: 'Etiquetas semánticas, formularios, validaciones y accesibilidad básica.', fraseMotivacional: 'HTML no es solo contenido, es significado.', orden: 2 },
    { cursoSlug: 'fundamentos-de-html5-y-css3', nombre: 'CSS3: Selectores y Propiedades', descripcion: 'Selectores, cascade, specificity, box model y unidades.', fraseMotivacional: 'Domina el cascade y dominarás el diseño.', orden: 3 },
    { cursoSlug: 'fundamentos-de-html5-y-css3', nombre: 'Flexbox, Grid y Responsive', descripcion: 'Layouts modernos, Flexbox, CSS Grid y media queries.', fraseMotivacional: 'Flexbox y Grid son las herramientas de diseño del siglo XXI.', orden: 4 },
    { cursoSlug: 'fundamentos-de-html5-y-css3', nombre: 'Proyecto Final: Portafolio Web', descripcion: 'Construye un portafolio personal completo y responsive.', fraseMotivacional: 'Tu primer proyecto es el primer paso de tu carrera.', orden: 5 },

    // JavaScript Moderno: ES6+ → 6 módulos
    { cursoSlug: 'javascript-moderno-es6', nombre: 'Sintaxis y Variables', descripcion: 'let, const, tipos de datos, templates literals y destructuring.', fraseMotivacional: 'JavaScript es el lenguaje de la web. Domínalo y podrás construir cualquier cosa.', orden: 1 },
    { cursoSlug: 'javascript-moderno-es6', nombre: 'Arrays y Objetos', descripcion: 'Métodos de arrays, spread/rest, objetos, optional chaining.', fraseMotivacional: 'Los arrays y objetos son los contenedores de tu información.', orden: 2 },
    { cursoSlug: 'javascript-moderno-es6', nombre: 'Funciones y Closures', descripcion: 'Arrow functions, closures, higher-order functions, callbacks.', fraseMotivacional: 'Las funciones son los bloques de construcción de tu lógica.', orden: 3 },
    { cursoSlug: 'javascript-moderno-es6', nombre: 'Programación Asincrónica', descripcion: 'Callbacks, promises, async/await, event loop.', fraseMotivacional: 'Asíncrono no es complicado, es simplemente aprender a esperar.', orden: 4 },
    { cursoSlug: 'javascript-moderno-es6', nombre: 'DOM y Eventos', descripcion: 'Manipulación del DOM, event delegation, bubbling, capturing.', fraseMotivacional: 'El DOM es el puente entre tu código y el navegador.', orden: 5 },
    { cursoSlug: 'javascript-moderno-es6', nombre: 'Módulos y Herramientas Modernas', descripcion: 'ES Modules, npm, bundlers, transpiladores.', fraseMotivacional: 'Organizar tu código es tan importante como escribirlo.', orden: 6 },

    // React.js desde Cero → 5 módulos
    { cursoSlug: 'reactjs-desde-cero', nombre: 'Introducción a React y JSX', descripcion: 'Filosofía React, JSX, primer componente, Vite.', fraseMotivacional: 'React piensa en UI como piezas de LEGO. Ensámblalas a tu manera.', orden: 1 },
    { cursoSlug: 'reactjs-desde-cero', nombre: 'Componentes y Props', descripcion: 'Componentes funcionales, props, children, composición.', fraseMotivacional: 'Los componentes son los átomos de tu interfaz.', orden: 2 },
    { cursoSlug: 'reactjs-desde-cero', nombre: 'Hooks Fundamentales', descripcion: 'useState, useEffect, useRef, reglas de hooks.', fraseMotivacional: 'Los hooks son el corazón de React. Aprende a que late.', orden: 3 },
    { cursoSlug: 'reactjs-desde-cero', nombre: 'Hooks Avanzados y Context', descripcion: 'useContext, useReducer, custom hooks, manejo de estado.', fraseMotivacional: 'Domina los hooks y dominarás React.', orden: 4 },
    { cursoSlug: 'reactjs-desde-cero', nombre: 'Enrutamiento y Proyecto Final', descripcion: 'React Router, protección de rutas, lazy loading, proyecto completo.', fraseMotivacional: 'Una app sin rutas es como un libro sin capítulos.', orden: 5 },

    // Node.js y Express → 5 módulos
    { cursoSlug: 'nodejs-y-express-api-restful', nombre: 'Fundamentos de Node.js', descripcion: 'Event loop, módulos, npm, file system, streams.', fraseMotivacional: 'Node.js trae JavaScript al servidor.', orden: 1 },
    { cursoSlug: 'nodejs-y-express-api-restful', nombre: 'Servidores con Express', descripcion: 'Rutas, middlewares, parámetros, query strings.', fraseMotivacional: 'Del lado del servidor es donde nacen las APIs que alimentan al mundo.', orden: 2 },
    { cursoSlug: 'nodejs-y-express-api-restful', nombre: 'Autenticación y Seguridad', descripcion: 'JWT, bcrypt, rate limiting, CORS, helmet.', fraseMotivacional: 'La seguridad no es un feature, es una necesidad.', orden: 3 },
    { cursoSlug: 'nodejs-y-express-api-restful', nombre: 'Base de Datos con Prisma', descripcion: 'Schema, migraciones, CRUD, relaciones, transacciones.', fraseMotivacional: 'Los datos son el oxígeno de tu aplicación.', orden: 4 },
    { cursoSlug: 'nodejs-y-express-api-restful', nombre: 'Testing y Despliegue', descripcion: 'Jest, supertest, CI/CD, Docker, despliegue.', fraseMotivacional: 'Un código sin tests es un código sin garantía.', orden: 5 },

    // TypeScript → 5 módulos
    { cursoSlug: 'typescript-para-desarrolladores', nombre: 'Tipos Básicos y Configuración', descripcion: 'Tipos primitivos, tsconfig, compilación, type inference.', fraseMotivacional: 'TypeScript no te detiene, te protege.', orden: 1 },
    { cursoSlug: 'typescript-para-desarrolladores', nombre: 'Interfaces, Types y Aliases', descripcion: 'Interfaces, type aliases, uniones, intersecciones, literales.', fraseMotivacional: 'Los tipos son el contrato de tu código.', orden: 2 },
    { cursoSlug: 'typescript-para-desarrolladores', nombre: 'Generics y Utilidades', descripcion: 'Generics, constraints, utility types, mapped types.', fraseMotivacional: 'TypeScript es JavaScript con superpoderes.', orden: 3 },
    { cursoSlug: 'typescript-para-desarrolladores', nombre: 'Clases y Decoradores', descripcion: 'Clases, abstract, interfaces implementing, decoradores.', fraseMotivacional: 'OOP en TypeScript es elegancia tipada.', orden: 4 },
    { cursoSlug: 'typescript-para-desarrolladores', nombre: 'TypeScript con React y Node', descripcion: 'Props typing, hooks, Express + TS, Prisma + TS.', fraseMotivacional: 'Tipos en todo el stack = menos bugs, más productividad.', orden: 5 },

    // Next.js → 6 módulos
    { cursoSlug: 'nextjs-fullstack-react', nombre: 'Fundamentos de Next.js', descripcion: 'App Router, layouts, pages, file-based routing.', fraseMotivacional: 'Next.js es React en su máxima expresión.', orden: 1 },
    { cursoSlug: 'nextjs-fullstack-react', nombre: 'Server Components y Data Fetching', descripcion: 'Server Components, fetch, caching, revalidación.', fraseMotivacional: 'El servidor vuelve a ser el protagonista.', orden: 2 },
    { cursoSlug: 'nextjs-fullstack-react', nombre: 'Client Components y Forms', descripcion: 'use client, formularios, server actions, validación.', fraseMotivacional: 'La interacción empieza en el cliente, pero se resuelve en el servidor.', orden: 3 },
    { cursoSlug: 'nextjs-fullstack-react', nombre: 'API Routes y Middleware', descripcion: 'Route handlers, middleware, rewrites, redirects.', fraseMotivacional: 'API Routes eliminan la necesidad de un backend separado.', orden: 4 },
    { cursoSlug: 'nextjs-fullstack-react', nombre: 'Autenticación y Bases de Datos', descripcion: 'NextAuth, Prisma, sesiones, protección de rutas.', fraseMotivacional: 'El fullstack ya no es un sueño, es tu realidad con Next.js.', orden: 5 },
    { cursoSlug: 'nextjs-fullstack-react', nombre: 'Optimización y Despliegue', descripcion: 'ISR, SSG, imágenes, metadata, Vercel, performance.', fraseMotivacional: 'La velocidad no es un lujo, es una expectativa.', orden: 6 },

    // Tailwind CSS → 4 módulos
    { cursoSlug: 'tailwind-css-diseno-rapido', nombre: 'Fundamentos y Utilidades', descripcion: 'Clases base, spacing, typography, colors.', fraseMotivacional: 'Tailwind esCSS reinventado para ser productivo.', orden: 1 },
    { cursoSlug: 'tailwind-css-diseno-rapido', nombre: 'Layout y Responsive', descripcion: 'Flexbox utilities, grid, breakpoints, container.', fraseMotivacional: 'Responsive sin media queries? Tailwind lo hace posible.', orden: 2 },
    { cursoSlug: 'tailwind-css-diseno-rapido', nombre: 'Componentes y Formularios', descripcion: 'Botones, cards, modals, forms, plugin de formularios.', fraseMotivacional: 'Componentes que parecen hechos a medida, pero son utilidades.', orden: 3 },
    { cursoSlug: 'tailwind-css-diseno-rapido', nombre: 'Temas, Animaciones y Producción', descripcion: 'Configuración, modo oscuro, plugins, optimización.', fraseMotivacional: 'Tailwind se adapta a tu estilo, no al revés.', orden: 4 },

    // GraphQL → 4 módulos
    { cursoSlug: 'graphql-api-flexible', nombre: 'Fundamentos de GraphQL', descripcion: 'Schema, types, queries, mutations, subscriptions.', fraseMotivacional: 'GraphQL te da el poder de pedir exactamente lo que necesitas.', orden: 1 },
    { cursoSlug: 'graphql-api-flexible', nombre: 'Resolvers y Manejo de Datos', descripcion: 'Resolvers, context, dataloaders, N+1 problem.', fraseMotivacional: 'Los resolvers son el corazón de tu API GraphQL.', orden: 2 },
    { cursoSlug: 'graphql-api-flexible', nombre: 'Apollo Client en React', descripcion: 'useQuery, useMutation, cache, optimistic updates.', fraseMotivacional: 'Apollo Client gestiona tu estado del servidor.', orden: 3 },
    { cursoSlug: 'graphql-api-flexible', nombre: 'Seguridad y Producción', descripcion: 'Autenticación, rate limiting, monitoring, error handling.', fraseMotivacional: 'GraphQL en producción requiere disciplina.', orden: 4 },

    // Vue.js → 4 módulos
    { cursoSlug: 'vuejs-3-y-composition-api', nombre: 'Introducción a Vue 3', descripcion: 'Options API, plantillas, directivas, lifecycle.', fraseMotivacional: 'Vue es elegancia en cada línea de código.', orden: 1 },
    { cursoSlug: 'vuejs-3-y-composition-api', nombre: 'Composition API Profunda', descripcion: 'ref, reactive, computed, watch, provide/inject.', fraseMotivacional: 'Composition API es libertad de organización.', orden: 2 },
    { cursoSlug: 'vuejs-3-y-composition-api', nombre: 'Pinia, Router y Composables', descripcion: 'Estado global, enrutamiento, composables reutilizables.', fraseMotivacional: 'Vue tiene un ecosistema que te acompaña de cero a producción.', orden: 3 },
    { cursoSlug: 'vuejs-3-y-composition-api', nombre: 'Proyecto y Buenas Prácticas', descripcion: 'Estructura de proyecto, testing, despliegue.', fraseMotivacional: 'Los buenos hábitos hacen buenos proyectos.', orden: 4 },

    // Docker → 4 módulos
    { cursoSlug: 'docker-para-desarrolladores', nombre: 'Conceptos y Dockerfile', descripcion: 'Contenedores vs VM, Dockerfile, build, imagenes.', fraseMotivacional: 'Si funciona en mi contenedor, funciona en cualquier lugar.', orden: 1 },
    { cursoSlug: 'docker-para-desarrolladores', nombre: 'Volumes, Networks y Gestión', descripcion: 'Volumes, networks, docker system, multi-stage builds.', fraseMotivacional: 'Los datos sobreviven al contenedor con los volumes.', orden: 2 },
    { cursoSlug: 'docker-para-desarrolladores', nombre: 'Docker Compose Multi-Servicio', descripcion: 'docker-compose.yml, servicios, dependencias, envs.', fraseMotivacional: 'Docker Compose orquesta tus servicios con elegancia.', orden: 3 },
    { cursoSlug: 'docker-para-desarrolladores', nombre: 'Docker en Producción', descripcion: 'Logging, monitoring, security, CI/CD con Docker.', fraseMotivacional: 'Docker no es solo desarrollo, es producción también.', orden: 4 },

    // ─── Ciencia de Datos ───
    // Python para Ciencia de Datos → 5 módulos
    { cursoSlug: 'python-para-ciencia-de-datos', nombre: 'Python Base para Data Science', descripcion: 'Sintaxis, estructuras de control, funciones, POO básica.', fraseMotivacional: 'Python es el idioma de los datos.', orden: 1 },
    { cursoSlug: 'python-para-ciencia-de-datos', nombre: 'NumPy y Operaciones Vectorizadas', descripcion: 'Arrays, funciones matemáticas, indexación, broadcasting.', fraseMotivacional: 'NumPy es la base de toda la ciencia de datos en Python.', orden: 2 },
    { cursoSlug: 'python-para-ciencia-de-datos', nombre: 'Pandas: Manipulación de Datos', descripcion: 'DataFrames, limpieza, merge, groupby, pivot tables.', fraseMotivacional: 'Pandas convierte datos crudos en información accionable.', orden: 3 },
    { cursoSlug: 'python-para-ciencia-de-datos', nombre: 'Visualización de Datos', descripcion: 'Matplotlib, Seaborn, Plotly, tipos de gráficos.', fraseMotivacional: 'Un buen gráfico vale más que mil tablas.', orden: 4 },
    { cursoSlug: 'python-para-ciencia-de-datos', nombre: 'Proyecto: Análisis Exploratorio', descripcion: 'EDA completo, limpieza, transformación, insights.', fraseMotivacional: 'El EDA es donde nacen las preguntas correctas.', orden: 5 },

    // Machine Learning → 5 módulos
    { cursoSlug: 'machine-learning-con-scikit-learn', nombre: 'Introducción al ML', descripcion: 'Tipos de ML, pipeline, train/test split, overfitting.', fraseMotivacional: 'Machine Learning es enseñar a las máquinas a aprender.', orden: 1 },
    { cursoSlug: 'machine-learning-con-scikit-learn', nombre: 'Regresión', descripcion: 'Lineal, polinómica, regularización, métricas de error.', fraseMotivacional: 'Predecir valores continuos es el ABC del ML.', orden: 2 },
    { cursoSlug: 'machine-learning-con-scikit-learn', nombre: 'Clasificación', descripcion: 'Logistic, KNN, SVM, Random Forest, métricas.', fraseMotivacional: 'Clasificar es separar el mundo en categorías con precisión.', orden: 3 },
    { cursoSlug: 'machine-learning-con-scikit-learn', nombre: 'Clustering y No Supervisado', descripcion: 'K-Means, DBSCAN, PCA, reducción de dimensionalidad.', fraseMotivacional: 'A veces los datos te dicen más de lo que esperas.', orden: 4 },
    { cursoSlug: 'machine-learning-con-scikit-learn', nombre: 'Feature Engineering y Selección', descripcion: 'Encoding, scaling, feature selection, pipeline completo.', fraseMotivacional: 'Los features son la materia prima del modelo.', orden: 5 },

    // SQL → 4 módulos
    { cursoSlug: 'sql-y-bases-de-datos', nombre: 'Consultas Básicas', descripcion: 'SELECT, WHERE, ORDER BY, LIMIT, aliases.', fraseMotivacional: 'SQL es el idioma universal de los datos.', orden: 1 },
    { cursoSlug: 'sql-y-bases-de-datos', nombre: 'JOINs y Subconsultas', descripcion: 'INNER, LEFT, RIGHT, FULL, subqueries, CTEs.', fraseMotivacional: 'Los JOINs conectan mundos separados.', orden: 2 },
    { cursoSlug: 'sql-y-bases-de-datos', nombre: 'Funciones y Ventanas', descripcion: 'Aggregate, window functions, ROW_NUMBER, RANK.', fraseMotivacional: 'Las funciones de ventana abren posibilidades infinitas.', orden: 3 },
    { cursoSlug: 'sql-y-bases-de-datos', nombre: 'Diseño y Optimización', descripcion: 'Normalización, índices, EXPLAIN, rendimiento.', fraseMotivacional: 'Un buen diseño ahorra horas de optimización.', orden: 4 },

    // Power BI → 4 módulos
    { cursoSlug: 'power-bi-dashboards-interactivos', nombre: 'Conexión y Transformación', descripcion: 'Power Query, M, limpieza, transformación de datos.', fraseMotivacional: 'Los datos limpios son la base de todo dashboard.', orden: 1 },
    { cursoSlug: 'power-bi-dashboards-interactivos', nombre: 'Modelado y DAX', descripcion: 'Relaciones, measures, calculated columns, Time Intelligence.', fraseMotivacional: 'DAX es el lenguaje que da vida a tus datos.', orden: 2 },
    { cursoSlug: 'power-bi-dashboards-interactivos', nombre: 'Visualización Profesional', descripcion: 'Tipos de gráficos, formato, condicional, tema.', fraseMotivacional: 'La visualización es el arte de contar historias con datos.', orden: 3 },
    { cursoSlug: 'power-bi-dashboards-interactivos', nombre: 'Publicación y Sharing', descripcion: 'Power BI Service, workspaces, row-level security, scheduled refresh.', fraseMotivacional: 'Un dashboard sin sharing es un dashboard sin impacto.', orden: 4 },

    // Estadística → 4 módulos
    { cursoSlug: 'estadistica-para-analiticos', nombre: 'Estadística Descriptiva', descripcion: 'Medidas de tendencia, dispersión, posición, forma.', fraseMotivacional: 'Describir es el primer paso para entender.', orden: 1 },
    { cursoSlug: 'estadistica-para-analiticos', nombre: 'Probabilidad y Distribuciones', descripcion: 'Reglas de probabilidad, distribución normal, binomial, Poisson.', fraseMotivacional: 'La probabilidad mide la incertidumbre.', orden: 2 },
    { cursoSlug: 'estadistica-para-analiticos', nombre: 'Inferencia Estadística', descripcion: 'Muestreo, intervalos de confianza, p-value, potencia.', fraseMotivacional: 'La inferencia te permite generalizar desde una muestra.', orden: 3 },
    { cursoSlug: 'estadistica-para-analiticos', nombre: 'Pruebas y Regresión', descripcion: 't-tests, ANOVA, chi-cuadrado, regresión lineal.', fraseMotivacional: 'Las pruebas de hipótesis son el juicio de los datos.', orden: 4 },

    // Deep Learning → 5 módulos
    { cursoSlug: 'deep-learning-con-tensorflow', nombre: 'Redes Neuronales Fundamentals', descripcion: 'Perceptrones, backpropagation, activation functions.', fraseMotivacional: 'Cada neurona artificial inspira en el cerebro humano.', orden: 1 },
    { cursoSlug: 'deep-learning-con-tensorflow', nombre: 'TensorFlow y Keras', descripcion: 'Tensores, modelos secuenciales, compilación, entrenamiento.', fraseMotivacional: 'TensorFlow es la framework del deep learning.', orden: 2 },
    { cursoSlug: 'deep-learning-con-tensorflow', nombre: 'CNNs y Visión por Computadora', descripcion: 'Convoluciones, pooling, transfer learning, data augmentation.', fraseMotivacional: 'Las CNNs ven el mundo como lo vemos nosotros.', orden: 3 },
    { cursoSlug: 'deep-learning-con-tensorflow', nombre: 'RNNs y Procesamiento de Secuencias', descripcion: 'LSTM, GRU, seq2seq, atención, Transformers.', fraseMotivacional: 'Las secuencias son la base del lenguaje y el tiempo.', orden: 4 },
    { cursoSlug: 'deep-learning-con-tensorflow', nombre: 'Despliegue y Optimización', descripcion: 'Model serving, TFLite, quantization, monitoreo.', fraseMotivacional: 'Un modelo sin deploy es solo un experimento.', orden: 5 },

    // Análisis de Datos con R → 4 módulos
    { cursoSlug: 'analisis-de-datos-con-r', nombre: 'R Base y Estructuras', descripcion: 'Vectores, listas, data frames, factores, control de flujo.', fraseMotivacional: 'R fue creado para statisticians. Ahora es tuyo también.', orden: 1 },
    { cursoSlug: 'analisis-de-datos-con-r', nombre: 'tidyverse y dplyr', descripcion: 'Pipe, filter, select, mutate, summarise, group_by.', fraseMotivacional: 'El tidyverse es el ecosistema de análisis de datos de R.', orden: 2 },
    { cursoSlug: 'analisis-de-datos-con-r', nombre: 'ggplot2 y Visualización', descripcion: 'Grammar of graphics, capas, aes, facets, themes.', fraseMotivacional: 'ggplot2 convierte datos en arte visual.', orden: 3 },
    { cursoSlug: 'analisis-de-datos-con-r', nombre: 'Análisis Estadístico con R', descripcion: 'Pruebas, modelos, reportes con RMarkdown.', fraseMotivacional: 'R combina análisis y comunicación en un solo lugar.', orden: 4 },

    // MLOps → 4 módulos
    { cursoSlug: 'mlops-deploy-de-modelos', nombre: 'Versionado de Código y Datos', descripcion: 'Git para ML, DVC, data versioning, experiment tracking.', fraseMotivacional: 'Versionar es recordar de dónde vienes.', orden: 1 },
    { cursoSlug: 'mlops-deploy-de-modelos', nombre: 'MLflow y Tracking', descripcion: 'Experiment tracking, model registry, artifacts.', fraseMotivacional: 'MLflow organiza tus experimentos como un archivo.', orden: 2 },
    { cursoSlug: 'mlops-deploy-de-modelos', nombre: 'CI/CD para ML', descripcion: 'GitHub Actions, pipelines automatizados, testing de modelos.', fraseMotivacional: 'CI/CD no es solo para software, es para ML también.', orden: 3 },
    { cursoSlug: 'mlops-deploy-de-modelos', nombre: 'Monitoreo y Observabilidad', descripcion: 'Data drift, model decay, alertas, dashboards.', fraseMotivacional: 'Monitorear es saber antes de que falle.', orden: 4 },

    // ─── Diseño y UX ───
    // Fundamentos UX/UI → 5 módulos
    { cursoSlug: 'fundamentos-de-uxui-design', nombre: '¿Qué es UX Design?', descripcion: 'Definición, principios, proceso de diseño centrado en el usuario.', fraseMotivacional: 'UX no es solo hacer cosas bonitas, es hacer cosas que funcionen.', orden: 1 },
    { cursoSlug: 'fundamentos-de-uxui-design', nombre: 'User Research', descripcion: 'Métodos cualitativos/cuantitativos, interviews, surveys.', fraseMotivacional: 'Diseña para personas, no para pantallas.', orden: 2 },
    { cursoSlug: 'fundamentos-de-uxui-design', nombre: 'Arquitectura de Información', descripcion: 'Card sorting, tree testing, sitemaps, flujos de usuario.', fraseMotivacional: 'La información bien organizada se encuentra sola.', orden: 3 },
    { cursoSlug: 'fundamentos-de-uxui-design', nombre: 'Wireframing y Prototipado', descripcion: 'Bocetos, wireframes, Figma, prototipos interactivos.', fraseMotivacional: 'Un prototipo comunica más que mil reuniones.', orden: 4 },
    { cursoSlug: 'fundamentos-de-uxui-design', nombre: 'Testing y Iteración', descripcion: 'Usability testing, A/B testing, heurísticas, iteración.', fraseMotivacional: 'Si no lo prueba el usuario, no está terminado.', orden: 5 },

    // Figma → 4 módulos
    { cursoSlug: 'figma-herramienta-profesional', nombre: 'Interfaz y Herramientas Básicas', descripcion: 'Canvas, frames, shapes, texto, exportación.', fraseMotivacional: 'Figma es tu lienzo digital. Pinta la experiencia perfecta.', orden: 1 },
    { cursoSlug: 'figma-herramienta-profesional', nombre: 'Auto Layout y Diseño Responsivo', descripcion: 'Auto layout, constraints, breakpoints, stack.', fraseMotivacional: 'Auto layout es la herramienta más poderosa de Figma.', orden: 2 },
    { cursoSlug: 'figma-herramienta-profesional', nombre: 'Componentes y Variants', descripcion: 'Componentes, variants, instancias, propiedades.', fraseMotivacional: 'Los componentes son los ladrillos de tu diseño.', orden: 3 },
    { cursoSlug: 'figma-herramienta-profesional', nombre: 'Prototipos y Colaboración', descripcion: 'Prototyping, overlays, handoff, comment, branching.', fraseMotivacional: 'Figma es colaboración en tiempo real.', orden: 4 },

    // UI Design Sistemas → 4 módulos
    { cursoSlug: 'ui-design-sistemas-de-diseno', nombre: 'Fundamentos del Sistema', descripcion: 'Qué es un design system, por qué, beneficios.', fraseMotivacional: 'Un design system es la memoria viva de tu producto.', orden: 1 },
    { cursoSlug: 'ui-design-sistemas-de-diseno', nombre: 'Design Tokens', descripcion: 'Colores, tipografía, espaciado, elevation, tokens.', fraseMotivacional: 'Los tokens son el ADN de tu sistema de diseño.', orden: 2 },
    { cursoSlug: 'ui-design-sistemas-de-diseno', nombre: 'Componentes y Patrones', descripcion: 'Botones, inputs, cards, modals, patrones de navegación.', fraseMotivacional: 'Los patrones son soluciones reutilizables a problemas recurrentes.', orden: 3 },
    { cursoSlug: 'ui-design-sistemas-de-diseno', nombre: 'Documentación y Gobernanza', descripcion: 'Storybook, guías de estilo, contributing, governance.', fraseMotivacional: 'Documentar es hacer que el diseño viva más tiempo.', orden: 4 },

    // Motion Design → 3 módulos
    { cursoSlug: 'motion-design-para-interfaces', nombre: 'Principios del Motion', descripcion: 'Timing, easing, ritmo, anticipación, persistencia.', fraseMotivacional: 'El movimiento le da vida a una interfaz estática.', orden: 1 },
    { cursoSlug: 'motion-design-para-interfaces', nombre: 'Micro-interacciones', descripcion: 'Hover, loading, transitions, feedback visual.', fraseMotivacional: 'Las micro-interacciones cuentan historias pequeñas.', orden: 2 },
    { cursoSlug: 'motion-design-para-interfaces', nombre: 'Herramientas y Código', descripcion: 'After Effects, Lottie, CSS animations, Framer Motion.', fraseMotivacional: 'Del diseño al código: el motion completo.', orden: 3 },

    // Accesibilidad → 3 módulos
    { cursoSlug: 'accesibilidad-web-a11y', nombre: 'Estándares WCAG', descripcion: 'Principios POUR, niveles A/AA/AAA, criterios.', fraseMotivacional: 'La accesibilidad es un derecho, no un feature.', orden: 1 },
    { cursoSlug: 'accesibilidad-web-a11y', nombre: 'Semántica y ARIA', descripcion: 'HTML semántico, roles ARIA, landmarks, states.', fraseMotivacional: 'El HTML semántico es accesibilidad por defecto.', orden: 2 },
    { cursoSlug: 'accesibilidad-web-a11y', nombre: 'Testing y Herramientas', descripcion: 'Lighthouse, axe, NVDA, VoiceOver, auditorías.', fraseMotivacional: 'Si no puedes usarlo, no está diseñado.', orden: 3 },

    // Investigación de Usuarios → 3 módulos
    { cursoSlug: 'investigacion-de-usuarios', nombre: 'Métodos Cualitativos', descripcion: 'Entrevistas, observación, contextual inquiry, diary.', fraseMotivacional: 'Escuchar al usuario es la mejor estrategia.', orden: 1 },
    { cursoSlug: 'investigacion-de-usuarios', nombre: 'Métodos Cuantitativos', descripcion: 'Encuestas, analytics, A/B testing, métricas.', fraseMotivacional: 'Los números cuentan historias que las palabras no alcanzan.', orden: 2 },
    { cursoSlug: 'investigacion-de-usuarios', nombre: 'Síntesis y Personas', descripcion: 'Affinity diagrams, personas, journey maps, empatía.', fraseMotivacional: 'Sintetizar es encontrar la aguja en el pajar.', orden: 3 },

    // Diseño de Productos Digitales → 3 módulos
    { cursoSlug: 'diseno-de-productos-digitales', nombre: 'Discovery y Oportunidades', descripcion: 'Stakeholder maps, entrevistas, análisis competitivo.', fraseMotivacional: 'Descubrir el problema correcto es la mitad de la solución.', orden: 1 },
    { cursoSlug: 'diseno-de-productos-digitales', nombre: 'Ideación y MVP', descripcion: 'Brainstorming, storyboard, prototipado, validación.', fraseMotivacional: 'Del problema al MVP: iteración rápida.', orden: 2 },
    { cursoSlug: 'diseno-de-productos-digitales', nombre: 'Lanzamiento y Métricas', descripcion: 'Analytics, KPIs, feedback loops, mejora continua.', fraseMotivacional: 'Lanzar es el comienzo, no el final.', orden: 3 },

    // ─── Ciberseguridad ───
    // Fundamentos de Ciberseguridad → 5 módulos
    { cursoSlug: 'fundamentos-de-ciberseguridad', nombre: 'Triada CIA y Amenazas', descripcion: 'Confidencialidad, integridad, disponibilidad, threat actors.', fraseMotivacional: 'La seguridad empieza por entender qué estás protegiendo.', orden: 1 },
    { cursoSlug: 'fundamentos-de-ciberseguridad', nombre: 'Vulnerabilidades Comunes', descripcion: 'OWASP Top 10, CVEs, CWEs, attack vectors.', fraseMotivacional: 'Conoce las vulnerabilidades antes de que te ataquen.', orden: 2 },
    { cursoSlug: 'fundamentos-de-ciberseguridad', nombre: 'Criptografía Básica', descripcion: 'Simétrica, asimétrica, hash, certificados SSL/TLS.', fraseMotivacional: 'La criptografía es el arte de ocultar información.', orden: 3 },
    { cursoSlug: 'fundamentos-de-ciberseguridad', nombre: 'Redes y Seguridad', descripcion: 'Firewalls, IDS/IPS, VPN, segmentación de red.', fraseMotivacional: 'La red es la carretera por donde viajan los datos.', orden: 4 },
    { cursoSlug: 'fundamentos-de-ciberseguridad', nombre: 'Marcos y Compliance', descripcion: 'ISO 27001, NIST, GDPR, auditorías.', fraseMotivacional: 'La seguridad es un proceso continuo, no un destino.', orden: 5 },

    // Ethical Hacking → 5 módulos
    { cursoSlug: 'ethical-hacking-y-pentesting', nombre: 'Reconocimiento y OSINT', descripcion: 'OSINT, recon activo/pasivo, fingerprinting.', fraseMotivacional: 'La información es poder, y el reconocimiento es la base.', orden: 1 },
    { cursoSlug: 'ethical-hacking-y-pentesting', nombre: 'Escaneo y Enumeración', descripcion: 'Nmap, Nikto, enum4linux, service detection.', fraseMotivacional: 'Conoce al enemigo antes de atacar.', orden: 2 },
    { cursoSlug: 'ethical-hacking-y-pentesting', nombre: 'Explotación de Vulnerabilidades', descripcion: 'Metasploit, payloads, shells, privilege escalation.', fraseMotivacional: 'Para defender, primero piensa como atacante.', orden: 3 },
    { cursoSlug: 'ethical-hacking-y-pentesting', nombre: 'Post-Explotación', descripcion: 'Pivoting, lateral movement, persistence, data exfil.', fraseMotivacional: 'La explotación es solo el comienzo.', orden: 4 },
    { cursoSlug: 'ethical-hacking-y-pentesting', nombre: 'Reportes y Ética', descripcion: 'Documentación, reportes, responsible disclosure.', fraseMotivacional: 'Un pentest sin reporte es solo un ataque con permiso.', orden: 5 },

    // Seguridad en la Nube → 4 módulos
    { cursoSlug: 'seguridad-en-la-nube-awsazure', nombre: 'IAM y Gestión de Identidades', descripcion: 'Políticas IAM, roles, MFA, least privilege.', fraseMotivacional: 'En la nube, la seguridad comienza con la identidad.', orden: 1 },
    { cursoSlug: 'seguridad-en-la-nube-awsazure', nombre: 'Seguridad de Red', descripcion: 'Security groups, NACLs, VPC, WAF, DDoS protection.', fraseMotivacional: 'La red es la primera línea de defensa.', orden: 2 },
    { cursoSlug: 'seguridad-en-la-nube-awsazure', nombre: 'Cifrado y Gestión de Secretos', descripcion: 'KMS, Secrets Manager, encryption at rest/in transit.', fraseMotivacional: 'Cifrar es proteger incluso cuando fallan las demás defensas.', orden: 3 },
    { cursoSlug: 'seguridad-en-la-nube-awsazure', nombre: 'Monitoreo y Compliance', descripcion: 'CloudTrail, GuardDuty, Config, Security Hub.', fraseMotivacional: 'Monitorear la nube es como vigilar el cielo.', orden: 4 },

    // Forense Digital → 4 módulos
    { cursoSlug: 'forense-digital', nombre: 'Fundamentos Forenses', descripcion: 'Cadena de custodia, evidencia, procedimientos legales.', fraseMotivacional: 'La evidencia digital es frágil. Protégela.', orden: 1 },
    { cursoSlug: 'forense-digital', nombre: 'Adquisición de Evidencia', descripcion: 'Adquisición volátil/no volátil, imágen de disco, herramientas.', fraseMotivacional: 'Los bits nunca mienten. Solo necesitas saber dónde buscar.', orden: 2 },
    { cursoSlug: 'forense-digital', nombre: 'Análisis de Discos y Archivos', descripcion: 'File systems, recovery, metadata, steganography.', fraseMotivacional: 'Cada archivo cuenta una historia.', orden: 3 },
    { cursoSlug: 'forense-digital', nombre: 'Análisis de Memoria y Logs', descripcion: 'Volatility, RAM analysis, log correlation, timeline.', fraseMotivacional: 'La memoria es el testigo silencioso.', orden: 4 },

    // Gestión de Incidentes → 3 módulos
    { cursoSlug: 'gestion-de-incidentes-de-seguridad', nombre: 'Planificación y Detección', descripcion: 'Plan de respuesta, SIEM, alertas, clasificación.', fraseMotivacional: 'Todo incidente es una oportunidad de mejora.', orden: 1 },
    { cursoSlug: 'gestion-de-incidentes-de-seguridad', nombre: 'Contención y Eradicación', descripcion: 'Aislamiento, remoción de amenazas, forense.', fraseMotivacional: 'Contener rápido minimiza el daño.', orden: 2 },
    { cursoSlug: 'gestion-de-incidentes-de-seguridad', nombre: 'Recuperación y Lecciones', descripcion: 'Restauración, validación, post-mortem, mejora.', fraseMotivacional: 'Recuperarse rápido es bueno. Aprender es mejor.', orden: 3 },

    // ─── DevOps y Cloud ───
    // Git y GitHub → 4 módulos
    { cursoSlug: 'git-y-github-control-de-versiones', nombre: 'Git Local', descripcion: 'init, add, commit, log, diff, stash.', fraseMotivacional: 'Git es tu máquina del tiempo. Úsala con sabiduría.', orden: 1 },
    { cursoSlug: 'git-y-github-control-de-versiones', nombre: 'Ramas y Merges', descripcion: 'branch, merge, rebase, cherry-pick, conflictos.', fraseMotivacional: 'Las ramas permiten explorar sin destruir.', orden: 2 },
    { cursoSlug: 'git-y-github-control-de-versiones', nombre: 'GitHub y Colaboración', descripcion: 'Remote, push, pull, PR, code review.', fraseMotivacional: 'Git es personal. GitHub es colaborativo.', orden: 3 },
    { cursoSlug: 'git-y-github-control-de-versiones', nombre: 'GitHub Actions Básico', descripcion: 'Workflows, triggers, jobs, steps, secrets.', fraseMotivacional: 'GitHub Actions automatiza tu flujo de trabajo.', orden: 4 },

    // CI/CD → 4 módulos
    { cursoSlug: 'cicd-con-github-actions', nombre: 'Fundamentos de CI/CD', descripcion: 'Conceptos, pipeline, integración continua, delivery.', fraseMotivacional: 'CI/CD es el corazón del desarrollo moderno.', orden: 1 },
    { cursoSlug: 'cicd-con-github-actions', nombre: 'Workflows en GitHub Actions', descripcion: 'YAML, matrices, caching, artifacts, reusable workflows.', fraseMotivacional: 'Automatiza lo repetitivo. Céntrate en lo que importa.', orden: 2 },
    { cursoSlug: 'cicd-con-github-actions', nombre: 'Testing Automatizado', descripcion: 'Unit tests, integration, coverage, quality gates.', fraseMotivacional: 'Los tests dan confianza al deploy.', orden: 3 },
    { cursoSlug: 'cicd-con-github-actions', nombre: 'Deploy y Producción', descripcion: 'Deploy a staging/production, rollback, monitoring.', fraseMotivacional: 'El deploy manual es el enemigo de la consistencia.', orden: 4 },

    // AWS → 6 módulos
    { cursoSlug: 'aws-cloud-practitioner', nombre: 'Introducción a la Nube', descripcion: 'IaaS, PaaS, SaaS, beneficios, modelos de responsabilidad.', fraseMotivacional: 'La nube es el futuro. AWS es el líder.', orden: 1 },
    { cursoSlug: 'aws-cloud-practitioner', nombre: 'Compute: EC2 y Lambda', descripcion: 'Tipos de instancia, auto scaling, Lambda, Lightsail.', fraseMotivacional: 'EC2 es el caballo de batalla de AWS.', orden: 2 },
    { cursoSlug: 'aws-cloud-practitioner', nombre: 'Storage y Bases de Datos', descripcion: 'S3, EBS, EFS, RDS, DynamoDB, ElastiCache.', fraseMotivacional: 'AWS tiene un almacenamiento para cada necesidad.', orden: 3 },
    { cursoSlug: 'aws-cloud-practitioner', nombre: 'Red y Seguridad', descripcion: 'VPC, subnets, security groups, IAM, Route 53.', fraseMotivacional: 'La red AWS es un universo en sí mismo.', orden: 4 },
    { cursoSlug: 'aws-cloud-practitioner', nombre: 'Servicios Managed', descripcion: 'SQS, SNS, CloudFront, Elastic Beanstalk.', fraseMotivacional: 'Los servicios managed te liberan de la infraestructura.', orden: 5 },
    { cursoSlug: 'aws-cloud-practitioner', nombre: 'Costos, Soporte y Best Practices', descripcion: 'Pricing models, free tier, support plans, Well-Architected.', fraseMotivacional: 'Controlar costos es tan importante como dominar la tecnología.', orden: 6 },

    // Kubernetes → 5 módulos
    { cursoSlug: 'kubernetes-desde-cero', nombre: 'Arquitectura de K8s', descripcion: 'Control plane, nodes, components, kubectl basics.', fraseMotivacional: 'Kubernetes orquesta. Tú diriges.', orden: 1 },
    { cursoSlug: 'kubernetes-desde-cero', nombre: 'Pods y Workloads', descripcion: 'Pods, Deployments, ReplicaSets, Jobs, CronJobs.', fraseMotivacional: 'El Pod es la unidad básica de K8s.', orden: 2 },
    { cursoSlug: 'kubernetes-desde-cero', nombre: 'Services y Networking', descripcion: 'Services, Ingress, DNS, Network Policies.', fraseMotivacional: 'El networking en K8s es un mundo de posibilidades.', orden: 3 },
    { cursoSlug: 'kubernetes-desde-cero', nombre: 'Configuración y Almacenamiento', descripcion: 'ConfigMaps, Secrets, Volumes, PVCs.', fraseMotivacional: 'Separar config del código es una best practice.', orden: 4 },
    { cursoSlug: 'kubernetes-desde-cero', nombre: 'Helm, Monitoring y Production', descripcion: 'Helm charts, Prometheus, Grafana, RBAC.', fraseMotivacional: 'K8s en producción requiere visibilidad.', orden: 5 },

    // Linux → 5 módulos
    { cursoSlug: 'linux-y-linea-de-comandos', nombre: 'Terminal y Navegación', descripcion: 'cd, ls, pwd, find, wildcards, man.', fraseMotivacional: 'La terminal es la herramienta más poderosa que nunca sabías que tenías.', orden: 1 },
    { cursoSlug: 'linux-y-linea-de-comandos', nombre: 'Archivos y Permisos', descripcion: 'cp, mv, rm, chmod, chown, umask, symlinks.', fraseMotivacional: 'Los permisos son la seguridad de tu sistema.', orden: 2 },
    { cursoSlug: 'linux-y-linea-de-comandos', nombre: 'Procesos y Servicios', descripcion: 'ps, top, htop, systemctl, journalctl, cron.', fraseMotivacional: 'Linux nunca duerme. Tú aprende a despertarlo.', orden: 3 },
    { cursoSlug: 'linux-y-linea-de-comandos', nombre: 'Red y Administración', descripcion: 'ip, ss, curl, wget, firewall, users, groups.', fraseMotivacional: 'El administrador de Linux es un multitasking nato.', orden: 4 },
    { cursoSlug: 'linux-y-linea-de-comandos', nombre: 'Scripting Bash', descripcion: 'Variables, loops, conditionals, functions, scripts.', fraseMotivacional: 'Automatizar es la clave de la productividad en Linux.', orden: 5 },

    // Terraform → 4 módulos
    { cursoSlug: 'terraform-infraestructura-como-codigo', nombre: 'HCL y Providers', descripcion: 'Sintaxis HCL, providers, data sources, variables.', fraseMotivacional: 'Define tu infraestructura como defines tu código.', orden: 1 },
    { cursoSlug: 'terraform-infraestructura-como-codigo', nombre: 'Recursos y Outputs', descripcion: 'Resources, outputs, expressions, functions.', fraseMotivacional: 'Cada recurso es un bloque de tu infraestructura.', orden: 2 },
    { cursoSlug: 'terraform-infraestructura-como-codigo', nombre: 'Módulos Reutilizables', descripcion: 'Módulos, input variables, output variables, registry.', fraseMotivacional: 'Los módulos son el código reutilizable de la infra.', orden: 3 },
    { cursoSlug: 'terraform-infraestructura-como-codigo', nombre: 'Estado y Trabajo en Equipo', descripcion: 'State, backends, locking, workspaces, import.', fraseMotivacional: 'El state es la memoria de tu infraestructura.', orden: 4 },

    // ─── Marketing Digital ───
    // Marketing Digital → 5 módulos
    { cursoSlug: 'marketing-digital-completo', nombre: 'Estrategia Digital', descripcion: 'FODA, buyer persona, objetivos, KPIs, planificación.', fraseMotivacional: 'El marketing sin estrategia es solo ruido.', orden: 1 },
    { cursoSlug: 'marketing-digital-completo', nombre: 'SEO y Contenido', descripcion: 'Keyword research, SEO on-page, content marketing.', fraseMotivacional: 'El contenido es el rey. El SEO es la corona.', orden: 2 },
    { cursoSlug: 'marketing-digital-completo', nombre: 'Publicidad Digital', descripcion: 'Google Ads, Meta Ads, LinkedIn Ads, presupuestos.', fraseMotivacional: 'La publicidad paga acelera lo orgánico.', orden: 3 },
    { cursoSlug: 'marketing-digital-completo', nombre: 'Email y Automatización', descripcion: 'Email marketing, CRMs, lead scoring, nurturing.', fraseMotivacional: 'La automatización escala tu impacto.', orden: 4 },
    { cursoSlug: 'marketing-digital-completo', nombre: 'Analytics y Optimización', descripcion: 'Google Analytics, atribución, embudos, testing.', fraseMotivacional: 'Lo que no se mide, no se mejora.', orden: 5 },

    // SEO → 5 módulos
    { cursoSlug: 'seo-posicionamiento-en-google', nombre: 'Fundamentos de SEO', descripcion: 'Cómo funciona Google, algoritmos, factores de ranking.', fraseMotivacional: 'El SEO es paciencia y estrategia.', orden: 1 },
    { cursoSlug: 'seo-posicionamiento-en-google', nombre: 'Keyword Research', descripcion: 'Herramientas, intención de búsqueda, long tail, competencia.', fraseMotivacional: 'Las keywords son el mapa de tu estrategia SEO.', orden: 2 },
    { cursoSlug: 'seo-posicionamiento-en-google', nombre: 'SEO On-Page', descripcion: 'Title, meta, headings, contenido, imágenes, URLs.', fraseMotivacional: 'El SEO on-page es control total.', orden: 3 },
    { cursoSlug: 'seo-posicionamiento-en-google', nombre: 'SEO Técnico', descripcion: 'Velocidad, mobile, crawlability, indexación, schema.', fraseMotivacional: 'Lo técnico sostiene lo creativo.', orden: 4 },
    { cursoSlug: 'seo-posicionamiento-en-google', nombre: 'SEO Off-Page y Link Building', descripcion: 'Backlinks, dominio, outreach, guest posting.', fraseMotivacional: 'Los backlinks son votos de confianza.', orden: 5 },

    // Google Ads → 4 módulos
    { cursoSlug: 'google-ads-publicidad-ppc', nombre: 'Fundamentos y Configuración', descripcion: 'Cuenta, estructura, billing, keywords, match types.', fraseMotivacional: 'Cada clic cuenta. Haz que cada peso invertido valga.', orden: 1 },
    { cursoSlug: 'google-ads-publicidad-ppc', nombre: 'Campañas de Búsqueda', descripcion: 'Grupos de anuncios, Quality Score, extensiones.', fraseMotivacional: 'La búsqueda captura intención de compra.', orden: 2 },
    { cursoSlug: 'google-ads-publicidad-ppc', nombre: 'Display, Video y Shopping', descripcion: 'Remarketing, audiences, YouTube ads, Shopping.', fraseMotivacional: 'Google Ads va más allá de la búsqueda.', orden: 3 },
    { cursoSlug: 'google-ads-publicidad-ppc', nombre: 'Optimización y Medición', descripcion: 'Pujas, conversiones, atribución, reportes.', fraseMotivacional: 'Optimizar es iterar hacia la eficiencia.', orden: 4 },

    // Social Media → 4 módulos
    { cursoSlug: 'social-media-marketing', nombre: 'Estrategia por Plataforma', descripcion: 'Facebook, Instagram, TikTok, LinkedIn, Twitter.', fraseMotivacional: 'Cada red es un país con su propia cultura.', orden: 1 },
    { cursoSlug: 'social-media-marketing', nombre: 'Contenido y Storytelling', descripcion: 'Pilares de contenido, formatos, storytelling, calendarios.', fraseMotivacional: 'Las redes sociales son una conversación, no un megáfono.', orden: 2 },
    { cursoSlug: 'social-media-marketing', nombre: 'Community Management', descripcion: 'Engagement, moderación, customer service, UGC.', fraseMotivacional: 'Construir comunidad es el verdadero marketing.', orden: 3 },
    { cursoSlug: 'social-media-marketing', nombre: 'Social Ads y Métricas', descripcion: 'Meta Ads, métricas, ROI, reporting.', fraseMotivacional: 'Engagement es la métrica que realmente importa.', orden: 4 },

    // Email Marketing → 4 módulos
    { cursoSlug: 'email-marketing-automatizado', nombre: 'Fundamentos del Email Marketing', descripcion: 'Tipos de email, métricas, deliverability,合规.', fraseMotivacional: 'El email sigue siendo el canal con mayor ROI. Úsalo bien.', orden: 1 },
    { cursoSlug: 'email-marketing-automatizado', nombre: 'Segmentación y Personalización', descripcion: 'Listas, tags, segmentos dinámicos, personalización.', fraseMotivacional: 'El email relevante es el email que se abre.', orden: 2 },
    { cursoSlug: 'email-marketing-automatizado', nombre: 'Automatización y Flujos', descripcion: 'Welcome, nurture, re-engagement, transaccionales.', fraseMotivacional: 'Automatizar es vender mientras duermes.', orden: 3 },
    { cursoSlug: 'email-marketing-automatizado', nombre: 'A/B Testing y Optimización', descripcion: 'Subject lines, contenido, timing, análisis de resultados.', fraseMotivacional: 'Un email que no se abre no existe.', orden: 4 },

    // ─── Finanzas y Negocios ───
    // Finanzas Personales → 4 módulos
    { cursoSlug: 'finanzas-personales-inteligentes', nombre: 'Mentalidad Financiera', descripcion: 'Goals, hábitos, mindset, planificación.', fraseMotivacional: 'Tu futuro financiero se construye hoy, con cada decisión.', orden: 1 },
    { cursoSlug: 'finanzas-personales-inteligentes', nombre: 'Presupuesto y Gastos', descripcion: '50/30/20, tracking, apps, gastos hormiga.', fraseMotivacional: 'Controlar gastos es el primer paso.', orden: 2 },
    { cursoSlug: 'finanzas-personales-inteligentes', nombre: 'Ahorro e Inversión', descripcion: 'Fondo de emergencia, ETFs, fondos indexados, interés compuesto.', fraseMotivacional: 'Ahorrar es pagarle a tu futuro yo.', orden: 3 },
    { cursoSlug: 'finanzas-personales-inteligentes', nombre: 'Deuda y Crédito', descripcion: 'Tipos de deuda, estrategias de pago, historial crediticio.', fraseMotivacional: 'Manejar bien el crédito es libertad.', orden: 4 },

    // Análisis Financiero con Excel → 4 módulos
    { cursoSlug: 'analisis-financiero-con-excel', nombre: 'Excel para Finanzas', descripcion: 'Funciones clave, formatting, named ranges.', fraseMotivacional: 'Excel es la navaja suiza del análisis financiero.', orden: 1 },
    { cursoSlug: 'analisis-financiero-con-excel', nombre: 'Funciones Financieras', descripcion: 'VAN, TIR, NPV, PMT, FV, amortización.', fraseMotivacional: 'Las funciones financieras son la magia de Excel.', orden: 2 },
    { cursoSlug: 'analisis-financiero-con-excel', nombre: 'Tablas Dinámicas', descripcion: 'Pivot tables, calculated fields, slicers.', fraseMotivacional: 'Las tablas dinámicas resumen miles de filas en segundos.', orden: 3 },
    { cursoSlug: 'analisis-financiero-con-excel', nombre: 'Dashboards y Macros', descripcion: 'Dashboards interactivos, VBA basics, automatización.', fraseMotivacional: 'Automatizar Excel es multiplicar tu productividad.', orden: 4 },

    // Emprendimiento → 5 módulos
    { cursoSlug: 'emprendimiento-de-idea-a-negocio', nombre: 'Mentalidad Emprendedora', descripcion: 'Traits, mitos, roller coaster, founder-market fit.', fraseMotivacional: 'Emprender es un maratón, no un sprint.', orden: 1 },
    { cursoSlug: 'emprendimiento-de-idea-a-negocio', nombre: 'Validación de Ideas', descripcion: 'Lean Startup, problem-solution fit, experiments.', fraseMotivacional: 'Validar antes de construir ahorra tiempo y dinero.', orden: 2 },
    { cursoSlug: 'emprendimiento-de-idea-a-negocio', nombre: 'Modelo de Negocio', descripcion: 'Business Model Canvas, unit economics, pricing.', fraseMotivacional: 'Un modelo de negocio sin validación es solo una suposición.', orden: 3 },
    { cursoSlug: 'emprendimiento-de-idea-a-negocio', nombre: 'MVP y Product-Market Fit', descripcion: 'Construir MVP, métricas, iteración, PMF.', fraseMotivacional: 'El MVP es el mínimo esfuerzo para máximo aprendizaje.', orden: 4 },
    { cursoSlug: 'emprendimiento-de-idea-a-negocio', nombre: 'Pitch y Financiamiento', descripcion: 'Pitch deck, inversores, tipos de funding.', fraseMotivacional: 'Tu pitch abre puertas. Tu execution las mantiene.', orden: 5 },

    // Scrum → 4 módulos
    { cursoSlug: 'gestion-de-proyectos-con-scrum', nombre: 'Fundamentos de Agile', descripcion: 'Manifiesto Agile, principios, Scrum vs Kanban.', fraseMotivacional: 'Agile es un mindset, no solo un framework.', orden: 1 },
    { cursoSlug: 'gestion-de-proyectos-con-scrum', nombre: 'Roles y Responsabilidades', descripcion: 'PO, SM, Dev Team, stakeholders.', fraseMotivacional: 'Cada rol tiene un propósito. Respétalo.', orden: 2 },
    { cursoSlug: 'gestion-de-proyectos-con-scrum', nombre: 'Eventos de Scrum', descripcion: 'Sprint, Planning, Daily, Review, Retro, Refinement.', fraseMotivacional: 'Scrum no es magia. Es disciplina con flexibilidad.', orden: 3 },
    { cursoSlug: 'gestion-de-proyectos-con-scrum', nombre: 'Artefactos y Estimación', descripcion: 'Backlog, Increment, story points, velocity, burndown.', fraseMotivacional: 'Estimar es un arte que se perfecciona con la práctica.', orden: 4 },

    // Criptomonedas → 4 módulos
    { cursoSlug: 'inversion-en-criptomonedas', nombre: 'Fundamentos de Blockchain', descripcion: 'Distributed ledger, consenso, Bitcoin, Ethereum.', fraseMotivacional: 'Blockchain es la tecnología detrás de la revolución crypto.', orden: 1 },
    { cursoSlug: 'inversion-en-criptomonedas', nombre: 'DeFi y Web3', descripcion: 'DeFi, DEXs, lending, NFTs, wallets.', fraseMotivacional: 'DeFi decentraliza las finanzas tradicionales.', orden: 2 },
    { cursoSlug: 'inversion-en-criptomonedas', nombre: 'Análisis Técnico', descripcion: 'Gráficos, patrones, indicadores, volumen.', fraseMotivacional: 'El análisis técnico es leer el lenguaje del mercado.', orden: 3 },
    { cursoSlug: 'inversion-en-criptomonedas', nombre: 'Trading y Gestión de Riesgo', descripcion: 'Estrategias, position sizing, stop loss, portfolio.', fraseMotivacional: 'El trading es disciplina, no emoción.', orden: 4 },

    // ─── Desarrollo Móvil ───
    // React Native → 5 módulos
    { cursoSlug: 'react-native-apps-moviles', nombre: 'Setup y Fundamentos', descripcion: 'Expo, project structure, components, StyleSheet.', fraseMotivacional: 'Una sola base de código, dos plataformas nativas.', orden: 1 },
    { cursoSlug: 'react-native-apps-moviles', nombre: 'Navegación', descripcion: 'React Navigation, Stack, Tabs, Drawer, params.', fraseMotivacional: 'La navegación es el esqueleto de tu app.', orden: 2 },
    { cursoSlug: 'react-native-apps-moviles', nombre: 'Estado y Datos', descripcion: 'Context API, Zustand, AsyncStorage, API calls.', fraseMotivacional: 'El estado bien gestionado es una app estable.', orden: 3 },
    { cursoSlug: 'react-native-apps-moviles', nombre: 'APIs Nativas', descripcion: 'Cámara, geolocalización, notificaciones, permissions.', fraseMotivacional: 'Las APIs nativas conectan tu app con el dispositivo.', orden: 4 },
    { cursoSlug: 'react-native-apps-moviles', nombre: 'Build y Publicación', descripcion: 'EAS Build, App Store, Play Store, debugging.', fraseMotivacional: 'Tu app merece estar en las tiendas.', orden: 5 },

    // Flutter → 5 módulos
    { cursoSlug: 'flutter-ui-beautiful-y-rapida', nombre: 'Dart Fundamentals', descripcion: 'Sintaxis, null safety, async, collections, POO.', fraseMotivacional: 'Dart es el lenguaje que impulsa Flutter.', orden: 1 },
    { cursoSlug: 'flutter-ui-beautiful-y-rapida', nombre: 'Widgets Básicos', descripcion: 'Text, Container, Row, Column, Image, Icons.', fraseMotivacional: 'En Flutter todo es un widget. Absolutamente todo.', orden: 2 },
    { cursoSlug: 'flutter-ui-beautiful-y-rapida', nombre: 'Layouts y Navegación', descripcion: 'ListView, GridView, Stack, Navigator, routes.', fraseMotivacional: 'Los layouts de Flutter son flexibles y poderosos.', orden: 3 },
    { cursoSlug: 'flutter-ui-beautiful-y-rapida', nombre: 'Estado y Forms', descripcion: 'setState, Provider, Riverpod, forms, validation.', fraseMotivacional: 'Gestionar estado es el corazón de Flutter.', orden: 4 },
    { cursoSlug: 'flutter-ui-beautiful-y-rapida', nombre: 'Firebase y Deploy', descripcion: 'Auth, Firestore, Storage, FCM, build, publish.', fraseMotivacional: 'Flutter + Firebase = app completa en minutos.', orden: 5 },

    // Kotlin Android → 5 módulos
    { cursoSlug: 'kotlin-para-android', nombre: 'Kotlin Esencial', descripcion: 'Null safety, functions, collections, coroutines.', fraseMotivacional: 'Kotlin es el futuro de Android. El presente también.', orden: 1 },
    { cursoSlug: 'kotlin-para-android', nombre: 'Android Studio y Proyecto', descripcion: 'IDE, project structure, Gradle, resources.', fraseMotivacional: 'Android Studio es tu taller de desarrollo.', orden: 2 },
    { cursoSlug: 'kotlin-para-android', nombre: 'Jetpack Compose', descripcion: 'Composables, state, material, animation.', fraseMotivacional: 'Compose revoluciona la UI de Android.', orden: 3 },
    { cursoSlug: 'kotlin-para-android', nombre: 'Arquitectura MVVM', descripcion: 'ViewModel, LiveData, Repository, DI.', fraseMotivacional: 'MVVM separa UI de lógica de negocio.', orden: 4 },
    { cursoSlug: 'kotlin-para-android', nombre: 'Networking y Persistencia', descripcion: 'Retrofit, Room, data stores, debugging.', fraseMotivacional: 'Las apps que conectan y guardan datos son completas.', orden: 5 },

    // Swift iOS → 5 módulos
    { cursoSlug: 'swift-y-swiftui-para-ios', nombre: 'Swift Moderno', descripcion: 'Optionals, closures, structs, protocols.', fraseMotivacional: 'Swift combina potencia y elegancia en un solo lenguaje.', orden: 1 },
    { cursoSlug: 'swift-y-swiftui-para-ios', nombre: 'Xcode y Proyecto', descripcion: 'IDE, project structure, storyboards, assets.', fraseMotivacional: 'Xcode es la ventana al mundo de iOS.', orden: 2 },
    { cursoSlug: 'swift-y-swiftui-para-ios', nombre: 'SwiftUI Fundamentals', descripcion: 'Views, modifiers, layouts, lists, navigation.', fraseMotivacional: 'SwiftUI declara. El framework dibuja.', orden: 3 },
    { cursoSlug: 'swift-y-swiftui-para-ios', nombre: 'State y Data Flow', descripcion: '@State, @Binding, @Observable, MVVM.', fraseMotivacional: 'El data flow es el alma de SwiftUI.', orden: 4 },
    { cursoSlug: 'swift-y-swiftui-para-ios', nombre: 'Networking y Core Data', descripcion: 'URLSession, Codable, Core Data, CloudKit.', fraseMotivacional: 'Conectar y persistir es hacer apps reales.', orden: 5 },

    // ─── Habilidades Blandas ───
    // Comunicación → 4 módulos
    { cursoSlug: 'comunicacion-efectiva', nombre: 'Fundamentos de la Comunicación', descripcion: 'Modelos, barreras, canales, feedback.', fraseMotivacional: 'Comunicar bien es el superpoder más subestimado.', orden: 1 },
    { cursoSlug: 'comunicacion-efectiva', nombre: 'Escucha Activa', descripcion: 'Tipos de escucha, empatía, preguntas, reformulación.', fraseMotivacional: 'Escuchar es más difícil que hablar.', orden: 2 },
    { cursoSlug: 'comunicacion-efectiva', nombre: 'Comunicación Asertiva', descripcion: 'Decir no, expresar necesidades, feedback constructivo.', fraseMotivacional: 'La asertividad es respeto propio y ajeno.', orden: 3 },
    { cursoSlug: 'comunicacion-efectiva', nombre: 'Comunicación No Verbal y Presentaciones', descripcion: 'Lenguaje corporal, tono, presentaciones, storytelling.', fraseMotivacional: 'Tu cuerpo habla aunque tu boca no se abra.', orden: 4 },

    // Liderazgo → 4 módulos
    { cursoSlug: 'liderazgo-y-gestion-de-equipos', nombre: '¿Qué es el Liderazgo?', descripcion: 'Definición, teorías, liderazgo vs gestión.', fraseMotivacional: 'Un líder no crea seguidores. Crea más líderes.', orden: 1 },
    { cursoSlug: 'liderazgo-y-gestion-de-equipos', nombre: 'Estilos de Liderazgo', descripcion: 'Autoritario, democrático, situacional, coaching.', fraseMotivacional: 'El mejor estilo es el que se adapta al momento.', orden: 2 },
    { cursoSlug: 'liderazgo-y-gestion-de-equipos', nombre: 'Motivación y Equipos', descripcion: 'Herzberg, delegación, empowerment, diversidad.', fraseMotivacional: 'Motivar es el arte de encender la chispa interna.', orden: 3 },
    { cursoSlug: 'liderazgo-y-gestion-de-equipos', nombre: 'Conflictos y Decisiones', descripcion: 'Gestión de conflictos, toma de decisiones, coaching.', fraseMotivacional: 'Los conflictos mal gestionados destruyen equipos.', orden: 4 },

    // Pensamiento Crítico → 3 módulos
    { cursoSlug: 'pensamiento-critico-y-resolucion-de-problemas', nombre: 'Sesgos Cognitivos', descripcion: 'Anclaje, confirmación, disponibilidad, halo.', fraseMotivacional: 'Conocer tus sesgos es el primer paso para pensar mejor.', orden: 1 },
    { cursoSlug: 'pensamiento-critico-y-resolucion-de-problemas', nombre: 'Modelos Mentales', descripcion: 'Pensamiento sistémico, inverso, probabilidades.', fraseMotivacional: 'Los modelos mentales son lentes para ver la realidad.', orden: 2 },
    { cursoSlug: 'pensamiento-critico-y-resolucion-de-problemas', nombre: 'Creatividad y Resolución', descripcion: 'SCAMPER, Six Thinking Hats, design thinking.', fraseMotivacional: 'La creatividad se entrena, no se espera.', orden: 3 },

    // Gestión del Tiempo → 3 módulos
    { cursoSlug: 'gestion-del-tiempo-y-productividad', nombre: 'Priorización', descripcion: 'Eisenhower, Pareto, ABC, matrix.', fraseMotivacional: 'No se trata de tener más tiempo. Se trata de usar mejor el que tienes.', orden: 1 },
    { cursoSlug: 'gestion-del-tiempo-y-productividad', nombre: 'Técnicas de Foco', descripcion: 'Pomodoro, time blocking, deep work, flow.', fraseMotivacional: 'El foco es el superpoder de nuestra era.', orden: 2 },
    { cursoSlug: 'gestion-del-tiempo-y-productividad', nombre: 'Hábitos y Herramientas', descripcion: 'Hábitos atómicos, automatización, apps, rutinas.', fraseMotivacional: 'Los hábitos son compound interest de la productividad.', orden: 3 },

    // Negociación → 3 módulos
    { cursoSlug: 'negociacion-y-persuasion', nombre: 'Fundamentos de Negociación', descripcion: 'BATNA, WATNA, zona de acuerdo, tipos.', fraseMotivacional: 'Negociar es encontrar estilo donde todos ganan.', orden: 1 },
    { cursoSlug: 'negociacion-y-persuasion', nombre: 'Técnica de Harvard', descripcion: 'Intereses vs posiciones, principios, opciones.', fraseMotivacional: 'Separar a las personas del problema es la clave.', orden: 2 },
    { cursoSlug: 'negociacion-y-persuasion', nombre: 'Persuasión y Ética', descripcion: 'Principios de Cialdini, persuasión ética, pitching.', fraseMotivacional: 'La persuasión es ética cuando se usa para crear valor.', orden: 3 },
  ];

  const totalModulos = modulos.length;
  console.log(`📦 Iniciando siembra de ${totalModulos} módulos...`);

  let contador = 0;

  for (const modulo of modulos) {
    contador++;
    const numero = String(contador).padStart(3, '0');

    const curso = await prisma.curso.findUnique({
      where: { slug: modulo.cursoSlug },
      select: { id: true, nombre: true },
    });

    if (!curso) {
      console.log(`  ⚠️  ${numero}/${totalModulos} - Curso no encontrado: ${modulo.cursoSlug} — Saltando`);
      continue;
    }

    // Verificar si el módulo ya existe
    const existente = await prisma.modulo.findFirst({
      where: {
        cursoId: curso.id,
        nombre: modulo.nombre,
      },
      select: { id: true },
    });

    if (existente) {
      console.log(`  ⏭️  ${numero}/${totalModulos} - ${modulo.nombre} → ${curso.nombre} (ya existe)`);
      continue;
    }

    await prisma.modulo.create({
      data: {
        cursoId: curso.id,
        nombre: modulo.nombre,
        descripcion: modulo.descripcion,
        fraseMotivacional: modulo.fraseMotivacional,
        orden: modulo.orden,
        otorgaCertificacion: modulo.orden >= 4,
        estaPublicado: true,
      },
    });

    console.log(`  ✅ ${numero}/${totalModulos} - ${modulo.nombre} → ${curso.nombre}`);
  }

  console.log(`\n🎉 ¡${totalModulos} módulos sembrados con éxito!`);
  console.log('--------------------------------------------------');
}
