import {abrir,ir,cambiarRuta,axe,RUTAS,esperar} from './comun.mjs';
let total=0,revisiones=0;const mal=[];
const nav=await abrir(375,812,{movil:true});const p=await nav.newPage();
await p.evaluateOnNewDocument(()=>{window.__d=[];window.SpeechSynthesisUtterance=function(t){this.text=t};Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{speak(u){window.__d.push(u);if(window.__d.length===1)setTimeout(()=>u.onstart&&u.onstart(),20)},cancel(){},resume(){},getVoices(){return[{lang:'es-AR'}]}}})});
await ir(p,'');
const poner=async(aj)=>{await p.evaluate(a=>{localStorage.setItem('ajustes-accesibilidad',JSON.stringify(a))},aj);await p.reload({waitUntil:'load'});await p.waitForSelector('#main h1');await esperar(120)};
const auditar=async(nombre)=>{const v=await axe(p);revisiones++;if(v.length){total+=v.length;mal.push(nombre+' → '+v.map(x=>x.id+'('+x.total+'): '+x.nodos[0].sel).join(' | '))}};
const configs=[['predeterminado',{}],['fondo oscuro',{tema:'dark'}],['alto contraste',{contraste:true}],['Gigante',{texto:'5'}],['Máxima visibilidad',{texto:'3',contraste:true,fuente:true,espacio:true,enlaces:true,foco:true,botones:true}],['fondo amarillo + sin colores',{fondo:'amarillo',grises:true}],['lectura fácil + columna angosta + sin miniaturas',{facil:true,columna:true,sinminiaturas:true}]];
for(const [n,aj] of configs){await poner(aj);for(const r of RUTAS){await cambiarRuta(p,r);await auditar(n+' /'+r)}console.log('  '+(mal.length?'… ':'✓ ')+n+' ('+RUTAS.length+' páginas)')}
await poner({});
await cambiarRuta(p,'archivo');await p.click('#abrir-acc');await esperar(200);await auditar('panel de accesibilidad');await p.click('#acc-cerrar');
await cambiarRuta(p,'foto/banco-de-la-nacion-argentina');await p.click('.zoomable');await esperar(300);await auditar('visor con Antes/Ahora');await p.click('#lbc');
await p.click('#menu');await esperar(150);await auditar('menú móvil abierto');await p.click('#menu');
await cambiarRuta(p,'historia');await p.click('#escuchar');await esperar(500);await auditar('leyendo en voz alta (controles fijos)');await p.click('#lec-detener');
await cambiarRuta(p,'archivo');await p.type('#q','zzzz');await esperar(150);await auditar('archivo sin resultados');
await poner({barrainferior:true,regla:true});await cambiarRuta(p,'historia');await auditar('barra inferior + regla');
console.log(`\nAuditorías axe en navegador real (todas las reglas WCAG 2.0–2.2 A/AA y buenas prácticas, con contraste calculado): ${revisiones}`);
console.log('Violaciones:',total);for(const m of mal.slice(0,8))console.log(' ✗ '+m.slice(0,230));
await nav.close();
