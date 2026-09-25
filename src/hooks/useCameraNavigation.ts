import { useRef, useEffect, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';
import { NODES } from '../data/nodes';
import type { NodeId } from '../data/nodes';
import { useNavigationStore } from '../store/navigationStore';


const BOB_AMPLITUDE = 0.08; // metres vertical bob during walk tween
const TWEEN_DURATION = 1.5;

export function useCameraNavigation() {
  const { camera } = useThree();
  const { currentNode, setCurrentNode, setTweening } = useNavigationStore();
  const tweenRef = useRef<gsap.core.Timeline | null>(null);

  // Place camera at the initial node on first mount
  useEffect(() => {
    const node = NODES[currentNode];
    camera.position.set(...node.cameraPos);
    const lookAt = new THREE.Vector3(...node.cameraLookAt);
    camera.lookAt(lookAt);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const navigateTo = useCallback(
    (targetId: NodeId) => {
      const store = useNavigationStore.getState();
      if (store.isTweening) return;
      if (targetId === store.currentNode) return;

      const fromNode = NODES[store.currentNode];
      const toNode = NODES[targetId];

      const startPos = camera.position.clone();
      const endPos = new THREE.Vector3(...toNode.cameraPos);
      const endLookAt = new THREE.Vector3(...toNode.cameraLookAt);

      store.setTargetNode(targetId);
      setTweening(true);

      // Kill any in-flight tween
      tweenRef.current?.kill();

      // Intermediate object to drive GSAP
      const proxy = {
        x: startPos.x,
        y: startPos.y,
        z: startPos.z,
        t: 0, // 0→1 for look-at interpolation
      };

      // Compute start lookAt direction
      const startLookAt = new THREE.Vector3(
        ...fromNode.cameraLookAt
      );
      const startDir = startLookAt.clone().sub(startPos).normalize();
      const endDir = endLookAt.clone().sub(endPos).normalize();

      const tl = gsap.timeline({
        onUpdate: () => {
          camera.position.set(proxy.x, proxy.y, proxy.z);

          // Slerp look direction
          const curDir = new THREE.Vector3().lerpVectors(startDir, endDir, proxy.t).normalize();
          const lookTarget = new THREE.Vector3(
            proxy.x + curDir.x * 3,
            proxy.y + curDir.y * 3,
            proxy.z + curDir.z * 3
          );
          camera.lookAt(lookTarget);
        },
        onComplete: () => {
          setCurrentNode(targetId, store.currentNode);
          setTweening(false);
          // Snap camera exactly
          camera.position.set(...toNode.cameraPos);
          camera.lookAt(endLookAt);
        },
      });

      // Main position tween with ease
      tl.to(proxy, {
        x: endPos.x,
        y: endPos.y,
        z: endPos.z,
        t: 1,
        duration: TWEEN_DURATION,
        ease: 'power2.inOut',
      }, 0);

      // Vertical bob (sine wave) overlaid on top
      const midY = (startPos.y + endPos.y) / 2 + BOB_AMPLITUDE;
      tl.to(proxy, {
        y: midY,
        duration: TWEEN_DURATION / 2,
        ease: 'sine.out',
        yoyo: true,
        repeat: 1,
      }, 0);

      tweenRef.current = tl;
    },
    [camera, setCurrentNode, setTweening]
  );

  // Register navigateTo in the store so DOM overlays can call it
  const { registerNavigate } = useNavigationStore();
  useEffect(() => {
    registerNavigate(navigateTo);
    return () => registerNavigate(() => {}); // cleanup on unmount
  }, [navigateTo, registerNavigate]);

  return { navigateTo };
}
