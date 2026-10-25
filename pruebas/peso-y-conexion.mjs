import {abrir,ir,cambiarRuta,esperar,BASE} from './comun.mjs';
const nav=await abrir(375,812,{movil:true});const p=await nav.newPage();
await p.setCacheEnabled(false);const cdp=await p.createCDPSession();await cdp.send('Network.enable');
let bytes=0,imagenes=0;const tipos={};cdp.on('Network.loadingFinished',e=>{bytes+=e.encodedDataLength});
cdp.on('Network.responseReceived',e=>{tipos[e.requestId]=e.type});
const reqs={};cdp.on('Network.loadingFinished',e=>{reqs[e.requestId]=e.encodedDataLength});
const medir=async(ruta)=>{bytes=0;for(const k in reqs)delete reqs[k];for(const k in tipos)delete tipos[k];await p.goto('about:blank');for(const k in reqs)delete reqs[k];await p.goto(BASE+'#/'+ruta,{waitUntil:'networkidle0'});await esperar(500);const img=Object.entries(reqs).filter(([id])=>tipos[id]==='Image').reduce((s,[,b])=>s+b,0);return{total:Math.round(bytes/1024),imagenes:Math.round(img/1024)}};
console.log('== Peso de la página en el celular (carga completa, sin caché)');
for(const r of ['','archivo','documentos','colecciones','foto/estacion-ferroviaria']){const m=await medir(r);console.log(('/'+r).padEnd(30),'total',String(m.total).padStart(5),'KB | imágenes',String(m.imagenes).padStart(5),'KB')}
// conexión lenta: 3G lenta
await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:400,downloadThroughput:50*1024,uploadThroughput:50*1024});
const t0=Date.now();await p.goto(BASE+'#/archivo',{waitUntil:'domcontentloaded'});await p.reload({waitUntil:'domcontentloaded'});await p.waitForSelector('#main h1');const tTexto=Date.now()-t0;
console.log('\nConexión lenta (≈400 kbit/s, 400 ms): el título y los textos de /archivo aparecen en',(tTexto/1000).toFixed(1),'s');
await nav.close();
