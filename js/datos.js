/* ============================================================
   CONTENIDO DEL SITIO — acá se editan títulos, descripciones y la línea de tiempo.
   Cada foto es un bloque { ... }. Cambiá solo el texto entre comillas.
   Usá «null» (sin comillas) para un dato que no corresponde.
   Si un texto lleva comillas dobles, escribilas así: \"  o usá «».
   ============================================================ */

// ---------- FOTOGRAFÍAS ----------
const FOTOS = [
  {
    id: "calle-arbolada-con-comercios",  // texto de la dirección: #/foto/<id>
    archivo: "img/238429.jpg",
    miniatura: "img/min/238429.jpg",  // versión liviana para las listas; null = se usa la imagen original
    ancho: 1600,  // medidas de la imagen en píxeles
    alto: 1026,
    titulo: "Calle arbolada con comercios",
    descripcion: "Vista desde un piso alto de una calle ancha con árboles podados y bancos. Se ven una tienda, una peluquería, un hotel y una fiambrería, además de un carro con caballo y automóviles antiguos.",  // descripción corta
    epoca: "Hacia 1925–1935",  // época aproximada, estimada por lo que se ve (vehículos, ropa, estilo); null si no se sabe
    textoAlternativo: "Vista desde un piso alto de una calle ancha con árboles podados y bancos; hay un carro con caballo, automóviles antiguos y comercios con carteles a ambos lados.",  // descripción breve para lectores de pantalla
    coleccion: "Calles y plazas",  // agrupa las fotos en la página Colecciones
    destacada: true,  // true = aparece en el inicio
    actual: null,  // null = sin foto actual (ver README para agregarla)
  },
  {
    id: "estacion-ferroviaria",  // texto de la dirección: #/foto/<id>
    archivo: "img/238430.jpg",
    miniatura: "img/min/238430.jpg",  // versión liviana para las listas; null = se usa la imagen original
    ancho: 1600,  // medidas de la imagen en píxeles
    alto: 937,
    titulo: "Estación de ferrocarril con una locomotora a vapor",
    descripcion: "Andén de una estación con una locomotora a vapor que suelta humo junto a varios vagones, y personas esperando. El edificio tiene dos plantas y una galería cubierta.",  // descripción corta
    epoca: "Entre 1910 y 1940",  // época aproximada, estimada por lo que se ve (vehículos, ropa, estilo); null si no se sabe
    textoAlternativo: "Andén de una estación con un edificio de dos plantas y techo de tejas, una locomotora a vapor con humo a la derecha, vagones, personas esperando y postes blancos en primer plano.",  // descripción breve para lectores de pantalla
    coleccion: "Ferrocarril",  // agrupa las fotos en la página Colecciones
    destacada: true,  // true = aparece en el inicio
    actual: null,  // null = sin foto actual (ver README para agregarla)
  },
  {
    id: "calle-de-tierra-el-fuego",  // texto de la dirección: #/foto/<id>
    archivo: "img/238432.jpg",
    miniatura: "img/min/238432.jpg",  // versión liviana para las listas; null = se usa la imagen original
    ancho: 1280,  // medidas de la imagen en píxeles
    alto: 737,
    titulo: "Calle de tierra frente a la mueblería «El Fuego»",
    descripcion: "Calle de tierra con árboles jóvenes y bancos. A la izquierda, el comercio «El Fuego»; en el centro, un grupo de personas conversa junto a un banco.",  // descripción corta
    epoca: "Entre 1910 y 1930",  // época aproximada, estimada por lo que se ve (vehículos, ropa, estilo); null si no se sabe
    textoAlternativo: "Calle de tierra con árboles jóvenes y bancos; a la izquierda un comercio con el cartel «El Fuego» y, en el centro, un grupo de personas conversando junto a un banco.",  // descripción breve para lectores de pantalla
    coleccion: "Calles y plazas",  // agrupa las fotos en la página Colecciones
    destacada: true,  // true = aparece en el inicio
    actual: {  // foto actual para la barra Antes / Ahora
      archivo: "img/actual-238461.jpg",  // copia de la foto actual dentro de img/
      textoAlternativo: "El boulevard hoy: calle con comercios a la izquierda, cantero central con árboles, bancos y una estatua, y la torre de la iglesia a la derecha.",
      posicion: "45% 50%",  // parte de la foto actual que queda a la vista: horizontal vertical
    },
  },
  {
    id: "acto-publico-en-esquina",  // texto de la dirección: #/foto/<id>
    archivo: "img/238428.jpg",
    miniatura: "img/min/238428.jpg",  // versión liviana para las listas; null = se usa la imagen original
    ancho: 1600,  // medidas de la imagen en píxeles
    alto: 1125,
    titulo: "Acto público frente a una esquina",
    descripcion: "Multitud con banderas y papel picado frente a un edificio de esquina. En la azotea, un hombre parece hablar desde un atril junto a otras dos personas; se ve también un molino de viento.",  // descripción corta
    epoca: "Década de 1960",  // época aproximada, estimada por lo que se ve (vehículos, ropa, estilo); null si no se sabe
    textoAlternativo: "Multitud con banderas y papel picado frente a un edificio de esquina; en la azotea hay tres personas junto a un molino de viento.",  // descripción breve para lectores de pantalla
    coleccion: "Edificios y esquinas",  // agrupa las fotos en la página Colecciones
    destacada: true,  // true = aparece en el inicio
    actual: {  // foto actual para la barra Antes / Ahora
      archivo: "img/actual-238460.jpg",  // copia de la foto actual dentro de img/
      textoAlternativo: "La misma esquina hoy: edificio con balaustrada en la azotea, arcos de ladrillo sobre las aberturas, toldos y un cartel de «Deportes Vestir» sobre la puerta.",
      posicion: "63% 50%",  // parte de la foto actual que queda a la vista: horizontal vertical
    },
  },
  {
    id: "banco-de-la-nacion-argentina",  // texto de la dirección: #/foto/<id>
    archivo: "img/238419.jpg",
    miniatura: "img/min/238419.jpg",  // versión liviana para las listas; null = se usa la imagen original
    ancho: 1204,  // medidas de la imagen en píxeles
    alto: 1600,
    titulo: "Banco de la Nación Argentina",
    descripcion: "Edificio de esquina de dos plantas con ingreso por la ochava y la inscripción «Banco de la Nación Argentina» sobre la puerta.",  // descripción corta
    epoca: "Entre 1920 y 1950",  // época aproximada, estimada por lo que se ve (vehículos, ropa, estilo); null si no se sabe
    textoAlternativo: "Edificio de esquina de dos plantas con ingreso en la ochava y la inscripción «Banco de la Nación Argentina» en el frontón de la puerta.",  // descripción breve para lectores de pantalla
    coleccion: "Edificios y esquinas",  // agrupa las fotos en la página Colecciones
    destacada: true,  // true = aparece en el inicio
    actual: {  // foto actual para la barra Antes / Ahora
      archivo: "img/actual-238458.jpg",  // copia de la foto actual dentro de img/
      textoAlternativo: "El Banco de la Nación Argentina hoy: edificio de esquina de dos plantas con ingreso por la ochava, banderas argentinas y árboles a la derecha.",
      posicion: "55% 50%",  // parte de la foto actual que queda a la vista: horizontal vertical
    },
  },
  {
    id: "iglesia-frente-a-un-descampado",  // texto de la dirección: #/foto/<id>
    archivo: "img/238431.jpg",
    miniatura: "img/min/238431.jpg",  // versión liviana para las listas; null = se usa la imagen original
    ancho: 720,  // medidas de la imagen en píxeles
    alto: 429,
    titulo: "Iglesia con campanario frente a un terreno abierto",
    descripcion: "Una iglesia con campanario al fondo de un terreno abierto, con un automóvil antiguo, un carro con caballo, personas y un ciclista en primer plano.",  // descripción corta
    epoca: "Hacia 1930",  // época aproximada, estimada por lo que se ve (vehículos, ropa, estilo); null si no se sabe
    textoAlternativo: "Iglesia de campanario al fondo de un terreno abierto, con un automóvil antiguo, un carro con caballo, personas y un ciclista en primer plano.",  // descripción breve para lectores de pantalla
    coleccion: "Edificios y esquinas",  // agrupa las fotos en la página Colecciones
    destacada: false,  // true = aparece en el inicio
    actual: {  // foto actual para la barra Antes / Ahora
      archivo: "img/actual-238437.jpg",  // copia de la foto actual dentro de img/
      textoAlternativo: "La plaza hoy: esquina con cantero y senderos de baldosa entre cipreses, una palmera y árboles altos, con una construcción blanca al fondo.",
      posicion: "50% 50%",  // parte de la foto actual que queda a la vista: horizontal vertical
    },
  },
  {
    id: "iglesia-de-torre-con-ciclista",  // texto de la dirección: #/foto/<id>
    archivo: "img/238427.jpg",
    miniatura: null,  // versión liviana para las listas; null = se usa la imagen original
    ancho: 267,  // medidas de la imagen en píxeles
    alto: 188,
    titulo: "Calle ancha con una iglesia de torre alta y un ciclista",
    descripcion: "Calle ancha con una iglesia de torre alta a un costado, una farola y un ciclista.",  // descripción corta
    epoca: "Entre 1950 y 1970",  // época aproximada, estimada por lo que se ve (vehículos, ropa, estilo); null si no se sabe
    textoAlternativo: "Calle ancha con una iglesia de torre alta con campanario a un costado, una columna de alumbrado y un ciclista.",  // descripción breve para lectores de pantalla
    coleccion: "Edificios y esquinas",  // agrupa las fotos en la página Colecciones
    destacada: false,  // true = aparece en el inicio
    actual: {  // foto actual para la barra Antes / Ahora
      archivo: "img/actual-238459.jpg",  // copia de la foto actual dentro de img/
      textoAlternativo: "La avenida hoy: boulevard central con árboles y una estatua, la torre de la iglesia al fondo, el banco a la derecha y un ciclista.",
      posicion: "32% 50%",  // parte de la foto actual que queda a la vista: horizontal vertical
    },
  },
  {
    id: "sala-de-lectura",  // texto de la dirección: #/foto/<id>
    archivo: "img/238424.jpg",
    miniatura: null,  // versión liviana para las listas; null = se usa la imagen original
    ancho: 280,  // medidas de la imagen en píxeles
    alto: 179,
    titulo: "Personas leyendo en una sala con bibliotecas",
    descripcion: "Varias personas sentadas a una mesa larga leen en una sala con bibliotecas de puertas vidriadas y un cuadro en la pared.",  // descripción corta
    epoca: "Entre 1920 y 1940",  // época aproximada, estimada por lo que se ve (vehículos, ropa, estilo); null si no se sabe
    textoAlternativo: "Personas sentadas a una mesa larga leyendo, en una sala con bibliotecas de puertas vidriadas y un cuadro en la pared.",  // descripción breve para lectores de pantalla
    coleccion: "Otras imágenes",  // agrupa las fotos en la página Colecciones
    destacada: false,  // true = aparece en el inicio
    actual: null,  // null = sin foto actual (ver README para agregarla)
  },
  {
    id: "rancho-con-caballos-y-aves",  // texto de la dirección: #/foto/<id>
    archivo: "img/238422.jpg",
    miniatura: null,  // versión liviana para las listas; null = se usa la imagen original
    ancho: 280,  // medidas de la imagen en píxeles
    alto: 157,
    titulo: "Rancho de techo de paja con caballos y aves",
    descripcion: "Rancho de paredes bajas y techo de paja en el campo, con caballos, un carro y una fila de aves blancas en primer plano.",  // descripción corta
    epoca: "Entre 1890 y 1930",  // época aproximada, estimada por lo que se ve (vehículos, ropa, estilo); null si no se sabe
    textoAlternativo: "Rancho de techo de paja en el campo, con caballos, una persona montada, un carro y una fila de aves blancas en primer plano.",  // descripción breve para lectores de pantalla
    coleccion: "Otras imágenes",  // agrupa las fotos en la página Colecciones
    destacada: false,  // true = aparece en el inicio
    actual: null,  // null = sin foto actual (ver README para agregarla)
  },
];

// ---------- DOCUMENTOS ----------
const DOCUMENTOS = [
  {
    id: "nota-de-cierre-libro-bautismos",  // texto de la dirección: #/documento/<id>
    archivo: "img/238383.jpg",
    miniatura: null,  // versión liviana para las listas; null = se usa la imagen original
    ancho: 280,  // medidas de la imagen en píxeles
    alto: 168,
    titulo: "Nota manuscrita al final de un libro de bautismos",
    tipo: "Registro parroquial manuscrito",  // ej.: Registro parroquial
    fecha: "28 de diciembre de 1836",  // solo se usa en la línea de tiempo
    anio: 1836,  // año, para ordenar
    descripcion: "Nota manuscrita en tinta con una rúbrica al pie, firmada por quien parece ser un cura y vicario.",  // descripción corta
    textoAlternativo: "Nota manuscrita en tinta con una rúbrica al pie y la inscripción «Cura y Vicario».",  // descripción breve para lectores de pantalla
  },
  {
    id: "bautismo-flora-olinda",  // texto de la dirección: #/documento/<id>
    archivo: "img/238384.jpg",
    miniatura: null,  // versión liviana para las listas; null = se usa la imagen original
    ancho: 275,  // medidas de la imagen en píxeles
    alto: 400,
    titulo: "Partida de bautismo de Flora Olinda",
    tipo: "Registro parroquial",  // ej.: Registro parroquial
    fecha: "4 de abril de 1898",  // solo se usa en la línea de tiempo
    anio: 1898,  // año, para ordenar
    descripcion: "Acta del Libro de Bautismos de la Capellanía de San Carlos de Capitán Sarmiento. El capellán bautiza a Flora Olinda; figuran sus padres y padrinos y la firma del capellán.",  // descripción corta
    textoAlternativo: "Acta de bautismo con encabezado impreso y el nombre Flora Olinda anotado a mano en el margen.",  // descripción breve para lectores de pantalla
  },
  {
    id: "certificado-de-matrimonio",  // texto de la dirección: #/documento/<id>
    archivo: "img/238385.jpg",
    miniatura: null,  // versión liviana para las listas; null = se usa la imagen original
    ancho: 280,  // medidas de la imagen en píxeles
    alto: 264,
    titulo: "Certificado de matrimonio",
    tipo: "Certificado manuscrito",  // ej.: Registro parroquial
    fecha: "1903",  // solo se usa en la línea de tiempo
    anio: 1903,  // año, para ordenar
    descripcion: "Certificado manuscrito encabezado «Exp. mat. N.º 108» (expediente matrimonial). Certifica el casamiento de dos personas y nombra a los padres de ambos. Lleva dos firmas y un sello circular.",  // descripción corta
    textoAlternativo: "Certificado manuscrito con el encabezado «Exp. mat. N.º 108», dos firmas y un sello circular en el ángulo inferior izquierdo.",  // descripción breve para lectores de pantalla
  },
  {
    id: "bautismo-capellania-vicaria",  // texto de la dirección: #/documento/<id>
    archivo: "img/238386.jpg",
    miniatura: null,  // versión liviana para las listas; null = se usa la imagen original
    ancho: 280,  // medidas de la imagen en píxeles
    alto: 246,
    titulo: "Partida de bautismo de la Capellanía Vicaría de Capitán Sarmiento",
    tipo: "Registro parroquial",  // ej.: Registro parroquial
    fecha: "4 de diciembre de 1920",  // solo se usa en la línea de tiempo
    anio: 1920,  // año, para ordenar
    descripcion: "Acta de bautismo sobre un formulario impreso de la Capellanía Vicaría de Capitán Sarmiento. Registra el bautismo de una niña, hija legítima de un matrimonio, con dos padrinos y la firma del cura de la parroquia. El nombre está anotado a mano en el margen.",  // descripción corta
    textoAlternativo: "Acta de bautismo sobre formulario impreso de la Capellanía Vicaría de Capitán Sarmiento, con texto manuscrito, firma al pie y nombre anotado en el margen.",  // descripción breve para lectores de pantalla
  },
];

// ---------- HITOS DE LA LÍNEA DE TIEMPO (hechos sin imagen) ----------
// Cada hecho lleva su fuente en un comentario; no se muestra en el sitio.
const HITOS = [
  {
    anio: 1586,  // año, para ordenar
    fecha: "1586",
    titulo: "Ortiz de Zárate cruza el río de los Arrecifes",
    descripcion: "El capitán Diego Ortiz de Zárate cruza el río en busca de un camino al Perú. Según la tradición, allí dijo «ved arrecifes aquí», origen del nombre del pago.",
    // Fuente: capitansarmiento.wordpress.com, «Nuestro nombre»
  },
  {
    anio: 1730,  // año, para ordenar
    fecha: "1730",
    titulo: "Se erige el curato de Arrecifes",
    descripcion: "La zona queda organizada como curato, una división religiosa.",
    // Fuente: capitansarmiento.wordpress.com, «Nuestro nombre»
  },
  {
    anio: 1739,  // año, para ordenar
    fecha: "1739",
    titulo: "Primer fortín de Arrecifes",
    descripcion: "Se levanta para proteger a la población de los malones. Algunos historiadores sitúan su fundación en 1737.",
    // Fuente: capitansarmiento.wordpress.com, «Nuestro nombre»
  },
  {
    anio: 1775,  // año, para ordenar
    fecha: "1775",
    titulo: "La campaña de Buenos Aires se divide en cinco partidos",
    descripcion: "Entre ellos, Arrecifes, que llegaba hasta el arroyo del Medio y las costas del Paraná.",
    // Fuente: capitansarmiento.wordpress.com, «Nuestro nombre»
  },
  {
    anio: 1780,  // año, para ordenar
    fecha: "Septiembre de 1780",
    titulo: "La capilla de Arrecifes pasa a ser parroquia",
    descripcion: "Se eleva a parroquia del curato de San José de Arrecifes, creado ese mismo año.",
    // Fuente: capitansarmiento.wordpress.com, «Nuestro nombre»
  },
  {
    anio: 1784,  // año, para ordenar
    fecha: "1784",
    titulo: "Se crea el Partido de Arrecifes",
    descripcion: "Queda constituido cuando el Cabildo de Buenos Aires resuelve elegir un alcalde de hermandad para el pago. Las tierras donde después nacería Capitán Sarmiento quedaron dentro de él.",
    // Fuente: capitansarmiento.wordpress.com (cronología); El Teclado, 29/06/2023
  },
  {
    anio: 1790,  // año, para ordenar
    fecha: "1790",
    titulo: "Dos grandes estancias en la zona",
    descripcion: "Los padres betlemitas y la familia Saavedra poseían casi todo lo que hoy es el partido de Capitán Sarmiento. Los betlemitas fueron dueños de su estancia hasta 1822.",
    // Fuente: capitansarmiento.wordpress.com, «1790-1822 Los Betlemitas»
  },
  {
    anio: 1810,  // año, para ordenar
    fecha: "Hacia 1810",
    titulo: "La zona, dentro del corredor seguro de la Primera Junta",
    descripcion: "Hacia la Revolución de Mayo, el territorio forma parte de la estrecha franja de tránsito seguro hacia el litoral y el Alto Perú que controlaba Buenos Aires. Por el vado del río Arrecifes pasaron los ejércitos de la Independencia.",
    // Fuente: capitansarmiento.wordpress.com, «Situación antes de la Fundación»
  },
  {
    anio: 1822,  // año, para ordenar
    fecha: "21 de diciembre de 1822",
    titulo: "Se suprime la orden betlemita",
    descripcion: "La ley de reforma del clero de Buenos Aires suprime las casas de los betlemitas y pasa sus propiedades al Estado.",
    // Fuente: capitansarmiento.wordpress.com, «1790-1822 Los Betlemitas»
  },
  {
    anio: 1828,  // año, para ordenar
    fecha: "22 de abril de 1828",
    titulo: "Cesión de derechos sobre las tierras",
    descripcion: "Juan Fernández de Molina y Félix Urioste reciben por cesión el derecho de enfiteusis sobre las antiguas tierras betlemitas.",
    // Fuente: capitansarmiento.wordpress.com, «1790-1822 Los Betlemitas»
  },
  {
    anio: 1839,  // año, para ordenar
    fecha: "12 de noviembre de 1839",
    titulo: "Compra de las tierras al gobierno",
    descripcion: "Una sociedad familiar de Juan Fernández de Molina compra esas tierras al gobierno de la Provincia de Buenos Aires.",
    // Fuente: capitansarmiento.wordpress.com, «1790-1822 Los Betlemitas»
  },
  {
    anio: 1866,  // año, para ordenar
    fecha: "22 de septiembre de 1866",
    titulo: "Muere Dominguito Sarmiento",
    descripcion: "El capitán Domingo Fidel Sarmiento, hijo adoptivo de Domingo Faustino Sarmiento, cae herido de muerte en la batalla de Curupaytí. Su nombre recibirían después la estación y el pueblo.",
    // Fuente: El Teclado, 29/06/2023; fundamentos HCD Provincia de Buenos Aires
  },
  {
    anio: 1868,  // año, para ordenar
    fecha: "1868",
    titulo: "Se inaugura la Capilla San Patricio",
    descripcion: "Conocida como Capilla McGuire, se levantó en terrenos que donó Thomas McGuire. Se amplió diez años después.",
    // Fuente: capitansarmiento.wordpress.com, «Inmigración Irlandesa»
  },
  {
    anio: 1869,  // año, para ordenar
    fecha: "1869",
    titulo: "Primer registro de población",
    descripcion: "El primer registro de población del actual partido cuenta 550 habitantes.",
    // Fuente: Estudio UNLP «Capitán Sarmiento: reflexiones y datos para una estrategia de desarrollo» (sedici.unlp.edu.ar)
  },
  {
    anio: 1877,  // año, para ordenar
    fecha: "12 de septiembre de 1877",
    titulo: "Ramona Molina de Urioste dona sus campos",
    descripcion: "Reparte en vida sus tierras entre sus hijos y nietas. Dentro de ellas quedaría luego la ciudad.",
    // Fuente: capitansarmiento.wordpress.com, «1864-1884 Ramona Molina y la ciudad»
  },
  {
    anio: 1880,  // año, para ordenar
    fecha: "1880",
    titulo: "Primeros rieles",
    descripcion: "Comienzan a colocarse los primeros rieles de la línea del Ferrocarril del Oeste que pasaría por la zona.",
    // Fuente: El Teclado, 29/06/2023 (texto del municipio)
  },
  {
    anio: 1882,  // año, para ordenar
    fecha: "19 de febrero de 1882",
    titulo: "Se habilita la estación Capitán Sarmiento",
    descripcion: "La estación pertenecía al Ferrocarril del Oeste, en la línea que unía San Antonio de Areco con Pergamino. Su nombre sería adoptado por el pueblo.",
    // Fuente: El Teclado; capitansarmiento.wordpress.com; fundamentos HCD (año 1882)
  },
  {
    anio: 1882,  // año, para ordenar
    fecha: "1 de mayo de 1882",
    titulo: "Se termina el ramal Victoria–Pergamino",
    descripcion: "Queda finalizado el ramal al que pertenece la estación.",
    // Fuente: El Teclado, 29/06/2023
  },
  {
    anio: 1884,  // año, para ordenar
    fecha: "11 de junio de 1884",
    titulo: "Se funda el pueblo",
    descripcion: "Un grupo de vecinos y comerciantes reunidos alrededor de la estación funda el pueblo de Capitán Sarmiento, por iniciativa de Gerardo Gómez, que tenía un comercio junto a la estación.",
    // Fuente: Fundamentos HCD; La Nación (2005); Wikipedia; estudio UNLP
  },
  {
    anio: 1887,  // año, para ordenar
    fecha: "1887",
    titulo: "Plano del pueblo",
    descripcion: "Se levanta el plano del Pueblo de Capitán Sarmiento, con una superficie de 168 hectáreas. Marca la estación y el colegio.",
    // Fuente: capitansarmiento.wordpress.com, «1864-1884 Ramona Molina y la ciudad»
  },
  {
    anio: 1888,  // año, para ordenar
    fecha: "22 de junio de 1888",
    titulo: "Primer loteo de terrenos",
    descripcion: "Se rematan manzanas y quintas de la sucesión de Félix Urioste.",
    // Fuente: Estudio UNLP (sedici); blog Primeros pobladores de Capitán Sarmiento
  },
  {
    anio: 1891,  // año, para ordenar
    fecha: "4 de noviembre de 1891",
    titulo: "Se inaugura el templo parroquial",
    descripcion: "La iglesia en honor a San Carlos Borromeo se levantó con donaciones de vecinos italianos, irlandeses, españoles y franceses entre 1889 y 1891.",
    // Fuente: El Teclado, 29/06/2023
  },
  {
    anio: 1888,  // año, para ordenar
    fecha: "1888",
    titulo: "Se coloca la piedra fundamental del Monasterio de San Pablo",
    descripcion: "El Retiro San Pablo de los Padres Pasionistas, a 15 km de la ciudad, fue obra de la colectividad irlandesa de la zona.",
    // Fuente: capitansarmiento.wordpress.com, «Inmigración Irlandesa»
  },
  {
    anio: 1892,  // año, para ordenar
    fecha: "1892",
    titulo: "Muere Gerardo Gómez",
    descripcion: "Reconocido oficialmente como fundador del pueblo, había sido dueño de al menos 40 terrenos cerca de la estación.",
    // Fuente: Blog Primeros pobladores de Capitán Sarmiento (23/04/2015)
  },
  {
    anio: 1898,  // año, para ordenar
    fecha: "1898",
    titulo: "Mensura del pueblo",
    descripcion: "Para medir el pueblo se usan como referencia dos casas de ladrillo y la cruz de la torre de la iglesia nueva.",
    // Fuente: capitansarmiento.wordpress.com; blog Primeros pobladores (19/03/2015)
  },
  {
    anio: 1896,  // año, para ordenar
    fecha: "25 de mayo de 1896",
    titulo: "Se inicia el Libro de Bautismos de la iglesia",
    descripcion: "Queda a cargo del cura Jesús Lorenzo Alfonsín.",
    // Fuente: capitansarmiento.wordpress.com, «Inmigración Irlandesa» (cita el blog Primeros pobladores)
  },
  {
    anio: 1900,  // año, para ordenar
    fecha: "7 de enero de 1900",
    titulo: "Empieza a funcionar el colegio del Retiro San Pablo",
    descripcion: "Funciona en el local de la antigua capilla. Desde 1905 recibe alumnos internos.",
    // Fuente: capitansarmiento.wordpress.com, «Inmigración Irlandesa»
  },
  {
    anio: 1901,  // año, para ordenar
    fecha: "1901",
    titulo: "El Partido de Arrecifes pasa a llamarse Bartolomé Mitre",
    descripcion: "Capitán Sarmiento pertenecía entonces a ese partido.",
    // Fuente: El Teclado; capitansarmiento.wordpress.com (cronología)
  },
  {
    anio: 1920,  // año, para ordenar
    fecha: "1920",
    titulo: "La estación Saavedra pasa a llamarse La Luisa",
    descripcion: "La estación, primero llamada Saavedra y desde 1919 Arroyo de Luna, pasa a llamarse La Luisa, en honor de María Luisa Saavedra.",
    // Fuente: capitansarmiento.wordpress.com, «Asentamiento La Luisa»; La Nación (2005) para el origen del nombre
  },
  {
    anio: 1931,  // año, para ordenar
    fecha: "1931",
    titulo: "Se incorpora El Trébol Polo Club",
    descripcion: "Su primer presidente fue Juan T. Duggan.",
    // Fuente: Wikipedia, «Capitán Sarmiento (ciudad)»
  },
  {
    anio: 1932,  // año, para ordenar
    fecha: "19 de marzo de 1932",
    titulo: "Nota de «Caras y Caretas» sobre el pueblo",
    descripcion: "La revista, en su edición n.º 1.746, publica «Un pueblo extraño: Capitán Sarmiento», firmada por Juan José de Soiza Reilly, que lo describe como dividido por las vías del tren.",
    // Fuente: Captura de un blog aportada al proyecto (no se consultó el ejemplar original)
  },
  {
    anio: 1939,  // año, para ordenar
    fecha: "1939",
    titulo: "Se aclara que el pueblo se sigue llamando Arrecifes",
    descripcion: "Desde 1901 el nombre Bartolomé Mitre se había aplicado también al pueblo cabecera. El partido siguió llamándose así hasta 1997.",
    // Fuente: capitansarmiento.wordpress.com, «Nuestro nombre» y «Datos Geográficos»
  },
  {
    anio: 1943,  // año, para ordenar
    fecha: "1943",
    titulo: "Se construye el cementerio del Monasterio",
    descripcion: "Se trasladan allí los restos que descansaban en otros sitios.",
    // Fuente: capitansarmiento.wordpress.com, «Inmigración Irlandesa»
  },
  {
    anio: 1948,  // año, para ordenar
    fecha: "1948",
    titulo: "Proyecto de autonomía del diputado Antonio Montes",
    descripcion: "El diputado provincial Antonio Montes presenta un proyecto para crear el partido, uno de los intentos que no prosperaron antes de 1961.",
    // Fuente: Wikipedia, «Partido de Capitán Sarmiento»; El Teclado (varios intentos legislativos sin éxito)
  },
  {
    anio: 1961,  // año, para ordenar
    fecha: "29 de junio de 1961",
    titulo: "Se crea el Partido de Capitán Sarmiento",
    descripcion: "La ley provincial 6485 lo crea como distrito número 121, con 525 km² del partido de Bartolomé Mitre, declara ciudad a Capitán Sarmiento y la nombra cabecera.",
    // Fuente: La Nación (2005); fundamentos HCD; El Teclado; Buenos Aires Inteligente. Otras fuentes dan fechas distintas; se usa la que repiten tres de ellas.
  },
  {
    anio: 1992,  // año, para ordenar
    fecha: "1992",
    titulo: "Dejan de circular los trenes de pasajeros",
    descripcion: "La estación queda sin servicio de pasajeros.",
    // Fuente: Wikipedia (Estación Capitán Sarmiento); blog Estaciones del ramal Victoria-Pergamino
  },
  {
    anio: 1997,  // año, para ordenar
    fecha: "1997",
    titulo: "El Partido de Bartolomé Mitre vuelve a llamarse Arrecifes",
    descripcion: "Recupera su nombre original.",
    // Fuente: capitansarmiento.wordpress.com, «Datos Geográficos»
  },
  {
    anio: 1997,  // año, para ordenar
    fecha: "12 de agosto de 1997",
    titulo: "Nace la Bandera Bonaerense",
    descripcion: "La ley provincial 11.997 crea la bandera de la Provincia de Buenos Aires, con el diseño de cinco jóvenes de Capitán Sarmiento ganadores de un concurso escolar.",
    // Fuente: gba.gob.ar (25.º aniversario); La Nación (12/08/2022); fundamentos HCD
  },
  {
    anio: 1997,  // año, para ordenar
    fecha: "12 de septiembre de 1997",
    titulo: "Cuna de la Bandera Bonaerense",
    descripcion: "El decreto 2.979/97 designa a Capitán Sarmiento como cuna de la bandera de la Provincia.",
    // Fuente: normas.gba.gob.ar, Decreto 2.979/97
  },
  {
    anio: 2011,  // año, para ordenar
    fecha: "2011",
    titulo: "Monumento a la Bandera Bonaerense",
    descripcion: "La ley provincial 14.290 aprueba su erección en la ciudad.",
    // Fuente: Fundamentos HCD (Ley 14290/11)
  },
];

// ---------- «EN POCAS PALABRAS» (arriba de la página Historia, frases cortas) ----------
const RESUMEN = [
  "Capitán Sarmiento nació junto a una estación de tren: la estación se habilitó el 19 de febrero de 1882 y el pueblo se fundó el 11 de junio de 1884.",
  "Se llama así por Dominguito Sarmiento, hijo adoptivo de Domingo Faustino Sarmiento, que murió en la guerra del Paraguay en 1866.",
  "Antes de existir el pueblo, estas tierras fueron de los padres betlemitas y después de la familia Molina y Urioste.",
  "Llegaron inmigrantes de Italia, España, Francia e Irlanda, entre otros países. En 1891 se inauguró la iglesia de San Carlos Borromeo.",
  "Hasta 1961 formó parte del partido de Arrecifes, que entonces se llamaba Bartolomé Mitre. El 29 de junio de 1961 se creó el Partido de Capitán Sarmiento.",
  "En 1997 la Provincia adoptó la bandera diseñada por cinco estudiantes de Capitán Sarmiento, y la ciudad fue designada cuna de la Bandera Bonaerense.",
];

// ---------- HISTORIA (página «Historia») ----------
// Cada apartado tiene un título, los párrafos completos y una versión de «lectura fácil»
// (frases cortas, una idea por frase). Es un resumen con palabras propias de lo publicado por las fuentes citadas en «Acerca».
const HISTORIA = [
  {
    titulo: "El territorio",
    parrafos: [
      "El Partido de Capitán Sarmiento está en el noroeste de la provincia de Buenos Aires y tiene 617 kilómetros cuadrados, unas 61.700 hectáreas. Su ciudad principal está a 144 kilómetros de Buenos Aires por la ruta 8. Limita con los partidos de Arrecifes, San Pedro, Baradero, San Antonio de Areco, Carmen de Areco y Salto, y es el distrito número 121 de la provincia.",
      "Forma parte de la llamada Pampa Ondulada, por las lomadas que terminan en el río y los arroyos. Pertenece a la cuenca del río Arrecifes, que es su límite norte y recibe varios arroyos del partido: el Luna, el Gómez, el del Medio, el Mármol y el Cahuané. Las vías del ferrocarril corren paralelas a la ruta 8, a unos 1.500 metros.",
    ],
    facil: [
      "Capitán Sarmiento está en el noroeste de la provincia de Buenos Aires.",
      "La ciudad queda a 144 kilómetros de la ciudad de Buenos Aires, por la ruta 8.",
      "El partido mide 617 kilómetros cuadrados.",
      "Limita con Arrecifes, San Pedro, Baradero, San Antonio de Areco, Carmen de Areco y Salto.",
      "El río Arrecifes es su límite norte. La tierra tiene lomadas suaves y varios arroyos.",
    ],
  },
  {
    titulo: "El Pago de los Arrecifes",
    parrafos: [
      "Poco después de la fundación de Buenos Aires, este territorio se conocía como Pago de los Arrecifes. Según la tradición, en 1586 el capitán Diego Ortiz de Zárate cruzó el río en busca de un camino al Perú y habría dicho «ved arrecifes aquí», de donde viene el nombre. Desde entonces el lugar fue posta de carretas y de recambio de animales para quienes iban hacia el Alto Perú. Una leyenda popular cuenta que los arrecifes los formó Itahí, la hija de un cacique querandí, al arrojar piedras al agua para ayudar a cruzar a un jinete.",
      "En 1730 la zona se erigió como curato; hacia 1739 se levantó el primer fortín de Arrecifes, para proteger a la población de los malones; en 1775 la campaña de Buenos Aires se dividió en cinco partidos; en septiembre de 1780 la capilla pasó a ser parroquia del curato de San José de Arrecifes, y en 1784 quedó constituido el partido.",
      "Hacia la Revolución de Mayo, la parte del territorio que controlaba Buenos Aires era una franja estrecha y segura, y dentro de ella estaba lo que hoy es el partido. De San Antonio de Areco salían el Camino de la Costa y el Camino de Córdoba, que pasaba por Arrecifes, y entre los dos quedaba lo que hoy es Capitán Sarmiento. Por el vado del río Arrecifes pasaron los ejércitos de la Independencia.",
      "Hasta 1961 la historia de Capitán Sarmiento y la del sur de Arrecifes fue una sola.",
    ],
    facil: [
      "Hace mucho, esta zona se llamaba Pago de los Arrecifes.",
      "Se cuenta que en 1586 el capitán Diego Ortiz de Zárate cruzó el río. Dicen que dijo «ved arrecifes aquí». De ahí viene el nombre.",
      "En 1784 se formó el partido de Arrecifes. Capitán Sarmiento estaba dentro de ese partido.",
      "Hasta 1961, la historia de Capitán Sarmiento y la de Arrecifes fue la misma.",
    ],
  },
  {
    titulo: "Antes de que existiera el pueblo",
    parrafos: [
      "La zona estuvo ligada a poblaciones indígenas, entre ellas los cahuané (también escrito caguanes). En 1790 había solo dos grandes estancias: una de los padres betlemitas y otra de la familia Saavedra, que entre las dos ocupaban casi todo lo que hoy es el partido. Los betlemitas, una orden hospitalaria nacida en América que tenía a su cargo hospitales de Buenos Aires, fueron dueños de su estancia desde por lo menos ese año hasta 1822. Los estudiosos locales suponen que la recibieron cuando la Corona expulsó a los jesuitas, en 1767.",
      "Las tres grandes estancias antiguas de la zona, desde La Luisa hacia San Pedro, fueron la Estancia Grande, hoy La Angelita; la Estancia del Medio, hoy La Lucía; y la Invernada.",
      "El 21 de diciembre de 1822 la ley de reforma del clero de Buenos Aires suprimió las casas betlemitas y pasó sus bienes al Estado. Entre 1822 y 1826 las tierras fueron arrendadas a Manuel Pinto y a Manuel Guillermo Pinto; en 1826 los Pinto las recibieron en enfiteusis y el 22 de abril de 1828 cedieron sus derechos a Juan Fernández de Molina y a su yerno Félix Urioste. El 12 de noviembre de 1839 una sociedad familiar encabezada por Molina compró esas tierras al gobierno de la Provincia.",
      "En el registro catastral de 1863, los Molina figuraban como los mayores propietarios del Partido de Arrecifes: Juan Bernabé Molina y hermanos tenían 15 leguas, unas 42.000 hectáreas.",
    ],
    facil: [
      "Antes del pueblo, en esta zona vivían pueblos originarios.",
      "En 1790 había dos grandes estancias. Una era de los padres betlemitas. La otra era de la familia Saavedra.",
      "En 1822 el gobierno quitó sus bienes a los betlemitas.",
      "Después, las tierras pasaron a la familia Molina y Urioste. En 1839 la familia Molina las compró al gobierno.",
    ],
  },
  {
    titulo: "Los campos de Ramona Molina de Urioste",
    parrafos: [
      "El 12 de septiembre de 1877 Ramona Molina de Urioste resolvió donar en vida sus campos a sus hijos, para evitar desacuerdos cuando ella muriera. Eran 14.722 hectáreas, dentro de las cuales está hoy la ciudad, que entonces no existía ni como estación ni como pueblo.",
      "Las dividió en siete partes: 2.445 hectáreas para cada uno de sus cuatro hijos vivos y para los herederos de Félix Urioste hijo, ya fallecido, y 1.220 hectáreas para cada una de sus nietas Victoria y Agustina Casares. A los herederos de Félix les tocó el campo sobre cuya parte se fundó la ciudad.",
    ],
    facil: [
      "En 1877 Ramona Molina de Urioste repartió sus campos entre sus hijos y nietas.",
      "Eran 14.722 hectáreas. En esas tierras está hoy la ciudad.",
      "En esa época todavía no existían la estación ni el pueblo.",
    ],
  },
  {
    titulo: "La estación",
    parrafos: [
      "En 1880 se empezaron a colocar los primeros rieles. El 19 de febrero de 1882 se habilitó la estación Capitán Sarmiento, del Ferrocarril del Oeste, en la línea que unía San Antonio de Areco con Pergamino. El 1 de mayo de ese año se dio por terminado el ramal Victoria–Pergamino, al que pertenece.",
      "El nombre recuerda a Domingo Fidel Sarmiento, «Dominguito». Nació en Santiago de Chile el 17 de abril de 1845, hijo del primer matrimonio de Benita Martínez Pastoriza, sanjuanina, y en 1848 fue adoptado por Domingo Faustino Sarmiento, que se casó con su madre. Combatió en la guerra contra el Paraguay como teniente primero y fue ascendido a capitán después de su muerte. Cayó herido de muerte en la batalla de Curupaytí el 22 de septiembre de 1866, a los 21 años. La víspera le había escrito a su madre: «Morir por su patria es dar a nuestro nombre un brillo que nada borrará».",
      "Sarmiento recibió la noticia en Estados Unidos, donde cumplía una misión diplomática, y escribió un libro en su memoria, «Vida de Dominguito». Está enterrado en el cementerio de la Recoleta.",
    ],
    facil: [
      "En 1880 empezaron a poner los rieles del tren.",
      "El 19 de febrero de 1882 se abrió la estación Capitán Sarmiento.",
      "El nombre recuerda a Domingo Fidel Sarmiento, llamado Dominguito. Era hijo adoptivo de Domingo Faustino Sarmiento.",
      "Dominguito murió en una batalla de la guerra del Paraguay, en 1866. Tenía 21 años.",
    ],
  },
  {
    titulo: "La fundación del pueblo",
    parrafos: [
      "Cerca de la estación puso su comercio Gerardo Gómez. Según la historia oficial, el 11 de junio de 1884 un grupo de vecinos y comerciantes reunidos alrededor de la estación fundó el pueblo, por iniciativa de Gómez. La mayoría eran inmigrantes italianos, españoles y franceses, a los que se sumaron irlandeses y algunos criollos.",
      "Se cuenta que firmaron un acta que fue enterrada cerca de la estación y nunca se encontró. Para otra corriente histórica no hubo un momento ni una reunión fundacional: el pueblo nació del paso del ferrocarril y del movimiento de personas y bienes que trajo, de la buena calidad de las tierras, del trabajo de los inmigrantes y de la influencia de los propietarios de estancias.",
      "En 1887 se levantó el plano del pueblo, con 168 hectáreas, que marca la estación y el colegio. El 22 de junio de 1888 se remataron manzanas y quintas de la sucesión de Félix Urioste, en el primer loteo de terrenos. En 1898 comenzó una mensura que usó como referencia dos casas de ladrillo y la cruz de la torre de la iglesia nueva.",
    ],
    facil: [
      "El pueblo se fundó el 11 de junio de 1884.",
      "Lo fundaron vecinos y comerciantes que vivían cerca de la estación. Gerardo Gómez tuvo la iniciativa.",
      "Muchos eran inmigrantes de Italia, España y Francia.",
      "Algunos historiadores piensan que no hubo una reunión de fundación. Dicen que el pueblo nació porque pasó el tren.",
      "En 1887 se hizo el plano del pueblo. En 1888 se vendieron los primeros terrenos.",
    ],
  },
  {
    titulo: "La iglesia de San Carlos Borromeo",
    parrafos: [
      "En 1889 ya había reclamos de la población para que se levantara un templo. Lo pagaron donantes de varias colectividades —italianos, irlandeses, españoles y franceses— entre 1889 y 1891, y el 4 de noviembre de 1891 se inauguró el templo parroquial en honor a San Carlos Borromeo, patrono de la ciudad. Miguel Ángel O'Farrell presidió la comisión que impulsó el actual templo.",
      "La fiesta religiosa reunió a toda la población, con banda de música e invitados de otros pueblos. Existe una foto de aquel día, que se considera la más antigua de una celebración multitudinaria en Capitán Sarmiento. Las fiestas patronales se celebran cada 4 de junio. El libro de bautismos de la iglesia se puso en marcha el 25 de mayo de 1896, a cargo del cura Jesús Lorenzo Alfonsín.",
    ],
    facil: [
      "La iglesia de San Carlos Borromeo se inauguró el 4 de noviembre de 1891.",
      "La pagaron donantes italianos, irlandeses, españoles y franceses.",
      "San Carlos Borromeo es el patrono de la ciudad. Las fiestas patronales son cada 4 de junio.",
    ],
  },
  {
    titulo: "Gerardo Gómez",
    parrafos: [
      "Gerardo Gómez, reconocido oficialmente como fundador, murió en 1892, poco después del nacimiento de su hijo Ramón Aníbal Gómez Coll. Fue dueño de al menos 40 terrenos cerca de la estación, en lo que entonces eran las afueras del pueblo, zona de quintas.",
      "De él se conserva poco: una marca de hacienda registrada junto a uno de los Urioste y una permuta de tierras con él. Habría firmado con otros vecinos el acta fundacional enterrada y gestionó que la estación fuera reconocida como pueblo. Según los fundamentos de proyectos legislativos, su gestión dejó el trazado general de la planta urbana y de la primera plaza pública, frente a la iglesia.",
    ],
    facil: [
      "Gerardo Gómez es reconocido como el fundador del pueblo.",
      "Tenía un comercio junto a la estación.",
      "Murió en 1892. Se sabe poco de su vida.",
    ],
  },
  {
    titulo: "Inmigrantes y colectividades",
    parrafos: [
      "En el partido se asentaron sobre todo inmigrantes italianos y españoles, y también franceses, irlandeses, croatas y serbios. Muchos italianos conocían el trabajo en parcelas pequeñas y lo llevaron a extensiones mayores, y buena parte de sus descendientes sigue viviendo en el lugar.",
      "Los irlandeses llegaron casi siempre sin capital: traían su capacidad de trabajo y su conocimiento de la cría de ovejas. Entre 1870 y 1880 hubo un traslado masivo de irlandeses hacia el campo, y en 1890 veinte propietarios de apellido irlandés tenían casi 40.000 hectáreas, el 23 % de las tierras del Partido de Arrecifes. Patricio Ham fue el irlandés con más tierra en el actual partido de Capitán Sarmiento: unas 10.000 hectáreas, desde un poco antes del almacén El Descanso hasta el río Arrecifes. En el cementerio de la ciudad hay muchas cruces celtas con nombres irlandeses.",
    ],
    facil: [
      "Llegaron inmigrantes de Italia, España, Francia, Irlanda, Croacia y Serbia.",
      "Los irlandeses criaban ovejas. Algunos compraron mucha tierra.",
      "En el cementerio de la ciudad hay cruces celtas con nombres irlandeses.",
    ],
  },
  {
    titulo: "El Monasterio de San Pablo",
    parrafos: [
      "A 15 kilómetros de la ciudad, hacia Carmen de Areco, está el Retiro San Pablo de los Padres Pasionistas, obra de la colectividad irlandesa de la zona. Su origen es la capilla San Patricio, llamada Capilla McGuire, que se levantó en terrenos donados por Thomas McGuire y se inauguró en 1868; se agrandó diez años después.",
      "En 1884 el padre Víctor, nacido en Dublín en 1844, empezó allí su tarea de pastor. En 1888 se puso la piedra fundamental del monasterio, con donaciones de McGuire, Eduardo Casey, Patricio Farrell y otros miembros de la comunidad. El 7 de enero de 1900 empezó a funcionar un colegio en el local de la antigua capilla y desde 1905 recibió alumnos internos. El cementerio del monasterio se construyó en 1943.",
    ],
    facil: [
      "El Monasterio de San Pablo está a 15 kilómetros de la ciudad.",
      "Lo hizo la comunidad irlandesa de la zona.",
      "Antes hubo una capilla, inaugurada en 1868. En 1888 se puso la piedra fundamental del monasterio.",
      "En 1900 empezó a funcionar un colegio.",
    ],
  },
  {
    titulo: "Un pueblo dividido por las vías",
    parrafos: [
      "El 19 de marzo de 1932 la revista «Caras y Caretas» (edición n.º 1.746) publicó una nota de Juan José de Soiza Reilly titulada «Un pueblo extraño: Capitán Sarmiento». La describía como un hermoso pueblo dividido por las vías del tren en dos pueblos de distinto carácter, y lo definía como «un pueblo con dos almas».",
    ],
    facil: [
      "En 1932 la revista «Caras y Caretas» escribió sobre Capitán Sarmiento.",
      "Decía que las vías del tren dividían el pueblo en dos partes.",
      "Cada parte tenía un carácter distinto.",
    ],
  },
  {
    titulo: "La Luisa",
    parrafos: [
      "El otro núcleo de población del partido es La Luisa. Su estación nació a raíz de una donación de la familia Saavedra y primero se llamó Saavedra; en 1919 pasó a llamarse Arroyo de Luna y desde 1920, La Luisa. El nombre homenajea a María Luisa Saavedra, descendiente de los primeros propietarios de esas tierras.",
    ],
    facil: [
      "La Luisa es el otro pueblo del partido.",
      "Su estación primero se llamó Saavedra. Después, Arroyo de Luna. Desde 1920 se llama La Luisa.",
      "El nombre homenajea a María Luisa Saavedra.",
    ],
  },
  {
    titulo: "La autonomía",
    parrafos: [
      "Hasta 1961 Capitán Sarmiento formó parte del partido de Arrecifes, que en 1901 pasó a llamarse Bartolomé Mitre. Con el crecimiento del pueblo hubo varios intentos legislativos de darle autonomía, sin éxito; uno fue el proyecto que presentó en 1948 el diputado provincial Antonio Montes.",
      "El 29 de junio de 1961 se sancionó la ley provincial 6485, que creó el Partido de Capitán Sarmiento como distrito número 121, con 525 kilómetros cuadrados del partido de Bartolomé Mitre, declaró ciudad a Capitán Sarmiento y la nombró cabecera. En 1997 el partido de Bartolomé Mitre volvió a llamarse Arrecifes.",
    ],
    facil: [
      "Hasta 1961, Capitán Sarmiento era parte del partido de Arrecifes. Ese partido se llamaba Bartolomé Mitre.",
      "El 29 de junio de 1961, una ley creó el Partido de Capitán Sarmiento.",
      "La ciudad de Capitán Sarmiento es su cabecera.",
    ],
  },
  {
    titulo: "El ferrocarril después",
    parrafos: [
      "Los trenes de pasajeros dejaron de correr en 1992. La estación ya no presta servicio y la comunidad la conserva como parte de su patrimonio.",
    ],
    facil: [
      "Los trenes de pasajeros dejaron de pasar en 1992.",
      "La estación ya no funciona como estación.",
      "La comunidad la cuida como parte de su historia.",
    ],
  },
  {
    titulo: "La economía del partido",
    parrafos: [
      "En 1980 el 74 % de la población vivía en la ciudad y el 26 % en el campo. Los establecimientos agropecuarios generaban el 84 % de la producción del distrito; en 1981 el 68 % de las explotaciones no superaba las 100 hectáreas y el 87 % de los productores eran dueños de la tierra que trabajaban.",
      "Los cultivos principales son el maíz, la soja y el trigo, y el ganado era en su mayoría bovino, de razas Hereford, Aberdeen Angus y Holando Argentino. Con la soja y la siembra directa el partido pasó a ser más agrícola que ganadero. También hay haras con genética equina, una gran planta procesadora de pollos, empresas de camiones, el centro de la sociedad CIALE, que procesa semen para la ganadería, y fábricas de vestidos, mosaicos y silos metálicos. La estancia más importante es La Elisa. Estos datos son los que recogió la historia local escrita hacia 2014.",
    ],
    facil: [
      "En el partido se trabaja sobre todo en el campo.",
      "Se siembra maíz, soja y trigo. También hay vacas.",
      "Hay fábricas de ropa, mosaicos y silos. Hay una gran planta que procesa pollos.",
      "Estos datos son de hace unos diez años.",
    ],
  },
  {
    titulo: "La Bandera Bonaerense",
    parrafos: [
      "En 1997 la Provincia eligió su bandera mediante el concurso escolar «Buscando la Bandera Bonaerense». Ganó el diseño de cinco estudiantes de las escuelas de enseñanza media n.º 1 «Mateo Gelicich» y n.º 2 «Domingo Faustino Sarmiento», de Capitán Sarmiento.",
      "La ley 11.997, del 12 de agosto de 1997, creó la bandera, y el decreto 2.979, del 12 de septiembre, designó a la ciudad como cuna de la Bandera de la Provincia de Buenos Aires. En 2011 la ley 14.290 aprobó erigir allí el Monumento a la Bandera Bonaerense.",
    ],
    facil: [
      "En 1997 hubo un concurso en las escuelas para elegir la bandera de la provincia.",
      "Ganaron cinco estudiantes de Capitán Sarmiento.",
      "Una ley del 12 de agosto de 1997 creó la bandera.",
      "Por eso Capitán Sarmiento es la cuna de la Bandera Bonaerense.",
    ],
  },
  {
    titulo: "Fiestas e identidad",
    parrafos: [
      "Además de las fiestas patronales y el Día de la Bandera Bonaerense, la ciudad celebra la Feria Regional del Libro y la Cultura, la Fiesta Regional de las Comidas Tradicionales y la Fiesta Provincial del Camionero. El municipio se presenta como Capital Nacional del Turf, y El Trébol Polo Club se incorporó en 1931.",
    ],
    facil: [
      "La ciudad tiene varias fiestas.",
      "Una es la fiesta patronal, el 4 de junio. Otra es el Día de la Bandera Bonaerense.",
      "También hay una feria del libro y una fiesta del camionero.",
      "La ciudad se presenta como Capital Nacional del Turf.",
    ],
  },
];

// ---------- GLOSARIO (página «Palabras difíciles») ----------
// Palabras que aparecen en el sitio, explicadas en lenguaje simple. Se ordenan solas por letra.
const GLOSARIO = [
  { termino: "Alcalde de hermandad", significado: "Persona elegida para mantener el orden y resolver asuntos menores en una zona rural, en la época colonial." },
  { termino: "Autonomía", significado: "Poder de gobernarse sin depender de otro. Capitán Sarmiento logró un partido propio en 1961." },
  { termino: "Betlemitas", significado: "Orden religiosa que atendía hospitales. En Buenos Aires tuvo a su cargo hospitales y recibió tierras." },
  { termino: "Cabecera", significado: "Ciudad principal de un partido, donde está su gobierno." },
  { termino: "Capellanía", significado: "Zona o iglesia a cargo de un capellán, que es un sacerdote." },
  { termino: "Catastro", significado: "Registro oficial de las propiedades de un lugar, con sus dueños y sus medidas." },
  { termino: "Cesión", significado: "Entregar a otra persona un derecho que uno tiene." },
  { termino: "Colectividad", significado: "Grupo de inmigrantes de un mismo país que viven cerca y mantienen sus costumbres." },
  { termino: "Cruz celta", significado: "Cruz con un círculo en el cruce de sus brazos. Es típica de Irlanda." },
  { termino: "Cuenca", significado: "Territorio por donde las aguas llegan a un mismo río." },
  { termino: "Cura y vicario", significado: "Sacerdote a cargo de una parroquia." },
  { termino: "Curato", significado: "Zona a cargo de un sacerdote, con su parroquia." },
  { termino: "Decreto", significado: "Norma que firma el gobierno, por ejemplo el gobernador o el presidente. Se diferencia de la ley, que aprueban los legisladores." },
  { termino: "Donar", significado: "Dar algo sin cobrar." },
  { termino: "Enfiteusis", significado: "Forma de alquilar tierras del Estado por mucho tiempo, pagando un alquiler anual." },
  { termino: "Estancia", significado: "Campo grande donde se crían animales o se cultiva." },
  { termino: "Fortín", significado: "Construcción pequeña, con soldados, para defender la frontera." },
  { termino: "Hectárea", significado: "Medida de superficie. Es un cuadrado de 100 metros de lado." },
  { termino: "Hijo adoptivo", significado: "Hijo que no nació en esa familia, pero fue criado como hijo." },
  { termino: "Legua", significado: "Medida antigua de superficie. Una legua cuadrada son unas 2.700 hectáreas." },
  { termino: "Loteo", significado: "Dividir un terreno grande en partes, llamadas lotes, para venderlas." },
  { termino: "Malón", significado: "Nombre que se daba, en esa época, a los ataques de grupos indígenas contra poblaciones y estancias." },
  { termino: "Mensura", significado: "Medir un terreno y marcar sus límites." },
  { termino: "Monasterio", significado: "Casa donde vive una comunidad religiosa." },
  { termino: "Pago", significado: "Zona rural de la época colonial, con un nombre propio y vecinos." },
  { termino: "Pampa Ondulada", significado: "Zona de lomadas suaves de la llanura pampeana." },
  { termino: "Parroquia", significado: "Iglesia de un pueblo o barrio, a cargo de un cura." },
  { termino: "Partida de bautismo", significado: "Documento que registra que una persona fue bautizada, con su fecha y su familia." },
  { termino: "Partido", significado: "En la provincia de Buenos Aires, cada división del territorio con su propio gobierno. Es parecido a un municipio." },
  { termino: "Patrono", significado: "Santo protector de un lugar." },
  { termino: "Posta", significado: "Lugar donde se descansaba y se cambiaban los caballos durante un viaje." },
  { termino: "Ramal", significado: "Línea secundaria de ferrocarril que se separa de la línea principal." },
  { termino: "Remate", significado: "Venta pública en la que se vende al mejor precio ofrecido." },
  { termino: "Siembra directa", significado: "Forma de sembrar sin arar la tierra." },
  { termino: "Sucesión", significado: "Bienes que deja una persona al morir, y el trámite para repartirlos entre sus herederos." },
  { termino: "Turf", significado: "Carreras de caballos." },
  { termino: "Vado", significado: "Lugar poco profundo de un río por donde se puede cruzar." },
];
