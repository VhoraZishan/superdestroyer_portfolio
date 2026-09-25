import React, { Suspense, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { NODES, ASSET_URLS, type NodeId } from '../data/nodes';
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

// ─── Single wall-console prop ─────────────────────────────────────────────────
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

// ─── Corridor props — wall consoles on both sides ─────────────────────────────
function CorridorProps({ wx, wz }: { wx: number; wz: number }) {
  return (
    <>
      <WallConsole
        position={[wx + 1.3, 0.1, wz]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <WallConsole
        position={[wx - 1.3, 0.1, wz]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </>
  );
}

// ─── Per-node geometry ────────────────────────────────────────────────────────
// ─── Helldivers 2 Inspired Grand Command Bridge ──────────────────────────────
function GrandBridge() {
  return (
    <group position={[0, 0, 0]}>
      {/* ── Floor Structure ── */}
      {/* Main deck plate: 12m wide x 9m deep (-7 to +2) */}
      <mesh position={[0, 0, -2.5]} receiveShadow>
        <boxGeometry args={[12, 0.2, 9]} />
        <meshStandardMaterial
          color="#222b3a"
          roughness={0.4}
          metalness={0.6}
        />
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

      {/* ── Ceiling & Overhead Industrial Gantries ── */}
      <mesh position={[0, 3.7, -2.5]}>
        <boxGeometry args={[12, 0.2, 9]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.5} />
      </mesh>
      {/* Overhead high-intensity floodlight strips */}
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

      {/* ── Side Walls ── */}
      {/* Left Wall with industrial paneling */}
      <mesh position={[-6.0, 1.85, -2.5]}>
        <boxGeometry args={[0.2, 3.5, 9]} />
        <meshStandardMaterial color="#2d3748" roughness={0.45} metalness={0.65} />
      </mesh>
      {/* Right Wall with industrial paneling */}
      <mesh position={[6.0, 1.85, -2.5]}>
        <boxGeometry args={[0.2, 3.5, 9]} />
        <meshStandardMaterial color="#2d3748" roughness={0.45} metalness={0.65} />
      </mesh>

      {/* ── Rear Wall & Bulkhead Door (leads to Armory corridor at +Z) ── */}
      {/* Rear left panel */}
      <mesh position={[-3.9, 1.85, 2.0]}>
        <boxGeometry args={[4.2, 3.5, 0.2]} />
        <meshStandardMaterial color="#2d3748" roughness={0.45} metalness={0.65} />
      </mesh>
      {/* Rear right panel */}
      <mesh position={[3.9, 1.85, 2.0]}>
        <boxGeometry args={[4.2, 3.5, 0.2]} />
        <meshStandardMaterial color="#2d3748" roughness={0.45} metalness={0.65} />
      </mesh>
      {/* Rear header over door */}
      <mesh position={[0, 3.1, 2.0]}>
        <boxGeometry args={[3.6, 1.0, 0.2]} />
        <meshStandardMaterial color="#2d3748" roughness={0.45} metalness={0.65} />
      </mesh>
      {/* Doorway frame trim with glowing blue entrance accent */}
      <mesh position={[-1.75, 1.3, 2.0]}>
        <boxGeometry args={[0.15, 2.6, 0.3]} />
        <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[1.75, 1.3, 2.0]}>
        <boxGeometry args={[0.15, 2.6, 0.3]} />
        <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.4} />
      </mesh>

      {/* ── Center Command Hub (In the middle of the bridge) ── */}
      {/* Raised command platform */}
      <Model url={ASSET_URLS.commandPlatform} position={[0, 0.1, -2.0]} />
      {/* Central Galactic War Hologram Table */}
      <Model url={ASSET_URLS.holoTable} position={[0, 0.2, -2.0]} />

      {/* Helldivers 2 Tactical Holographic Projections hovering over War Table */}
      <group position={[0, 1.3, -2.0]}>
        {/* Outer glowing cyan holographic ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.1, 1.15, 64]} />
          <meshBasicMaterial color="#00e5ff" side={THREE.DoubleSide} />
        </mesh>
        {/* Middle orange tactical alert ring */}
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

      {/* Helm tactical console facing the command center */}
      <Model url={ASSET_URLS.helmConsole} position={[0, 0.1, -3.6]} />

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
      {/* Window Mullions / Frame Pillars */}
      {[-5.8, -3.5, -1.2, 1.2, 3.5, 5.8].map((x, idx) => (
        <mesh key={idx} position={[x, 1.85, -6.8]}>
          <boxGeometry args={[0.2, 3.5, 0.25]} />
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

      {/* Clear Transparent Reinforced Glass Panes */}
      <mesh position={[0, 1.85, -6.8]}>
        <planeGeometry args={[11.6, 3.4]} />
        <meshPhysicalMaterial
          color="#0e2a47"
          transparent
          opacity={0.12}
          roughness={0.02}
          metalness={0.98}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          reflectivity={0.95}
        />
      </mesh>

      {/* Observation Deck Safety Railing across front viewport */}
      <Model url={ASSET_URLS.railing2m} position={[-3.0, 0.1, -5.8]} />
      <Model url={ASSET_URLS.railing2m} position={[-1.0, 0.1, -5.8]} />
      <Model url={ASSET_URLS.railing2m} position={[1.0, 0.1, -5.8]} />
      <Model url={ASSET_URLS.railing2m} position={[3.0, 0.1, -5.8]} />

      {/* ── Orbital Space Vista Outside Viewport Windows (Matching Image 4) ── */}
      <group position={[0, 0, -45]}>
        {/* Massive Super Earth glowing horizon cutting across the lower half of the viewport */}
        <mesh position={[0, -56, 0]}>
          <sphereGeometry args={[58, 64, 64]} />
          <meshStandardMaterial
            color="#144272"
            roughness={0.45}
            metalness={0.1}
          />
        </mesh>
        {/* Glowing atmospheric turquoise/cyan rim along the planet curve */}
        <mesh position={[0, -56, 0]}>
          <sphereGeometry args={[58.9, 64, 64]} />
          <meshBasicMaterial
            color="#34d399"
            transparent
            opacity={0.35}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Distant vanity fleet ships in orbital formation outside */}
        <group position={[-18, 8, 12]} scale={0.35} rotation={[0.2, 0.5, -0.1]}>
          <Model url="/assets/Spitfire.gltf" position={[0, 0, 0]} />
        </group>
        <group position={[20, 4, 16]} scale={0.32} rotation={[0.15, -0.4, 0.05]}>
          <Model url="/assets/Striker.gltf" position={[0, 0, 0]} />
        </group>
        <group position={[0, 16, -10]} scale={0.4} rotation={[0.2, 0.3, 0]}>
          <Model url="/assets/Zenith.gltf" position={[0, 0, 0]} />
        </group>
      </group>
    </group>
  );
}

// ─── Shortened & Widened Helldivers Armory Bay ────────────────────────────────
function ArmoryBayNode() {
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

      {/* Left Wall with weapons storage lockers */}
      <mesh position={[-3.0, 1.6, 0]}>
        <boxGeometry args={[0.2, 3.0, 5.0]} />
        <meshStandardMaterial color="#2d3748" roughness={0.5} metalness={0.6} />
      </mesh>
      <WallConsole position={[-2.8, 1.2, -1.2]} rotation={[0, Math.PI / 2, 0]} />
      <WallConsole position={[-2.8, 1.2, 1.2]} rotation={[0, Math.PI / 2, 0]} />

      {/* Right Wall with equipment terminals */}
      <mesh position={[3.0, 1.6, 0]}>
        <boxGeometry args={[0.2, 3.0, 5.0]} />
        <meshStandardMaterial color="#2d3748" roughness={0.5} metalness={0.6} />
      </mesh>
      <WallConsole position={[2.8, 1.2, -1.2]} rotation={[0, -Math.PI / 2, 0]} />
      <WallConsole position={[2.8, 1.2, 1.2]} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  );
}

// ─── Main 4-Way Junction (Flush snaps to all 4 sectors) ───────────────────────
function JunctionNode() {
  return (
    <group position={[0, 0, 9.0]}>
      <Model url={ASSET_URLS.corridorCross} position={[0, 0, 0]} />
    </group>
  );
}

// ─── Cargo Bay (Doorway at z=11.0 snaps flush to Junction North port) ─────────
function CargoBayNode() {
  return (
    <Model
      url={ASSET_URLS.cargoBayShell}
      position={[0, 0, 15.0]}
      rotation={[0, Math.PI, 0]}
    />
  );
}

// ─── War Room (Doorway at x=2.0 snaps flush to Junction East port) ────────────
function WarRoomNode() {
  return (
    <group position={[5.0, 0, 9.0]}>
      <Model
        url={ASSET_URLS.roomShell6x6}
        position={[0, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Model url={ASSET_URLS.holoTable} position={[0, 0.1, 0]} />
    </group>
  );
}

// ─── Archive Room (Doorway at x=-2.0 snaps flush to Junction West port) ───────
function ArchiveNode() {
  return (
    <group position={[-6.0, 0, 9.0]}>
      <Model
        url={ASSET_URLS.roomShell8x8}
        position={[0, 0, 0]}
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
      return <GrandBridge />;
    case 'bridge-viewport':
      if (visibleNodes.includes('bridge')) return null;
      return <GrandBridge />;
    case 'corridor-1':
    case 'corridor-2':
    case 'corridor-3':
      return <ArmoryBayNode />;
    case 'junction':
      return <JunctionNode />;
    case 'cargo-bay':
      return <CargoBayNode />;
    case 'war-room':
      return <WarRoomNode />;
    case 'archive':
      return <ArchiveNode />;
    default:
      return null;
  }
}

// ─── Seamless Visibility — All connected rooms loaded together without gaps ──
function getVisibleNodes(currentId: NodeId): NodeId[] {
  // If player is on the bridge, keep bridge and armory loaded
  if (currentId === 'bridge' || currentId === 'bridge-viewport') {
    return ['bridge', 'bridge-viewport', 'corridor-1'];
  }
  // When in armory, keep bridge, armory, and junction loaded
  if (currentId === 'corridor-1') {
    return ['bridge', 'bridge-viewport', 'corridor-1', 'junction'];
  }
  // When in junction, keep all 4 connecting sectors loaded flush so no doorway shows a gap!
  if (currentId === 'junction') {
    return ['junction', 'corridor-1', 'war-room', 'archive', 'cargo-bay'];
  }
  // When inside a room, keep that room and the junction loaded
  if (currentId === 'war-room' || currentId === 'archive' || currentId === 'cargo-bay') {
    return [currentId, 'junction'];
  }
  return [currentId];
}

// ─── Exported scene geometry root ────────────────────────────────────────────
export function ShipGeometry() {
  const currentNode = useNavigationStore((s) => s.currentNode);
  const visibleNodes = useMemo(() => getVisibleNodes(currentNode), [currentNode]);

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
      <pointLight position={[0, 1.4, -2.0]} intensity={50} color="#00e5ff" decay={2} />
      {/* Viewport bright orbital sunlight pouring into the bridge */}
      <directionalLight position={[0, 4, -18]} intensity={3.5} color="#38bdf8" />
      {/* Armory run: orange-red work glow */}
      <pointLight position={[0, 2.0, 4.5]}  intensity={45} color="#ff7722" decay={2} />
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
