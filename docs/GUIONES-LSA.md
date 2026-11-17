# Guiones para los videos en lengua de señas argentina (LSA)

Estos textos son la **base para que una persona intérprete prepare cada video**. Salen de la versión de «lectura fácil» del sitio: frases cortas, una idea por frase. La interpretación a LSA no es una traducción palabra por palabra: la persona intérprete adapta el contenido a la lengua. Los guiones son un punto de partida, no un texto que haya que seguir al pie de la letra.

Cómo se publica cada video: ver `LENGUA-DE-SENAS.md`.

## Antes de grabar

- Acordar con quien interprete las **señas para los nombres propios** (Capitán Sarmiento, Arrecifes, Dominguito, Urioste, Molina, Saavedra, McGuire, La Luisa, San Carlos Borromeo) y para los **términos del glosario** (partido, estancia, mensura, loteo, enfiteusis, betlemitas). Conviene que sean las mismas en todos los videos.
- Confirmar con la comunidad Sorda de la zona si hay señas locales para Capitán Sarmiento y La Luisa.
- Los **años y fechas** se pueden señar completos; conviene que aparezcan también como texto en pantalla o en los subtítulos.
- Duraciones: son orientativas (entre 90 y 120 palabras por minuto) y las define quien interprete.

## Orden sugerido de producción

| Orden | Video | Duración orientativa |
|---|---|---|
| 1 | Bienvenida al sitio | 0:40 |
| 2 | Cómo usar el sitio | 1:30 |
| 3 a 19 | Los 17 apartados de Historia (abajo) | 0:20 a 0:50 cada uno |
| 20 | Hechos de la línea de tiempo (opcional) | 0:20 cada uno |

## Video 1 · Bienvenida al sitio

> Hola. Este es el archivo «Memoria de Capitán Sarmiento».
> Acá hay fotos y documentos antiguos de nuestro pueblo.
> También hay una línea de tiempo y una historia, contadas con frases cortas.
> Todo el sitio se puede usar con el celular o con la computadora.
> En «Accesibilidad» podés elegir letras más grandes y otros colores.

Archivo sugerido: `lsa/00-bienvenida.mp4`. Se puede cargar donde se prefiera (por ejemplo en «Acerca»), agregando una línea `lsa` al contenido elegido.

## Video 2 · Cómo usar el sitio

> Para moverte por el sitio, usá el botón «Menú».
> Para volver, usá el botón «Volver», que está arriba de cada página.
> En «Archivo» podés buscar fotos. Tocá una foto para verla en grande.
> En la «Línea de tiempo» elegí un año y mirá todo lo que pasó.
> Si te cuesta leer, abrí «Accesibilidad».
> Ahí podés agrandar las letras, cambiar los colores y escuchar la página.

Archivo sugerido: `lsa/01-como-usar-el-sitio.mp4`.

## Videos 3 en adelante · Apartados de Historia

Cada apartado se carga agregando, debajo de su `titulo` en `js/datos.js`, la línea indicada.

### 3. El territorio

> Capitán Sarmiento está en el noroeste de la provincia de Buenos Aires.
> La ciudad queda a 144 kilómetros de la ciudad de Buenos Aires, por la ruta 8.
> El partido mide 617 kilómetros cuadrados.
> Limita con Arrecifes, San Pedro, Baradero, San Antonio de Areco, Carmen de Areco y Salto.
> El río Arrecifes es su límite norte. La tierra tiene lomadas suaves y varios arroyos.

- **Palabras:** 64 · **Duración orientativa:** 0:32 a 0:43
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/02-el-territorio.mp4", subtitulos: "lsa/02-el-territorio.vtt" },`

### 4. El Pago de los Arrecifes

> Hace mucho, esta zona se llamaba Pago de los Arrecifes.
> Se cuenta que en 1586 el capitán Diego Ortiz de Zárate cruzó el río. Dicen que dijo «ved arrecifes aquí». De ahí viene el nombre.
> En 1784 se formó el partido de Arrecifes. Capitán Sarmiento estaba dentro de ese partido.
> Hasta 1961, la historia de Capitán Sarmiento y la de Arrecifes fue la misma.

- **Palabras:** 64 · **Duración orientativa:** 0:32 a 0:43
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/03-el-pago-de-los-arrecifes.mp4", subtitulos: "lsa/03-el-pago-de-los-arrecifes.vtt" },`

### 5. Antes de que existiera el pueblo

> Antes del pueblo, en esta zona vivían pueblos originarios.
> En 1790 había dos grandes estancias. Una era de los padres betlemitas. La otra era de la familia Saavedra.
> En 1822 el gobierno quitó sus bienes a los betlemitas.
> Después, las tierras pasaron a la familia Molina y Urioste. En 1839 la familia Molina las compró al gobierno.

- **Palabras:** 57 · **Duración orientativa:** 0:28 a 0:38
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/04-antes-de-que-existiera-el-pueblo.mp4", subtitulos: "lsa/04-antes-de-que-existiera-el-pueblo.vtt" },`

### 6. Los campos de Ramona Molina de Urioste

> En 1877 Ramona Molina de Urioste repartió sus campos entre sus hijos y nietas.
> Eran 14.722 hectáreas. En esas tierras está hoy la ciudad.
> En esa época todavía no existían la estación ni el pueblo.

- **Palabras:** 35 · **Duración orientativa:** 0:18 a 0:23
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/05-los-campos-de-ramona-molina-de-urioste.mp4", subtitulos: "lsa/05-los-campos-de-ramona-molina-de-urioste.vtt" },`

### 7. La estación

> En 1880 empezaron a poner los rieles del tren.
> El 19 de febrero de 1882 se abrió la estación Capitán Sarmiento.
> El nombre recuerda a Domingo Fidel Sarmiento, llamado Dominguito. Era hijo adoptivo de Domingo Faustino Sarmiento.
> Dominguito murió en una batalla de la guerra del Paraguay, en 1866. Tenía 21 años.

- **Palabras:** 52 · **Duración orientativa:** 0:26 a 0:35
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/06-la-estacion.mp4", subtitulos: "lsa/06-la-estacion.vtt" },`

### 8. La fundación del pueblo

> El pueblo se fundó el 11 de junio de 1884.
> Lo fundaron vecinos y comerciantes que vivían cerca de la estación. Gerardo Gómez tuvo la iniciativa.
> Muchos eran inmigrantes de Italia, España y Francia.
> Algunos historiadores piensan que no hubo una reunión de fundación. Dicen que el pueblo nació porque pasó el tren.
> En 1887 se hizo el plano del pueblo. En 1888 se vendieron los primeros terrenos.

- **Palabras:** 68 · **Duración orientativa:** 0:34 a 0:45
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/07-la-fundacion-del-pueblo.mp4", subtitulos: "lsa/07-la-fundacion-del-pueblo.vtt" },`

### 9. La iglesia de San Carlos Borromeo

> La iglesia de San Carlos Borromeo se inauguró el 4 de noviembre de 1891.
> La pagaron donantes italianos, irlandeses, españoles y franceses.
> San Carlos Borromeo es el patrono de la ciudad. Las fiestas patronales son cada 4 de junio.

- **Palabras:** 39 · **Duración orientativa:** 0:20 a 0:26
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/08-la-iglesia-de-san-carlos-borromeo.mp4", subtitulos: "lsa/08-la-iglesia-de-san-carlos-borromeo.vtt" },`

### 10. Gerardo Gómez

> Gerardo Gómez es reconocido como el fundador del pueblo.
> Tenía un comercio junto a la estación.
> Murió en 1892. Se sabe poco de su vida.

- **Palabras:** 25 · **Duración orientativa:** 0:12 a 0:17
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/09-gerardo-gomez.mp4", subtitulos: "lsa/09-gerardo-gomez.vtt" },`

### 11. Inmigrantes y colectividades

> Llegaron inmigrantes de Italia, España, Francia, Irlanda, Croacia y Serbia.
> Los irlandeses criaban ovejas. Algunos compraron mucha tierra.
> En el cementerio de la ciudad hay cruces celtas con nombres irlandeses.

- **Palabras:** 30 · **Duración orientativa:** 0:15 a 0:20
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/10-inmigrantes-y-colectividades.mp4", subtitulos: "lsa/10-inmigrantes-y-colectividades.vtt" },`

### 12. El Monasterio de San Pablo

> El Monasterio de San Pablo está a 15 kilómetros de la ciudad.
> Lo hizo la comunidad irlandesa de la zona.
> Antes hubo una capilla, inaugurada en 1868. En 1888 se puso la piedra fundamental del monasterio.
> En 1900 empezó a funcionar un colegio.

- **Palabras:** 43 · **Duración orientativa:** 0:22 a 0:29
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/11-el-monasterio-de-san-pablo.mp4", subtitulos: "lsa/11-el-monasterio-de-san-pablo.vtt" },`

### 13. Un pueblo dividido por las vías

> En 1932 la revista «Caras y Caretas» escribió sobre Capitán Sarmiento.
> Decía que las vías del tren dividían el pueblo en dos partes.
> Cada parte tenía un carácter distinto.

- **Palabras:** 29 · **Duración orientativa:** 0:14 a 0:19
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/12-un-pueblo-dividido-por-las-vias.mp4", subtitulos: "lsa/12-un-pueblo-dividido-por-las-vias.vtt" },`

### 14. La Luisa

> La Luisa es el otro pueblo del partido.
> Su estación primero se llamó Saavedra. Después, Arroyo de Luna. Desde 1920 se llama La Luisa.
> El nombre homenajea a María Luisa Saavedra.

- **Palabras:** 31 · **Duración orientativa:** 0:16 a 0:21
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/13-la-luisa.mp4", subtitulos: "lsa/13-la-luisa.vtt" },`

### 15. La autonomía

> Hasta 1961, Capitán Sarmiento era parte del partido de Arrecifes. Ese partido se llamaba Bartolomé Mitre.
> El 29 de junio de 1961, una ley creó el Partido de Capitán Sarmiento.
> La ciudad de Capitán Sarmiento es su cabecera.

- **Palabras:** 38 · **Duración orientativa:** 0:19 a 0:25
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/14-la-autonomia.mp4", subtitulos: "lsa/14-la-autonomia.vtt" },`

### 16. El ferrocarril después

> Los trenes de pasajeros dejaron de pasar en 1992.
> La estación ya no funciona como estación.
> La comunidad la cuida como parte de su historia.

- **Palabras:** 25 · **Duración orientativa:** 0:12 a 0:17
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/15-el-ferrocarril-despues.mp4", subtitulos: "lsa/15-el-ferrocarril-despues.vtt" },`

### 17. La economía del partido

> En el partido se trabaja sobre todo en el campo.
> Se siembra maíz, soja y trigo. También hay vacas.
> Hay fábricas de ropa, mosaicos y silos. Hay una gran planta que procesa pollos.
> Estos datos son de hace unos diez años.

- **Palabras:** 41 · **Duración orientativa:** 0:20 a 0:27
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/16-la-economia-del-partido.mp4", subtitulos: "lsa/16-la-economia-del-partido.vtt" },`

### 18. La Bandera Bonaerense

> En 1997 hubo un concurso en las escuelas para elegir la bandera de la provincia.
> Ganaron cinco estudiantes de Capitán Sarmiento.
> Una ley del 12 de agosto de 1997 creó la bandera.
> Por eso Capitán Sarmiento es la cuna de la Bandera Bonaerense.

- **Palabras:** 43 · **Duración orientativa:** 0:22 a 0:29
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/17-la-bandera-bonaerense.mp4", subtitulos: "lsa/17-la-bandera-bonaerense.vtt" },`

### 19. Fiestas e identidad

> La ciudad tiene varias fiestas.
> Una es la fiesta patronal, el 4 de junio. Otra es el Día de la Bandera Bonaerense.
> También hay una feria del libro y una fiesta del camionero.
> La ciudad se presenta como Capital Nacional del Turf.

- **Palabras:** 42 · **Duración orientativa:** 0:21 a 0:28
- **Línea para `js/datos.js`:** `lsa: { video: "lsa/18-fiestas-e-identidad.mp4", subtitulos: "lsa/18-fiestas-e-identidad.vtt" },`

## Hechos de la línea de tiempo (opcional)

Son los más importantes. El texto es el que ya aparece en el sitio; conviene decirlo con frases cortas.

### 19 de febrero de 1882 · Se habilita la estación Capitán Sarmiento

> La estación pertenecía al Ferrocarril del Oeste, en la línea que unía San Antonio de Areco con Pergamino. Su nombre sería adoptado por el pueblo.

### 11 de junio de 1884 · Se funda el pueblo

> Un grupo de vecinos y comerciantes reunidos alrededor de la estación funda el pueblo de Capitán Sarmiento, por iniciativa de Gerardo Gómez, que tenía un comercio junto a la estación.

### 4 de noviembre de 1891 · Se inaugura el templo parroquial

> La iglesia en honor a San Carlos Borromeo se levantó con donaciones de vecinos italianos, irlandeses, españoles y franceses entre 1889 y 1891.

### 29 de junio de 1961 · Se crea el Partido de Capitán Sarmiento

> La ley provincial 6485 lo crea como distrito número 121, con 525 km² del partido de Bartolomé Mitre, declara ciudad a Capitán Sarmiento y la nombra cabecera.

### 12 de agosto de 1997 · Nace la Bandera Bonaerense

> La ley provincial 11.997 crea la bandera de la Provincia de Buenos Aires, con el diseño de cinco jóvenes de Capitán Sarmiento ganadores de un concurso escolar.

## Lista de control de cada video

- [ ] La persona intérprete revisó el guion y acordó las señas de los nombres propios.
- [ ] Grabado con fondo liso, buena luz de frente y encuadre de la cintura hacia arriba.
- [ ] Una persona Sorda revisó el video antes de publicarlo.
- [ ] Autorización escrita de quien aparece para publicar el video.
- [ ] Subtítulos en español (`.vtt`) revisados.
- [ ] Archivo en MP4 (H.264), de menos de 25 MB, en la carpeta `lsa/` con el nombre indicado.
- [ ] Línea `lsa` agregada en `js/datos.js` y probada en el celular.
