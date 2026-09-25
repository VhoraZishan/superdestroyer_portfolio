import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { NODES, type NodeId } from '../data/nodes';
import { useNavigationStore } from '../store/navigationStore';

// ─── Human-readable destination labels ───────────────────────────────────────
const DEST_LABELS: Record<NodeId, string> = {
  bridge:            'Bridge',
  'bridge-viewport': 'Viewport',
  'corridor-1':      'Armory',
  'corridor-2':      'Armory',
  'corridor-3':      'Armory',
  junction:          'Junction',
  'cargo-bay':       'Cargo Bay',
  'war-room':        'War Room',
  archive:           'Archive',
  'sealed-door':     'Sealed',
};

interface ArrowButtonProps {
  targetId: NodeId;
  /** 0 = up, 90 = right, 180 = down, 270 = left (clockwise from up) */
  screenAngleDeg: number;
  onClick: () => void;
}

// Distance from screen centre the arrow appears (px)
const ARROW_DIST = 170;

function ArrowButton({ targetId, screenAngleDeg, onClick }: ArrowButtonProps) {
  const rad = (screenAngleDeg - 90) * (Math.PI / 180); // convert to standard math angle
  // Offset from centre: x = cos(angle)*dist, y = sin(angle)*dist
  const ox = Math.cos(rad) * ARROW_DIST;
  const oy = Math.sin(rad) * ARROW_DIST;

  return (
    <button
      className="nav-arrow-dom"
      onClick={onClick}
      title={DEST_LABELS[targetId]}
      style={{
        // Translate from 50%/50% centre by the computed offset, then centre the button itself
        transform: `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px))`,
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        style={{ transform: `rotate(${screenAngleDeg}deg)` }}
      >
        <circle
          cx="24" cy="24" r="22"
          fill="rgba(0,160,255,0.10)"
          stroke="rgba(0,180,255,0.75)"
          strokeWidth="1.5"
        />
        {/* Arrow pointing up; SVG is rotated to face target direction */}
        <polygon points="24,8 33,30 24,24 15,30" fill="rgba(0,200,255,0.95)" />
      </svg>
      <span className="nav-arrow-dom-label">{DEST_LABELS[targetId]}</span>
    </button>
  );
}


// ─── Computes 0-360° bearing from current grid pos to target grid pos ─────────
function bearing(fromPos: [number, number], toPos: [number, number]): number {
  const dx = toPos[0] - fromPos[0]; // east = positive
  const dz = toPos[1] - fromPos[1]; // south = positive
  // atan2 relative to -Z (north in our scene)
  return Math.atan2(dx, -dz) * (180 / Math.PI);
}

// ─── Main Nav Overlay ─────────────────────────────────────────────────────────
interface NavOverlayProps {
  cameraRef: React.RefObject<THREE.Camera | null>;
  onInteract: (nodeId: NodeId) => void;
}

export function NavOverlay({ cameraRef, onInteract }: NavOverlayProps) {
  const { currentNode, isTweening, navigateTo } = useNavigationStore();
  const [cameraYawDeg, setCameraYawDeg] = useState(0);
  const [promptVisible, setPromptVisible] = useState(false);
  const rafRef = useRef<number>(0);

  // Poll camera yaw every frame
  useEffect(() => {
    let mounted = true;
    const tick = () => {
      if (!mounted) return;
      const cam = cameraRef.current;
      if (cam) {
        const euler = new THREE.Euler().setFromQuaternion(cam.quaternion, 'YXZ');
        const yawDeg = euler.y * (180 / Math.PI);
        setCameraYawDeg(yawDeg);

        // Check if facing interact anchor
        const node = NODES[currentNode];
        if (node.interactive) {
          const wx = node.gridPos[0] * 4;
          const wz = node.gridPos[1] * 4;
          const anchor = new THREE.Vector3(
            wx + node.promptAnchor[0],
            node.cameraPos[1] + node.promptAnchor[1],
            wz + node.promptAnchor[2]
          );
          const toAnchor = anchor.clone().sub(cam.position).normalize();
          const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
          setPromptVisible(forward.dot(toAnchor) > 0.35);
        } else {
          setPromptVisible(false);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [cameraRef, currentNode]);

  const currentNodeData = NODES[currentNode];

  // Build navigation arrows
  const arrows = currentNodeData.connectsTo
    .filter((id) => id !== 'sealed-door')
    .map((targetId) => {
      const targetNode = NODES[targetId];
      // World bearing from current to target (degrees, 0=north/-Z, 90=east/+X)
      const worldBearing = bearing(currentNodeData.gridPos, targetNode.gridPos);
      // Convert to screen angle: subtract camera yaw so arrow points in the right screen direction
      const screenAngle = worldBearing - cameraYawDeg;
      // normalise to 0-360
      const normalised = ((screenAngle % 360) + 360) % 360;
      return { targetId, screenAngleDeg: normalised };
    });

  const handleNav = useCallback((id: NodeId) => {
    if (navigateTo) navigateTo(id);
  }, [navigateTo]);

  return (
    <div className="nav-overlay" aria-label="Navigation">
      {/* Nav arrows — always visible, facing correct screen direction */}
      {!isTweening && arrows.map(({ targetId, screenAngleDeg }) => (
        <ArrowButton
          key={targetId}
          targetId={targetId}
          screenAngleDeg={screenAngleDeg}
          onClick={() => handleNav(targetId)}
        />
      ))}

      {/* [E] Interact prompt */}
      {currentNodeData.interactive && !isTweening && (
        <div
          className="interact-prompt"
          style={{ opacity: promptVisible ? 1 : 0, pointerEvents: promptVisible ? 'auto' : 'none' }}
          onClick={() => onInteract(currentNode)}
        >
          {currentNodeData.interactiveLabel}
        </div>
      )}
    </div>
  );
}
