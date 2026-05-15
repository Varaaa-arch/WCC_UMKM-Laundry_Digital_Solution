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
  scene.add(new THREE.AmbientLight(0xffffff, 0.2));
  const hemi = new THREE.HemisphereLight(0xd8f0ff, 0x61dafb, 1.2);
  scene.add(hemi);
  const spot = new THREE.SpotLight(0x61dafb, 1.5, 0);
  spot.position.set(150, 150, 100);
  scene.add(spot);
  const spot2 = new THREE.SpotLight(0xffffff, 0.8, 0);
  spot2.position.set(-100, -80, 120);
  scene.add(spot2);

  // Water bubble material — glass-like
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xaaddff,
    roughness: 0.05,
    metalness: 0.0,
    transmission: 0.95,   // glass transmission
    thickness: 0.5,
    transparent: true,
    opacity: 0.55,
    reflectivity: 0.9,
    ior: 1.33,            // water IOR
    envMapIntensity: 1.2,
  });

  // 3 bubbles: big, medium, small — mirroring the codepen layout
  const bubbles = [
    { geo: new THREE.SphereGeometry(22, 32, 32), pos: [-30, -35, 0] },
    { geo: new THREE.SphereGeometry(16, 32, 32), pos: [32, 38, 10] },
    { geo: new THREE.SphereGeometry(10, 32, 32), pos: [-52, 14, 5] },
  ].map(({ geo, pos }) => {
    const mesh = new THREE.Mesh(geo, mat.clone());
    mesh.position.set(...(pos as [number, number, number]));
    mesh.scale.set(0.8, 0.8, 0.8);
    (mesh.material as THREE.MeshPhysicalMaterial).opacity = 0;
    scene.add(mesh);
    return mesh;
  });

  const mouse = new THREE.Vector2(0, 0);
  let hovering = false;
  let raf = 0;
  let then = Date.now();
  const fpsInterval = 1000 / 120;

  // Target positions (animated in/out)
  const targets = {
    in: [
      new THREE.Vector3(-30, -40, 0),
      new THREE.Vector3(38, 42, 10),
      new THREE.Vector3(-60, 14, 5),
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
      // fade in
      const fadeIn = () => {
        m.opacity = Math.min(m.opacity + 0.04, 0.6);
        if (m.opacity < 0.6) requestAnimationFrame(fadeIn);
      };
      fadeIn();
      // move to target
      const t = targets.in[i];
      const moveIn = () => {
        b.position.lerp(t, 0.08);
        b.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.08);
        if (b.position.distanceTo(t) > 0.5) requestAnimationFrame(moveIn);
      };
      moveIn();
    });
  }

  function animateOut() {
    bubbles.forEach((b, i) => {
      const m = b.material as THREE.MeshPhysicalMaterial;
      const fadeOut = () => {
        m.opacity = Math.max(m.opacity - 0.03, 0);
        if (m.opacity > 0) requestAnimationFrame(fadeOut);
      };
      fadeOut();
      const t = targets.out[i];
      const moveOut = () => {
        b.position.lerp(t, 0.08);
        b.scale.lerp(new THREE.Vector3(0.8, 0.8, 0.8), 0.08);
        if (b.position.distanceTo(t) > 0.5) requestAnimationFrame(moveOut);
      };
      moveOut();
    });
  }

  function loop() {
    raf = requestAnimationFrame(loop);
    const now = Date.now();
    if (now - then < fpsInterval) return;
    then = now;

    // Camera follows mouse
    camera.position.x += mouse.x * (W * 0.02) - camera.position.x * 0.03;
    camera.position.y += -(mouse.y * (H * 0.02)) - camera.position.y * 0.03;
    camera.lookAt(scene.position);

    // Gentle rotation on bubbles
    bubbles.forEach((b, i) => {
      b.rotation.y += 0.004 * (i + 1);
      b.rotation.x += 0.002 * (i + 1);
    });

    renderer.render(scene, camera);
  }

  loop();

  return {
    setHover: (h: boolean) => {
      hovering = h;
      h ? animateIn() : animateOut();
    },
    setMouse: (x: number, y: number) => { mouse.x = x; mouse.y = y; },
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
