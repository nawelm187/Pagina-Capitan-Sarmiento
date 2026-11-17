/* Locomotora 3D para la línea de tiempo — Three.js.
   Se carga de forma independiente para no bloquear la navegación principal. */
const iniciarLocomotora3D = async (host) => {
  if (!host || host.dataset.threeReady === 'true') return;
  host.dataset.threeReady = 'true';

  try {
    const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1.95, 1.95, 1.02, -1.02, 0.1, 40);
    camera.position.set(0, 1.05, 9);
    camera.lookAt(0, 0.18, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setSize(184, 96, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.setAttribute('focusable', 'false');
    host.replaceChildren(renderer.domElement);
    host.classList.add('tren-3d-listo');

    const mat = (color, metalness = 0.25, roughness = 0.58) => new THREE.MeshStandardMaterial({ color, metalness, roughness });
    const iron = mat('#202321', 0.72, 0.38);
    const ironLight = mat('#45433c', 0.75, 0.36);
    const brass = mat('#b18a4c', 0.78, 0.3);
    const brassLight = mat('#dfbd7b', 0.72, 0.28);
    const burgundy = mat('#632f2d', 0.42, 0.42);
    const glass = new THREE.MeshStandardMaterial({ color: '#172629', metalness: 0.25, roughness: 0.22 });
    const rubber = mat('#171817', 0.12, 0.78);

    scene.add(new THREE.HemisphereLight(0xffe8c5, 0x29221a, 2.15));
    const key = new THREE.DirectionalLight(0xffe2b5, 2.4);
    key.position.set(-2.5, 5, 7);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xc18b4d, 1.2);
    rim.position.set(3, 2, -3);
    scene.add(rim);

    const train = new THREE.Group();
    scene.add(train);
    const cylinder = (r, h, material, x, y, z, rotationZ = 0, segments = 32) => {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, segments), material);
      mesh.position.set(x, y, z);
      mesh.rotation.z = rotationZ;
      train.add(mesh);
      return mesh;
    };
    const box = (w, h, d, material, x, y, z) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
      mesh.position.set(x, y, z);
      train.add(mesh);
      return mesh;
    };
    const beam = (a, b, thickness, material, z = 0.32) => {
      const dx = b.x - a.x, dy = b.y - a.y;
      const length = Math.hypot(dx, dy);
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(length, thickness, 0.045), material);
      mesh.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, z);
      mesh.rotation.z = Math.atan2(dy, dx);
      train.add(mesh);
      return mesh;
    };

    // Bastidor y caldera principal.
    box(2.45, 0.19, 0.58, iron, 0.02, -0.12, 0);
    box(2.25, 0.11, 0.62, brass, 0.02, -0.225, 0);
    const boiler = cylinder(0.39, 1.52, iron, 0.28, 0.34, 0.02, Math.PI / 2, 48);
    boiler.scale.set(1, 1, 1);
    cylinder(0.405, 0.08, brass, -0.49, 0.34, 0.02, Math.PI / 2, 40);
    cylinder(0.405, 0.08, brass, 1.05, 0.34, 0.02, Math.PI / 2, 40);
    cylinder(0.19, 0.045, ironLight, 1.105, 0.34, 0.02, Math.PI / 2, 32);

    // Chimenea clásica, base acampanada y boca de latón.
    cylinder(0.105, 0.34, iron, 0.79, 0.77, 0.02, 0, 24);
    cylinder(0.17, 0.09, ironLight, 0.79, 0.96, 0.02, 0, 24);
    cylinder(0.135, 0.035, brass, 0.79, 1.015, 0.02, 0, 24);
    // Domo de vapor y válvula.
    cylinder(0.14, 0.22, brass, 0.18, 0.76, 0.02, 0, 28);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.14, 24, 12), brassLight);
    dome.scale.y = 0.58; dome.position.set(0.18, 0.87, 0.02); train.add(dome);
    cylinder(0.075, 0.13, brass, -0.28, 0.75, 0.02, 0, 24);

    // Cabina trasera con ventanas oscuras y techo redondeado.
    box(0.72, 0.72, 0.58, burgundy, -0.94, 0.32, 0);
    box(0.78, 0.10, 0.68, iron, -0.94, 0.72, 0);
    box(0.62, 0.055, 0.64, brass, -0.94, 0.79, 0);
    box(0.18, 0.36, 0.025, glass, -1.13, 0.42, 0.305);
    box(0.18, 0.36, 0.025, glass, -0.78, 0.42, 0.305);
    box(0.035, 0.39, 0.035, brass, -0.94, 0.42, 0.34);
    box(0.025, 0.62, 0.025, brass, -1.31, 0.33, 0.31);
    box(0.025, 0.62, 0.025, brass, -0.57, 0.33, 0.31);

    // Frente, farol y paragolpes.
    box(0.22, 0.22, 0.25, ironLight, 1.25, -0.02, 0.02);
    cylinder(0.105, 0.14, brass, 1.29, 0.30, 0.20, Math.PI / 2, 24);
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.072, 18, 12), new THREE.MeshStandardMaterial({ color: '#ffe0a0', emissive: '#d18b36', emissiveIntensity: 1.25 }));
    lamp.position.set(1.29, 0.30, 0.285); train.add(lamp);
    box(0.18, 0.09, 0.66, iron, 1.38, -0.18, 0);
    box(0.10, 0.16, 0.66, brass, 1.46, -0.18, 0);

    // Detalles de caldera, tuberías y bandas longitudinales.
    for (const x of [-0.38, 0.05, 0.48, 0.91]) {
      const band = cylinder(0.397, 0.025, brass, x, 0.34, 0.02, Math.PI / 2, 40);
      band.scale.x = 1.01;
    }
    beam({x:-0.45,y:0.13},{x:0.92,y:0.13},0.035,brass,0.33);
    beam({x:-0.36,y:0.02},{x:0.98,y:0.02},0.025,ironLight,0.34);

    // Ruedas con radios, cubos y llantas metálicas.
    const wheels = [];
    const wheelX = [-0.88, -0.18, 0.56];
    const wheelY = -0.22;
    for (const x of wheelX) {
      const wheel = new THREE.Group();
      wheel.position.set(x, wheelY, 0.39);
      train.add(wheel);
      const tire = new THREE.Mesh(new THREE.TorusGeometry(0.285, 0.045, 10, 40), iron);
      wheel.add(tire);
      const inner = new THREE.Mesh(new THREE.TorusGeometry(0.235, 0.018, 8, 32), brass);
      wheel.add(inner);
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.10, 24), brassLight);
      hub.rotation.x = Math.PI / 2; hub.position.z = 0.012; wheel.add(hub);
      for (let i = 0; i < 10; i++) {
        const angle = i * Math.PI * 2 / 10;
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.46, 0.035), brass);
        spoke.position.set(Math.sin(angle) * 0.115, Math.cos(angle) * 0.115, 0.01);
        spoke.rotation.z = -angle;
        wheel.add(spoke);
      }
      wheels.push(wheel);
    }

    // Bielas laterales: una barra principal y una secundaria, animadas con las ruedas.
    const rodPivots = [];
    for (const side of [0.405, -0.405]) {
      const group = new THREE.Group();
      group.position.z = side;
      train.add(group);
      const rod = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.045, 0.035), brassLight);
      rod.position.set(-0.16, wheelY + 0.11, 0);
      group.add(rod);
      const pinA = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.055, 16), brass);
      pinA.rotation.x = Math.PI / 2; pinA.position.set(-0.85, wheelY + 0.11, 0); group.add(pinA);
      const pinB = pinA.clone(); pinB.position.x = 0.53; group.add(pinB);
      rodPivots.push({ group, rod, side });
    }

    // Humo en partículas: se emite al desplazarse y se desvanece con el tiempo.
    const smokeMaterial = new THREE.MeshStandardMaterial({ color: '#c8c2b5', transparent: true, opacity: 0.34, roughness: 1, depthWrite: false });
    const smoke = [];
    let lastPuff = 0;
    const puff = () => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.105 + Math.random() * 0.045, 10, 8), smokeMaterial.clone());
      mesh.position.set(0.79 + (Math.random() - 0.5) * 0.07, 1.10, (Math.random() - 0.5) * 0.12);
      train.add(mesh);
      smoke.push({ mesh, age: 0, life: 1.35 + Math.random() * 0.5, drift: 0.22 + Math.random() * 0.18 });
    };

    let movingUntil = 0;
    let lastTime = performance.now();
    let wheelAngle = 0;
    window.moverLocomotora3D = () => {
      if (!reduceMotion) movingUntil = performance.now() + 760;
    };

    const animate = (now) => {
      if (!host.isConnected) return;
      requestAnimationFrame(animate);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const moving = now < movingUntil && !reduceMotion;
      if (moving) {
        wheelAngle -= dt * 8.5;
        if (now - lastPuff > 155) { puff(); lastPuff = now; }
      }
      wheels.forEach((wheel) => { wheel.rotation.z = wheelAngle; });
      // La biela acompaña el giro de la rueda motriz.
      rodPivots.forEach(({group}) => {
        const lift = Math.sin(wheelAngle) * 0.075;
        group.position.y = wheelY + 0.11 + lift;
        group.rotation.z = Math.atan2(lift * 0.16, 1.38);
      });
      for (let i = smoke.length - 1; i >= 0; i--) {
        const p = smoke[i]; p.age += dt;
        const t = p.age / p.life;
        p.mesh.position.y += dt * p.drift;
        p.mesh.position.x += dt * 0.12;
        p.mesh.scale.setScalar(1 + t * 2.4);
        p.mesh.material.opacity = Math.max(0, 0.34 * (1 - t));
        if (t >= 1) { train.remove(p.mesh); p.mesh.geometry.dispose(); p.mesh.material.dispose(); smoke.splice(i, 1); }
      }
      renderer.render(scene, camera);
    };
    requestAnimationFrame(animate);

    // Ajusta el lienzo a la escala CSS sin alterar la geometría ni la posición del tren.
    const resize = new ResizeObserver(() => {
      const width = host.clientWidth || 184;
      const height = host.clientHeight || 96;
      renderer.setSize(width, height, false);
      const aspect = width / height;
      const halfH = 1.02;
      camera.left = -halfH * aspect; camera.right = halfH * aspect;
      camera.top = halfH; camera.bottom = -halfH;
      camera.updateProjectionMatrix();
    });
    resize.observe(host);
  } catch (error) {
    // Si WebGL o la CDN no están disponibles, la cronología y sus estaciones siguen funcionando.
    host.classList.add('tren-3d-fallback');
    host.setAttribute('aria-label', 'Locomotora de vapor. La animación 3D no está disponible en este navegador.');
  }
};

// La cronología se dibuja dinámicamente al entrar en la sección; observamos sus cambios.
const observarCronologia = new MutationObserver(() => {
  const host = document.getElementById('tren-en-via');
  if (host && host.dataset.threeReady !== 'true') iniciarLocomotora3D(host);
});
observarCronologia.observe(document.documentElement, { childList: true, subtree: true });
const hostInicial = document.getElementById('tren-en-via');
if (hostInicial) iniciarLocomotora3D(hostInicial);
