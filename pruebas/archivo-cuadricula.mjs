import {abrir,ir,cambiarRuta,esperar} from './comun.mjs';
let fallos=0;const ok=(n,c,x='')=>{console.log((c?'✓ ':'✗ ')+n+(x?'  '+x:''));if(!c)fallos++};
console.log('== Archivo: cuadrícula pareja');
for(const [ancho,alto] of [[1280,900],[900,800],[375,812],[320,568]]){
 const nav=await abrir(ancho,alto,{movil:ancho<700});const p=await nav.newPage();await ir(p,'archivo');await esperar(400);
 const r=await p.evaluate(()=>{const t=[...document.querySelectorAll('.grid .ph')];const imgs=t.map(a=>a.querySelector('img').getBoundingClientRect());const alturas=[...new Set(imgs.map(i=>Math.round(i.height)))];
  const filas={};for(const a of t){const b=a.getBoundingClientRect();(filas[Math.round(b.top)]=filas[Math.round(b.top)]||[]).push(a)}
  const desalineadas=Object.values(filas).filter(f=>f.length>1&&new Set(f.map(a=>Math.round(a.querySelector('.cap').getBoundingClientRect().top-a.getBoundingClientRect().top))).size>1&&new Set(f.map(a=>Math.round(a.querySelector('img').getBoundingClientRect().height))).size>1).length;
  const columnas=new Set(t.map(a=>Math.round(a.getBoundingClientRect().left))).size;
  return{n:t.length,alturas,columnas,filas:Object.keys(filas).length,ratio:[...new Set(imgs.map(i=>(i.width/i.height).toFixed(2)))],desborda:document.documentElement.scrollWidth>document.documentElement.clientWidth+1}});
 ok(`${ancho} px: ${r.n} fotos en ${r.columnas} columna(s), todas del mismo alto y proporción`,r.n===9&&r.alturas.length===1&&r.ratio.length===1&&!r.desborda,`alto ${r.alturas.join('/')} px, proporción ${r.ratio.join('/')}`);
 if(ancho===1280)await p.screenshot({path:'/tmp/shots/archivo-despues.png'});
 await nav.close()}
console.log(fallos?`\n${fallos} fallos`:'\nTodo en orden');
