# Accesibilidad del sitio — informe de auditoría y estado

**Objetivo:** que cualquier persona pueda ver, entender y recorrer el sitio sin ayuda de otra.
**Norma de referencia:** WCAG 2.2, nivel AA (en Argentina, la Ley 26.653 toma las pautas WCAG como referencia).
**Última auditoría:** octubre de 2026, en Chromium real (versión 153) con axe-core y pruebas propias (carpeta `pruebas/`).

## 1. Cómo se auditó

1. **Reconocimiento:** lectura del código, del árbol de accesibilidad real del navegador y de capturas de pantalla.
2. **Medición en navegador real:** reflujo a 320 px, contraste calculado, tamaño de objetivos, recorrido con Tab, espaciado de texto (WCAG 1.4.12), ventanas en celular horizontal, movimiento, peso de las páginas y conexión lenta.
3. **Corrección por fases, de lo más grave a lo menos grave**, volviendo a medir después de cada cambio. Una de las correcciones introdujo una regresión (A-13) que la propia batería detectó.

## 2. Hallazgos y correcciones

Orden: del más grave al menos grave.

### A-01 · Crítica · Reflujo a 320 px (WCAG 1.4.10)
- **Personas afectadas:** baja visión, quien amplía el texto o usa celulares chicos.
- **Problema:** la cabecera se salía de la pantalla y obligaba a desplazarse de costado en las 13 páginas (con texto «Gigante» medía unos 690 px).
- **Corrección:** las acciones pasan a su propia fila y se parten en líneas; los botones pueden partir palabras largas.
- **Verificación:** `reflujo.mjs`, 0 fallos en 65 comprobaciones (5 configuraciones × 13 páginas).
- **Riesgo de regresión:** alto. Cualquier botón o título nuevo puede reabrirlo. Correr `reflujo.mjs` tras cada cambio de estilos.

### A-02 · Alta · Selectores más anchos que la pantalla (1.4.10)
- **Problema:** «Ir a un apartado», «Ir a una fecha» y las colecciones se salían de 320 px.
- **Corrección:** ancho 100 %, mínimo 0 y texto con puntos suspensivos; columnas de cuadrícula que pueden encogerse.
- **Verificación:** `reflujo.mjs` y espaciado de texto WCAG 1.4.12 a 320 y 375 px. **Riesgo:** medio.

### A-03 · Alta · Visor en celular horizontal (1.4.10, 1.3.4)
- **Problema:** a 568×320 el visor dejaba 41 px para la foto.
- **Corrección:** una sola fila de herramientas, barra Antes/Ahora compacta y ventana desplazable.
- **Verificación:** área de la imagen 160 px de 320 px (`contraste-espaciado-ventanas.mjs`). **Riesgo:** medio.

### A-04 · Alta · Cabecera fija con texto grande (1.4.4, 2.4.11)
- **Problema:** ocupaba el 27 % (Muy grande) y el 36 % (Gigante) de la pantalla.
- **Corrección:** solo queda fija con texto normal o grande y pantallas amplias y altas.
- **Verificación:** medición a 1280×800 con tres tamaños. **Riesgo:** bajo.

### A-05 · Alta · Barra inferior tapaba el foco (2.4.11)
- **Problema:** al recorrer con Tab, la barra opcional tapaba elementos.
- **Corrección:** margen de desplazamiento calculado con la altura real de lo que queda fijo; la barra se parte en filas.
- **Verificación:** 0 elementos tapados en 60 paradas. **Riesgo:** medio (cualquier elemento fijo nuevo).

### A-06 · Alta · Objetivos táctiles menores a 24 px (2.5.8)
- **Problema:** enlaces del pie (17 px), migas de pan (16 px) y enlaces de la línea de tiempo (22 px).
- **Corrección:** mínimo de 44 px de alto en esos enlaces y en los botones chicos.
- **Verificación:** ningún objetivo menor a 24 px en 10 páginas (`objetivos-y-teclado.mjs`). **Riesgo:** bajo.

### A-07 · Media · Estado doble en botones que cambian de texto (4.1.2)
- **Problema:** «Escuchar esta página» y «Ver en lectura fácil» cambiaban de texto y de estado a la vez, y se anunciaban dos veces.
- **Corrección:** solo cambia el texto. **Verificación:** `semantica.mjs`. **Riesgo:** bajo.

### A-08 · Media · Anuncios duplicados y obsoletos (4.1.3)
- **Problema:** cada cambio de página se anunciaba dos veces (región viva y foco en el título) y el conteo de resultados quedaba obsoleto.
- **Corrección:** solo el foco en el título; la región viva se limpia al navegar y el conteo se anuncia solo al filtrar.
- **Verificación:** `semantica.mjs`. **Riesgo:** medio.

### A-09 · Media · Salto de nivel de título (1.3.1)
- **Problema:** «Sin resultados» pasaba del nivel 1 al 3. **Corrección:** nivel 2. **Verificación:** `semantica.mjs`. **Riesgo:** bajo.

### A-10 · Media · Lectura en voz alta sin control (2.2.2, 2.1.1)
- **Problema:** no se podía pausar ni saltar, y la página se desplazaba sola dejando los botones fuera de alcance.
- **Corrección:** Anterior, Pausar/Continuar, Siguiente y Detener, fijos abajo mientras se lee.
- **Verificación:** `lectura-en-voz-alta.mjs` (con una voz simulada). **Riesgo:** medio.

### A-11 · Media · Dictado sin aviso de privacidad
- **Problema:** en algunos navegadores el audio de «Buscar hablando» se envía a un servicio externo y no se avisaba.
- **Corrección:** aviso visible en el archivo y apartado «Privacidad» en «Acerca». **Verificación:** `semantica.mjs`. **Riesgo:** bajo.

### A-12 · Baja · Letras pedidas a Google Fonts
- **Corrección:** letras propias (licencia SIL OFL, en `fonts/`). **Verificación:** `fuentes-propias.mjs`, cero pedidos externos. **Riesgo:** bajo.

### A-13 · Regresión propia durante las correcciones · Menú partía palabras (1.4.4)
- **Problema:** un ajuste de partido de palabras dejaba el menú de escritorio como «Inici/o».
- **Corrección y prueba:** reglas propias del menú y `menu-escritorio.mjs`, que también comprueba que marca, acciones y menú no se superpongan.

### A-14 · Media · Peso de las imágenes en listas (datos móviles y conexiones lentas)
- **Personas afectadas:** quien tiene datos limitados o una conexión lenta; dispositivos modestos.
- **Problema:** las listas descargaban las fotos completas de 1600 px: `/archivo` pesaba 1625 KB y el inicio 1598 KB.
- **Corrección:** miniaturas de 640 px para las listas (`img/min/`), imagen adaptable en el inicio; la ficha y el visor siguen usando la imagen completa.
- **Verificación:** `peso-y-conexion.mjs`, sin caché y sin compresión: `/archivo` 538 KB (−67 %) e inicio 835 KB (−48 %). **Riesgo:** bajo.

### A-15 · Baja · Desplazamiento automático al leer (2.2.2 y buenas prácticas de movimiento)
- **Problema:** la página se desplazaba sola al leer, también para quien pidió menos movimiento al sistema.
- **Corrección:** opción «No mover la página mientras se lee, solo resaltar», que viene activada si el sistema pide menos movimiento.
- **Verificación:** `movimiento.mjs`, que además comprueba que no hay transiciones ni animaciones CSS. **Riesgo:** bajo.

## 2.1 Mejoras de diseño pedidas después de la auditoría

### Línea de tiempo horizontal
- **Qué es:** una línea con los 38 años que tienen hechos, ordenados de izquierda a derecha. Los años muy separados dejan más espacio entre sí y los que tienen más de un hecho llevan un número.
- **Cómo se usa:** se elige un año con un clic o un toque, con las flechas (izquierda y derecha, Inicio y Fin) o con los botones «Año anterior» y «Año siguiente». La línea se arrastra con el mouse y se desliza con el dedo. Debajo aparece todo lo que pasó ese año, con su fecha completa, su descripción y el enlace al documento si lo hay. La dirección guarda el año elegido (`#/linea-de-tiempo/1884`) para poder compartirlo.
- **Accesibilidad:** sigue el patrón de pestañas (`tablist`, `tab`, `tabpanel`) con un solo año en el orden de Tab, nombres como «1882, 2 hechos» (incluyen el año visible), objetivos de 44 px, alternativa al arrastre con botones y teclado (2.5.7), y la lista completa de hechos en un desplegable para leer de corrido.
- **Verificación:** `linea-de-tiempo.mjs` (escritorio, celular de 375 px y 320 px), axe sin violaciones y sin saltos de nivel de título.

### Cuadrícula del archivo
- **Problema:** las fotos estaban en columnas de alto libre y quedaban unas más abajo que otras.
- **Corrección:** cuadrícula pareja, con todas las miniaturas en el mismo marco de 4:3. Solo se recorta la miniatura; la ficha y el visor muestran la foto completa.
- **Verificación:** `archivo-cuadricula.mjs`: mismo alto y proporción a 1280, 900, 375 y 320 px.

## 3. Verificado sin hallazgos

- **axe-core con contraste calculado:** 97 auditorías (13 páginas × 7 configuraciones de ajustes, más panel, visor, menú, lectura, sin resultados y barra inferior): 0 violaciones.
- **Contraste:** 13 combinaciones (fondo claro, oscuro, alto contraste, cinco fondos suaves, sin colores, enlaces resaltados, «Máxima visibilidad», y el sistema en modo oscuro o pidiendo más contraste).
- **Teclado:** todos los elementos interactivos se alcanzan con Tab, con indicador visible y sin quedar tapados. Visor, panel y menú abren con Enter, se cierran con Escape y devuelven el foco; en las ventanas modales el foco nunca llega a la página de atrás. El deslizador Antes/Ahora se maneja con flechas.
- **Estructura:** un h1 por página, sin saltos de nivel, un solo `main`, cabecera y pie, ids únicos y todos los controles con nombre.
- **Control por voz:** todo control con texto visible lo incluye en su nombre accesible (2.5.3).
- **Colores forzados de Windows:** botones con borde propio, sin desborde y con el visor y el divisor distinguibles (`colores-forzados.mjs`).
- **Integridad:** los enlaces internos llevan a páginas que existen, todas las imágenes cargan, y no hay errores ni advertencias en la consola.

## 4. Matriz de cobertura por página

Cada celda se comprobó en Chromium real: ✓ cumple, — no aplica.

| Página | Estructura | Reflujo 320 px | Contraste | Teclado y foco | Objetivos ≥ 24 px | Nombres | Lectura en voz alta |
|---|---|---|---|---|---|---|---|
| Inicio | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Archivo (búsqueda y dictado) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Ficha de foto (visor y Antes/Ahora) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Documentos y ficha | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Historia (lectura fácil) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Palabras difíciles | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Línea de tiempo | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Colecciones | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Acerca y Cómo usar el sitio | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Página no encontrada | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Formularios largos, autenticación, pagos, captchas | — | — | — | — | — | — | — |

## 5. Cobertura por tipo de barrera

| Barrera | Qué se hizo | Estado |
|---|---|---|
| Ceguera | Estructura semántica, textos alternativos, foco al título, anuncios medidos, lectura en voz alta propia | Verificado con axe y árbol de accesibilidad. **Falta probar con lectores de pantalla reales.** |
| Baja visión | Cinco tamaños de texto, seis fondos, alto contraste, sin colores, letra legible, espaciado, regla de lectura, zoom de imágenes, reflujo a 320 px | Verificado en navegador real |
| Daltonismo y sensibilidad a la luz | Nada depende solo del color; fondo oscuro y fondos suaves | Verificado (contraste) |
| Sordera e hipoacusia | Sin audio obligatorio; lectura fácil y glosario | **Sin videos: sin lengua de señas ni subtítulos** |
| Movilidad reducida | Todo con teclado, objetivos de 44 px, botones grandes opcionales, barra inferior para una mano, alternativa al arrastre, búsqueda por voz | Verificado. **Falta probar con control por voz y pulsadores.** |
| Discapacidad cognitiva, dislexia, TDAH, baja alfabetización | Lectura fácil, glosario, resumen, íconos en el menú, ayuda paso a paso, regla y lectura resaltada | Implementado. **Falta probar con personas.** |
| Temblores y toques accidentales | Botones grandes, sin acciones destructivas ni límites de tiempo | Implementado |
| Movimiento y epilepsia | Sin animaciones ni destellos; sin desplazamiento automático si se pide menos movimiento | Verificado |
| Conexión lenta y datos limitados | Miniaturas, letras propias, sin recursos de terceros | Verificado (A-14) |

## 6. Archivos modificados o creados en esta auditoría

- **Estilos:** `css/estilos.css` (cabecera, reflujo, objetivos, visor, barra inferior, controles de lectura, letras propias).
- **Lógica:** `js/app.js` (medidas de lo fijo, pausa y saltos en la lectura, anuncios, miniaturas, opción de no desplazar).
- **Contenido:** `js/datos.js` (campo `miniatura`), `index.html` (visor, panel).
- **Recursos:** `fonts/` (letras y licencias), `img/min/` (miniaturas).
- **Documentación y pruebas:** `docs/ACCESIBILIDAD.md`, `pruebas/`, `README.md`.

## 7. Riesgos pendientes y responsables sugeridos

| Riesgo | Por qué importa | Responsable sugerido |
|---|---|---|
| Sin prueba con lectores de pantalla reales (NVDA, JAWS, VoiceOver, TalkBack) | Las pruebas automáticas no detectan si la experiencia es comprensible | Quien administra el archivo, con apoyo de una persona usuaria de lector de pantalla |
| Documentos manuscritos sin transcripción | Una persona ciega solo accede a una descripción, no al contenido | Quien conozca esa letra, con revisión de quien administra el archivo |
| Sin lengua de señas argentina ni subtítulos | Personas sordas cuya primera lengua es la LSA pueden tener dificultad con textos largos | Quien produzca contenido audiovisual |
| Solo probado en Chromium | Safari y Firefox pueden comportarse distinto | Quien desarrolla |
| Voz y dictado dependen del navegador | En algunos dispositivos no hay voz en español | Quien desarrolla (ya avisa al usuario) |
| Fotos actuales del comparador | Parecen capturas de Street View | Quien administra el archivo |

## 8. Cómo mantener la accesibilidad al agregar contenido

1. **Foto nueva:** completá siempre `titulo`, `descripcion` (corta) y `textoAlternativo` (lo que se ve, sin repetir el título). Si mide más de 640 px, agregá su miniatura en `img/min/`.
2. **Página o texto nuevo:** un solo título principal, los demás sin saltar niveles, frases cortas y palabras difíciles en `GLOSARIO`.
3. **Botones y enlaces nuevos:** con texto visible, de al menos 44 px de alto y sin ancho fijo en píxeles.
4. **Colores nuevos:** deben tener contraste de al menos 4,5:1 con el fondo; probar en fondo claro, oscuro y alto contraste.
5. **Antes de publicar:** correr `reflujo.mjs`, `axe-completo.mjs` y `semantica.mjs` (ver `pruebas/LEEME.md`).
6. **No usar:** ancho o alto fijo en píxeles en contenedores de texto, `outline: none` sin reemplazo, información transmitida solo por color, animaciones.

## 9. Lista de verificación manual (antes de difundir)

- [ ] Recorrer inicio, archivo, una ficha, historia y línea de tiempo con NVDA o VoiceOver, sin mirar la pantalla.
- [ ] Recorrer con TalkBack en un celular Android.
- [ ] Usar el sitio solo con teclado, sin mouse.
- [ ] Texto «Gigante» y zoom del navegador al 400 %.
- [ ] Alto contraste y «Máxima visibilidad» en un celular real.
- [ ] «Escuchar esta página» y «Buscar hablando» en el navegador del celular (Chrome o Safari).
- [ ] Que una persona mayor, sin ayuda, encuentre una foto y su descripción.

## 10. Resultados de las pruebas (salida real de la última corrida)

Comandos: en la carpeta del sitio, `python3 -m http.server 8123`; en `pruebas/`, `node <prueba>.mjs`.

```
reflujo.mjs                       Total: 0 fallos en 65 comprobaciones
semantica.mjs                     Todo en orden
menu-escritorio.mjs               Todo en orden
ventanas-enlaces-y-nombres.mjs    Todo en orden
lectura-en-voz-alta.mjs           Todo en orden
movimiento.mjs                    Todo en orden
colores-forzados.mjs              Todo en orden
linea-de-tiempo.mjs               Todo en orden
archivo-cuadricula.mjs            Todo en orden
fuentes-propias.mjs               pedidos que fallaron: ninguno
axe-completo.mjs                  Auditorías axe: 97 — Violaciones: 0
peso-y-conexion.mjs               /archivo 538 KB (antes 1625 KB) · inicio 835 KB (antes 1598 KB)
```

Las cifras de peso se midieron sin caché y sin compresión; en GitHub Pages los archivos de texto se sirven comprimidos.
