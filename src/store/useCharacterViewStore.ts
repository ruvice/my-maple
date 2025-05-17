// store/useViewStore.ts
import { create } from 'zustand';
import { ViewMode } from '../constants/viewModes';
import { MapleServer } from '@ruvice/my-maple-models';

type ViewStore = {
    currentServer: MapleServer;
    currentView: ViewMode;
    setView: (view: ViewMode) => void;
    setCurrentServer: (server: MapleServer) => void;
    getCurrentServer: () => MapleServer;
};

export const useViewStore = create<ViewStore>((set, get) => ({
    currentServer: MapleServer.KMS,
    currentView: ViewMode.Ability,
    setView: (view) => set({ currentView: view }),
    setCurrentServer: (server) => set({ currentServer: server }),
    getCurrentServer: () => get().currentServer,
}));
