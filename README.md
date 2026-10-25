# Memoria de Capitán Sarmiento

Archivo web de fotografías y documentos históricos de Capitán Sarmiento. Es un sitio estático: no necesita instalación ni servidor.

## Estructura

| Archivo | Para qué sirve |
|---|---|
| `js/datos.js` | **Todo el contenido**: títulos, descripciones, fechas, lugares y fotos actuales. Es el único archivo que hace falta tocar para editar textos. |
| `js/app.js` | Lógica del sitio (páginas, búsqueda, visor). |
| `css/estilos.css` | Estilos. |
| `index.html` | Estructura base. |
| `fonts/` | Letras propias (licencia SIL OFL, con sus textos). |
| `docs/` | Informe de accesibilidad. |
| `pruebas/` | Pruebas opcionales en navegador real. |
| `img/` | Copias de consulta (hasta 1600 px, sin metadatos). |
| `originales/` | Imágenes tal como llegaron. No se editan. |

## Editar el título, la descripción u otros datos de una foto

1. Abrí `js/datos.js` y buscá la foto por su título, o por el número de su archivo (por ejemplo `238430`).
2. Cambiá solo el texto entre comillas. Cada dato tiene al lado un comentario que explica para qué sirve.
3. Guardá y recargá la página.

Si un texto necesita comillas dobles, usá «así» o escribilas `\"así\"`.

Los campos de cada foto:
`id` (la dirección de la ficha), `archivo`, `ancho` y `alto` (en píxeles), `titulo`, `descripcion` (corta), `miniatura` (versión liviana para las listas, o `null`), `epoca` (época aproximada, o `null`), `textoAlternativo` (lo leen los lectores de pantalla), `coleccion`, `destacada` (`true` = aparece en el inicio) y `actual` (`null` si no tiene foto actual).

## Agregar una foto nueva

1. Copiá la imagen a `img/`. Si mide más de 640 px de ancho, guardá además una copia de 640 px en `img/min/` y anotala en `miniatura`: así las listas cargan rápido en celulares.
2. En `js/datos.js`, duplicá un bloque `{ ... }` de `FOTOS`, pegalo al final de la lista y cambiá sus datos. `ancho` y `alto` salen de las propiedades de la imagen.

Para documentos, el procedimiento es el mismo en `DOCUMENTOS`.

## Historia

La página Historia sale de `js/datos.js`: `RESUMEN` es la lista de frases de «En pocas palabras»; `HISTORIA` tiene los apartados, cada uno con un `titulo`, los `parrafos` completos y su versión de lectura fácil en `facil`; `GLOSARIO` tiene las palabras difíciles. Para agregar uno, duplicá un bloque.

## Línea de tiempo

Es una línea horizontal de años: al elegir un año aparece, debajo, todo lo que pasó ese año. La dirección guarda el año (`#/linea-de-tiempo/1884`). Debajo hay un desplegable con todos los hechos en una lista.

Se arma sola con los bloques de `HITOS` (hechos sin imagen) y con los documentos que tienen `fecha` y `anio`. Para sumar un hecho, duplicá un bloque de `HITOS` y completá `anio` (para ordenar), `fecha` (como se muestra), `titulo` y `descripcion`. Cada hecho trae su fuente en un comentario, que no se muestra en el sitio.

## Agregar o cambiar la foto actual (barra Antes / Ahora)

1. Copiá la foto actual a `img/` (por ejemplo `img/actual-estacion.jpg`).
2. En el bloque de la foto antigua, reemplazá `actual: null` por:

```js
actual: {
  archivo: "img/actual-estacion.jpg",
  textoAlternativo: "Descripción de la foto actual",
  posicion: "50% 50%",
},
```

`posicion` elige qué parte de la foto actual queda a la vista cuando se recorta para igualar el encuadre de la antigua (horizontal y vertical, en %). Si la foto actual es mucho más ancha que la antigua, probá valores como `"30% 50%"` o `"70% 50%"` hasta que coincida.
Las fotos con `actual` muestran «Con foto actual» en el archivo y una barra al ampliarlas.

## Accesibilidad

**Para entender el contenido**
- **Lectura fácil** en Historia: cada apartado tiene una versión de frases cortas, con una idea por frase (campo `facil` de `HISTORIA`). Se activa con un botón en la página o desde «Accesibilidad».
- **Palabras difíciles** (glosario) con 37 términos, y **En pocas palabras** al inicio de Historia.
- **Ir a un apartado** (Historia) y una **línea de tiempo horizontal**: se elige un año, se arrastra la línea o se usan las flechas, y debajo aparece todo lo de ese año.
- Íconos junto a cada opción del menú y una guía, **Cómo usar el sitio**, en lenguaje simple.

**Para ver y leer mejor**
- Texto en cinco niveles (hasta «Gigante»), botones «Agrandar texto» y «Achicar texto» en cada página, letra fácil de leer (Atkinson Hyperlegible), negrita, más espacio entre letras y líneas, líneas más cortas y regla de lectura.
- Fondo automático, claro u oscuro; alto contraste; sin colores; cinco fondos suaves (blanco, amarillo, verde, azul y gris). Respeta el contraste alto del sistema y el modo de colores forzados de Windows.
- Enlaces y títulos resaltados, listas solo con texto, impresión limpia.

**Para escuchar**
- **Escuchar esta página**: lectura en voz alta con la voz del dispositivo, bloque por bloque, marcando en pantalla lo que se lee, con velocidad elegible. Siempre visible; si no hay voz o no suena, muestra un aviso.
- **Buscar hablando** en el archivo (dictado del navegador; avisa si no está disponible).

**Para moverse**
- Botón **Volver**, **Volver arriba**, enlace «Saltar al contenido» y foco que va al título de cada página.
- Marco grueso de foco, botones y enlaces más grandes, cursor grande y una **barra de botones fija abajo** (Volver, Inicio, Escuchar y Accesibilidad) para usar con una mano.
- Todo se maneja con teclado (Tab, Enter, Escape), el divisor Antes / Ahora tiene botones además de la barra, y los botones tienen texto visible para el control por voz.

**Todo se guarda en el dispositivo.** Hay dos «Ajustes rápidos» (Lectura cómoda y Máxima visibilidad) y «Restablecer todo».

**Informe completo:** `docs/ACCESIBILIDAD.md` (hallazgos, correcciones, cobertura y pendientes). Las pruebas en navegador real están en `pruebas/` (ver su `LEEME.md`).

**Cómo se verificó:** auditoría en un Chromium real con axe-core (97 auditorías, 0 violaciones, con contraste calculado), reflujo a 320 px en 65 comprobaciones, 13 combinaciones de contraste, espaciado de texto, objetivos táctiles y recorrido con teclado. No hubo auditoría externa ni prueba con lectores de pantalla o personas con discapacidad: eso sigue pendiente.

**Límites conocidos:** no hay videos ni audios, por lo que no hay subtítulos ni lengua de señas; los documentos manuscritos son imágenes y todavía no tienen transcripción (solo una descripción); la voz y el dictado dependen del navegador.

Los estilos están al final de `css/estilos.css`; la lógica, en `js/app.js` (secciones «Botón Volver», «Ajustes de accesibilidad», «Lectura en voz alta» y «Búsqueda por voz»).

## Publicar en GitHub Pages

1. Subí el contenido de esta carpeta a un repositorio.
2. En el repositorio: Settings, Pages, «Deploy from a branch», rama `main`, carpeta `/ (root)`.
3. Esperá unos minutos y abrí la dirección que muestra GitHub.

Para probarlo en tu computadora: abrí una terminal en esta carpeta, ejecutá `python3 -m http.server` y entrá a `http://localhost:8000`.
