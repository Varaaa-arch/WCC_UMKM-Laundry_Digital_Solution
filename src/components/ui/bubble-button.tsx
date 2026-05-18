"use client";
import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import * as THREE from "three";

// ─── shared Three.js scene logic ────────────────────────────────────────────
function createScene(canvas: HTMLCanvasElement) {
  const W = 400, H = 300;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, W / H, 1, 3000);
  camera.position.z = 200;

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 1.2));
  const hemi = new THREE.HemisphereLight(0xffffff, 0x99ccff, 1.5);
  scene.add(hemi);

  const spotMain = new THREE.SpotLight(0xddeeff, 15.0, 0);
  spotMain.position.set(-50, 100, 100);
  scene.add(spotMain);

  const spotFill = new THREE.SpotLight(0xaaddff, 10.0, 0);
  spotFill.position.set(100, -100, 100);
  scene.add(spotFill);

  // Water bubble material
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x90caf9,
    emissive: 0x4fc3f7,
    emissiveIntensity: 0.15,
    roughness: 0.05,
    metalness: 0.05,
    transmission: 0.92,
    thickness: 1.5,
    transparent: true,
    opacity: 0,
    reflectivity: 0.8,
    ior: 1.4,
    attenuationColor: new THREE.Color(0xbbdefb),
    attenuationDistance: 2.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
  });

  const bubbles = [
    { geo: new THREE.SphereGeometry(22, 64, 64), pos: [-30, -35, 0] },
    { geo: new THREE.SphereGeometry(16, 64, 64), pos: [32, 38, 10] },
    { geo: new THREE.SphereGeometry(10, 64, 64), pos: [-52, 14, 5] },
  ].map(({ geo, pos }) => {
    const mesh = new THREE.Mesh(geo, mat.clone());
    mesh.position.set(...(pos as [number, number, number]));
    mesh.scale.set(0.8, 0.8, 0.8);
    (mesh.material as THREE.MeshPhysicalMaterial).opacity = 0;
    scene.add(mesh);
    return mesh;
  });

  const mouse = new THREE.Vector2(0, 0);
  let raf = 0;
  let then = Date.now();
  const fpsInterval = 1000 / 120;

  const targets = {
    in: [
      new THREE.Vector3(-35, -45, 0),
      new THREE.Vector3(40, 45, 10),
      new THREE.Vector3(-65, 15, 5),
    ],
    out: [
      new THREE.Vector3(-10, -10, 0),
      new THREE.Vector3(10, 20, 10),
      new THREE.Vector3(-30, 2, 5),
    ],
  };

  function animateIn() {
    bubbles.forEach((b, i) => {
      const m = b.material as THREE.MeshPhysicalMaterial;
      const fadeIn = () => {
        m.opacity = Math.min(m.opacity + 0.05, 0.95);
        if (m.opacity < 0.95) requestAnimationFrame(fadeIn);
      };
      fadeIn();
      
      const t = targets.in[i];
      const moveIn = () => {
        b.position.lerp(t, 0.06);
        b.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.06);
        if (b.position.distanceTo(t) > 0.1) requestAnimationFrame(moveIn);
      };
      moveIn();
    });
  }

  function animateOut() {
    bubbles.forEach((b, i) => {
      const m = b.material as THREE.MeshPhysicalMaterial;
      const fadeOut = () => {
        m.opacity = Math.max(m.opacity - 0.05, 0);
        if (m.opacity > 0) requestAnimationFrame(fadeOut);
      };
      fadeOut();

      const t = targets.out[i];
      const moveOut = () => {
        b.position.lerp(t, 0.06);
        b.scale.lerp(new THREE.Vector3(0.5, 0.5, 0.5), 0.06);
        if (b.position.distanceTo(t) > 0.1) requestAnimationFrame(moveOut);
      };
      moveOut();
    });
  }

  function loop() {
    raf = requestAnimationFrame(loop);
    const now = Date.now();
    if (now - then < fpsInterval) return;
    then = now;

    camera.position.x += mouse.x * (W * 0.02) - camera.position.x * 0.05;
    camera.position.y += -(mouse.y * (H * 0.02)) - camera.position.y * 0.05;
    camera.lookAt(scene.position);

    bubbles.forEach((b, i) => {
      const time = Date.now() * 0.001;
      b.rotation.y += 0.004 * (i + 1);
      b.rotation.x += 0.002 * (i + 1);
      b.position.y += Math.sin(time * 2 + i) * 0.1; 
    });

    renderer.render(scene, camera);
  }

  loop();

  return {
    setHover: (h: boolean) => {
      // Perbaikan di sini: Menggunakan if-else standar untuk menghindari warning expression
      if (h) {
        animateIn();
      } else {
        animateOut();
      }
    },
    setMouse: (x: number, y: number) => { 
      mouse.x = x; 
      mouse.y = y; 
    },
    dispose: () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
    },
  };
}

// ─── BubbleButton ────────────────────────────────────────────────────────────
interface BubbleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function BubbleButton({ children, className = "", ...props }: BubbleButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ReturnType<typeof createScene> | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    sceneRef.current = createScene(canvasRef.current);
    return () => sceneRef.current?.dispose();
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    sceneRef.current?.setMouse(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
  }, []);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      onMouseMove={onMouseMove}
      onMouseEnter={() => sceneRef.current?.setHover(true)}
      onMouseLeave={() => sceneRef.current?.setHover(false)}
    >
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none"
        style={{ width: 400, height: 300, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      />
      <button className={`relative z-10 ${className}`} {...props}>
        {children}
      </button>
    </div>
  );
}

// ─── BubbleLink ──────────────────────────────────────────────────────────────
interface BubbleLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
}

export function BubbleLink({ children, className = "", ...props }: BubbleLinkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ReturnType<typeof createScene> | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    sceneRef.current = createScene(canvasRef.current);
    return () => sceneRef.current?.dispose();
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    sceneRef.current?.setMouse(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
  }, []);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      onMouseMove={onMouseMove}
      onMouseEnter={() => sceneRef.current?.setHover(true)}
      onMouseLeave={() => sceneRef.current?.setHover(false)}
    >
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none"
        style={{ width: 400, height: 300, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      />
      <Link className={`relative z-10 ${className}`} {...props}>
        {children}
      </Link>
    </div>
  );
}