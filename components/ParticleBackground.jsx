const { useEffect, useRef } = React;

function ParticleBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !window.THREE) return;
    const THREE = window.THREE;
    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07070A, 0.015);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, 45);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Glowing circle texture
    function makeTexture() {
      const c = document.createElement('canvas');
      c.width = 32; c.height = 32;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(16,16,0,16,16,16);
      g.addColorStop(0,'rgba(255,255,255,1)');
      g.addColorStop(0.2,'rgba(255,255,255,0.8)');
      g.addColorStop(0.5,'rgba(255,255,255,0.15)');
      g.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0,0,32,32);
      return new THREE.CanvasTexture(c);
    }

    // Particles
    const COUNT = 3500;
    const positions = new Float32Array(COUNT * 3);
    const initPos = new Float32Array(COUNT * 3);
    const waveSpeeds = new Float32Array(COUNT);
    const radialDist = new Float32Array(COUNT);
    const W = 110, D = 110;

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * W;
      const z = (Math.random() - 0.5) * D;
      const y = (Math.random() - 0.5) * 6;
      positions[i*3]=x; positions[i*3+1]=y; positions[i*3+2]=z;
      initPos[i*3]=x; initPos[i*3+1]=y; initPos[i*3+2]=z;
      waveSpeeds[i] = 0.5 + Math.random() * 1.5;
      radialDist[i] = Math.sqrt(x*x + z*z);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.9,
      map: makeTexture(),
      color: new THREE.Color('#FF2E88'),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Mouse
    const mouse = new THREE.Vector2(-9999, -9999);
    const targetMouse = new THREE.Vector2(-9999, -9999);
    const onMouseMove = (e) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    let lastScrollY = window.scrollY;
    const onScroll = () => { lastScrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation
    const clock = new THREE.Clock();
    let rafId;

    const animate = () => {
      const elapsed = clock.getElapsedTime() * 0.8;
      clock.getDelta();

      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      const mouse3D = new THREE.Vector3(mouse.x * 35, -5, -mouse.y * 35);
      const scrollH = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollP = lastScrollY / scrollH;

      camera.position.y = 12 + scrollP * 15;
      camera.position.z = 40 - scrollP * 12;
      camera.lookAt(0, -3, 0);
      points.rotation.y = elapsed * 0.03 + lastScrollY * 0.0003;

      const posAttr = geo.getAttribute('position');
      const posArr = posAttr.array;

      for (let i = 0; i < COUNT; i++) {
        const xi = i*3, yi = i*3+1, zi = i*3+2;
        const x = initPos[xi], z = initPos[zi];

        // WAVES mode
        const targetY =
          Math.sin(x * 0.1 + elapsed * waveSpeeds[i]) * 4 +
          Math.cos(z * 0.08 + elapsed * 0.8) * 3;

        // Mouse REPEL
        const dx = posArr[xi] - mouse3D.x;
        const dz = posArr[zi] - mouse3D.z;
        const dist = Math.sqrt(dx*dx + dz*dz);
        const maxD = 20;

        if (dist < maxD) {
          const force = (1 - dist / maxD) * 1.4;
          posArr[xi] += (dx / dist) * force * 1.5;
          posArr[zi] += (dz / dist) * force * 1.5;
        } else {
          posArr[xi] += (x - posArr[xi]) * 0.03;
          posArr[zi] += (z - posArr[zi]) * 0.03;
        }

        posArr[yi] += (targetY - posArr[yi]) * 0.08;
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      geo.dispose(); mat.dispose(); renderer.dispose(); scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none"
    />
  );
}

Object.assign(window, { ParticleBackground });
