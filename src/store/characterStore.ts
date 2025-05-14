    // store/characterStore.ts
    import { create } from 'zustand';
    import { StatInfo, BasicCharacterInfo, Character, ExpData, ItemEquipInfo, Ocid, SymbolInfo } from '@ruvice/my-maple-models';

    interface CharacterStore {
        characters: Characters;
        setCharacterOCID: (name: string, ocid: Ocid) => void;
        setCharacterBasic: (name: string, basic: BasicCharacterInfo) => void;
        setCharacterItemEquip: (name: string, itemEquip: ItemEquipInfo) => void;
        setCharacterSymbol: (name: string, symbol: SymbolInfo) => void;
        setCharacterStat: (name: string, symbol: StatInfo) => void;
        setCharacterEXP: (name: string, basic: BasicCharacterInfo) => void;
        getCharacter: (name: string) => Character;
        setCharacters: (characters:  Characters) => void;
        getCharacters: () => Characters;
        setCharacter: (name: string, character: Character) => void;
        reset: () => void;
    }

    export type Characters = Record<string, Character>;

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

        setCharacterSymbol: (name: string, symbol: SymbolInfo) =>
            set((state) => ({
                characters: {
                    ...state.characters,
                    [name]: {
                        ...state.characters[name],
                        symbol: symbol,
                    },
                },
        })),

        setCharacterEXP: (name: string, basic: BasicCharacterInfo) => {
            const expData: ExpData = {
                date: basic.date,
                exp: basic.character_exp,
                exp_rate: basic.character_exp_rate.toString()
            };
            
            set((state) => {
                const existing = state.characters[name];
                const progression = existing?.expProgression ?? [];
            
                return {
                    characters: {
                        ...state.characters,
                        [name]: {
                            ...existing,
                            expProgression: [...progression, expData],
                        },
                    },
                };
            });
        },

        
        setCharacterStat: (name: string, stat: StatInfo) =>
            set((state) => ({
                characters: {
                    ...state.characters,
                    [name]: {
                        ...state.characters[name],
                        stat: stat,
                    },
                },
        })),

        setCharacters: (charaters: Characters) => {
            set(() => ({ characters: charaters }));
        },

        getCharacters: () => get().characters,

        setCharacter: (name: string, character: Character) => {
            set((state) => ({
                characters: {
                    ...state.characters,
                    [name]: character,
                },
            })) 
        }
    }));
