# Pruebas de accesibilidad en navegador real

Estas pruebas abren el sitio en un Chromium real (sin pantalla) y miden lo que un simulador no puede: diseño, contraste calculado, tamaño de los botones, foco con teclado y comportamiento en pantallas chicas. **Son opcionales**: el sitio funciona sin ellas. Sirven para comprobar que un cambio no reintroduce una barrera.

## Cómo correrlas

1. Instalá las dependencias una sola vez, dentro de esta carpeta: `npm install`.
2. En la carpeta del sitio (la que tiene `index.html`), levantá un servidor: `python3 -m http.server 8123`.
3. En otra terminal, desde esta carpeta, corré la prueba que quieras: `node reflujo.mjs`.

Cada prueba imprime ✓ o ✗ y termina con un resumen.

| Prueba | Qué comprueba |
|---|---|
| `reflujo.mjs` | Que no haya desplazamiento horizontal a 320 px en 13 páginas y 5 configuraciones (texto Gigante, espaciado, barra inferior…). |
| `axe-completo.mjs` | axe-core (WCAG 2.0 a 2.2, A y AA, y buenas prácticas, con contraste calculado) en páginas, ajustes combinados y estados: panel, visor, menú, lectura en voz alta. |
| `semantica.mjs` | Un solo h1 por página sin saltar niveles, puntos de referencia, ids únicos, foco en el título al navegar, nombres de todos los controles. |
| `objetivos-y-teclado.mjs` | Tamaño de botones y enlaces, orden de foco, indicador visible y foco tapado. |
| `contraste-espaciado-ventanas.mjs` | Contraste en 13 combinaciones de ajustes, espaciado de texto WCAG 1.4.12 y ventanas en celular horizontal. |
| `menu-escritorio.mjs` | Que el menú de escritorio no parta palabras ni se superponga. |
| `lectura-en-voz-alta.mjs` | Los controles de la lectura (con una voz simulada): visibilidad, tamaño, pausa y que no tapen contenido. |
| `fuentes-propias.mjs` | Que las letras se carguen desde el propio sitio, sin pedidos a otros servidores. |
| `ventanas-enlaces-y-nombres.mjs` | Foco y teclado en el visor, el panel y el menú; que el nombre accesible incluya el texto visible (control por voz); enlaces internos sin romper, imágenes que cargan y consola limpia. |
| `linea-de-tiempo.mjs` | La línea de tiempo horizontal: elegir un año con clic, toque, flechas, Inicio y Fin y botones; arrastrar con el mouse; enlace con el año; tamaño de los botones; axe y reflujo a 320 px. |
| `archivo-cuadricula.mjs` | Que las fotos del archivo tengan el mismo alto y proporción en cuatro anchos de pantalla. |
| `movimiento.mjs` | Sin animaciones; con «menos movimiento» del sistema la página no se desplaza sola al leer. |
| `colores-forzados.mjs` | El modo de colores forzados de Windows: botones con borde propio, sin desborde, visor y divisor distinguibles. |
| `peso-y-conexion.mjs` | Peso de cada página en un celular (sin caché) y tiempo en conexión lenta. |

## Qué NO cubren

No reemplazan probar con lectores de pantalla (NVDA, JAWS, VoiceOver, TalkBack), con control por voz, con lupa del sistema ni con personas con discapacidad. Solo corren en Chromium: faltan Safari y Firefox.
