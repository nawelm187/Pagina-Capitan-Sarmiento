# Lengua de señas argentina (LSA) en el sitio

## Qué está listo y qué falta

**Listo:** el sitio puede mostrar un video en lengua de señas argentina junto a cualquier foto, documento, apartado de Historia o hecho de la línea de tiempo. Para activarlo basta con una línea en `js/datos.js`. Mientras no haya videos, no se muestra nada.

**Falta:** los videos. Hay que grabarlos con intérpretes de LSA. Yo no puedo producirlos, y los avatares o traducciones automáticas no son una alternativa: las organizaciones de personas Sordas advierten que no reemplazan a una persona intérprete.

Los guiones listos para entregar a quien interprete están en `GUIONES-LSA.md`: bienvenida, «Cómo usar el sitio», los 17 apartados de Historia y los hechos más importantes, con la línea exacta que hay que agregar en `js/datos.js` para cada video.

## Cómo se carga un video

1. Guardá el video (y sus subtítulos, si los hay) en una carpeta `lsa/` dentro del sitio.
2. En `js/datos.js`, agregá una línea al elemento que corresponda:

```js
lsa: { video: "lsa/historia-estacion.mp4", subtitulos: "lsa/historia-estacion.vtt" },
```

`subtitulos` y `poster` (imagen previa) son opcionales.

3. Guardá y recargá. Aparece un botón «Ver en lengua de señas argentina (LSA)». Al abrirlo se muestra el video, con controles, sin reproducción automática y con los subtítulos activados si existen. Hasta que alguien lo abre, el navegador no descarga nada del video.

Dónde se puede agregar la línea `lsa`:
- un apartado de `HISTORIA` (queda debajo del título del apartado);
- un hecho de `HITOS` (aparece dentro del año en la línea de tiempo);
- una foto de `FOTOS` o un documento de `DOCUMENTOS` (aparece en su ficha).

## Por dónde conviene empezar

1. **Un video corto de bienvenida y de «Cómo usar el sitio»** (1 minuto).
2. **Los 17 apartados de Historia.** Los textos de «lectura fácil» (`facil` en `HISTORIA`) ya están escritos con frases cortas y sirven de guion para la persona intérprete. Cada uno dura alrededor de un minuto.
3. **Los hechos más importantes de la línea de tiempo**, por ejemplo la fundación en 1884 y la autonomía en 1961.

## Cómo grabarlos bien

- **Quién:** intérpretes de LSA o personas Sordas señantes, de preferencia vinculadas a la comunidad Sorda de la zona o a una asociación de Sordos (por ejemplo, la Confederación Argentina de Sordos o asociaciones de la provincia de Buenos Aires). Conviene que una persona Sorda revise cada video antes de publicarlo.
- **Encuadre:** de la cintura hacia arriba, con espacio para los brazos, cámara fija y horizontal (16:9).
- **Fondo y luz:** fondo liso y de un solo color que contraste con la piel y la ropa; luz pareja y de frente, sin contraluz ni sombras sobre las manos y la cara.
- **Ropa:** lisa, de un color que contraste con el fondo, sin estampados ni mangas holgadas.
- **Ritmo:** sin música de fondo, con pausas entre ideas. Es mejor hacer varios videos cortos que uno largo.
- **Subtítulos:** un archivo `.vtt` con el texto en español de lo que se señó. Ayuda a personas oyentes y a quienes no leen LSA.
- **Permisos:** una autorización escrita de cada persona que aparece en el video para publicarlo, y acordar si se menciona su nombre.

## Cómo preparar el archivo

Formato recomendado: **MP4 (H.264)**, que se reproduce en todos los navegadores. Con `ffmpeg`:

```
ffmpeg -i grabacion.mov -vf scale=-2:720 -c:v libx264 -crf 26 -preset slow \
       -c:a aac -b:a 96k -movflags +faststart historia-estacion.mp4
```

Un minuto a 720p pesa entre 5 y 12 MB. GitHub no admite archivos de más de 100 MB y el sitio completo no debería pasar de 1 GB, así que conviene mantener cada video por debajo de 25 MB.

## Por qué no se incorporan videos de YouTube u otros servicios

Los videos de esas plataformas cargan programas y envían datos de quienes visitan el sitio a terceros. El sitio hoy no usa recursos de otros servidores, y los videos propios mantienen esa decisión. Si más adelante se prefiere una plataforma externa, hay que avisarlo en «Acerca» (apartado «Privacidad») y revisar el costo de privacidad.

## Cómo se comprobó

`pruebas/lengua-de-senas.mjs` carga una copia de prueba con videos simulados en un apartado de Historia, en un hecho de la línea de tiempo y en una ficha, y verifica que:
- no se descargue ningún archivo mientras el video está cerrado;
- el botón se abra con el teclado y mida al menos 44 px;
- los subtítulos se activen al abrirlo;
- no haya reproducción automática;
- el video tenga un nombre que lo describa;
- no haya desplazamiento horizontal a 320 px;
- axe no encuentre violaciones.
