// Esta prueba necesita un sitio con videos en lengua de señas. Para correrla:
//  1. Copiá el sitio a otra carpeta y creá en ella lsa/prueba.webm (cualquier archivo) y lsa/prueba.vtt.
//  2. En esa copia, agregá esta línea al primer apartado de HISTORIA, al hecho de 1884 de HITOS
//     y a la foto «estacion-ferroviaria» de FOTOS:
//        lsa: { video: "lsa/prueba.webm", subtitulos: "lsa/prueba.vtt" },
//  3. Serví esa copia en el puerto 8123 y corré:  node lengua-de-senas.mjs
import {abrir,ir,cambiarRuta,axe,esperar} from './comun.mjs';
let fallos=0;const ok=(n,c,x='')=>{console.log((c?'✓ ':'✗ ')+n+(x?'  '+x:''));if(!c)fallos++};
const nav=await abrir(375,812,{movil:true});const p=await nav.newPage();
const pedidos=[];p.on('request',r=>{if(/lsa\//.test(r.url()))pedidos.push(r.url().split('/').pop())});
console.log('== Video en lengua de señas (LSA): contenido de prueba en 3 lugares');
await ir(p,'historia');
const d=await p.evaluate(()=>({n:document.querySelectorAll('details.lsa').length,resumen:document.querySelector('details.lsa summary').textContent.trim(),abierto:document.querySelector('details.lsa').open,v:!!document.querySelector('details.lsa video'),controles:document.querySelector('details.lsa video')?.controls,pre:document.querySelector('details.lsa video')?.preload,auto:document.querySelector('details.lsa video')?.autoplay,pista:document.querySelector('details.lsa video track')?.kind,nombre:document.querySelector('details.lsa video')?.getAttribute('aria-label')}));
ok('Historia: el primer apartado ofrece «Ver en lengua de señas argentina (LSA)», cerrado',d.n===1&&!d.abierto&&/lengua de señas/.test(d.resumen),d.resumen);
ok('el video tiene controles, sin reproducción automática y sin descarga previa',d.controles&&!d.auto&&d.pre==='none',`preload=${d.pre}`);
ok('el video tiene nombre accesible que dice qué es',/en lengua de señas argentina/.test(d.nombre),d.nombre);
await esperar(300);ok('no se pidió ningún archivo (ni video ni subtítulos) mientras está cerrado',pedidos.length===0,pedidos.join(','));
await p.focus('details.lsa summary');await p.keyboard.press('Enter');await esperar(300);
ok('se abre con el teclado (Enter)',await p.evaluate(()=>document.querySelector('details.lsa').open));
ok('al abrirlo se suman los subtítulos en español, activados',await p.evaluate(()=>{const t=document.querySelector('details.lsa video track');return !!t&&t.kind==='captions'&&t.srclang==='es'&&t.default}));
const t=await p.evaluate(()=>{const v=document.querySelector('details.lsa video').getBoundingClientRect();return{w:Math.round(v.width),h:Math.round(v.height),desborda:document.documentElement.scrollWidth>document.documentElement.clientWidth+1,resumenAlto:Math.round(document.querySelector('details.lsa summary').getBoundingClientRect().height)}});
ok('el video ocupa el ancho disponible sin desbordar',t.w>=300&&!t.desborda&&t.h>150,`${t.w}×${t.h}`);ok('el botón de abrir mide al menos 44 px',t.resumenAlto>=44,t.resumenAlto+' px');
const v=await axe(p);ok('axe con el video abierto: 0 violaciones',v.length===0,v.map(x=>x.id+': '+x.nodos[0].sel).join(' | '));
await cambiarRuta(p,'linea-de-tiempo/1884');await esperar(200);
ok('Línea de tiempo: el hecho de 1884 también ofrece el video',await p.evaluate(()=>!!document.querySelector('#panel-anio details.lsa video')));
await cambiarRuta(p,'foto/estacion-ferroviaria');await esperar(200);
ok('Ficha: la foto de la estación ofrece el video',await p.evaluate(()=>!!document.querySelector('.ficha details.lsa video')));
await cambiarRuta(p,'foto/banco-de-la-nacion-argentina');await esperar(200);
ok('las fichas sin video no muestran nada',await p.evaluate(()=>!document.querySelector('details.lsa')));
const v3=await axe(p);ok('axe en la ficha: 0 violaciones',v3.length===0);
await p.setViewport({width:320,height:568,isMobile:true,hasTouch:true});await cambiarRuta(p,'historia');await p.click('details.lsa summary');await esperar(200);
ok('320 px: sin desplazamiento horizontal con el video abierto',!(await p.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+1)));
console.log(fallos?`\n${fallos} fallos`:'\nTodo en orden');await nav.close();
