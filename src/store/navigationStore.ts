import { create } from 'zustand';
import type { NodeId } from '../data/nodes';
import { INITIAL_NODE } from '../data/nodes';

interface NavigationStore {
  currentNode: NodeId;
  previousNode: NodeId | null;
  isTweening: boolean;
  /** Registered by useCameraNavigation inside the Canvas; callable from DOM */
  navigateTo: ((id: NodeId) => void) | null;
  setCurrentNode: (id: NodeId, prev: NodeId) => void;
  setTweening: (v: boolean) => void;
  registerNavigate: (fn: (id: NodeId) => void) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentNode: INITIAL_NODE,
  previousNode: null,
  isTweening: false,
  navigateTo: null,
  setCurrentNode: (id, prev) => set({ currentNode: id, previousNode: prev }),
  setTweening: (v) => set({ isTweening: v }),
  registerNavigate: (fn) => set({ navigateTo: fn }),
}));
