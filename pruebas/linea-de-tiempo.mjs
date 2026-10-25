import {abrir,ir,cambiarRuta,axe,esperar} from './comun.mjs';
let fallos=0;const ok=(n,c,x='')=>{console.log((c?'✓ ':'✗ ')+n+(x?'  '+x:''));if(!c)fallos++};
const nav=await abrir(1280,800);const p=await nav.newPage();
const datos=await (async()=>{await ir(p,'');return p.evaluate(()=>{const ev=[...HITOS,...DOCUMENTOS.filter(d=>d.fecha).map(d=>({anio:d.anio}))];const m={};for(const e of ev)m[e.anio]=(m[e.anio]||0)+1;return m})})();
const anios=Object.keys(datos).map(Number).sort((a,b)=>a-b);
console.log('== Línea de tiempo horizontal ('+anios.length+' años, '+Object.values(datos).reduce((a,b)=>a+b,0)+' hechos)');
await cambiarRuta(p,'linea-de-tiempo');
const est=await p.evaluate(()=>({tabs:document.querySelectorAll('[role=tab]').length,lista:document.querySelectorAll('[role=tablist]').length,panel:!!document.querySelector('[role=tabpanel]'),elegido:document.querySelector('[aria-selected=true]')?.textContent.trim(),h2:document.querySelector('#panel-anio h2')?.textContent,tabindex0:document.querySelectorAll('[role=tab][tabindex="0"]').length,etiqueta:document.querySelector('[role=tab]').getAttribute('aria-label')}));
ok('una pestaña por año, un solo año elegido y su panel',est.tabs===anios.length&&est.lista===1&&est.panel&&est.tabindex0===1,`${est.tabs} años · elegido ${est.elegido} · «${est.etiqueta}»`);
// elegir un año con clic y comprobar que aparece TODO lo de ese año
const probar=async(anio)=>{await p.click('#anio-'+anio);await esperar(120);return p.evaluate(a=>({h2:document.querySelector('#panel-anio h2').textContent,hechos:document.querySelectorAll('#panel-anio .hecho-anio').length,url:location.hash,sel:document.querySelector('.anio-tab[aria-selected=true]').dataset.anio,etiq:document.getElementById('panel-anio').getAttribute('aria-labelledby')}),anio)};
for(const a of [1882,1884,1898,1997]){if(!datos[a])continue;const r=await probar(a);ok(`al elegir ${a} aparecen sus ${datos[a]} hecho(s)`,r.hechos===datos[a]&&r.h2===String(a)&&r.sel===String(a)&&r.etiq==='anio-'+a,`panel ${r.hechos} · dirección ${r.url}`)}
// el año elegido queda centrado en la línea
const c=await p.evaluate(()=>{const pi=document.getElementById('pista').getBoundingClientRect(),t=document.querySelector('.anio-tab[aria-selected=true]').getBoundingClientRect();return Math.abs((t.left+t.width/2)-(pi.left+pi.width/2))});
ok('el año elegido queda en el centro de la línea',c<30,Math.round(c)+' px de diferencia');
// teclado
await p.focus('.anio-tab[aria-selected=true]');await p.keyboard.press('ArrowRight');await esperar(100);
const k1=await p.evaluate(()=>({sel:document.querySelector('.anio-tab[aria-selected=true]').dataset.anio,foco:document.activeElement.dataset.anio}));
const i0=anios.indexOf(1997);ok('flecha derecha elige y enfoca el año siguiente',k1.sel===String(anios[i0+1])&&k1.foco===k1.sel,`1997 → ${k1.sel}`);
await p.keyboard.press('Home');await esperar(100);ok('Inicio va al primer año',(await p.evaluate(()=>document.querySelector('.anio-tab[aria-selected=true]').dataset.anio))===String(anios[0]));
await p.keyboard.press('End');await esperar(100);ok('Fin va al último año',(await p.evaluate(()=>document.querySelector('.anio-tab[aria-selected=true]').dataset.anio))===String(anios.at(-1)));
await p.keyboard.press('ArrowRight');await esperar(80);ok('en el último año la flecha no se sale de la línea',(await p.evaluate(()=>document.querySelector('.anio-tab[aria-selected=true]').dataset.anio))===String(anios.at(-1)));
// botones
await p.click('#anio-anterior');await esperar(100);ok('«Año anterior» retrocede',(await p.evaluate(()=>document.querySelector('.anio-tab[aria-selected=true]').dataset.anio))===String(anios.at(-2)));
await p.click('#anio-siguiente');await esperar(100);ok('«Año siguiente» avanza',(await p.evaluate(()=>document.querySelector('.anio-tab[aria-selected=true]').dataset.anio))===String(anios.at(-1)));
// arrastrar
await p.click('#anio-'+anios[0]);await esperar(100);
const antes=await p.evaluate(()=>document.getElementById('pista').scrollLeft);
const caja=await p.evaluate(()=>{const r=document.getElementById('pista').getBoundingClientRect();return{x:r.left+r.width*0.6,y:r.top+r.height/2}});
await p.mouse.move(caja.x,caja.y);await p.mouse.down();await p.mouse.move(caja.x-250,caja.y,{steps:8});await p.mouse.up();await esperar(120);
const d=await p.evaluate(()=>({izq:document.getElementById('pista').scrollLeft,sel:document.querySelector('.anio-tab[aria-selected=true]').dataset.anio}));
ok('arrastrar la línea con el mouse la desplaza',d.izq>antes+150,`de ${Math.round(antes)} a ${Math.round(d.izq)} px`);
ok('arrastrar no elige un año por accidente',d.sel===String(anios[0]));
await p.mouse.move(caja.x-250,caja.y);await p.mouse.down();await p.mouse.move(caja.x,caja.y,{steps:8});await p.mouse.up();await esperar(100);
ok('arrastrando hacia la derecha la línea vuelve hacia atrás',(await p.evaluate(()=>document.getElementById('pista').scrollLeft))<d.izq-150);
// vínculo directo
await p.goto('http://localhost:8123/#/linea-de-tiempo/1884');await p.reload({waitUntil:'load'});await p.waitForSelector('.anio-tab');await esperar(200);
ok('un enlace con el año abre ese año',(await p.evaluate(()=>document.querySelector('.anio-tab[aria-selected=true]').dataset.anio))==='1884');
// lista completa
const lista=await p.evaluate(()=>({n:document.querySelectorAll('details .tl li').length,abierta:document.querySelector('details.lista-completa').open}));
ok('la lista completa sigue disponible, cerrada',lista.n>=44&&!lista.abierta,lista.n+' hechos');
// objetivos y axe y estructura
const o=await p.evaluate(()=>[...document.querySelectorAll('.anio-tab,#anio-anterior,#anio-siguiente,summary')].filter(e=>{const b=e.getBoundingClientRect();return b.width&&Math.min(b.width,b.height)<44}).map(e=>e.textContent.trim().slice(0,12)));
ok('todas las pestañas y botones miden al menos 44 px',o.length===0,o.slice(0,4).join(','));
const v=await axe(p);ok('axe en escritorio: 0 violaciones',v.length===0,v.map(x=>x.id+': '+x.nodos[0].sel).join(' | '));
const t=await p.evaluate(()=>[...document.querySelectorAll('main h1,main h2,main h3')].map(h=>+h.tagName[1]));const saltos=t.some((n,i)=>i&&n>t[i-1]+1);ok('títulos sin saltos de nivel',!saltos,t.join(''));
await p.screenshot({path:'/tmp/shots/linea-d.png'});
await nav.close();
// ---------- celular
const m=await abrir(320,568,{movil:true});const q=await m.newPage();await ir(q,'linea-de-tiempo');
const r=await q.evaluate(()=>({desborda:document.documentElement.scrollWidth>document.documentElement.clientWidth+1,pista:document.getElementById('pista').scrollWidth>document.getElementById('pista').clientWidth}));
ok('320 px: la página no se desplaza de costado (solo la línea)',!r.desborda&&r.pista);
await q.setViewport({width:375,height:812,isMobile:true,hasTouch:true});await q.reload({waitUntil:'load'});await q.waitForSelector('.anio-tab');await esperar(200);
await q.tap('#anio-1891');await esperar(150);ok('al tocar un año se muestra su información',(await q.evaluate(()=>document.querySelector('#panel-anio h2').textContent))==='1891');
const v2=await axe(q);ok('axe en celular: 0 violaciones',v2.length===0,v2.map(x=>x.id+': '+x.nodos[0].sel).join(' | '));
await q.screenshot({path:'/tmp/shots/linea-m.png'});await m.close();
console.log(fallos?`\n${fallos} fallos`:'\nTodo en orden');
