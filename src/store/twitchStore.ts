// store/twitchStore.ts
import { create } from 'zustand';
import { TwitchBroadcasterConfiguration } from '../types/types';

interface TwitchStore {
        config: TwitchConfig;
        setChannelID: (channelID: string) => void;
        setConfigVersion: (configVersion: string) => void;
        setConfiguration: (configuration: TwitchBroadcasterConfiguration) => void;
        getChannelID: () => string,
        getConfigVersion: () => string,
        getConfiguration: () => TwitchBroadcasterConfiguration,
        reset: () => void;
}

export type TwitchConfig = {
        configuration: TwitchBroadcasterConfiguration;
        channelID: string;
        configVersion: string;
}
const initialConfig: TwitchConfig = {
        configuration: {},
        channelID: '',
        configVersion: ''
};

export const useTwitchStore = create<TwitchStore>((set, get) => ({
    config: initialConfig,

    setChannelID: (channelID) =>
        set((state) => ({
            config: {
                ...state.config,
                channelID
            }
    
        })),

    setConfigVersion: (configVersion) =>
        set((state) => ({
            config: {
                ...state.config,
                configVersion
            }
        })),

    setConfiguration: (configuration) =>
        set((state) => ({
            config: {
                ...state.config,
                configuration
            }
        })),

    getChannelID: () => get().config.channelID,

    getConfigVersion: () => get().config.configVersion,

    getConfiguration: () => get().config.configuration,

    reset: () =>
        set(() => ({
            config: initialConfig
        }))
}));
