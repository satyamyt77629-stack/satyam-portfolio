// js/world.js
// Procedural sci-fi world (planet + stars). No photos.

export function createWorld(canvas) {
  const THREE = window.THREE;
  if (!THREE) throw new Error("Three.js not loaded");

  const prefersReducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.set(0, 0.2, 7);

  scene.add(new THREE.AmbientLight(0x88ffff, 0.28));

  const key = new THREE.DirectionalLight(0x88ffff, 0.85);
  key.position.set(6, 4, 8);
  scene.add(key);

  function makePlanetTexture(size = 1024) {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");

    const g = ctx.createLinearGradient(0, 0, size, size);
    g.addColorStop(0, "#06253b");
    g.addColorStop(0.45, "#0b3b55");
    g.addColorStop(1, "#08111c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);

    for (let i = 0; i < 9000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = Math.random() * 2.2 + 0.4;
      const a = Math.random() * 0.06;

      ctx.fillStyle = `rgba(80, 190, 170, ${a})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = "rgba(140,255,255,0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 22; i++) {
      const y = (i / 22) * size + (Math.random() * 10 - 5);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(size * 0.25, y - 10, size * 0.75, y + 10, size, y);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  const planetTex = makePlanetTexture(1024);

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(2.15, 64, 64),
    new THREE.MeshStandardMaterial({
      map: planetTex,
      roughness: 0.75,
      metalness: 0.08,
      emissive: new THREE.Color(0x05202a),
      emissiveIntensity: 0.35
    })
  );
  scene.add(planet);

  const wire = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.SphereGeometry(2.18, 28, 28)),
    new THREE.LineBasicMaterial({ color: 0x66ffff, transparent: true, opacity: 0.16 })
  );
  scene.add(wire);

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(2.33, 64, 64),
    new THREE.MeshBasicMaterial({
      color: 0x66ffff,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide
    })
  );
  scene.add(atmosphere);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.85, 0.02, 10, 140),
    new THREE.MeshBasicMaterial({ color: 0x66ffff, transparent: true, opacity: 0.14 })
  );
  ring.rotation.x = Math.PI / 2.25;
  ring.rotation.y = Math.PI / 7;
  scene.add(ring);

  const starCount = window.innerWidth < 900 ? 900 : 1600;
  const starsGeo = new THREE.BufferGeometry();
  const pos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    pos[i3 + 0] = (Math.random() - 0.5) * 120;
    pos[i3 + 1] = (Math.random() - 0.5) * 120;
    pos[i3 + 2] = (Math.random() - 0.5) * 120;
  }
  starsGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const stars = new THREE.Points(
    starsGeo,
    new THREE.PointsMaterial({ color: 0x66ffff, size: 0.06, transparent: true, opacity: 0.40 })
  );
  scene.add(stars);

  let targetX = 0, targetY = 0;
  function onMove(e) {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    targetX = x * 0.28;
    targetY = y * 0.16;
  }
  window.addEventListener("mousemove", onMove, { passive: true });

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);

  let rafId = 0;
  function animate() {
    rafId = requestAnimationFrame(animate);

    planet.rotation.y += prefersReducedMotion ? 0.0006 : 0.0016;
    wire.rotation.y += prefersReducedMotion ? 0.0007 : 0.0019;
    ring.rotation.z += prefersReducedMotion ? 0.0004 : 0.0011;
    stars.rotation.y += prefersReducedMotion ? 0.00005 : 0.00018;

    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (-targetY + 0.2 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  animate();

  return {
    destroy() {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      starsGeo.dispose();
    }
  };
}
