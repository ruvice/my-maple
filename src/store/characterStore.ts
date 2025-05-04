// store/characterStore.ts
import { create } from 'zustand';
import { BasicCharacterInfo, Character, ItemEquipInfo, Ocid } from '../types/types';

interface CharacterStore {
    characters: Record<string, Character>;
    setCharacterOCID: (name: string, ocid: Ocid) => void;
    setCharacterBasic: (name: string, basic: BasicCharacterInfo) => void;
    setCharacterItemEquip: (name: string, itemEquip: ItemEquipInfo) => void;
    getCharacter: (name: string) => Character;
    reset: () => void;
}

export const useCharacterStore = create<CharacterStore>((set, get) => ({
    characters: {},

    setCharacterOCID: (name, ocid) =>
        set((state) => ({
        characters: {
            ...state.characters,
            [name]: {
                ...state.characters[name],
                name,
                ocid,
            },
        },
        })),

    getCharacter: (name) => get().characters[name],

    reset: () => set({ characters: {} }),

    setCharacterBasic: (name: string, basic: BasicCharacterInfo) =>
        set((state) => ({
            characters: {
                ...state.characters,
                [name]: {
                    ...state.characters[name],
                    basic,
                },
            },
    })),

    setCharacterItemEquip: (name: string, itemEquip: ItemEquipInfo) =>
        set((state) => ({
            characters: {
                ...state.characters,
                [name]: {
                    ...state.characters[name],
                    equips: itemEquip,
                },
            },
    })),

}));
