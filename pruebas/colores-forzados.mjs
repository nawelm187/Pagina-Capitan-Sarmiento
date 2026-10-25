import {abrir,ir,cambiarRuta,esperar} from './comun.mjs';
let fallos=0;const ok=(n,c,x='')=>{console.log((c?'✓ ':'✗ ')+n+(x?'  '+x:''));if(!c)fallos++};
const nav=await abrir(375,812,{movil:true});const p=await nav.newPage();
await p.emulateMediaFeatures([{name:'forced-colors',value:'active'}]);await ir(p,'');
console.log('== Colores forzados de Windows (forced-colors: active)');
const ya=await p.evaluate(()=>matchMedia('(forced-colors: active)').matches);ok('el navegador está en modo de colores forzados',ya);
for(const r of ['','archivo','historia','foto/banco-de-la-nacion-argentina']){await cambiarRuta(p,r);
 const d=await p.evaluate(()=>{const sinBorde=[];for(const b of document.querySelectorAll('.btn,#nav a,.barra-pagina button')){if(b.offsetParent===null)continue;const s=getComputedStyle(b);if(parseFloat(s.borderTopWidth)<1&&parseFloat(s.outlineWidth)<1)sinBorde.push((b.textContent||'').trim().slice(0,18))}return{sinBorde:[...new Set(sinBorde)].slice(0,4),h1:getComputedStyle(document.querySelector('h1')).color,fondo:getComputedStyle(document.body).backgroundColor,desborda:document.documentElement.scrollWidth>document.documentElement.clientWidth+1}});
 ok('/'+r+': botones con borde propio y sin desborde',d.sinBorde.length===0&&!d.desborda,d.sinBorde.join(', '))}
await cambiarRuta(p,'foto/banco-de-la-nacion-argentina');await p.click('.zoomable');await esperar(300);
const v=await p.evaluate(()=>{const d=document.getElementById('lb');const s=getComputedStyle(d);const dv=getComputedStyle(document.querySelector('.cmp .divisor'));return{borde:parseFloat(s.borderTopWidth),divisor:dv.backgroundColor,visible:document.querySelector('.cmp .divisor').getBoundingClientRect().height>50}});
ok('el visor y el divisor Antes/Ahora se distinguen',v.visible,'divisor '+v.divisor);
await p.screenshot({path:'/tmp/shots/forzados.png'});
console.log(fallos?`\n${fallos} fallos`:'\nTodo en orden');await nav.close();
