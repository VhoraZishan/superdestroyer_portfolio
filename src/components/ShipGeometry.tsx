import { Suspense, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ASSET_URLS, type NodeId } from '../data/nodes';
import { useNavigationStore } from '../store/navigationStore';

// ─── Individual model loader ──────────────────────────────────────────────────
function Model({
  url,
  position,
  rotation,
}: {
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  return (
    <primitive
      object={cloned}
      position={position}
      rotation={rotation ?? [0, 0, 0]}
    />
  );
}

// ─── Wall console prop ────────────────────────────────────────────────────────
function WallConsole({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const { scene } = useGLTF(ASSET_URLS.wallConsole);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={cloned} position={position} rotation={rotation} />;
}

// ─── Sealed Bulkhead Blast Door (Caps unloaded sectors — Zero Black Voids) ────
function BulkheadDoorCap({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation ?? [0, 0, 0]}>
      {/* Heavy airtight bulkhead door frame */}
      <Model url={ASSET_URLS.bulkheadDoor} position={[0, 0, 0]} />
      {/* Red pressurized seal status indicator bar on lintel */}
      <mesh position={[0, 2.18, 0.08]}>
        <boxGeometry args={[0.7, 0.05, 0.04]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      {/* Heavy blast seal backing panel to completely prevent any light or void leak */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[2.0, 2.7, 0.08]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.8} />
      </mesh>
    </group>
  );
}

// ─── Procedural Super Earth Orbital Horizon for Bridge Viewport ───────────────
function createBridgeEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512);
  oceanGrad.addColorStop(0, '#0a2342');
  oceanGrad.addColorStop(0.5, '#16538e');
  oceanGrad.addColorStop(1, '#0a2342');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, 1024, 512);

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
    { x: 175, y: 210, r: 120, col: '#237344' },
    { x: 250, y: 325, r: 90,  col: '#2e864f' },
    { x: 475, y: 175, r: 130, col: '#2a6f47' },
    { x: 525, y: 290, r: 105, col: '#6b7c4b' },
    { x: 725, y: 220, r: 150, col: '#2f7e4e' },
    { x: 825, y: 350, r: 75,  col: '#6b6343' },
    { x: 90,  y: 150, r: 80,  col: '#2e7c4c' },
  ];

  for (const land of landmasses) {
    drawContinent(land.x, land.y, land.r, 36);
    ctx.fillStyle = land.col;
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#22d3ee';
    ctx.stroke();
  }

  // Polar ice caps
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 1024, 35);
  ctx.fillRect(0, 477, 1024, 35);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}

function SuperEarthVista() {
  const earthTex = useMemo(() => createBridgeEarthTexture(), []);

  return (
    <group position={[0, -28, -42]} rotation={[0.2, 0.4, 0.05]}>
      {/* Planetary Sphere with self-illuminated emissive glow */}
      <mesh>
        <sphereGeometry args={[32, 64, 64]} />
        <meshStandardMaterial
          map={earthTex}
          emissiveMap={earthTex}
          emissive="#103a62"
          emissiveIntensity={0.8}
          roughness={0.4}
          metalness={0.0}
        />
      </mesh>

      {/* Atmospheric Glowing Rim */}
      <mesh>
        <sphereGeometry args={[32.5, 64, 64]} />
        <meshBasicMaterial
          color="#34d399"
          transparent
          opacity={0.4}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Second outer atmospheric halo */}
      <mesh>
        <sphereGeometry args={[33.2, 64, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.25}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// ─── Helldivers 2 Inspired Grand Command Bridge ──────────────────────────────
function GrandBridge({ visibleNodes }: { visibleNodes: NodeId[] }) {
  return (
    <group position={[0, 0, 0]}>
      {/* ── Helldivers 2 Command Deck Floor Structure ── */}
      {/* Main military deck plate: 12m wide x 9m deep */}
      <mesh position={[0, 0, -2.5]} receiveShadow>
        <boxGeometry args={[12, 0.2, 9]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Raised side walkways (left & right) */}
      <mesh position={[-4.8, 0.2, -2.5]}>
        <boxGeometry args={[2.4, 0.2, 9]} />
        <meshStandardMaterial color="#2d3748" roughness={0.35} metalness={0.7} />
      </mesh>
      <mesh position={[4.8, 0.2, -2.5]}>
        <boxGeometry args={[2.4, 0.2, 9]} />
        <meshStandardMaterial color="#2d3748" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* Recessed cyan neon floor lighting strips */}
      <mesh position={[-3.5, 0.12, -2.5]}>
        <boxGeometry args={[0.08, 0.05, 8.8]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>
      <mesh position={[3.5, 0.12, -2.5]}>
        <boxGeometry args={[0.08, 0.05, 8.8]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>

      {/* Observation deck yellow hazard stripe near window */}
      <mesh position={[0, 0.12, -5.7]}>
        <boxGeometry args={[11.6, 0.02, 0.14]} />
        <meshBasicMaterial color="#facc15" />
      </mesh>

      {/* ── Industrial Ceiling & Overhead Floodlights ── */}
      <mesh position={[0, 3.7, -2.5]}>
        <boxGeometry args={[12, 0.2, 9]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.5} />
      </mesh>
      <mesh position={[0, 3.58, -2.5]}>
        <boxGeometry args={[0.4, 0.06, 7]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-3.5, 3.58, -2.5]}>
        <boxGeometry args={[0.25, 0.06, 7]} />
        <meshBasicMaterial color="#e0f2fe" />
      </mesh>
      <mesh position={[3.5, 3.58, -2.5]}>
        <boxGeometry args={[0.25, 0.06, 7]} />
        <meshBasicMaterial color="#e0f2fe" />
      </mesh>

      {/* ── Side Walls (Left & Right) ── */}
      <mesh position={[-6.0, 1.85, -2.5]}>
        <boxGeometry args={[0.2, 3.5, 9]} />
        <meshStandardMaterial color="#1e293b" roughness={0.45} metalness={0.65} />
      </mesh>
      <mesh position={[6.0, 1.85, -2.5]}>
        <boxGeometry args={[0.2, 3.5, 9]} />
        <meshStandardMaterial color="#1e293b" roughness={0.45} metalness={0.65} />
      </mesh>

      {/* ── Rear Bulkhead Wall (leads to Armory corridor at +Z) ── */}
      <mesh position={[-3.9, 1.85, 2.0]}>
        <boxGeometry args={[4.2, 3.5, 0.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.45} metalness={0.65} />
      </mesh>
      <mesh position={[3.9, 1.85, 2.0]}>
        <boxGeometry args={[4.2, 3.5, 0.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.45} metalness={0.65} />
      </mesh>
      <mesh position={[0, 3.1, 2.0]}>
        <boxGeometry args={[3.6, 1.0, 0.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.45} metalness={0.65} />
      </mesh>

      {/* Sealed Blast Door at rear doorway (z=2.0) if Armory Bay is not loaded */}
      {!visibleNodes.includes('corridor-1') && (
        <BulkheadDoorCap position={[0, 0, 2.0]} rotation={[0, Math.PI, 0]} />
      )}

      {/* ── Helldivers Style Galactic War Command Center Table ── */}
      <group position={[0, 0.1, -1.8]}>
        {/* Holographic Table Base Shell */}
        <Model url={ASSET_URLS.holoTable} position={[0, 0, 0]} />
        {/* Outer illuminated projection ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.15, 1.22, 48]} />
          <meshBasicMaterial color="#00e5ff" side={THREE.DoubleSide} />
        </mesh>
        {/* Secondary orbit ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.75, 0.8, 48]} />
          <meshBasicMaterial color="#f97316" side={THREE.DoubleSide} />
        </mesh>
        {/* Inner core ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.38, 32]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
        </mesh>
        {/* Floating tactical beacon */}
        <mesh position={[0, 0.2, 0]}>
          <octahedronGeometry args={[0.12]} />
          <meshBasicMaterial color="#00f5ff" />
        </mesh>
      </group>

      {/* ── Flanking Crew Workstations ── */}
      <Model
        url={ASSET_URLS.consoleStation}
        position={[-4.7, 0.3, -2.0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Model
        url={ASSET_URLS.consoleStation}
        position={[4.7, 0.3, -2.0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Model
        url={ASSET_URLS.captainChair}
        position={[3.8, 0.3, -0.6]}
        rotation={[0, -Math.PI * 0.75, 0]}
      />
      <WallConsole position={[-5.8, 1.2, 0]} rotation={[0, Math.PI / 2, 0]} />
      <WallConsole position={[5.8, 1.2, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* ── Floor-To-Ceiling Panoramic Observation Window (at z = -6.8) ── */}
      {/* 3 Window Sections: Left edge (-5.8), 2 dividers (-1.95, 1.95), Right edge (5.8) */}
      {[-5.8, -1.95, 1.95, 5.8].map((x, idx) => (
        <mesh key={idx} position={[x, 1.85, -6.8]}>
          <boxGeometry args={[0.22, 3.5, 0.25]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.9} />
        </mesh>
      ))}
      {/* Horizontal Upper Frame Header */}
      <mesh position={[0, 3.5, -6.8]}>
        <boxGeometry args={[11.8, 0.2, 0.3]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Horizontal Lower Frame Sill */}
      <mesh position={[0, 0.15, -6.8]}>
        <boxGeometry args={[11.8, 0.2, 0.3]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Crystal Clear Transparent Reinforced Viewport Glass Panes */}
      <mesh position={[0, 1.85, -6.8]}>
        <planeGeometry args={[11.6, 3.4]} />
        <meshStandardMaterial
          color="#7dd3fc"
          transparent
          opacity={0.10}
          roughness={0.05}
          metalness={0.1}
          depthWrite={false}
        />
      </mesh>

      {/* Observation Deck Safety Railing across front viewport */}
      <Model url={ASSET_URLS.railing2m} position={[-3.0, 0.1, -5.8]} />
      <Model url={ASSET_URLS.railing2m} position={[-1.0, 0.1, -5.8]} />
      <Model url={ASSET_URLS.railing2m} position={[1.0, 0.1, -5.8]} />
      <Model url={ASSET_URLS.railing2m} position={[3.0, 0.1, -5.8]} />

      {/* ── Orbital Space Vista Outside Viewport Windows ── */}
      {/* Super Earth planetary sphere curving across lower viewport */}
      <SuperEarthVista />

      {/* Distant vanity fleet ships in orbital formation outside the 3 window sections */}
      <group position={[0, 0, 0]}>
        {/* Left Section Escort — Spitfire */}
        <group position={[-12.5, 4.0, -28]} scale={0.42} rotation={[0.2, 0.55, -0.08]}>
          <Model url="/assets/Spitfire.gltf" position={[0, 0, 0]} />
        </group>
        {/* Center Section Escort — Zenith High-Orbit Cruiser */}
        <group position={[1.5, 8.5, -34]} scale={0.44} rotation={[0.18, 0.35, -0.05]}>
          <Model url="/assets/Zenith.gltf" position={[0, 0, 0]} />
        </group>
        {/* Right Section Escort — Striker Flanker */}
        <group position={[12.5, 3.5, -25]} scale={0.38} rotation={[0.15, -0.45, 0.08]}>
          <Model url="/assets/Striker.gltf" position={[0, 0, 0]} />
        </group>
      </group>
    </group>
  );
}

// ─── Shortened & Widened Helldivers Armory Bay (6m wide, z=2.0 to z=7.0) ───────
function ArmoryBayNode({ visibleNodes }: { visibleNodes: NodeId[] }) {
  return (
    <group position={[0, 0, 4.5]}>
      {/* Deck Floor: 6m wide x 5m long (spanning z=2 to z=7) */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[6.0, 0.2, 5.0]} />
        <meshStandardMaterial color="#222b3a" roughness={0.4} metalness={0.65} />
      </mesh>

      {/* Recessed Floor Cyan Guide Lights */}
      <mesh position={[-1.8, 0.12, 0]}>
        <boxGeometry args={[0.08, 0.04, 4.9]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>
      <mesh position={[1.8, 0.12, 0]}>
        <boxGeometry args={[0.08, 0.04, 4.9]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>

      {/* Industrial Ceiling at y = 3.2 */}
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[6.0, 0.2, 5.0]} />
        <meshStandardMaterial color="#1a2332" roughness={0.6} metalness={0.5} />
      </mesh>
      {/* Overhead high-intensity lighting strip */}
      <mesh position={[0, 3.08, 0]}>
        <boxGeometry args={[0.4, 0.05, 4.6]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Left Wall with weapons storage lockers & crates */}
      <mesh position={[-3.0, 1.6, 0]}>
        <boxGeometry args={[0.2, 3.0, 5.0]} />
        <meshStandardMaterial color="#2d3748" roughness={0.5} metalness={0.6} />
      </mesh>
      <Model
        url={ASSET_URLS.lockerBank}
        position={[-2.7, 0.1, -1.2]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Model
        url={ASSET_URLS.storageCrate}
        position={[-2.6, 0.1, 1.1]}
        rotation={[0, 0.2, 0]}
      />
      <WallConsole position={[-2.8, 1.2, 0]} rotation={[0, Math.PI / 2, 0]} />

      {/* Right Wall with equipment lockers & tall crates */}
      <mesh position={[3.0, 1.6, 0]}>
        <boxGeometry args={[0.2, 3.0, 5.0]} />
        <meshStandardMaterial color="#2d3748" roughness={0.5} metalness={0.6} />
      </mesh>
      <Model
        url={ASSET_URLS.lockerBank}
        position={[2.7, 0.1, -1.2]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Model
        url={ASSET_URLS.crateTall}
        position={[2.6, 0.1, 1.1]}
        rotation={[0, -0.15, 0]}
      />
      <WallConsole position={[2.8, 1.2, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* South End Wall Bulkheads (z = -2.5, flanking 2m doorway) */}
      <mesh position={[-2.0, 1.6, -2.5]}>
        <boxGeometry args={[2.0, 3.0, 0.2]} />
        <meshStandardMaterial color="#2d3748" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[2.0, 1.6, -2.5]}>
        <boxGeometry args={[2.0, 3.0, 0.2]} />
        <meshStandardMaterial color="#2d3748" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[0, 2.7, -2.5]}>
        <boxGeometry args={[2.0, 0.8, 0.2]} />
        <meshStandardMaterial color="#2d3748" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* North End Wall Bulkheads (z = 2.5, flanking 2m doorway) */}
      <mesh position={[-2.0, 1.6, 2.5]}>
        <boxGeometry args={[2.0, 3.0, 0.2]} />
        <meshStandardMaterial color="#2d3748" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[2.0, 1.6, 2.5]}>
        <boxGeometry args={[2.0, 3.0, 0.2]} />
        <meshStandardMaterial color="#2d3748" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[0, 2.7, 2.5]}>
        <boxGeometry args={[2.0, 0.8, 0.2]} />
        <meshStandardMaterial color="#2d3748" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Sealed Blast Door to Bridge (z = 2.0) if Bridge is unloaded */}
      {!visibleNodes.includes('bridge') && !visibleNodes.includes('bridge-viewport') && (
        <BulkheadDoorCap position={[0, 0, -2.5]} rotation={[0, 0, 0]} />
      )}

      {/* Sealed Blast Door to Junction (z = 7.0) if Junction is unloaded */}
      {!visibleNodes.includes('junction') && (
        <BulkheadDoorCap position={[0, 0, 2.5]} rotation={[0, Math.PI, 0]} />
      )}
    </group>
  );
}

// ─── Main 4-Way Junction (Flush snaps to all 4 sectors) ───────────────────────
function JunctionNode({ visibleNodes }: { visibleNodes: NodeId[] }) {
  return (
    <group position={[0, 0, 9.0]}>
      {/* 4-way cross corridor frame */}
      <Model url={ASSET_URLS.corridorCross} position={[0, 0, 0]} />

      {/* South Port (z = 7.0) to Armory Bay */}
      {!visibleNodes.includes('corridor-1') && (
        <BulkheadDoorCap position={[0, 0, -2.0]} rotation={[0, 0, 0]} />
      )}

      {/* North Port (z = 11.0) to Cargo Bay */}
      {!visibleNodes.includes('cargo-bay') && (
        <BulkheadDoorCap position={[0, 0, 2.0]} rotation={[0, Math.PI, 0]} />
      )}

      {/* East Port (x = 2.0) to War Room */}
      {!visibleNodes.includes('war-room') && (
        <BulkheadDoorCap position={[2.0, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      )}

      {/* West Port (x = -2.0) to Archive */}
      {!visibleNodes.includes('archive') && (
        <BulkheadDoorCap position={[-2.0, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      )}
    </group>
  );
}

// ─── Cargo Bay (Doorway at z=11.0 snaps flush to Junction North port) ─────────
function CargoBayNode({ visibleNodes }: { visibleNodes: NodeId[] }) {
  return (
    <group position={[0, 0, 15.0]}>
      {/* Room Shell */}
      <Model
        url={ASSET_URLS.cargoBayShell}
        position={[0, 0, 0]}
        rotation={[0, Math.PI, 0]}
      />

      {/* Sealed Blast Door to Junction if Junction is unloaded */}
      {!visibleNodes.includes('junction') && (
        <BulkheadDoorCap position={[0, 0, -4.0]} rotation={[0, 0, 0]} />
      )}

      {/* Heavy Shipping Containers */}
      <Model
        url={ASSET_URLS.cargoContainer}
        position={[-2.6, 0.1, 1.5]}
        rotation={[0, 0.25, 0]}
      />
      <Model
        url={ASSET_URLS.cargoContainer}
        position={[2.6, 0.1, 1.2]}
        rotation={[0, -0.2, 0]}
      />

      {/* Tall crates & storage boxes */}
      <Model url={ASSET_URLS.crateTall} position={[-2.4, 0.1, -1.8]} />
      <Model url={ASSET_URLS.storageCrate} position={[-2.4, 1.3, -1.8]} />
      <Model url={ASSET_URLS.crateTall} position={[2.5, 0.1, -1.6]} />
      <Model url={ASSET_URLS.storageCrate} position={[1.4, 0.1, 3.2]} />
      <Model url={ASSET_URLS.storageCrate} position={[-1.2, 0.1, 3.0]} />

      {/* Heavy Fuel & Supply Drums */}
      <Model url={ASSET_URLS.supplyDrum} position={[-2.7, 0.1, 3.2]} />
      <Model url={ASSET_URLS.supplyDrum} position={[-2.2, 0.1, 3.5]} />
      <Model url={ASSET_URLS.supplyDrum} position={[2.7, 0.1, 3.2]} />
      <Model url={ASSET_URLS.supplyDrum} position={[2.3, 0.1, 3.5]} />
    </group>
  );
}

// ─── War Room (Doorway at x=2.0 snaps flush to Junction East port) ────────────
function WarRoomNode({ visibleNodes }: { visibleNodes: NodeId[] }) {
  return (
    <group position={[5.0, 0, 9.0]}>
      {/* Room Shell */}
      <Model
        url={ASSET_URLS.roomShell6x6}
        position={[0, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />

      {/* Sealed Blast Door to Junction if Junction is unloaded */}
      {!visibleNodes.includes('junction') && (
        <BulkheadDoorCap position={[-3.0, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      )}

      {/* Central Tactical Hologram Table */}
      <Model url={ASSET_URLS.holoTable} position={[0, 0.1, 0]} />

      {/* Briefing Officer Seats arranged around the table */}
      <Model
        url={ASSET_URLS.crewSeat}
        position={[-1.2, 0.1, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Model
        url={ASSET_URLS.crewSeat}
        position={[1.2, 0.1, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Model
        url={ASSET_URLS.crewSeat}
        position={[0, 0.1, -1.2]}
        rotation={[0, 0, 0]}
      />
      <Model
        url={ASSET_URLS.crewSeat}
        position={[0, 0.1, 1.2]}
        rotation={[0, Math.PI, 0]}
      />

      {/* Tactical Display Screens on East Wall */}
      <Model
        url={ASSET_URLS.wallScreen}
        position={[2.8, 1.4, -1.0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Model
        url={ASSET_URLS.wallScreen}
        position={[2.8, 1.4, 1.0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <WallConsole position={[0, 1.2, -2.8]} rotation={[0, 0, 0]} />
    </group>
  );
}

// ─── Archive Room (Doorway at x=-2.0 snaps flush to Junction West port) ───────
function ArchiveNode({ visibleNodes }: { visibleNodes: NodeId[] }) {
  return (
    <group position={[-6.0, 0, 9.0]}>
      {/* Room Shell 8x8 */}
      <Model
        url={ASSET_URLS.roomShell8x8}
        position={[0, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Sealed Blast Door to Junction if Junction is unloaded */}
      {!visibleNodes.includes('junction') && (
        <BulkheadDoorCap position={[4.0, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      )}

      {/* Supercomputer Server Racks along North Wall */}
      <Model url={ASSET_URLS.serverRack} position={[-2.0, 0.1, -3.2]} rotation={[0, 0, 0]} />
      <Model url={ASSET_URLS.serverRack} position={[0, 0.1, -3.2]} rotation={[0, 0, 0]} />
      <Model url={ASSET_URLS.serverRack} position={[2.0, 0.1, -3.2]} rotation={[0, 0, 0]} />

      {/* Supercomputer Server Racks along South Wall */}
      <Model url={ASSET_URLS.serverRack} position={[-2.0, 0.1, 3.2]} rotation={[0, Math.PI, 0]} />
      <Model url={ASSET_URLS.serverRack} position={[0, 0.1, 3.2]} rotation={[0, Math.PI, 0]} />
      <Model url={ASSET_URLS.serverRack} position={[2.0, 0.1, 3.2]} rotation={[0, Math.PI, 0]} />

      {/* Central Intelligence Research Terminal Station */}
      <Model
        url={ASSET_URLS.consoleStation}
        position={[0, 0.1, 0]}
        rotation={[0, Math.PI, 0]}
      />
      <Model
        url={ASSET_URLS.crewSeat}
        position={[0, 0.1, -0.9]}
        rotation={[0, 0, 0]}
      />

      {/* Archive Records Intelligence Wall Screens on West Wall */}
      <Model
        url={ASSET_URLS.wallScreen}
        position={[-3.8, 1.4, -1.2]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Model
        url={ASSET_URLS.wallScreen}
        position={[-3.8, 1.4, 1.2]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
  );
}

// ─── Node geometry switch ─────────────────────────────────────────────────────
function NodeGeometry({
  nodeId,
  visibleNodes,
}: {
  nodeId: NodeId;
  visibleNodes: NodeId[];
}) {
  switch (nodeId) {
    case 'bridge':
      return <GrandBridge visibleNodes={visibleNodes} />;
    case 'bridge-viewport':
      if (visibleNodes.includes('bridge')) return null;
      return <GrandBridge visibleNodes={visibleNodes} />;
    case 'corridor-1':
    case 'corridor-2':
    case 'corridor-3':
      return <ArmoryBayNode visibleNodes={visibleNodes} />;
    case 'junction':
      return <JunctionNode visibleNodes={visibleNodes} />;
    case 'cargo-bay':
      return <CargoBayNode visibleNodes={visibleNodes} />;
    case 'war-room':
      return <WarRoomNode visibleNodes={visibleNodes} />;
    case 'archive':
      return <ArchiveNode visibleNodes={visibleNodes} />;
    default:
      return null;
  }
}

// ─── Seamless Visibility with Smart Preemptive Loading ───────────────────────
// Keep only active sector + destination in memory to maximize performance on mobile/low RAM,
// while bulkhead blast doors prevent any black void from ever being seen.
function getVisibleNodes(currentId: NodeId, targetNode: NodeId | null): NodeId[] {
  const active = new Set<NodeId>();

  // Always load current active sector
  active.add(currentId);
  if (currentId === 'bridge' || currentId === 'bridge-viewport') {
    active.add('bridge');
    active.add('bridge-viewport');
  }

  // Preemptively load destination sector during navigation walk tween
  if (targetNode) {
    active.add(targetNode);
    if (targetNode === 'bridge' || targetNode === 'bridge-viewport') {
      active.add('bridge');
      active.add('bridge-viewport');
    }
  }

  return Array.from(active);
}

// ─── Exported scene geometry root ────────────────────────────────────────────
export function ShipGeometry() {
  const currentNode = useNavigationStore((s) => s.currentNode);
  const targetNode = useNavigationStore((s) => s.targetNode);
  const visibleNodes = useMemo(() => getVisibleNodes(currentNode, targetNode), [currentNode, targetNode]);

  return (
    <>
      {visibleNodes.map((nodeId) => (
        <Suspense key={nodeId} fallback={null}>
          <NodeGeometry nodeId={nodeId} visibleNodes={visibleNodes} />
        </Suspense>
      ))}

      {/* ── Lighting ── */}
      {/* Ambient: rich industrial fill */}
      <ambientLight intensity={0.85} color="#94a3b8" />
      {/* Overhead bridge floodlight */}
      <directionalLight position={[0, 8, -2]} intensity={2.2} color="#ffffff" />
      {/* Overhead warm deck lights */}
      <pointLight position={[0, 3.2, -2.0]} intensity={65} color="#fffbeb" decay={2} />
      <pointLight position={[-3.5, 3.2, -2.0]} intensity={45} color="#e0f2fe" decay={2} />
      <pointLight position={[3.5, 3.2, -2.0]} intensity={45} color="#e0f2fe" decay={2} />
      {/* Bridge holographic war table vibrant cyan glow */}
      <pointLight position={[0, 1.4, -1.8]} intensity={50} color="#00e5ff" decay={2} />
      {/* Viewport bright orbital sunlight pouring into the bridge */}
      <directionalLight position={[0, 4, -18]} intensity={3.5} color="#38bdf8" />
      {/* Exterior celestial sunlight illuminating the planet and fleet cruisers */}
      <directionalLight position={[-25, 22, -45]} intensity={4.5} color="#fffdf0" />
      {/* Exterior planetary atmospheric emerald bounce */}
      <directionalLight position={[10, -10, -35]} intensity={2.8} color="#34d399" />
      {/* Armory run: orange-red work glow */}
      <pointLight position={[0, 2.0, 4.5]} intensity={45} color="#ff7722" decay={2} />
      {/* Junction center light */}
      <pointLight position={[0, 2.5, 9.0]} intensity={55} color="#0284c7" decay={2} />
      {/* War room: teal holo glow */}
      <pointLight position={[5.0, 1.8, 9.0]} intensity={40} color="#00e8c8" decay={2} />
      {/* Archive: cool blue study glow */}
      <pointLight position={[-6.0, 1.8, 9.0]} intensity={40} color="#38bdf8" decay={2} />
      {/* Cargo bay: amber industrial */}
      <pointLight position={[0, 2.5, 15.0]} intensity={50} color="#ffa030" decay={2} />
    </>
  );
}
