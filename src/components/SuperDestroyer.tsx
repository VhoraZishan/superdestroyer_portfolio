import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';
import { ShipGeometry } from './ShipGeometry';
import { SceneController } from './SceneController';
import { NavOverlay } from './NavOverlay';
import type { NodeId } from '../data/nodes';

interface SuperDestroyerProps {
  onInteract?: (nodeId: NodeId) => void;
}

export function SuperDestroyer({ onInteract }: SuperDestroyerProps) {
  // Shared camera ref — populated by R3F, read by NavOverlay outside the canvas
  const cameraRef = useRef<THREE.Camera | null>(null);

  const handleInteract = (nodeId: NodeId) => {
    const label: Record<string, string> = {
      bridge:        '[E] ACCESS PERSONNEL FILE',
      'corridor-1':  '[E] ACCESS LOADOUT',
      'corridor-2':  '[E] ACCESS LOADOUT',
      'corridor-3':  '[E] ACCESS LOADOUT',
      'war-room':    '[E] ACCESS CAMPAIGN MAP',
      archive:       '[E] ACCESS MISSION RECORDS',
    };
    console.log(`[SuperDestroyer] interact at ${nodeId}: ${label[nodeId] ?? nodeId}`);
    onInteract?.(nodeId);
  };

  return (
    <>
      <Canvas
        id="super-destroyer-canvas"
        style={{ width: '100vw', height: '100vh', background: '#000' }}
        camera={{ fov: 75, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ camera }) => {
          // Store camera ref so NavOverlay can read it
          (cameraRef as React.MutableRefObject<THREE.Camera>).current = camera;
        }}
      >
        <ShipGeometry />
        <SceneController onInteract={handleInteract} />
        <Preload all />
      </Canvas>

      {/* Navigation arrows + [E] prompt — DOM overlay, always on-screen */}
      <NavOverlay cameraRef={cameraRef} onInteract={handleInteract} />
    </>
  );
}
