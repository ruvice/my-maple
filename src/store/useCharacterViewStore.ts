// store/useViewStore.ts
import { create } from 'zustand';
import { ViewMode } from '../constants/viewModes';
import { MapleServer } from '@ruvice/my-maple-models';

type ViewStore = {
    currentServer: MapleServer;
    currentView: ViewMode;
    validServers: MapleServer[];
    setView: (view: ViewMode) => void;
    setCurrentServer: (server: MapleServer) => void;
    getCurrentServer: () => MapleServer;
    setValidServers: (servers: MapleServer[]) => void;
    getValidServers: () => MapleServer[];
};

export const useViewStore = create<ViewStore>((set, get) => ({
    currentServer: MapleServer.KMS,
    currentView: ViewMode.Ability,
    validServers: [],
    setView: (view) => set({ currentView: view }),
    setCurrentServer: (server) => set({ currentServer: server }),
    getCurrentServer: () => get().currentServer,
    getValidServers: () => get().validServers,
    setValidServers: (validServers) => set({ validServers: validServers}),
}));
