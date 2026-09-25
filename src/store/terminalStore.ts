import { create } from 'zustand';

export type TerminalRoom = 'bridge' | 'armory' | 'war-room' | 'archive' | 'cargo-bay';

interface TerminalStore {
  isOpen: boolean;
  activeRoom: TerminalRoom | null;
  activeTab: number;
  selectedItemId: string | null;
  openTerminal: (room: TerminalRoom, initialTab?: number, initialItemId?: string | null) => void;
  closeTerminal: () => void;
  setActiveTab: (tabIndex: number) => void;
  setSelectedItemId: (id: string | null) => void;
}

export const useTerminalStore = create<TerminalStore>((set) => ({
  isOpen: false,
  activeRoom: null,
  activeTab: 0,
  selectedItemId: null,
  openTerminal: (room, initialTab = 0, initialItemId = null) =>
    set({
      isOpen: true,
      activeRoom: room,
      activeTab: initialTab,
      selectedItemId: initialItemId,
    }),
  closeTerminal: () =>
    set({
      isOpen: false,
      activeRoom: null,
      activeTab: 0,
      selectedItemId: null,
    }),
  setActiveTab: (tabIndex) => set({ activeTab: tabIndex }),
  setSelectedItemId: (id) => set({ selectedItemId: id }),
}));
