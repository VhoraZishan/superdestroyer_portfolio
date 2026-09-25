// ─── Node Graph Definition ────────────────────────────────────────────────────
// Grid units = 4m. World position = gridPos × 4m on X and Z axes.
// Corridor model faces +Z; rooms face +Z (doorway on +Z wall).
// Camera Y at rest ≈ 1.7m (eye height).

export type NodeId =
  | 'bridge'
  | 'bridge-viewport'
  | 'corridor-1'
  | 'corridor-2'
  | 'corridor-3'
  | 'junction'
  | 'cargo-bay'
  | 'war-room'
  | 'archive'
  | 'sealed-door';

export interface ShipNode {
  id: NodeId;
  /** Grid cell coordinates [x, z]. World pos = [x*4, z*4] */
  gridPos: [number, number];
  /** GLB URL(s) to load for this node's geometry */
  models: string[];
  /** IDs of directly connected nodes */
  connectsTo: NodeId[];
  /** Whether the player can trigger an interactive prompt here */
  interactive: boolean;
  interactiveLabel: string;
  /** Offset from node world-origin where the [E] prompt anchors */
  promptAnchor: [number, number, number];
  /** Camera eye position (world) when player is at this node */
  cameraPos: [number, number, number];
  /** Camera look-at target (world) when arriving at this node */
  cameraLookAt: [number, number, number];
  /** Y-axis rotation (radians) of the geometry placed in the scene */
  rotation?: number;
}

// CDN URLs
const CDN = {
  corridorStraight: 'https://cdn.3dassets.dev/assets/12553/v1/model.glb',
  corridorCross:    'https://cdn.3dassets.dev/assets/12555/v1/model.glb',
  bulkheadDoor:     'https://cdn.3dassets.dev/assets/12556/v1/model.glb',
  bridgeShell:      'https://cdn.3dassets.dev/assets/12565/v1/model.glb',
  cargoBayShell:    'https://cdn.3dassets.dev/assets/12566/v1/model.glb',
  roomShell8x8:     'https://cdn.3dassets.dev/assets/12562/v1/model.glb',
  roomShell6x6:     'https://cdn.3dassets.dev/assets/12560/v1/model.glb',
  helmConsole:      'https://cdn.3dassets.dev/assets/12564/v1/model.glb',
  wallConsole:      'https://cdn.3dassets.dev/assets/12568/v1/model.glb',
  holoTable:        'https://cdn.3dassets.dev/assets/12573/v1/model.glb',
  commandPlatform:  'https://cdn.3dassets.dev/assets/12572/v1/model.glb',
  consoleStation:   'https://cdn.3dassets.dev/assets/12561/v1/model.glb',
  railing2m:        'https://cdn.3dassets.dev/assets/12593/v1/model.glb',
  captainChair:     'https://cdn.3dassets.dev/assets/12569/v1/model.glb',
};

export const ASSET_URLS = CDN;

// Eye height in world units
export const EYE_HEIGHT = 1.7;

// ─── Node definitions ─────────────────────────────────────────────────────────
// gridPos [x, z] — world = [x*4, z*4]
// Bridge at [0,0], corridor run along +Z to junction at [0,4],
// then rooms: cargo-bay [0,6], war-room [2,4], archive [-2,4]

export const NODES: Record<NodeId, ShipNode> = {
  bridge: {
    id: 'bridge',
    gridPos: [0, 0],
    models: [CDN.commandPlatform, CDN.holoTable, CDN.helmConsole],
    connectsTo: ['corridor-1', 'bridge-viewport'],
    interactive: true,
    interactiveLabel: '[E] ACCESS PERSONNEL FILE',
    // Prompt at central holographic war table
    promptAnchor: [0, 0.2, -2.0],
    // Player stands behind the central command console, facing forward towards the viewport
    cameraPos: [0, EYE_HEIGHT, 0],
    cameraLookAt: [0, EYE_HEIGHT, -6],
  },

  'bridge-viewport': {
    id: 'bridge-viewport',
    gridPos: [0, -1],
    models: [CDN.railing2m],
    connectsTo: ['bridge'],
    interactive: true,
    interactiveLabel: '[E] OBSERVE SUPER EARTH',
    promptAnchor: [0, 0.4, -5.8],
    // Player stands right at the floor-to-ceiling panoramic glass looking out at orbit
    cameraPos: [0, EYE_HEIGHT, -5.2],
    cameraLookAt: [0, EYE_HEIGHT - 0.2, -14],
  },

  'corridor-1': {
    id: 'corridor-1',
    gridPos: [0, 1],
    models: [CDN.lockerBank, CDN.storageCrate, CDN.wallConsole],
    connectsTo: ['bridge', 'junction'],
    interactive: true,
    interactiveLabel: '[E] ACCESS LOADOUT',
    promptAnchor: [1.8, 0.4, 0],
    // Positioned in the center of the wide armory bay
    cameraPos: [0, EYE_HEIGHT, 4.8],
    cameraLookAt: [0, EYE_HEIGHT, 9.0],
  },

  'corridor-2': {
    id: 'corridor-2',
    gridPos: [0, 1],
    models: [],
    connectsTo: ['corridor-1'],
    interactive: false,
    interactiveLabel: '',
    promptAnchor: [0, 0, 0],
    cameraPos: [0, EYE_HEIGHT, 4.8],
    cameraLookAt: [0, EYE_HEIGHT, 9.0],
  },

  'corridor-3': {
    id: 'corridor-3',
    gridPos: [0, 1],
    models: [],
    connectsTo: ['corridor-1'],
    interactive: false,
    interactiveLabel: '',
    promptAnchor: [0, 0, 0],
    cameraPos: [0, EYE_HEIGHT, 4.8],
    cameraLookAt: [0, EYE_HEIGHT, 9.0],
  },

  junction: {
    id: 'junction',
    gridPos: [0, 2],
    models: [CDN.corridorCross],
    connectsTo: ['corridor-1', 'cargo-bay', 'war-room', 'archive'],
    interactive: false,
    interactiveLabel: '',
    promptAnchor: [0, 1.2, 0],
    cameraPos: [0, EYE_HEIGHT, 9.0],
    cameraLookAt: [0, EYE_HEIGHT, 15.0],
  },

  'cargo-bay': {
    id: 'cargo-bay',
    gridPos: [0, 3],
    models: [CDN.cargoBayShell],
    connectsTo: ['junction'],
    interactive: false,
    interactiveLabel: '',
    promptAnchor: [0, 1.2, 0],
    // Snapped flush to junction North port (junction z=9, port z=11, room center z=15)
    cameraPos: [0, EYE_HEIGHT, 15.0],
    cameraLookAt: [0, EYE_HEIGHT, 20.0],
  },

  'war-room': {
    id: 'war-room',
    gridPos: [1, 2],
    models: [CDN.roomShell6x6, CDN.holoTable],
    connectsTo: ['junction'],
    interactive: true,
    interactiveLabel: '[E] ACCESS CAMPAIGN MAP',
    promptAnchor: [0, 0.6, 0],
    // Snapped flush to junction East port (junction x=0, port x=2, room center x=5)
    cameraPos: [5.0, EYE_HEIGHT, 9.0],
    cameraLookAt: [8.0, EYE_HEIGHT, 9.0],
  },

  archive: {
    id: 'archive',
    gridPos: [-1, 2],
    models: [CDN.roomShell8x8],
    connectsTo: ['junction'],
    interactive: true,
    interactiveLabel: '[E] ACCESS MISSION RECORDS',
    promptAnchor: [0, 0.6, 0],
    // Snapped flush to junction West port (junction x=0, port x=-2, room center x=-6)
    cameraPos: [-6.0, EYE_HEIGHT, 9.0],
    cameraLookAt: [-9.0, EYE_HEIGHT, 9.0],
  },

  'sealed-door': {
    id: 'sealed-door',
    gridPos: [0, 4],  // same cell as junction, offset visually
    models: [CDN.bulkheadDoor],
    connectsTo: [],
    interactive: false,
    interactiveLabel: '',
    promptAnchor: [0, 1.2, 0],
    cameraPos: [0, EYE_HEIGHT, 16],
    cameraLookAt: [0, EYE_HEIGHT, 16],
  },
};

export const INITIAL_NODE: NodeId = 'bridge';

/** Returns world [x, y, z] center for a node's camera position */
export function nodeWorldPos(node: ShipNode): [number, number, number] {
  return [node.gridPos[0] * 4, 0, node.gridPos[1] * 4];
}
