import {abrir,ir,cambiarRuta,esperar} from './comun.mjs';
let fallos=0;const ok=(n,c,x='')=>{console.log((c?'✓ ':'✗ ')+n+(x?'  '+x:''));if(!c)fallos++};
console.log('== Línea de tiempo pegada abajo: ¿tapa el foco? (2.4.11)');
for(const [nombre,aj,ancho,alto] of [['celular 375×812',{},375,812],['celular con barra inferior',{barrainferior:true},375,812],['escritorio 1280×800',{},1280,800],['celular horizontal 568×320',{},568,320]]){
 const nav=await abrir(ancho,alto,{movil:ancho<700});const p=await nav.newPage();await ir(p,'');
 await p.evaluate(a=>localStorage.setItem('ajustes-accesibilidad',JSON.stringify(a)),aj);await p.goto('http://localhost:8123/#/linea-de-tiempo/1891');await p.reload({waitUntil:'load'});await p.waitForSelector('.anio-tab');await esperar(300);
 const info=await p.evaluate(()=>{const dock=document.getElementById('linea-fija');return{sticky:getComputedStyle(dock).position,medida:getComputedStyle(document.documentElement).getPropertyValue('--alto-linea').trim(),links:document.querySelectorAll('#panel-anio a').length}});
 // llevar el foco a cada enlace del panel y comprobar que queda a la vista y no tapado
 const res=await p.evaluate(async()=>{const malos=[];const dock=document.getElementById('linea-fija');for(const a of document.querySelectorAll('#panel-anio a')){a.focus();await new Promise(r=>setTimeout(r,60));const b=a.getBoundingClientRect(),d=dock.getBoundingClientRect();const sticky=getComputedStyle(dock).position==='sticky';const tapado=sticky&&b.bottom>d.top+1&&b.top<d.bottom;const fuera=b.bottom<0||b.top>innerHeight;if(tapado||fuera)malos.push((a.textContent||'').trim().slice(0,22))}return malos});
 ok(`${nombre}: línea ${info.sticky==='sticky'?'fija':'estática'} (${info.medida}), ${info.links} enlaces del panel sin quedar tapados`,res.length===0,res.join(' | '));
 await nav.close()}
console.log(fallos?`\n${fallos} fallos`:'\nTodo en orden');
