import {abrir,ir,cambiarRuta,axe,esperar} from './comun.mjs';
const nav=await abrir(375,812,{movil:true});const p=await nav.newPage();
await ir(p,'');
const poner=async(aj)=>{await p.evaluate(a=>{localStorage.setItem('ajustes-accesibilidad',JSON.stringify(a))},aj);await p.reload({waitUntil:'load'});await p.waitForSelector('#main h1');await esperar(150)};
// ---------- contraste calculado de verdad con ajustes
console.log('== Contraste (axe color-contrast, navegador real)');
const combos=[['predeterminado',{}],['fondo oscuro',{tema:'dark'}],['alto contraste',{contraste:true}],['fondo amarillo',{fondo:'amarillo'}],['fondo verde',{fondo:'verde'}],['fondo azul',{fondo:'azul'}],['fondo gris',{fondo:'gris'}],['fondo blanco',{fondo:'blanco'}],['sin colores',{grises:true}],['enlaces resaltados',{enlaces:true}],['Máxima visibilidad',{texto:'3',contraste:true,fuente:true,espacio:true,enlaces:true,foco:true,botones:true}]];
for(const [n,aj] of combos){await poner(aj);const fallos=[];for(const r of ['','archivo','historia','linea-de-tiempo','foto/banco-de-la-nacion-argentina']){await cambiarRuta(p,r);const v=await axe(p,{runOnly:{type:'rule',values:['color-contrast']}});if(v.length)fallos.push('/'+r+': '+v[0].nodos.slice(0,2).map(x=>x.sel).join(' , ')+' ('+v[0].total+')')}
 console.log('  '+(fallos.length?'✗ ':'✓ ')+n+(fallos.length?' → '+fallos.join(' | '):''))}
// emulación del sistema
for(const [n,feat] of [['sistema en modo oscuro',[{name:'prefers-color-scheme',value:'dark'}]],['sistema pide más contraste',[{name:'prefers-contrast',value:'more'}]]]){await p.evaluate(()=>localStorage.clear());await p.emulateMediaFeatures(feat);await p.reload({waitUntil:'load'});await p.waitForSelector('#main h1');const fallos=[];for(const r of ['','historia']){await cambiarRuta(p,r);const v=await axe(p,{runOnly:{type:'rule',values:['color-contrast']}});if(v.length)fallos.push('/'+r+' ('+v[0].total+')')}console.log('  '+(fallos.length?'✗ ':'✓ ')+n+(fallos.length?' → '+fallos.join(' | '):''))}
await p.emulateMediaFeatures([]);await p.evaluate(()=>localStorage.clear());
// ---------- espaciado de texto WCAG 1.4.12
console.log('\n== Espaciado de texto (1.4.12): line-height 1.5, párrafos 2×, letras .12em, palabras .16em');
await p.reload({waitUntil:'load'});
for(const ancho of [375,320]){await p.setViewport({width:ancho,height:700,isMobile:true,hasTouch:true});const h=await p.addStyleTag({content:'*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}'});const malos=[];for(const r of ['','archivo','historia','linea-de-tiempo','foto/estacion-ferroviaria','glosario']){await cambiarRuta(p,r);const d=await p.evaluate(()=>{const W=document.documentElement.clientWidth;const out=[];if(document.documentElement.scrollWidth>W+1)out.push('scroll horizontal '+document.documentElement.scrollWidth);for(const el of document.querySelectorAll('main *, header *, footer *')){const s=getComputedStyle(el);if((s.overflowY==='hidden'||s.overflowX==='hidden')&&(el.scrollHeight>el.clientHeight+2||el.scrollWidth>el.clientWidth+2)&&el.clientHeight>0&&!el.matches('.cmp'))out.push('recortado '+el.tagName.toLowerCase()+'.'+el.className)}return out.slice(0,3)});if(d.length)malos.push('/'+r+': '+d.join(', '))}console.log('  '+(malos.length?'✗ ':'✓ ')+ancho+' px'+(malos.length?' → '+malos.join(' | '):''));await h.evaluate(e=>e.remove())}
// ---------- diálogos en horizontal pequeño
console.log('\n== Ventanas (panel y visor) en celular horizontal 568×320');
await p.setViewport({width:568,height:320,isMobile:true,hasTouch:true});await p.reload({waitUntil:'load'});await p.waitForSelector('#main h1');
await p.click('#abrir-acc');await esperar(200);
const panel=await p.evaluate(()=>{const d=document.getElementById('acc');const c=d.querySelector('.cuerpo');const cerrar=document.getElementById('acc-cerrar').getBoundingClientRect();return{alto:d.getBoundingClientRect().height,cuerpoScroll:c.scrollHeight,cuerpoVisible:c.clientHeight,cerrarVisible:cerrar.top>=0&&cerrar.bottom<=innerHeight}});
console.log('  panel: alto',Math.round(panel.alto),'| contenido',panel.cuerpoScroll,'visible',panel.cuerpoVisible,'| «Cerrar» visible sin desplazar:',panel.cerrarVisible);
await p.click('#acc-cerrar');await cambiarRuta(p,'foto/banco-de-la-nacion-argentina');
await p.click('.zoomable');await esperar(300);
const visor=await p.evaluate(()=>{const ds=document.querySelector('#lb .ds').getBoundingClientRect();const d=document.getElementById('lb');return{imagen:Math.round(ds.height),ventana:Math.round(innerHeight),scrollVentana:d.scrollHeight>d.clientHeight}});
console.log('  visor: área de la imagen',visor.imagen,'px de',visor.ventana,'px'+(visor.imagen<120?'  ✗ muy poco espacio':'  ✓'));
await nav.close();
