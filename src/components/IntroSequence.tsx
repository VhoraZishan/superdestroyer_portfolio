import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Stars } from '@react-three/drei';
import * as THREE from 'three';

// ─── Destroyer model — slow rotation, gentle drift ───────────────────────────
// ─── Flagship Imperial Destroyer — Shifted left on desktop, centered high on mobile ──────
function DestroyerModel() {
  const { scene } = useGLTF('/assets/Imperial.gltf');
  const groupRef = useRef<THREE.Group>(null!);
  const t = useRef(0);
  const { viewport } = useThree();
  const isPortrait = viewport.aspect < 1.0;

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const m = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (m) {
          m.roughness = 0.45;
          m.metalness = 0.55;
          m.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  const baseY = isPortrait ? 3.0 : 2.4;

  useFrame((_, delta) => {
    t.current += delta;
    if (groupRef.current) {
      groupRef.current.position.y = baseY + Math.sin(t.current * 0.35) * 0.22;
      groupRef.current.rotation.z = -0.12 + Math.sin(t.current * 0.25) * 0.02;
    }
  });

  // Flagship position & scale: centered and raised on vertical mobile screens
  const position: [number, number, number] = isPortrait ? [-1.2, 3.0, 2.2] : [-4.6, 2.4, 1.2];
  const scale = isPortrait ? 0.46 : 0.70;

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={[0.22, 0.65, -0.12]}>
      <primitive object={scene} position={[0, -0.34, -2.6]} />
    </group>
  );
}

// ─── Vanity Fleet Escorts (Spitfire, Striker, Zenith) in Orbital Formation ────
interface FleetEscortProps {
  url: string;
  position: [number, number, number];
  scale: number;
  rotation?: [number, number, number];
  bobSpeed?: number;
  bobOffset?: number;
}

function FleetEscort({
  url,
  position,
  scale,
  rotation = [0.22, 0.65, -0.12],
  bobSpeed = 0.3,
  bobOffset = 0,
}: FleetEscortProps) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef<THREE.Group>(null!);
  const t = useRef(bobOffset);

  useEffect(() => {
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const m = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (m) {
          m.roughness = 0.45;
          m.metalness = 0.55;
          m.needsUpdate = true;
        }
      }
    });
  }, [cloned]);

  useFrame((_, delta) => {
    t.current += delta;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t.current * bobSpeed) * 0.18;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      <primitive object={cloned} />
    </group>
  );
}

function FleetFormation() {
  const { viewport } = useThree();
  const isPortrait = viewport.aspect < 1.0;

  return (
    <>
      {/* Spitfire — trailing rear-high formation escort */}
      <FleetEscort
        url="/assets/Spitfire.gltf"
        position={isPortrait ? [-3.2, 5.0, -3.0] : [-11.5, 7.8, -8.0]}
        scale={isPortrait ? 0.34 : 0.52}
        bobSpeed={0.28}
        bobOffset={1.2}
      />
      {/* Striker — forward flank escort */}
      <FleetEscort
        url="/assets/Striker.gltf"
        position={isPortrait ? [2.8, 4.2, -2.5] : [-8.5, 0.4, 5.0]}
        scale={isPortrait ? 0.30 : 0.44}
        bobSpeed={0.34}
        bobOffset={2.5}
      />
      {/* Zenith — distant high-orbit heavy cruiser */}
      <FleetEscort
        url="/assets/Zenith.gltf"
        position={isPortrait ? [-0.8, 6.5, -9.0] : [-16.0, 11.5, -16.0]}
        scale={isPortrait ? 0.38 : 0.56}
        bobSpeed={0.22}
        bobOffset={0.7}
      />
    </>
  );
}

// ─── Procedural Super Earth — Expansive Orbital Horizon ───────────────────────
function createEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Deep space-blue ocean with turquoise coastal gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  oceanGrad.addColorStop(0, '#0a2342');
  oceanGrad.addColorStop(0.5, '#124578');
  oceanGrad.addColorStop(1, '#0a2342');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, 2048, 1024);

  // Continental landmasses
  const drawContinent = (cx: number, cy: number, r: number, points: number) => {
    ctx.beginPath();
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const dist = r * (0.6 + 0.4 * Math.sin(angle * 4.2) * Math.cos(angle * 2.7));
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist * 0.7;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  };

  const landmasses = [
    { x: 350,  y: 420, r: 240, col: '#1f5f38' },
    { x: 500,  y: 650, r: 180, col: '#2a7042' },
    { x: 950,  y: 350, r: 260, col: '#225d3b' },
    { x: 1050, y: 580, r: 210, col: '#5b693e' },
    { x: 1450, y: 440, r: 300, col: '#27683f' },
    { x: 1650, y: 700, r: 150, col: '#5a5438' },
    { x: 180,  y: 300, r: 160, col: '#2a6a40' },
  ];

  for (const land of landmasses) {
    drawContinent(land.x, land.y, land.r, 48);
    ctx.fillStyle = land.col;
    ctx.fill();

    // Coastal shelf highlight
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#1db59a';
    ctx.stroke();
  }

  // Polar ice caps
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 2048, 70);
  ctx.fillRect(0, 954, 2048, 70);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}

function createCloudTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, 2048, 1024);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  for (let i = 0; i < 75; i++) {
    const x = (i * 37) % 2048;
    const y = 140 + (i * 47) % 720;
    const w = 140 + (i * 23) % 220;
    const h = 40 + (i * 11) % 65;
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, (i * 0.2), 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}

function SuperEarthOrbit() {
  const earthRef = useRef<THREE.Group>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);

  const earthTex = useMemo(() => createEarthTexture(), []);
  const cloudTex = useMemo(() => createCloudTexture(), []);

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.008;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.012;
    }
  });

  return (
    // Massive planetary sphere forming an expansive curved orbital horizon across the lower screen
    <group position={[2, -145, -28]} rotation={[0.25, 0.5, 0.1]}>
      <group ref={earthRef}>
        {/* Planet Surface with smooth emissive ambient to eliminate dark shadow artifact */}
        <mesh>
          <sphereGeometry args={[140, 96, 96]} />
          <meshStandardMaterial
            map={earthTex}
            emissiveMap={earthTex}
            emissive="#0d3258"
            emissiveIntensity={0.5}
            roughness={0.7}
            metalness={0.0}
          />
        </mesh>
      </group>

      {/* Cloud Layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[140.6, 96, 96]} />
        <meshStandardMaterial
          map={cloudTex}
          transparent
          opacity={0.65}
          blending={THREE.NormalBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Helldivers glowing emerald-cyan atmospheric rim */}
      <mesh>
        <sphereGeometry args={[141.5, 96, 96]} />
        <meshBasicMaterial
          color="#34d399"
          transparent
          opacity={0.35}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// ─── Typewriter line ──────────────────────────────────────────────────────────
interface TypewriterLineProps {
  text: string;
  delay: number;       // ms before this line starts typing
  speed?: number;      // ms per character
  onDone?: () => void;
  className?: string;
}

function TypewriterLine({ text, delay, speed = 38, onDone, className }: TypewriterLineProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      onDone?.();
      return;
    }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [started, displayed, text, speed, onDone]);

  if (!started && displayed.length === 0) return null;

  return (
    <div className={`intro-line ${className ?? ''}`}>
      {displayed}
      {displayed.length < text.length && <span className="intro-cursor">▋</span>}
    </div>
  );
}

// ─── Intro sequence lines ─────────────────────────────────────────────────────
const INTRO_LINES = [
  { text: '> INITIALIZING SECURE UPLINK...',                     delay: 500,  cls: 'dim',    speed: 38 },
  { text: '> SATELLITE HANDSHAKE ACQUIRED [SOL-SECTOR-01]',       delay: 1600, cls: 'dim',    speed: 28 },
  { text: '> LOCATION IDENTIFIED: SUPER EARTH ORBIT // ALT 412 KM', delay: 2800, cls: 'dim', speed: 28 },
  { text: '',                                                     delay: 4300, cls: 'spacer', speed: 0  },
  { text: 'SES SOVEREIGN OF STARS',                               delay: 4500, cls: 'hero',   speed: 55 },
  { text: '',                                                     delay: 6400, cls: 'spacer', speed: 0  },
  { text: 'ADMIRAL ZISHAN VHORA',                                 delay: 6600, cls: 'name',   speed: 50 },
  { text: '',                                                     delay: 8200, cls: 'spacer', speed: 0  },
  { text: 'PATROLLING HIGH ORBIT. SHIP READY FOR BOARDING.',      delay: 8400, cls: 'flavor', speed: 28 },
  { text: 'FOR SUPER EARTH. FOR MANAGED DEMOCRACY.',              delay: 10400, cls: 'flavor', speed: 32 },
];

// ─── Intro cinematic component ────────────────────────────────────────────────
interface IntroSequenceProps {
  onComplete: () => void;
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [fading, setFading] = useState(false);
  const [allowSkip, setAllowSkip] = useState(false);

  // After 2s allow skip
  useEffect(() => {
    const t = setTimeout(() => setAllowSkip(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // After all text is shown, auto-complete after a pause
  useEffect(() => {
    const lastLineDelay = INTRO_LINES[INTRO_LINES.length - 1].delay;
    const lastText     = INTRO_LINES[INTRO_LINES.length - 1].text;
    const lastDuration = lastText.length * (INTRO_LINES[INTRO_LINES.length - 1].speed ?? 38);
    const totalMs      = lastLineDelay + lastDuration + 2400; // extra pause at end

    const t = setTimeout(() => triggerExit(), totalMs);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const triggerExit = useCallback(() => {
    if (fading) return;
    setFading(true);
    setTimeout(onComplete, 1200);
  }, [fading, onComplete]);

  const handleSkip = useCallback(() => {
    if (!allowSkip) return;
    triggerExit();
  }, [allowSkip, triggerExit]);

  // Keyboard skip
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') handleSkip();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleSkip]);

  return (
    <div className={`intro-root ${fading ? 'intro-fade-out' : ''}`} onClick={handleSkip}>
      {/* 3D Ship canvas */}
      <Canvas
        className="intro-canvas"
        camera={{ position: [-12, 10, 20], fov: 38 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#000005' }}
      >
        <color attach="background" args={['#000008']} />
        <Stars radius={180} depth={90} count={7000} factor={4} fade speed={0.3} />
        {/* Balanced space ambient */}
        <ambientLight intensity={0.65} color="#8da4c4" />
        {/* Primary sunbeam illuminating ship armor and daylit planet side */}
        <directionalLight position={[-26, 22, 18]} intensity={3.6} color="#fffcf5" />
        {/* Helldivers glowing emerald-cyan atmospheric bounce */}
        <directionalLight position={[10, -6, -8]} intensity={2.4} color="#34d399" />
        {/* Subtle orange engine accent */}
        <directionalLight position={[-8, 0, -12]} intensity={1.2} color="#ff7722" />
        {/* Localized fill point light */}
        <pointLight position={[-2, 3, 12]} intensity={30} color="#a5b4fc" decay={2} />
        
        {/* Super Earth in low orbit */}
        <SuperEarthOrbit />

        {/* Flagship + Vanity Fleet in orbital patrol formation */}
        <React.Suspense fallback={null}>
          <DestroyerModel />
          <FleetFormation />
        </React.Suspense>
      </Canvas>

      {/* Text overlay — top-right CMD block */}
      <div className="intro-terminal">
        {INTRO_LINES.map((line, i) =>
          line.text === '' ? (
            <div key={i} className="intro-line-spacer" />
          ) : (
            <TypewriterLine
              key={i}
              text={line.text}
              delay={line.delay}
              speed={line.speed}
              className={line.cls}
            />
          )
        )}
      </div>

      {/* Skip hint */}
      {allowSkip && !fading && (
        <div className="intro-skip">[ CLICK OR PRESS ENTER TO BOARD ]</div>
      )}

      {/* Bottom status bar */}
      <div className="intro-status">
        <span className="intro-status-dot" />
        SECURE CHANNEL ESTABLISHED — ENCRYPTION ACTIVE
      </div>
    </div>
  );
}

useGLTF.preload('/assets/Imperial.gltf');
useGLTF.preload('/assets/Spitfire.gltf');
useGLTF.preload('/assets/Striker.gltf');
useGLTF.preload('/assets/Zenith.gltf');
