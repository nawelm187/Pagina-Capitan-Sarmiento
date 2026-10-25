import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import {createRequire} from 'module';
const require=createRequire(import.meta.url);
export const BASE='http://localhost:8123/';
export const RUTAS=['','archivo','documentos','historia','glosario','linea-de-tiempo','colecciones','acerca','ayuda','foto/banco-de-la-nacion-argentina','foto/estacion-ferroviaria','documento/bautismo-flora-olinda','sin-pagina'];
export async function abrir(ancho=375,alto=812,extra={}){
  const exe=await chromium.executablePath();
  const nav=await puppeteer.launch({args:[...chromium.args,'--no-sandbox'],executablePath:exe,headless:'shell',defaultViewport:{width:ancho,height:alto,deviceScaleFactor:1,isMobile:!!extra.movil,hasTouch:!!extra.movil}});
  return nav;
}
export const axeSrc=fs.readFileSync(require.resolve('axe-core/axe.min.js'),'utf8');
export const esperar=(ms)=>new Promise(r=>setTimeout(r,ms));
export async function ir(p,ruta){await p.goto(BASE+'#/'+ruta,{waitUntil:'load'});await p.evaluate(()=>{location.reload()}).catch(()=>{});await p.waitForSelector('#main h1',{timeout:8000});await esperar(150)}
export async function cambiarRuta(p,ruta){await p.evaluate(r=>{location.hash='#/'+r},ruta);await esperar(200)}
export async function axe(p,opciones={}){
  await p.evaluate(axeSrc);
  return await p.evaluate(async(op)=>{const r=await axe.run(document.documentElement,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']},...op});return r.violations.map(v=>({id:v.id,impacto:v.impact,ayuda:v.help,nodos:v.nodes.slice(0,4).map(n=>({sel:n.target.join(' '),resumen:(n.failureSummary||'').split('\n').slice(1,3).join(' | ').slice(0,200)})),total:v.nodes.length}))},opciones);
}
