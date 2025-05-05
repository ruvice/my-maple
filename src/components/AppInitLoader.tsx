import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCharacterStore } from '../store/characterStore';
import { fetchCharacterBasic, fetchCharacterEXP, fetchCharacterItemEquip, fetchCharacterOCID, fetchCharacterSymbol } from '../api/api';
import { OpenAPIOcidQueryResponse, OpenAPICharacterBasicResponse, OpenAPIItemEquipmentResponse, OpenAPISymbolEquipmentResponse } from '../types/types';

const CHARACTER_NAMES = ['ruvicce', 'lqsKniGhT'];

export default function AppInitLoader() {
    const queryClient = useQueryClient()
    // Selector based access
    const setCharacterOCID = useCharacterStore((s) => s.setCharacterOCID);
    const setCharacterBasic =  useCharacterStore((s) => s.setCharacterBasic);
    const setCharacterItemEquip = useCharacterStore((s) => s.setCharacterItemEquip);
    const setCharacterSymbol = useCharacterStore((s) => s.setCharacterSymbol);
    const setCharacterEXP = useCharacterStore((s) => s.setCharacterEXP);

    useEffect(() => {
        const loadCharacters = async () => {
            for (const characterName of CHARACTER_NAMES) {
                try {
                    const ocidRes = await queryClient.fetchQuery<OpenAPIOcidQueryResponse>({
                        queryKey: ['ocid', characterName],
                        queryFn: () => fetchCharacterOCID(characterName),
                    });
                    setCharacterOCID(characterName, ocidRes.ocid);

                    const charBasicRes = await queryClient.fetchQuery<OpenAPICharacterBasicResponse>({
                        queryKey: ['basic', characterName],
                        queryFn: () => fetchCharacterBasic(ocidRes.ocid),
                    });
                    setCharacterBasic(characterName, charBasicRes)
                    setCharacterEXP(characterName, charBasicRes)

                    const itemEquipRes = await queryClient.fetchQuery<OpenAPIItemEquipmentResponse>({
                        queryKey: ['equip', characterName],
                        queryFn: () => fetchCharacterItemEquip(ocidRes.ocid),
                    });
                    setCharacterItemEquip(characterName, itemEquipRes)

                    const symbolRes = await queryClient.fetchQuery<OpenAPISymbolEquipmentResponse>({
                        queryKey: ['symbol', characterName],
                        queryFn: () => fetchCharacterSymbol(ocidRes.ocid),
                    });
                    setCharacterSymbol(characterName, symbolRes);
                    setTimeout(async () => {
                        for (let i = 1; i < 5; i ++) {
                            const charBasicRes = await queryClient.fetchQuery<OpenAPICharacterBasicResponse>({
                                queryKey: ['basic', characterName],
                                queryFn: () => fetchCharacterEXP(ocidRes.ocid, i),
                            });
                            setCharacterEXP(characterName, charBasicRes)
                        }
                    }, 2000)
                    
                    
                } catch (err) {
                    console.warn(`⚠️ Failed to fetch "${characterName}":`, err);
                }
            }
        };

        loadCharacters();
    }, [queryClient, setCharacterOCID]);

  return null;
}
