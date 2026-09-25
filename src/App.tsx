import { useState, useCallback } from 'react';
import { SuperDestroyer } from './components/SuperDestroyer';
import { IntroSequence } from './components/IntroSequence';
import { TerminalModal } from './components/TerminalModal';
import { useNavigationStore } from './store/navigationStore';
import { useTerminalStore } from './store/terminalStore';
import type { NodeId } from './data/nodes';
import './index.css';


const NODE_DISPLAY_NAMES: Record<NodeId, string> = {
  bridge: 'Bridge — Command Deck',
  'bridge-viewport': 'Bridge — Observation Deck',
  'corridor-1': 'Armory Corridor',
  'corridor-2': 'Armory Corridor',
  'corridor-3': 'Armory Corridor',
  junction: 'Main Junction',
  'cargo-bay': 'Cargo Bay',
  'war-room': 'War Room',
  archive: 'Archive',
  'sealed-door': 'Restricted',
};

function HUD() {
  const currentNode = useNavigationStore((s) => s.currentNode);
  const isTweening = useNavigationStore((s) => s.isTweening);
  const locationName = NODE_DISPLAY_NAMES[currentNode] ?? currentNode;

  return (
    <div className="hud-root" aria-hidden="true">
      {/* Vignette */}
      <div className="hud-vignette" />
      {/* Scanlines */}
      <div className="hud-scanlines" />

      {/* Corner brackets */}
      <div className="hud-corner tl" />
      <div className="hud-corner tr" />
      <div className="hud-corner bl" />
      <div className="hud-corner br" />

      {/* Location name */}
      <div key={currentNode} className="hud-location">
        SES SUPER DESTROYER
        <span className="hud-divider">—</span>
        {locationName.toUpperCase()}
      </div>

      {/* Crosshair */}
      <div className="hud-crosshair" />

      {/* Status bar */}
      <div className="hud-statusbar">
        {isTweening ? 'NAVIGATING...' : 'DRAG TO LOOK  •  CLICK ARROW TO MOVE  •  [E] TO INTERACT'}
      </div>
    </div>
  );
}


export default function App() {
  // 'intro' → 'main'
  const [phase, setPhase] = useState<'intro' | 'main'>('intro');
  const openTerminal = useTerminalStore((s) => s.openTerminal);

  const handleInteract = useCallback(
    (nodeId: NodeId) => {
      switch (nodeId) {
        case 'bridge':
        case 'bridge-viewport':
          openTerminal('bridge');
          break;
        case 'corridor-1':
        case 'corridor-2':
        case 'corridor-3':
          openTerminal('armory');
          break;
        case 'war-room':
          openTerminal('war-room');
          break;
        case 'archive':
          openTerminal('archive');
          break;
        case 'cargo-bay':
          openTerminal('cargo-bay');
          break;
        default:
          break;
      }
    },
    [openTerminal]
  );

  if (phase === 'intro') {
    return <IntroSequence onComplete={() => setPhase('main')} />;
  }

  return (
    <>
      <HUD />
      <SuperDestroyer onInteract={handleInteract} />
      <TerminalModal />
    </>
  );
}
