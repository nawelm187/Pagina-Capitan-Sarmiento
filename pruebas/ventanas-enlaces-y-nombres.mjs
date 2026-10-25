import {abrir,ir,cambiarRuta,RUTAS,esperar,BASE} from './comun.mjs';
let fallos=0;const ok=(n,c,x='')=>{console.log((c?'✓ ':'✗ ')+n+(x?'  '+x:''));if(!c)fallos++};
const nav=await abrir(375,812,{movil:true});const p=await nav.newPage();
const consola=[];p.on('console',m=>{if(['error','warning'].includes(m.type()))consola.push(m.text().slice(0,120))});p.on('pageerror',e=>consola.push('pageerror '+e.message));
const malas=[];p.on('response',r=>{if(r.status()>=400)malas.push(r.status()+' '+r.url())});
await ir(p,'');
// ---------- 1) ventanas: foco, Tab atrapado, Escape y retorno
console.log('== Ventanas (visor de imágenes y panel de accesibilidad) con teclado real');
const foco=()=>p.evaluate(()=>{const e=document.activeElement;return e?(e.tagName.toLowerCase()+(e.id?'#'+e.id:'')):'ninguno'});
const dentro=(sel)=>p.evaluate(s=>{const d=document.querySelector(s);return !!d&&d.contains(document.activeElement)},sel);
// En una ventana modal el foco puede pasar al navegador (activeElement = body), pero nunca a la página de atrás
const fueraDeVentana=(sel)=>p.evaluate(s=>{const d=document.querySelector(s),e=document.activeElement;return !!e&&e!==document.body&&!d.contains(e)},sel);
await cambiarRuta(p,'foto/banco-de-la-nacion-argentina');
await p.focus('.zoomable');await p.keyboard.press('Enter');await esperar(250);
ok('el visor se abre con Enter y el foco entra en la ventana',await dentro('#lb'),'foco en '+await foco());
let escapo=false;for(let i=0;i<14;i++){await p.keyboard.press('Tab');if(await fueraDeVentana('#lb')){escapo=true;break}}
ok('con Tab el foco nunca llega a la página de atrás (el visor es modal)',!escapo);
await p.keyboard.press('Escape');await esperar(250);
ok('Escape cierra el visor y el foco vuelve al botón que lo abrió',(await p.evaluate(()=>!document.getElementById('lb').open))&&(await foco())==='button.zoomable'||(await p.evaluate(()=>document.activeElement.classList.contains('zoomable'))),await foco());
const fondoInerte=await (async()=>{await p.focus('.zoomable');await p.keyboard.press('Enter');await esperar(200);const r=await p.evaluate(()=>{const b=document.querySelector('header .brand');return b.matches(':focus')===false&&getComputedStyle(document.getElementById('lb')).display!=='none'});await p.keyboard.press('Escape');return r})();
ok('mientras el visor está abierto el resto de la página no recibe foco',fondoInerte);
// panel
await esperar(150);await p.focus('#abrir-acc');await p.keyboard.press('Enter');await esperar(250);
ok('el panel de accesibilidad se abre y recibe el foco',await dentro('#acc'),await foco());
escapo=false;for(let i=0;i<40;i++){await p.keyboard.press('Tab');if(await fueraDeVentana('#acc')){escapo=true;break}}
ok('con Tab el foco nunca llega a la página de atrás a lo largo de los 30+ controles del panel',!escapo);
await p.keyboard.press('Escape');await esperar(250);ok('Escape cierra el panel y el foco vuelve a «Accesibilidad»',(await foco())==='button#abrir-acc',await foco());
// menú móvil
await p.focus('#menu');await p.keyboard.press('Enter');await esperar(150);const abierto=await p.evaluate(()=>document.getElementById('menu').getAttribute('aria-expanded'));await p.keyboard.press('Escape');await esperar(100);
ok('el menú móvil se abre con Enter y se cierra con Escape devolviendo el foco',abierto==='true'&&(await p.evaluate(()=>document.getElementById('menu').getAttribute('aria-expanded')))==='false'&&(await foco())==='button#menu');
// deslizador con teclado
await cambiarRuta(p,'foto/banco-de-la-nacion-argentina');await p.focus('.zoomable');await p.keyboard.press('Enter');await esperar(250);
await p.focus('#rng');await p.keyboard.press('ArrowRight');await p.keyboard.press('ArrowRight');await p.keyboard.press('End');
const v=await p.evaluate(()=>({v:document.getElementById('rng').value,p:document.getElementById('cmp').style.getPropertyValue('--p'),t:document.getElementById('rng').getAttribute('aria-valuetext')}));
ok('el deslizador Antes/Ahora se maneja con flechas y Fin',v.v==='100'&&v.p==='100%',`valor ${v.v}, texto «${v.t}»`);await p.keyboard.press('Escape');
// ---------- 2) etiqueta visible dentro del nombre accesible (control por voz, WCAG 2.5.3)
console.log('\n== Nombre accesible = texto visible (control por voz, 2.5.3)');
const malNombre=[];
for(const r of ['','archivo','historia','foto/banco-de-la-nacion-argentina','glosario']){await cambiarRuta(p,r);
 const arbol=await p.accessibility.snapshot({interestingOnly:false});
 const nombres=[];(function rec(n){if(['button','link','checkbox','radio','combobox','searchbox','slider'].includes(n.role))nombres.push(n);for(const h of n.children||[])rec(h)})(arbol);
 const visibles=await p.evaluate(()=>[...document.querySelectorAll('a[href],button,select,input')].filter(e=>e.offsetParent!==null||e.closest('header')).map(e=>({t:(e.innerText||e.value||'').replace(/\s+/g,' ').trim(),l:(e.getAttribute('aria-label')||'').trim()})));
 for(const v of visibles){if(!v.t||!v.l)continue;if(!v.l.toLowerCase().includes(v.t.toLowerCase().slice(0,25)))malNombre.push(`/${r}: texto «${v.t.slice(0,30)}» ≠ nombre «${v.l.slice(0,40)}»`)}}
ok('todo control con texto visible lo incluye en su nombre accesible',malNombre.length===0,malNombre.slice(0,3).join(' | '));
// ---------- 3) enlaces internos, imágenes y consola
console.log('\n== Enlaces, imágenes y consola');
await ir(p,'');const todos=new Set();
for(const r of RUTAS.filter(x=>x!=='sin-pagina')){await cambiarRuta(p,r);const hs=await p.evaluate(()=>[...document.querySelectorAll('a[href^="#/"]')].map(a=>a.getAttribute('href')));hs.forEach(h=>todos.add(h))}
const rotos=[];for(const h of todos){await p.evaluate(x=>{location.hash=x},h);await esperar(120);const t=await p.evaluate(()=>document.querySelector('#main h1')?.textContent||'');if(/No encontramos esa página/.test(t))rotos.push(h)}
ok(`los ${todos.size} enlaces internos distintos llevan a una página que existe`,rotos.length===0,rotos.join(', '));
const sinCargar=[];for(const r of ['','archivo','documentos','colecciones','foto/estacion-ferroviaria','documento/bautismo-1920','documento/bautismo-capellania-vicaria']){await cambiarRuta(p,r);await esperar(300);const im=await p.evaluate(()=>[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src.slice(-30)));if(im.length)sinCargar.push('/'+r+': '+im.join(','))}
ok('todas las imágenes cargan',sinCargar.length===0,sinCargar.join(' | '));
ok('sin respuestas de error (404, etc.)',malas.length===0,malas.slice(0,3).join(' | '));
ok('sin errores ni advertencias en la consola',consola.length===0,[...new Set(consola)].slice(0,3).join(' | '));
console.log(fallos?`\n${fallos} fallos`:'\nTodo en orden');await nav.close();
