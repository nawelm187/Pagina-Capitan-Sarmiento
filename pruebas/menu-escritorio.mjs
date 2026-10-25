import {abrir,ir,cambiarRuta,esperar} from './comun.mjs';
let fallos=0;const ok=(n,c,extra='')=>{console.log((c?'✓ ':'✗ ')+n+(extra?'  '+extra:''));if(!c)fallos++};
const d=await abrir(1280,800);const p=await d.newPage();await ir(p,'');
// El menú de escritorio no parte palabras
for(const ancho of [1080,1280,1600]){await p.setViewport({width:ancho,height:800});await p.reload({waitUntil:'load'});await p.waitForSelector('#main h1');await esperar(100);
 const r=await p.evaluate(()=>{const links=[...document.querySelectorAll('#nav a')];const lh=parseFloat(getComputedStyle(links[0]).lineHeight)||24;return{partidos:links.filter(a=>a.getBoundingClientRect().height>lh*1.7+4).map(a=>a.textContent.trim()),cabecera:Math.round(document.querySelector('header.site').getBoundingClientRect().height),visibleMenu:getComputedStyle(document.getElementById('menu')).display}});
 const sup=await p.evaluate(()=>{const b=[...document.querySelectorAll('.brand,.acciones,#nav')].map(e=>e.getBoundingClientRect());const solapa=[];for(let i=0;i<b.length;i++)for(let j=i+1;j<b.length;j++){const a=b[i],c=b[j];if(a.left<c.right-1&&c.left<a.right-1&&a.top<c.bottom-1&&c.top<a.bottom-1)solapa.push(i+'-'+j)}return solapa});ok(`marca, acciones y menú sin solaparse a ${ancho} px`,sup.length===0,sup.join(','));ok(`menú en una línea por opción a ${ancho} px`,r.partidos.length===0,`(cabecera ${r.cabecera}px)`+(r.partidos.length?' partidos: '+r.partidos.join(','):''));ok(`botón «Menú» oculto a ${ancho} px`,r.visibleMenu==='none')}
await d.close();
// móvil: botón Menú visible y la cabecera no desborda
const m=await abrir(375,812,{movil:true});const q=await m.newPage();await ir(q,'');
const r=await q.evaluate(()=>({menu:getComputedStyle(document.getElementById('menu')).display,desborda:document.documentElement.scrollWidth>document.documentElement.clientWidth+1}));
ok('móvil 375: «Menú» visible y sin desborde',r.menu!=='none'&&!r.desborda);
await m.close();console.log(fallos?`\n${fallos} fallos`:'\nTodo en orden');
