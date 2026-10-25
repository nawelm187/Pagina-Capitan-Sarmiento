import {abrir,ir,cambiarRuta,RUTAS,esperar} from './comun.mjs';
let fallos=0;const ok=(n,c,x='')=>{console.log((c?'✓ ':'✗ ')+n+(x?'  '+x:''));if(!c)fallos++};
const nav=await abrir(375,812,{movil:true});const p=await nav.newPage();await ir(p,'');
console.log('== Estructura de títulos, puntos de referencia y nombres en cada página');
let titulosMal=[],nombresVacios=[],puntos=[],idsRep=[],focoMal=[],vivaMal=[];
for(const r of RUTAS){await cambiarRuta(p,r);
 const d=await p.evaluate(()=>{const hs=[...document.querySelectorAll('main h1,main h2,main h3,main h4')].map(h=>+h.tagName[1]);const saltos=[];hs.forEach((n,i)=>{if(i===0?n!==1:n>hs[i-1]+1)saltos.push(hs[i-1]+'→'+n)});const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);const rep=ids.filter((x,i)=>ids.indexOf(x)!==i);return{h1:hs.filter(n=>n===1).length,saltos,rep:[...new Set(rep)],main:document.querySelectorAll('main').length,banner:document.querySelectorAll('header.site').length,pie:document.querySelectorAll('footer.site').length,foco:document.activeElement&&document.activeElement.tagName,viva:document.getElementById('live').textContent,pressed:document.querySelectorAll('[aria-pressed]').length}});
 if(d.h1!==1||d.saltos.length)titulosMal.push('/'+r+' h1='+d.h1+' saltos '+d.saltos.join(','));if(d.rep.length)idsRep.push('/'+r+': '+d.rep.join(','));if(d.main!==1||d.banner!==1||d.pie!==1)puntos.push('/'+r);if(d.foco!=='H1')focoMal.push('/'+r+' foco en '+d.foco);if(d.viva!=='')vivaMal.push('/'+r+': «'+d.viva+'»');if(d.pressed)nombresVacios.push('/'+r+': hay '+d.pressed+' botón(es) con aria-pressed');
 const arbol=await p.accessibility.snapshot({interestingOnly:true});const vacios=[];(function rec(n){if(['button','link','checkbox','radio','combobox','textbox','searchbox','slider'].includes(n.role)&&!(n.name||'').trim())vacios.push(n.role);for(const h of n.children||[])rec(h)})(arbol);if(vacios.length)nombresVacios.push('/'+r+': '+vacios.length+' controles sin nombre')}
ok('cada página tiene un único h1 y no salta niveles de título',titulosMal.length===0,titulosMal.join(' | '));
ok('un solo main, banner y pie por página',puntos.length===0,puntos.join(','));
ok('sin ids repetidos',idsRep.length===0,idsRep.join(' | '));
ok('al cambiar de página el foco va al título (h1)',focoMal.length===0,focoMal.join(' | '));
ok('la región viva queda vacía al navegar (no se repite el anuncio)',vivaMal.length===0,vivaMal.join(' | '));
ok('todos los controles tienen nombre accesible y ningún botón usa aria-pressed junto con cambio de texto',nombresVacios.length===0,nombresVacios.join(' | '));
// archivo sin resultados: nivel de título
await cambiarRuta(p,'archivo');await p.type('#q','zzzz');await esperar(150);
const sin=await p.evaluate(()=>[...document.querySelectorAll('main h1,main h2,main h3')].map(h=>h.tagName+':'+h.textContent.trim().slice(0,18)));
ok('«Sin resultados» no salta de nivel',sin.every(s=>!s.startsWith('H3')),sin.join(' / '));
const viva=await p.evaluate(()=>document.getElementById('live').textContent);ok('el conteo de resultados sí se anuncia',/0 fotograf/.test(viva),'«'+viva+'»');
// nombres de los botones que cambian
await cambiarRuta(p,'historia');const t1=await p.$eval('#escuchar',e=>e.textContent);ok('botón «Escuchar esta página» sin aria-pressed',await p.$eval('#escuchar',e=>!e.hasAttribute('aria-pressed')),t1);
console.log(fallos?`\n${fallos} fallos`:'\nTodo en orden');await nav.close();
