import {abrir,ir,esperar} from './comun.mjs';
const nav=await abrir(1280,800);const p=await nav.newPage();const fallos=[];p.on('requestfailed',r=>fallos.push(r.url()));
await ir(p,'');await esperar(400);
const r=await p.evaluate(async()=>{await document.fonts.ready;return{cargadas:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family.replace(/"/g,'')+' '+f.weight),h1:getComputedStyle(document.querySelector('h1')).fontFamily.split(',')[0],cuerpo:getComputedStyle(document.body).fontFamily.split(',')[0],acentos:document.fonts.check('16px "Source Sans 3"','áéíóúñÁÉÍÓÚÑ¿¡')}});
console.log('fuentes cargadas desde el propio sitio:',r.cargadas.join(', '));console.log('títulos:',r.h1,'| cuerpo:',r.cuerpo,'| acentos y ñ:',r.acentos);
console.log('pedidos que fallaron:',fallos.length?fallos:'ninguno (ya no hay pedidos a Google)');
await p.evaluate(()=>localStorage.setItem('ajustes-accesibilidad',JSON.stringify({fuente:true})));await p.reload({waitUntil:'load'});await esperar(400);
console.log('letra fácil de leer activa:',await p.evaluate(async()=>{await document.fonts.ready;return[...document.fonts].filter(f=>f.status==='loaded'&&/Atkinson/.test(f.family)).length+' variantes de Atkinson cargadas'}));
await nav.close();
