/* Memoria de Capitán Sarmiento — lógica del sitio.
   Los textos de fotos, documentos y hitos están en js/datos.js. */
"use strict";

const NOMBRE_SITIO = "Memoria de Capitán Sarmiento";
const TODOS = [...FOTOS, ...DOCUMENTOS];
const COLECCIONES = [...new Set(FOTOS.map((foto) => foto.coleccion))];

/* ---------- Utilidades ---------- */

const $ = (selector, raiz = document) => raiz.querySelector(selector);

const ENTIDADES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapar = (texto) => String(texto).replace(/[&<>"']/g, (c) => ENTIDADES[c]);

const contenedor = (html) => `<div class="wrap">${html}</div>`;

/* ---------- Piezas reutilizables ---------- */

function imagen(item, { alt = item.textoAlternativo, prioritaria = false } = {}) {
  const carga = prioritaria ? 'fetchpriority="high"' : 'loading="lazy"';
  return `<img src="${item.archivo}" width="${item.ancho}" height="${item.alto}" alt="${escapar(alt)}" ${carga} decoding="async">`;
}

function tarjeta(foto) {
  const detalle = [foto.epoca, foto.actual ? "Con foto actual" : ""].filter(Boolean).join(" · ");
  return `<a class="ph" href="#/foto/${foto.id}">${imagen(foto, { alt: "" })}
    <span class="cap"><b>${escapar(foto.titulo)}</b><small>${escapar(detalle)}</small></span></a>`;
}

function filaDocumento(doc) {
  return `<li>
    <a href="#/documento/${doc.id}" tabindex="-1" aria-hidden="true">${imagen(doc, { alt: "" })}</a>
    <div>
      <a href="#/documento/${doc.id}">${escapar(doc.titulo)}</a>
      <p>${escapar(doc.tipo)}</p>
    </div>
  </li>`;
}

function migas(seccion, enlace, titulo) {
  return `<nav class="crumb wrap" aria-label="Ruta"><a href="#/">Inicio</a> / <a href="${enlace}">${seccion}</a> / <span>${escapar(titulo)}</span></nav>`;
}

/* ---------- Páginas ----------
   Cada página devuelve { titulo, html }, o null si no existe. */

function paginaInicio() {
  const destacadas = FOTOS.filter((foto) => foto.destacada);
  const [principal, ...otras] = destacadas;
  return {
    titulo: "Inicio",
    html: contenedor(`
      <section class="hero">
        <div>
          <p class="kick">Archivo fotográfico y documental</p>
          <h1>${NOMBRE_SITIO}</h1>
          <p class="lead">Fotografías y documentos para consultar, comparar y conservar la historia de Capitán Sarmiento, en la provincia de Buenos Aires.</p>
          <div class="acts">
            <a class="btn" href="#/archivo">Explorar el archivo</a>
            <a class="btn ghost" href="#/historia">Historia</a>
          </div>
        </div>
        <figure>
          <a href="#/foto/${principal.id}" class="ph">${imagen(principal, { prioritaria: true })}</a>
          <figcaption>${escapar(principal.titulo)}</figcaption>
        </figure>
      </section>
      <section class="sec" aria-labelledby="ayuda-leer">
        <h2 id="ayuda-leer">¿Necesitás ayuda para leer?</h2>
        <p>Arriba de cada página hay botones para escuchar la página en voz alta y para agrandar o achicar las letras. También podés elegir otros colores, una letra más fácil de leer, textos más simples y mucho más.</p>
        <div class="acts">
          <button type="button" class="btn" id="abrir-acc-inicio">Ver todas las opciones de accesibilidad</button>
          <a class="btn ghost" href="#/ayuda">Cómo usar el sitio</a>
        </div>
      </section>
      <section class="sec">
        <div class="head"><h2>Selección de fotografías</h2><a href="#/archivo">Ver las ${FOTOS.length} fotografías</a></div>
        <div class="pick">${otras.map(tarjeta).join("")}</div>
      </section>
      <section class="sec">
        <div class="head"><h2>Documentos</h2><a href="#/documentos">Ver los ${DOCUMENTOS.length} documentos</a></div>
        <ul class="rows">${DOCUMENTOS.slice(0, 2).map(filaDocumento).join("")}</ul>
      </section>
      <section class="sec">
        <h2>Acerca del archivo</h2>
        <p>Archivo de fotografías y documentos de Capitán Sarmiento. Cada imagen tiene una descripción breve de lo que muestra. <a href="#/acerca">Más sobre el archivo</a>.</p>
      </section>`),
  };
}

function paginaFicha(lista, id, esDocumento) {
  const item = lista.find((x) => x.id === id);
  if (!item) return null;

  const titulo = escapar(item.titulo);
  const seccion = esDocumento ? ["Documentos", "#/documentos"] : ["Archivo", "#/archivo"];
  const textoBoton = item.actual ? "Ampliar y comparar con hoy" : "Ver en tamaño grande";
  const aviso = item.actual
    ? "Al ampliar la imagen aparece una barra para pasar de la foto antigua a la actual."
    : esDocumento ? "La imagen se muestra completa, sin recortes." : "";

  return {
    titulo: item.titulo,
    html: migas(seccion[0], seccion[1], item.titulo) + contenedor(`
      <article class="ficha">
        <div>
          <button type="button" class="zoomable" data-abrir="${item.id}" aria-label="Ampliar imagen: ${titulo}">${imagen(item)}</button>
          <p class="zb"><button type="button" class="btn sm ghost" data-abrir="${item.id}">${textoBoton}</button></p>
          ${aviso ? `<p class="nota">${aviso}</p>` : ""}
        </div>
        <div>
          <p class="kick">${escapar(esDocumento ? item.tipo : item.coleccion)}</p>
          <h1 class="titulo-ficha">${titulo}</h1>
          ${item.epoca ? `<p class="epoca">Época aproximada: ${escapar(item.epoca)}</p>` : ""}
          <p class="descripcion">${escapar(item.descripcion)}</p>
        </div>
      </article>`),
  };
}

/* Archivo: búsqueda y filtro por colección */
const filtro = { texto: "", coleccion: "" };

function paginaArchivo() {
  const opciones = COLECCIONES
    .map((nombre) => `<option ${nombre === filtro.coleccion ? "selected" : ""}>${escapar(nombre)}</option>`)
    .join("");
  return {
    titulo: "Archivo fotográfico",
    html: contenedor(`
      <h1 class="titulo-pagina">Archivo fotográfico</h1>
      <p class="lead intro">Fotografías de Capitán Sarmiento, con su época aproximada. Buscá por palabra o elegí una colección.</p>
      <form class="tools" role="search" id="buscador">
        <label>Buscar<input type="search" id="q" value="${escapar(filtro.texto)}" placeholder="Título o descripción" autocomplete="off" enterkeyhint="search"></label>
        <label>Colección<select id="col"><option value="">Todas</option>${opciones}</select></label>
        <button type="button" class="btn sm ghost" id="hablar">Buscar hablando</button>
        <button type="button" class="btn sm ghost" id="rst">Restablecer</button>
        <p class="aviso" id="aviso-busqueda" role="status" hidden></p>
      </form>
      <div id="res"></div>`),
  };
}

function actualizarResultados() {
  const texto = filtro.texto.trim().toLowerCase();
  const coincide = (foto) =>
    (!filtro.coleccion || foto.coleccion === filtro.coleccion) &&
    (!texto || [foto.titulo, foto.descripcion, foto.coleccion, foto.epoca].join(" ").toLowerCase().includes(texto));
  const resultado = FOTOS.filter(coincide);

  $("#res").innerHTML = resultado.length
    ? `<div class="grid">${resultado.map(tarjeta).join("")}</div>`
    : `<div class="empty"><h3>Sin resultados</h3><p>Ninguna fotografía coincide con la búsqueda. Probá con otra palabra o restablecé los filtros.</p></div>`;
  $("#live").textContent = `${resultado.length} ${resultado.length === 1 ? "fotografía" : "fotografías"}`;
}

function reiniciarFiltros() {
  filtro.texto = "";
  filtro.coleccion = "";
  $("#q").value = "";
  $("#col").value = "";
  actualizarResultados();
}

function paginaDocumentos() {
  return {
    titulo: "Documentos históricos",
    html: contenedor(`
      <h1 class="titulo-pagina">Documentos históricos</h1>
      <p class="lead intro">Se muestran las imágenes completas de los originales.</p>
      <ul class="rows">${DOCUMENTOS.map(filaDocumento).join("")}</ul>`),
  };
}

function htmlSeccionesHistoria() {
  return HISTORIA.map((seccion, indice) => `
    <h2 id="apartado-${indice}" tabindex="-1">${escapar(seccion.titulo)}</h2>
    ${(ajustes.facil ? seccion.facil : seccion.parrafos).map((texto) => `<p>${escapar(texto)}</p>`).join("")}`).join("");
}

const textoBotonFacil = () => (ajustes.facil ? "Ver la versión completa" : "Ver en lectura fácil");

// Vuelve a dibujar los textos de Historia cuando cambia la lectura fácil, sin salir de la página
function actualizarHistoria() {
  const texto = $(".texto");
  const boton = $("#alternar-facil");
  if (!texto || !boton) return;
  texto.innerHTML = htmlSeccionesHistoria();
  boton.textContent = textoBotonFacil();
  boton.setAttribute("aria-pressed", String(ajustes.facil));
  $("#aviso-facil").hidden = !ajustes.facil;
}

function alternarFacil() {
  ajustes.facil = !ajustes.facil;
  guardarAjustes();
  aplicarAjustes();
  actualizarHistoria();
  anunciar(ajustes.facil ? "Lectura fácil activada" : "Versión completa");
}

function paginaHistoria() {
  const opciones = HISTORIA.map((seccion, indice) => `<option value="${indice}">${escapar(seccion.titulo)}</option>`).join("");
  return {
    titulo: "Historia",
    html: contenedor(`
      <h1 class="titulo-pagina">Historia de Capitán Sarmiento</h1>
      <p class="lead intro">De las estancias del siglo XVIII a la Bandera Bonaerense, con los hechos que se pueden fechar. La línea de tiempo los ordena año por año.</p>
      <p class="herramientas-texto">
        <button type="button" class="btn sm ghost" id="alternar-facil" aria-pressed="${ajustes.facil}">${textoBotonFacil()}</button>
        <a href="#/glosario">Palabras difíciles: ver el glosario</a>
      </p>
      <p class="nota" id="aviso-facil" ${ajustes.facil ? "" : "hidden"}>Estás leyendo la versión de lectura fácil: frases cortas y una idea por frase.</p>
      <section class="resumen" aria-labelledby="resumen-titulo">
        <h2 id="resumen-titulo">En pocas palabras</h2>
        <ul>${RESUMEN.map((frase) => `<li>${escapar(frase)}</li>`).join("")}</ul>
      </section>
      <p class="indice"><label>Ir a un apartado
        <select id="ir-a" data-destino="apartado"><option value="">Elegí un apartado</option>${opciones}</select></label></p>
      <div class="texto">${htmlSeccionesHistoria()}</div>`),
  };
}

function paginaGlosario() {
  const ordenado = [...GLOSARIO].sort((a, b) => a.termino.localeCompare(b.termino, "es"));
  let letra = "";
  let html = "";
  for (const { termino, significado } of ordenado) {
    const inicial = termino[0].toUpperCase();
    if (inicial !== letra) {
      if (letra) html += "</dl>";
      letra = inicial;
      html += `<h2>${letra}</h2><dl class="glosario">`;
    }
    html += `<dt>${escapar(termino)}</dt><dd>${escapar(significado)}</dd>`;
  }
  return {
    titulo: "Palabras difíciles",
    html: contenedor(`
      <h1 class="titulo-pagina">Palabras difíciles</h1>
      <p class="lead intro">Palabras que aparecen en el sitio, explicadas con palabras simples.</p>
      <div class="texto">${html}</dl></div>`),
  };
}

function paginaLineaDeTiempo() {
  const delArchivo = DOCUMENTOS.filter((doc) => doc.fecha).map((doc) => ({
    anio: doc.anio,
    fecha: doc.fecha,
    titulo: doc.titulo,
    enlace: `#/documento/${doc.id}`,
    descripcion: "Documento del archivo.",
  }));
  // sort es estable: a igual año se respeta el orden de datos.js
  const eventos = [...HITOS, ...delArchivo].sort((a, b) => a.anio - b.anio);

  const filas = eventos.map((evento, indice) => {
    const titulo = evento.enlace
      ? `<a href="${evento.enlace}">${escapar(evento.titulo)}</a>`
      : escapar(evento.titulo);
    return `<li>
      <p class="fecha">${escapar(evento.fecha)}</p>
      <h2 class="hecho" id="hecho-${indice}" tabindex="-1">${titulo}</h2>
      <p>${escapar(evento.descripcion)}</p>
    </li>`;
  });

  return {
    titulo: "Línea de tiempo",
    html: contenedor(`
      <h1 class="titulo-pagina">Línea de tiempo</h1>
      <p class="lead intro">Hechos de la historia de Capitán Sarmiento con fecha documentada, y los documentos del archivo que la tienen.</p>
      <p class="indice"><label>Ir a una fecha
        <select id="ir-a-hito" data-destino="hecho"><option value="">Elegí una fecha</option>${eventos.map((evento, indice) => `<option value="${indice}">${escapar(evento.fecha)}: ${escapar(evento.titulo)}</option>`).join("")}</select></label></p>
      <ol class="tl">${filas.join("")}</ol>`),
  };
}

function paginaColecciones() {
  const secciones = COLECCIONES.map((nombre) => `
    <section class="sec">
      <h2>${escapar(nombre)}</h2>
      <div class="pick mt">${FOTOS.filter((foto) => foto.coleccion === nombre).map(tarjeta).join("")}</div>
    </section>`).join("");

  return {
    titulo: "Colecciones",
    html: contenedor(`
      <h1 class="titulo-pagina">Colecciones</h1>
      <p class="lead intro">Las fotografías agrupadas por lo que muestran.</p>
      ${secciones}`),
  };
}

function paginaAcerca() {
  return {
    titulo: "Acerca del archivo",
    html: contenedor(`
      <h1 class="titulo-pagina">Acerca del archivo</h1>
      <div class="texto">
        <h2>Propósito</h2>
        <p>Reunir en un solo lugar fotografías y documentos de Capitán Sarmiento para que cualquiera pueda consultarlos sin registrarse.</p>
        <h2>Cómo se describe el material</h2>
        <p>Cada imagen tiene una descripción breve que cuenta solo lo que se ve o se lee en ella.</p>
        <p>La época de cada fotografía es una estimación a partir de lo que muestra: vehículos, ropa, calles y estilo de la imagen. Se ajusta cuando aparece un dato que la confirme.</p>
        <h2>Línea de tiempo</h2>
        <p>Reúne hechos con fecha respaldada por fuentes publicadas. Cuando las fuentes difieren, se usa la fecha que repiten varias de ellas. Los datos provienen de fundamentos de proyectos de la Honorable Cámara de Diputados de la Provincia de Buenos Aires, del portal del Gobierno bonaerense, de la historia del partido escrita por Álvaro y Consuelo Gutiérrez Zaldívar y del blog «Primeros pobladores de Capitán Sarmiento», de Daniel C. Bilbao. La página Historia resume con palabras propias lo publicado por esas fuentes.</p>
        <h2>Accesibilidad</h2>
        <p>Este sitio está pensado para que cualquier persona pueda recorrerlo sola, desde un celular, una computadora o con un lector de pantalla.</p>
        <p>El botón «Accesibilidad», arriba, permite agrandar el texto, elegir fondo claro u oscuro, activar el alto contraste, usar una letra más fácil de leer, poner el texto en negrita, separar más las letras y las líneas, acortar las líneas, resaltar enlaces y títulos, usar una regla de lectura, ver las listas solo con texto, quitar los colores, agrandar los botones y el cursor, marcar con un marco grueso lo que está seleccionado con el teclado y elegir la velocidad de la voz. Hay dos «Ajustes rápidos» que combinan varias opciones con un solo toque, colores de fondo suaves, una versión de lectura fácil de Historia, un glosario y una barra de botones abajo para usar con una mano. Las elecciones quedan guardadas en ese dispositivo. La página «Cómo usar el sitio» explica cada paso.</p>
        <p>En cada página, el botón «Escuchar esta página» la lee en voz alta, si el dispositivo lo permite, y el botón «Volver» regresa a la página anterior. En las fotos que tienen su foto actual, la barra Antes / Ahora se maneja con el dedo, el mouse o el teclado, y los botones «Ver foto antigua» y «Ver foto actual» permiten cambiar sin arrastrar. Todo el sitio se puede recorrer con las teclas Tab, Enter y Escape.</p>
        <h2>Declaración de accesibilidad</h2>
        <p>Este sitio se diseñó siguiendo las pautas de accesibilidad WCAG 2.2, nivel AA, y se probó con herramientas automáticas. No tuvo una auditoría externa ni fue probado por personas con todas las discapacidades, así que puede tener fallas.</p>
        <p>Limitaciones conocidas: no hay videos ni audios grabados, por eso no hay subtítulos ni lengua de señas. La lectura en voz alta y la búsqueda hablada dependen del navegador y del dispositivo. Los documentos manuscritos son imágenes y todavía no tienen transcripción; por ahora cada uno tiene una descripción de lo que dice. Las descripciones de las fotografías son breves.</p>
        <p>Si encontrás una dificultad, avisá a quienes administran el archivo para que se corrija.</p>
        <h2>Originales y retoques</h2>
        <p>Las imágenes no se colorean, restauran ni reconstruyen. Las copias de consulta no incluyen metadatos privados.</p>
      </div>`),
  };
}

function paginaAyuda() {
  return {
    titulo: "Cómo usar el sitio",
    html: contenedor(`
      <h1 class="titulo-pagina">Cómo usar este sitio</h1>
      <p class="lead intro">Una guía corta, paso a paso, para recorrer el sitio sin ayuda.</p>
      <div class="texto">
        <h2>Para moverte</h2>
        <ul>
          <li>Tocá «Menú», arriba, para ver las secciones: Inicio, Archivo, Documentos, Historia, Línea de tiempo, Colecciones y Acerca.</li>
          <li>El botón «Volver», arriba de cada página, te lleva a la página anterior.</li>
          <li>El botón «Volver arriba», al final de la página, te lleva al principio.</li>
        </ul>
        <h2>Para ver una foto en grande</h2>
        <ul>
          <li>En «Archivo», tocá una foto para abrir su ficha, con el título y la descripción.</li>
          <li>Tocá la foto, o el botón debajo de ella, para verla en grande. Ahí podés acercarla y alejarla con los botones «Acercar» y «Alejar».</li>
          <li>Para salir, tocá «Cerrar».</li>
        </ul>
        <h2>Para comparar una foto antigua con la actual</h2>
        <ul>
          <li>Las fotos que dicen «Con foto actual» tienen una barra «Antes / Ahora» al verlas en grande.</li>
          <li>Deslizá la barra hacia la derecha para ver la foto actual, y hacia la izquierda para volver a la antigua.</li>
          <li>Si te cuesta deslizar, tocá «Ver foto antigua» o «Ver foto actual».</li>
        </ul>
        <h2>Para buscar</h2>
        <ul>
          <li>En «Archivo», escribí una palabra en «Buscar» o elegí una colección.</li>
          <li>Tocá «Restablecer» para volver a ver todas las fotos.</li>
        </ul>
        <h2>Para leer mejor</h2>
        <ul>
          <li>En cada página, los botones «Agrandar texto» y «Achicar texto» cambian el tamaño de las letras al instante.</li>
          <li>Tocá «Accesibilidad», arriba, para más opciones: cambiar los colores, activar el alto contraste, usar una letra más fácil de leer, resaltar los enlaces, acortar las líneas o activar una regla de lectura.</li>
          <li>Si no sabés qué elegir, probá los «Ajustes rápidos»: «Lectura cómoda» o «Máxima visibilidad».</li>
          <li>Lo que elijas queda guardado en tu dispositivo. «Restablecer todo» vuelve a la configuración original.</li>
        </ul>
        <h2>Para escuchar una página</h2>
        <ul>
          <li>Tocá «Escuchar esta página». Mientras lee, va marcando en pantalla lo que está leyendo. Para detenerla, tocá «Detener lectura».</li>
          <li>En «Accesibilidad» podés elegir una voz más lenta o más rápida.</li>
          <li>Si no suena: subí el volumen, revisá que el celular no esté en silencio y que tenga una voz en español instalada, y abrí el sitio en el navegador (Chrome, Safari o Firefox) en vez de dentro de otra aplicación.</li>
        </ul>
        <h2>Para buscar con la voz</h2>
        <ul>
          <li>En «Archivo», tocá «Buscar hablando» y decí la palabra. El navegador te va a pedir permiso para usar el micrófono.</li>
          <li>No todos los navegadores lo permiten. Si no funciona, el sitio te lo avisa.</li>
        </ul>
        <h2>En la página de Historia</h2>
        <ul>
          <li>Arriba hay un resumen, «En pocas palabras», con las ideas principales.</li>
          <li>Con «Ir a un apartado» saltás directo al tema que quieras.</li>
        </ul>
        <h2>Si te cuesta entender un texto</h2>
        <ul>
          <li>En «Historia», tocá «Ver en lectura fácil»: los textos pasan a frases cortas, con una sola idea cada una.</li>
          <li>Las palabras difíciles están explicadas en «Palabras difíciles», que se abre desde el pie de página y desde «Historia».</li>
          <li>Arriba de «Historia» hay un resumen, «En pocas palabras».</li>
        </ul>
        <h2>Para usar el celular con una mano</h2>
        <ul>
          <li>En «Accesibilidad», activá «Botones fijos abajo, para usar con una mano». Aparece una barra abajo con Volver, Inicio, Escuchar y Accesibilidad.</li>
        </ul>
        <h2>Con el teclado</h2>
        <ul>
          <li>Tab te lleva al siguiente botón o enlace, y Mayúsculas + Tab al anterior.</li>
          <li>Enter abre el botón o enlace seleccionado. Escape cierra el menú y las ventanas.</li>
          <li>En la barra «Antes / Ahora», las flechas izquierda y derecha mueven el divisor.</li>
        </ul>
      </div>`),
  };
}

function paginaNoEncontrada() {
  return {
    titulo: "Página no encontrada",
    html: contenedor(`
      <div class="empty no-encontrada">
        <h1>No encontramos esa página</h1>
        <p>Puede que el enlace esté incompleto o que el material ya no esté publicado.</p>
        <a class="btn" href="#/">Volver al inicio</a>
      </div>`),
  };
}

/* ---------- Navegación ---------- */

const PAGINAS = new Map([
  ["", paginaInicio],
  ["inicio", paginaInicio],
  ["archivo", paginaArchivo],
  ["documentos", paginaDocumentos],
  ["historia", paginaHistoria],
  ["glosario", paginaGlosario],
  ["linea-de-tiempo", paginaLineaDeTiempo],
  ["colecciones", paginaColecciones],
  ["ayuda", paginaAyuda],
  ["acerca", paginaAcerca],
  ["foto", (id) => paginaFicha(FOTOS, id, false)],
  ["documento", (id) => paginaFicha(DOCUMENTOS, id, true)],
]);

// A qué opción del menú pertenece cada tipo de página
const SECCION_DEL_MENU = new Map([["foto", "archivo"], ["documento", "documentos"], ["inicio", ""]]);

function marcarMenu(seccion) {
  const activa = SECCION_DEL_MENU.has(seccion) ? SECCION_DEL_MENU.get(seccion) : seccion;
  document.querySelectorAll("#nav a").forEach((enlace) => {
    if (enlace.getAttribute("href") === `#/${activa}`) enlace.setAttribute("aria-current", "page");
    else enlace.removeAttribute("aria-current");
  });
}

function cerrarMenu() {
  $("#nav").classList.remove("open");
  $("#menu").setAttribute("aria-expanded", "false");
}

function mostrarPagina() {
  detenerLectura();
  actualizarPosicion();

  const [seccion = "", id] = location.hash.replace(/^#\/?/, "").split("/");
  const esInicio = seccion === "" || seccion === "inicio";
  const crear = PAGINAS.get(seccion);
  const pagina = (crear && crear(id)) || paginaNoEncontrada();

  $("#main").innerHTML = barraPagina(esInicio) + pagina.html;
  document.title = `${pagina.titulo} · ${NOMBRE_SITIO}`;
  $("#live").textContent = `Página: ${pagina.titulo}`;
  marcarMenu(seccion);
  cerrarMenu();
  if (seccion === "archivo") actualizarResultados();
  window.scrollTo(0, 0);
  // El foco va al título: los lectores de pantalla lo leen primero y el teclado empieza desde ahí
  const titulo = $("#main h1");
  if (titulo) {
    titulo.tabIndex = -1;
    titulo.focus({ preventScroll: true });
  } else {
    $("#main").focus({ preventScroll: true });
  }
}

/* ---------- Visor de imágenes ---------- */

const visor = $("#lb");
let botonOrigen = null;
let nivelZoom = 1;

function ajustarZoom(nivel) {
  nivelZoom = Math.min(4, Math.max(1, nivel));
  $("#lbw").style.width = `${nivelZoom * 100}%`;
}

// Posición del divisor: 0 = solo la foto antigua, 100 = solo la actual
function moverDivisor(valor) {
  const comparador = $("#cmp");
  if (comparador) comparador.style.setProperty("--p", `${valor}%`);
  $("#rng").setAttribute("aria-valuetext", `${valor} % de la foto actual visible`);
}

function htmlComparador(item) {
  const actual = item.actual;
  const posicion = escapar(actual.posicion || "50% 50%");
  return `<div class="cmp" id="cmp" style="aspect-ratio:${item.ancho}/${item.alto}">
    <img src="${item.archivo}" alt="${escapar(item.textoAlternativo)}">
    <img class="actual" src="${actual.archivo}" alt="${escapar(actual.textoAlternativo)}" style="object-position:${posicion}">
    <div class="divisor"></div>
  </div>`;
}

function abrirVisor(boton) {
  const item = TODOS.find((x) => x.id === boton.dataset.abrir);
  if (!item) return;
  botonOrigen = boton;

  $("#lbw").innerHTML = item.actual
    ? htmlComparador(item)
    : `<img src="${item.archivo}" alt="${escapar(item.textoAlternativo)}">`;
  $("#lbb").hidden = !item.actual;
  if (item.actual) {
    $("#rng").value = 0;
    moverDivisor(0);
  }
  $("#lbt").textContent = item.titulo;
  ajustarZoom(1);
  visor.showModal();
}

/* ---------- Botón «Volver» ----------
   Cada página que se abre dentro del sitio guarda su posición en el historial.
   Si hay una página anterior del sitio, «Volver» retrocede; si no, lleva al inicio. */

let posicion = 0;
let ultimaPosicion = null;

function actualizarPosicion() {
  const guardada = history.state && history.state.n;
  if (Number.isInteger(guardada)) {
    posicion = guardada;
  } else {
    posicion = ultimaPosicion === null ? 0 : ultimaPosicion + 1;
    try {
      history.replaceState({ n: posicion }, "");
    } catch (error) {
      // Sin acceso al historial: «Volver» llevará al inicio
    }
  }
  ultimaPosicion = posicion;
}

function volver() {
  if (posicion > 0) history.back();
  else location.hash = "#/";
}

function barraPagina(esInicio) {
  const botonVolver = esInicio
    ? ""
    : `<button type="button" class="btn sm ghost" id="volver"><span aria-hidden="true">←</span> ${posicion > 0 ? "Volver" : "Ir al inicio"}</button>`;
  return `<div class="wrap barra-pagina" role="group" aria-label="Herramientas de la página">${botonVolver}
    <button type="button" class="btn sm ghost" id="escuchar" data-escuchar aria-pressed="false">Escuchar esta página</button>
    <button type="button" class="btn sm ghost" id="texto-menos">Achicar texto</button>
    <button type="button" class="btn sm ghost" id="texto-mas">Agrandar texto</button>
    <p class="aviso" id="aviso-voz" role="status" hidden></p></div>`;
}

/* ---------- Ajustes de accesibilidad ----------
   Tamaño del texto, colores, tipografía y espaciado. Se guardan en el dispositivo. */

const CLAVE_AJUSTES = "ajustes-accesibilidad";
const OPCIONES_SI_NO = ["contraste", "grises", "facil", "fuente", "negrita", "espacio", "enlaces", "regla", "columna", "sinminiaturas", "foco", "botones", "cursor", "barrainferior"];
const AJUSTES_POR_DEFECTO = {
  texto: "1", tema: "auto", fondo: "original", velocidad: "normal",
  ...Object.fromEntries(OPCIONES_SI_NO.map((clave) => [clave, false])),
};
const ajustes = { ...AJUSTES_POR_DEFECTO };
const panel = $("#acc");

const NOMBRES_TEXTO = { 1: "Normal", 2: "Grande", 3: "Muy grande", 4: "Enorme", 5: "Gigante" };
const FONDOS = ["original", "blanco", "amarillo", "verde", "azul", "gris"];

// Velocidad de la voz: 1 es la velocidad normal del dispositivo
const VELOCIDADES = { lenta: 0.75, normal: 1, rapida: 1.25 };

// Combinaciones listas para usar con un solo toque
const PRESETS = {
  comoda: { nombre: "Lectura cómoda", texto: "2", fuente: true, espacio: true, enlaces: true },
  maxima: { nombre: "Máxima visibilidad", texto: "3", contraste: true, fuente: true, espacio: true, enlaces: true, foco: true, botones: true },
};

// Cada opción activada se refleja como un atributo en <html>, que usan los estilos
const ATRIBUTOS = {
  contraste: "alto", grises: "si", fuente: "legible", negrita: "si", espacio: "amplio", enlaces: "resaltados",
  columna: "angosta", sinminiaturas: "si", foco: "grueso", botones: "grandes", cursor: "grande", barrainferior: "si",
};

// Avisa a los lectores de pantalla (y deja constancia en pantalla) lo que acaba de pasar
function anunciar(mensaje) {
  const region = $("#live");
  region.textContent = "";
  setTimeout(() => { region.textContent = mensaje; }, 50);
}

function cargarAjustes() {
  let guardado = null;
  try {
    guardado = JSON.parse(localStorage.getItem(CLAVE_AJUSTES));
  } catch (error) {
    // Sin almacenamiento disponible: se usan los valores por defecto
  }
  if (!guardado) {
    // Primera visita: se respeta la preferencia de contraste del sistema
    ajustes.contraste = Boolean(window.matchMedia && matchMedia("(prefers-contrast: more)").matches);
    return;
  }
  if (["1", "2", "3", "4", "5"].includes(guardado.texto)) ajustes.texto = guardado.texto;
  if (FONDOS.includes(guardado.fondo)) ajustes.fondo = guardado.fondo;
  if (["auto", "light", "dark"].includes(guardado.tema)) ajustes.tema = guardado.tema;
  if (Object.keys(VELOCIDADES).includes(guardado.velocidad)) ajustes.velocidad = guardado.velocidad;
  for (const clave of OPCIONES_SI_NO) ajustes[clave] = guardado[clave] === true;
}

function guardarAjustes() {
  try {
    localStorage.setItem(CLAVE_AJUSTES, JSON.stringify(ajustes));
  } catch (error) {
    // Sin almacenamiento disponible: los cambios valen solo para esta visita
  }
}

function aplicarAjustes() {
  const raiz = document.documentElement;
  raiz.dataset.texto = ajustes.texto;
  if (ajustes.tema === "auto") delete raiz.dataset.theme;
  else raiz.dataset.theme = ajustes.tema;

  for (const [clave, valor] of Object.entries(ATRIBUTOS)) {
    if (ajustes[clave]) raiz.dataset[clave] = valor;
    else delete raiz.dataset[clave];
  }
  if (ajustes.fondo === "original") delete raiz.dataset.fondo;
  else raiz.dataset.fondo = ajustes.fondo;
  $("#regla").hidden = !ajustes.regla;
  $("#barra-inferior").hidden = !ajustes.barrainferior;

  for (const nombre of ["texto", "tema", "fondo", "velocidad"]) {
    document.querySelectorAll(`#acc input[name="${nombre}"]`).forEach((r) => { r.checked = r.value === ajustes[nombre]; });
  }
  for (const clave of OPCIONES_SI_NO) $(`#acc-${clave}`).checked = ajustes[clave];
}

function cambiarAjuste(campo) {
  if (["texto", "tema", "fondo", "velocidad"].includes(campo.name)) ajustes[campo.name] = campo.value;
  else if (campo.id.startsWith("acc-")) ajustes[campo.id.slice(4)] = campo.checked;
  guardarAjustes();
  aplicarAjustes();
  actualizarHistoria();

  const etiqueta = campo.closest("label").textContent.trim();
  if (campo.type === "checkbox") anunciar(`${etiqueta}: ${campo.checked ? "activado" : "desactivado"}`);
  else anunciar(`${campo.closest("fieldset").querySelector("legend").textContent}: ${etiqueta}`);
}

function aplicarPreset(clave) {
  const { nombre, ...valores } = PRESETS[clave];
  Object.assign(ajustes, AJUSTES_POR_DEFECTO, valores);
  guardarAjustes();
  aplicarAjustes();
  actualizarHistoria();
  anunciar(`Ajustes aplicados: ${nombre}`);
}

function reiniciarAjustes() {
  Object.assign(ajustes, AJUSTES_POR_DEFECTO);
  guardarAjustes();
  aplicarAjustes();
  actualizarHistoria();
  anunciar("Se restablecieron todos los ajustes de accesibilidad");
}

// Botones «Agrandar texto» y «Achicar texto» de cada página
function cambiarTexto(paso) {
  const nuevo = Math.min(5, Math.max(1, Number(ajustes.texto) + paso));
  if (String(nuevo) === ajustes.texto) {
    return anunciar(paso > 0 ? "El texto ya está en el tamaño máximo." : "El texto ya está en el tamaño mínimo.");
  }
  ajustes.texto = String(nuevo);
  guardarAjustes();
  aplicarAjustes();
  anunciar(`Tamaño del texto: ${NOMBRES_TEXTO[nuevo]}`);
}

// La regla de lectura sigue al dedo o al mouse
function moverRegla(y) {
  if (ajustes.regla) $("#regla").style.top = `${y - 28}px`;
}

/* ---------- Lectura en voz alta ----------
   Usa la voz del propio dispositivo. Lee la página bloque por bloque (título, párrafo, etc.)
   y resalta en pantalla lo que se está leyendo. */

const hayVoz = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
let lecturaVigente = 0; // cambia cada vez que se inicia o se detiene, para ignorar lecturas viejas
let bloqueResaltado = null;
let leyendo = false;

const BLOQUES_LEIBLES = "h1, h2, h3, p, li, dt, dd, figcaption, a.ph";
const BLOQUES_EXCLUIDOS = ".barra-pagina, .crumb, form";

// Los motores de voz cortan los textos muy largos: se leen por tramos de unas pocas frases
function partirEnTramos(texto) {
  const frases = texto.match(/[^.!?]+[.!?]*\s*/g) || [];
  const tramos = [];
  let actual = "";
  for (const frase of frases) {
    if (actual && (actual + frase).length > 220) {
      tramos.push(actual);
      actual = "";
    }
    actual += frase;
  }
  if (actual) tramos.push(actual);
  return tramos;
}

// Se lee el elemento más externo de cada grupo, para no repetir un texto dentro de otro
function bloquesDePagina() {
  const candidatos = [...$("#main").querySelectorAll(BLOQUES_LEIBLES)].filter((el) => !el.closest(BLOQUES_EXCLUIDOS));
  return candidatos
    .filter((el) => !candidatos.some((otro) => otro !== el && otro.contains(el)))
    .map((el) => ({ el, tramos: partirEnTramos(el.textContent.replace(/\s+/g, " ").trim()) }))
    .filter((bloque) => bloque.tramos.length > 0);
}

function resaltarBloque(el) {
  quitarResaltado();
  bloqueResaltado = el;
  el.classList.add("leyendo");
  if (el.scrollIntoView) el.scrollIntoView({ block: "center" });
}

function quitarResaltado() {
  if (bloqueResaltado) bloqueResaltado.classList.remove("leyendo");
  bloqueResaltado = null;
}

function vozEspanola() {
  const voces = speechSynthesis.getVoices();
  return voces.find((voz) => /^es[-_]AR/i.test(voz.lang)) || voces.find((voz) => /^es/i.test(voz.lang));
}

function marcarLectura(activa) {
  leyendo = activa;
  document.querySelectorAll("[data-escuchar]").forEach((boton) => {
    boton.setAttribute("aria-pressed", String(activa));
    if (boton.hasAttribute("data-corto")) boton.textContent = activa ? "Detener" : "Escuchar";
    else boton.textContent = activa ? "Detener lectura" : "Escuchar esta página";
  });
}

function mostrarAviso(texto, id = "aviso-voz") {
  const aviso = document.getElementById(id);
  if (!aviso) return;
  aviso.textContent = texto;
  aviso.hidden = !texto;
}

function detenerLectura() {
  lecturaVigente += 1;
  if (hayVoz) speechSynthesis.cancel();
  quitarResaltado();
  marcarLectura(false);
  mostrarAviso("");
}

const AVISO_SIN_VOZ =
  "No se pudo iniciar la lectura. Revisá el volumen y que tu dispositivo tenga una voz en español instalada. Si estás viendo el sitio dentro de otra aplicación, probá abrirlo en el navegador.";
const AVISO_SIN_SOPORTE =
  "Este navegador no ofrece lectura en voz alta. Probá abrir el sitio directamente en Chrome, Safari o Firefox, o usá el lector de pantalla de tu dispositivo: TalkBack en Android o VoiceOver en iPhone.";

function iniciarLectura() {
  const identificador = ++lecturaVigente;
  mostrarAviso("");
  marcarLectura(true);
  speechSynthesis.cancel();
  speechSynthesis.resume();
  // Algunos navegadores ignoran un speak() que llega justo después de cancel()
  setTimeout(() => hablar(identificador), 150);
}

function hablar(identificador) {
  if (identificador !== lecturaVigente) return;
  const bloques = bloquesDePagina();
  const total = bloques.reduce((suma, bloque) => suma + bloque.tramos.length, 0);
  const voz = vozEspanola();
  let empezo = false;
  let contador = 0;

  const fallar = () => {
    if (identificador !== lecturaVigente) return;
    speechSynthesis.cancel();
    quitarResaltado();
    marcarLectura(false);
    mostrarAviso(AVISO_SIN_VOZ);
  };

  // Todos los tramos se encolan juntos: el navegador los lee uno tras otro
  for (const bloque of bloques) {
    bloque.tramos.forEach((tramo, indice) => {
      contador += 1;
      const esUltimo = contador === total;
      const habla = new SpeechSynthesisUtterance(tramo);
      habla.lang = voz ? voz.lang : "es-AR";
      habla.rate = VELOCIDADES[ajustes.velocidad];
      if (voz) habla.voice = voz;
      habla.onstart = () => {
        empezo = true;
        if (indice === 0 && identificador === lecturaVigente) resaltarBloque(bloque.el);
      };
      habla.onend = () => {
        if (esUltimo && identificador === lecturaVigente) {
          quitarResaltado();
          marcarLectura(false);
        }
      };
      habla.onerror = (evento) => {
        if (evento.error !== "canceled" && evento.error !== "interrupted") fallar();
      };
      speechSynthesis.speak(habla);
    });
  }

  // Si en tres segundos no empezó a sonar, se avisa en vez de quedar en silencio
  setTimeout(() => { if (!empezo) fallar(); }, 3000);
}

function alternarLectura() {
  if (!hayVoz) return mostrarAviso(AVISO_SIN_SOPORTE);
  if (leyendo) detenerLectura();
  else iniciarLectura();
}

/* ---------- Búsqueda por voz (dictado) ---------- */

const Reconocimiento = window.SpeechRecognition || window.webkitSpeechRecognition;
const AVISO_SIN_DICTADO =
  "Este navegador no permite buscar hablando. Probá con Chrome en el celular o la computadora, o escribí la palabra en el campo de búsqueda.";

function buscarHablando() {
  if (!Reconocimiento) return mostrarAviso(AVISO_SIN_DICTADO, "aviso-busqueda");
  mostrarAviso("", "aviso-busqueda");
  const boton = $("#hablar");
  const reconocedor = new Reconocimiento();
  reconocedor.lang = "es-AR";
  reconocedor.interimResults = false;
  reconocedor.maxAlternatives = 1;
  reconocedor.onstart = () => {
    boton.textContent = "Escuchando…";
    anunciar("Escuchando. Decí la palabra que querés buscar.");
  };
  reconocedor.onresult = (evento) => {
    const dicho = evento.results[0][0].transcript;
    filtro.texto = dicho;
    if ($("#q")) {
      $("#q").value = dicho;
      actualizarResultados();
    }
    anunciar(`Buscando: ${dicho}`);
  };
  reconocedor.onerror = (evento) => {
    const sinPermiso = evento.error === "not-allowed" || evento.error === "service-not-allowed";
    mostrarAviso(
      sinPermiso
        ? "No se permitió usar el micrófono. Activalo en los permisos del navegador para buscar hablando."
        : "No se pudo escuchar. Probá de nuevo o escribí la palabra.",
      "aviso-busqueda",
    );
  };
  reconocedor.onend = () => {
    if ($("#hablar")) $("#hablar").textContent = "Buscar hablando";
  };
  reconocedor.start();
}

/* ---------- Eventos ---------- */

addEventListener("hashchange", mostrarPagina);

$("#menu").addEventListener("click", () => {
  const abierto = $("#nav").classList.toggle("open");
  $("#menu").setAttribute("aria-expanded", String(abierto));
});

function irADivisor(valor) {
  $("#rng").value = valor;
  moverDivisor(valor);
}

// Botones con identificador fijo y la acción que disparan
const ACCIONES = {
  lbc: () => visor.close(),
  rst: reiniciarFiltros,
  volver,
  escuchar: alternarLectura,
  subir: () => window.scrollTo(0, 0),
  "texto-mas": () => cambiarTexto(1),
  "texto-menos": () => cambiarTexto(-1),
  hablar: buscarHablando,
  "preset-comoda": () => aplicarPreset("comoda"),
  "preset-maxima": () => aplicarPreset("maxima"),
  "abrir-acc": () => panel.showModal(),
  "abrir-acc-inicio": () => panel.showModal(),
  "inf-acc": () => panel.showModal(),
  "inf-volver": volver,
  "inf-escuchar": alternarLectura,
  "alternar-facil": alternarFacil,
  "acc-cerrar": () => panel.close(),
  "acc-reiniciar": reiniciarAjustes,
};

document.addEventListener("click", (evento) => {
  // El enlace «Saltar al contenido» no debe cambiar la dirección de la página
  if (evento.target.closest(".skip")) {
    evento.preventDefault();
    return $("#main").focus();
  }

  const abrir = evento.target.closest("[data-abrir]");
  if (abrir) return abrirVisor(abrir);

  const zoom = evento.target.closest("[data-zoom]");
  if (zoom) return ajustarZoom(nivelZoom + Number(zoom.dataset.zoom) * 0.5);

  const divisor = evento.target.closest("[data-divisor]");
  if (divisor) return irADivisor(divisor.dataset.divisor);

  const boton = evento.target.closest("button");
  const accion = boton && ACCIONES[boton.id];
  if (accion) accion();
});

document.addEventListener("input", (evento) => {
  if (evento.target.id === "q") {
    filtro.texto = evento.target.value;
    actualizarResultados();
  } else if (evento.target.id === "rng") {
    moverDivisor(evento.target.value);
  }
});

document.addEventListener("change", (evento) => {
  const campo = evento.target;
  if (campo.id === "col") {
    filtro.coleccion = campo.value;
    actualizarResultados();
  } else if (campo.dataset.destino && campo.value !== "") {
    const destino = document.getElementById(`${campo.dataset.destino}-${campo.value}`);
    if (destino) {
      destino.scrollIntoView();
      destino.focus();
    }
  } else if (campo.closest("#acc")) {
    cambiarAjuste(campo);
  }
});

document.addEventListener("pointermove", (evento) => moverRegla(evento.clientY));
document.addEventListener("touchmove", (evento) => moverRegla(evento.touches[0].clientY), { passive: true });

// Escape cierra el menú desplegable y devuelve el foco a su botón
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && $("#nav").classList.contains("open")) {
    cerrarMenu();
    $("#menu").focus();
  }
});

document.addEventListener("submit", (evento) => evento.preventDefault());

// Al cerrar el visor, el foco vuelve al botón que lo abrió
visor.addEventListener("close", () => {
  if (botonOrigen && document.contains(botonOrigen)) botonOrigen.focus();
});

// Al cerrar el panel de accesibilidad, el foco vuelve a su botón
panel.addEventListener("close", () => $("#abrir-acc").focus());

cargarAjustes();
aplicarAjustes();
mostrarPagina();
