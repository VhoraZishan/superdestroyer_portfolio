import { useEffect } from 'react';
import { NODES } from '../data/nodes';
import { useNavigationStore } from '../store/navigationStore';
import { useCameraNavigation } from '../hooks/useCameraNavigation';
import { useFreeLook } from '../hooks/useFreeLook';

/**
 * SceneController lives INSIDE the R3F Canvas.
 * It owns: camera tween hook, free-look hook, keyboard [E] handler.
 * Navigation arrows and the interact prompt are rendered as DOM overlays
 * (outside the canvas) so they are always on-screen regardless of camera facing.
 */
interface SceneControllerProps {
  onInteract: (nodeId: string) => void;
}

export function SceneController({ onInteract }: SceneControllerProps) {
  const { currentNode } = useNavigationStore();

  // Activate camera tween (registers navigateTo in store) + free look
  useCameraNavigation();
  useFreeLook();

  // Keyboard [E] handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E') {
        const node = NODES[currentNode];
        if (node.interactive) onInteract(currentNode);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentNode, onInteract]);

  // Nothing rendered into the 3D scene from here — UI is all DOM overlays
  return null;
}
