// store/characterStore.ts
import { create } from 'zustand';
import {
  StatInfo,
  BasicCharacterInfo,
  Character,
  ExpData,
  ItemEquipInfo,
  Ocid,
  SymbolInfo,
  MapleServer
} from '@ruvice/my-maple-models';

export type Characters = Record<string, Character>;
export type ServerCharacters = Record<MapleServer, Characters>;

interface CharacterStore {
  server: ServerCharacters;

  setCharacterOCID: (name: string, server: MapleServer, ocid: Ocid) => void;
  setCharacterBasic: (name: string, server: MapleServer, basic: BasicCharacterInfo) => void;
  setCharacterItemEquip: (name: string, server: MapleServer, itemEquip: ItemEquipInfo) => void;
  setCharacterSymbol: (name: string, server: MapleServer, symbol: SymbolInfo) => void;
  setCharacterStat: (name: string, server: MapleServer, stat: StatInfo) => void;
  setCharacterEXP: (name: string, server: MapleServer, expData: ExpData) => void;

  setCharacters: (characters: ServerCharacters) => void;
  getServerCharacters: () => ServerCharacters;
  getCharacter: (name: string, server: MapleServer) => Character | undefined;
  setCharacter: (name: string, server: MapleServer, character: Character) => void;

  reset: () => void;
}

const initialServerCharacters: ServerCharacters = {
  [MapleServer.KMS]: {},
  [MapleServer.SEA]: {},
  [MapleServer.TMS]: {}
};

export const useCharacterStore = create<CharacterStore>((set, get) => ({
  server: initialServerCharacters,

  setCharacterOCID: (name, server, ocid) =>
    set((state) => ({
      server: {
        ...state.server,
        [server]: {
          ...state.server[server],
          [name]: {
            ...(state.server[server]?.[name] || {}),
            name,
            ocid
          }
        }
      }
    })),

  setCharacterBasic: (name, server, basic) =>
    set((state) => ({
      server: {
        ...state.server,
        [server]: {
          ...state.server[server],
          [name]: {
            ...state.server[server][name],
            basic
          }
        }
      }
    })),

  setCharacterItemEquip: (name, server, itemEquip) =>
    set((state) => ({
      server: {
        ...state.server,
        [server]: {
          ...state.server[server],
          [name]: {
            ...state.server[server][name],
            equips: itemEquip
          }
        }
      }
    })),

  setCharacterSymbol: (name, server, symbol) =>
    set((state) => ({
      server: {
        ...state.server,
        [server]: {
          ...state.server[server],
          [name]: {
            ...state.server[server][name],
            symbol
          }
        }
      }
    })),

  setCharacterStat: (name, server, stat) =>
    set((state) => ({
      server: {
        ...state.server,
        [server]: {
          ...state.server[server],
          [name]: {
            ...state.server[server][name],
            stat
          }
        }
      }
    })),

  setCharacterEXP: (name, server, expData) =>
    set((state) => {
      const existing = state.server[server]?.[name] || {};
      const progression = existing.expProgression || [];
      return {
        server: {
          ...state.server,
          [server]: {
            ...state.server[server],
            [name]: {
              ...existing,
              expProgression: [...progression, expData]
            }
          }
        }
      };
    }),

  getCharacter: (name, server) => get().server[server]?.[name],

  setCharacter: (name, server, character) =>
    set((state) => ({
      server: {
        ...state.server,
        [server]: {
          ...state.server[server],
          [name]: character
        }
      }
    })),

  setCharacters: (characters) => set(() => ({ server: characters })),

  getServerCharacters: () => get().server,

  reset: () => set(() => ({ server: initialServerCharacters }))
}));
