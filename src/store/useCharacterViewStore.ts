// store/useViewStore.ts
import { create } from 'zustand';
import { ViewMode } from '../constants/viewModes';

type ViewStore = {
    currentView: ViewMode;
    setView: (view: ViewMode) => void;
};

export const useViewStore = create<ViewStore>((set) => ({
  currentView: ViewMode.Equipment,
  setView: (view) => set({ currentView: view })
}));
