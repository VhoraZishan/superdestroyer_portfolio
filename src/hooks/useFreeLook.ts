import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useNavigationStore } from '../store/navigationStore';

const PITCH_LIMIT = THREE.MathUtils.degToRad(40); // ±40°

export function useFreeLook() {
  const { camera, gl } = useThree();
  const { isTweening } = useNavigationStore();
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));

  // Sync euler from current camera on mount
  useEffect(() => {
    euler.current.setFromQuaternion(camera.quaternion, 'YXZ');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.style.touchAction = 'none';

    const lastPointerTime = { current: 0 };

    const handleStart = (clientX: number, clientY: number) => {
      if (isTweening) return;
      isDragging.current = true;
      lastPos.current = { x: clientX, y: clientY };
    };

    const handleMove = (clientX: number, clientY: number, isTouchInput: boolean) => {
      if (!isDragging.current || isTweening) return;
      const dx = clientX - lastPos.current.x;
      const dy = clientY - lastPos.current.y;
      lastPos.current = { x: clientX, y: clientY };

      // Responsive sensitivity: Mobile touch needs higher responsiveness so a natural swipe turns the camera
      const isMobile = window.innerWidth < 768 || isTouchInput;
      const sensitivity = isMobile ? 0.0085 : 0.0035;

      euler.current.y -= dx * sensitivity;
      euler.current.x -= dy * sensitivity;
      euler.current.x = THREE.MathUtils.clamp(euler.current.x, -PITCH_LIMIT, PITCH_LIMIT);
      camera.quaternion.setFromEuler(euler.current);
    };

    const handleEnd = () => {
      isDragging.current = false;
    };

    // Pointer event handlers
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      handleStart(e.clientX, e.clientY);
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        // Fallback for browsers that don't support pointer capture on touch
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      lastPointerTime.current = performance.now();
      handleMove(e.clientX, e.clientY, e.pointerType === 'touch');
    };

    const onPointerUp = (e: PointerEvent) => {
      handleEnd();
      try {
        if (canvas.hasPointerCapture(e.pointerId)) {
          canvas.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Safe fallback
      }
    };

    // Touch event fallback for mobile iOS Safari / Android WebViews
    const onTouchStart = (e: TouchEvent) => {
      if (isDragging.current || e.touches.length !== 1) return;
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || isTweening || e.touches.length !== 1) return;
      if (e.cancelable) e.preventDefault();
      // Skip if pointer events already handled this touch frame
      if (performance.now() - lastPointerTime.current < 25) return;
      handleMove(e.touches[0].clientX, e.touches[0].clientY, true);
    };

    const onTouchEnd = () => {
      handleEnd();
    };

    // Attach start on canvas
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    // Native touch listeners with passive: false to prevent browser gesture interception
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);

      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [camera, gl, isTweening]);

  // Re-sync euler yaw/pitch when tween finishes so we don't snap on next drag
  useEffect(() => {
    if (!isTweening) {
      euler.current.setFromQuaternion(camera.quaternion, 'YXZ');
    }
  }, [isTweening, camera]);
}
