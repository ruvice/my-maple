import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCharacterStore } from '../store/characterStore';
import { fetchCharacterStat, fetchCharacterBasic, fetchCharacterEXP, fetchCharacterItemEquip, fetchCharacterOCID, fetchCharacterSymbol } from '../api';
import { OpenAPIOcidQueryResponse, OpenAPICharacterBasicResponse, OpenAPIItemEquipmentResponse, OpenAPISymbolEquipmentResponse, OpenAPIStatResponse, TwitchBroadcasterConfiguration } from '../types/types';
import { delay, loadCharacterData, saveCharacterData } from '../utils/utils';


// const CHARACTERS = ['CalIMeSick']
// const CHARACTERS = ['Teddy', 'vChronicles', 'EunwolWrath', 'Bell', 'GildThief', 'kanna', 'Derps', 'HuatAr', 'xSlade', 'Yameeetee', 'Luxe', 'Topup', 'Mavlon',
//     'HuiWern', 'xArqueirox', 'QwertyQwerta', 'ahWanx', 'CutieZiin', 'Infinitise', 'UACollector', 'EvilSyn', 'xCardFantasy', 'wollip', 'tutu', 'Kotori', 'Squaabs', 'hell',
//     'Nimbex', 'StonerDatz', 'aveei', 'ShotaYearOld', 'Kechevoral', 'Kurumaisu', 'rulcia', 'PongYourHead', 'PompomFish', 'xXxAYMONxXx', 'Protect', 'Ambedo', 'Evan',
//     'CocoaBeanx3', 'RedDLuffy', 'MySoulForYou', 'ColaRoo', 'CallMeSick', 'Screws', 'Chocoholic', 'Artcore'
// ]

// // const CHARACTERS2 = ['CutieZiin', 'Infinitise', 'UACollector', 'EvilSyn', 'xCardFantasy', 'wollip', 'tutu', 'Kotori', 'Squaabs', 'hell',
// //     'Nimbex', 'StonerDatz', 'aveei', 'ShotaYearOld', 'Kechevoral', 'Kurumaisu', 'rulcia', 'PongYourHead', 'PompomFish', 'xXxAYMONxXx', 'Protect', 'Ambedo', 'Evan',
// //     'CocoaBeanx3', 'RedDLuffy', 'MySoulForYou', 'ColaRoo', 'CallMeSick', 'Screws', 'Chocoholic', 'Artcore'
// // ]

export default function AppInitLoader() {
    const queryClient = useQueryClient()
    // Selector based access
    const setCharacterOCID = useCharacterStore((s) => s.setCharacterOCID);
    const setCharacterBasic =  useCharacterStore((s) => s.setCharacterBasic);
    const setCharacterItemEquip = useCharacterStore((s) => s.setCharacterItemEquip);
    const setCharacterSymbol = useCharacterStore((s) => s.setCharacterSymbol);
    const setCharacterStat = useCharacterStore((s) => s.setCharacterStat);
    const setCharacterEXP = useCharacterStore((s) => s.setCharacterEXP);
    const setCharacters = useCharacterStore((s) => s.setCharacters);
    const getCharacters = useCharacterStore((s) => s.getCharacters);
    const [configuration, setConfiguration] = useState<TwitchBroadcasterConfiguration>({})
    const [channelID, setChannelID] = useState<string>("")
    const [configVersison, setConfigVersion] = useState<string>("")
    useEffect(() => {
        const interval = setInterval(() => {
          if (window.Twitch && window.Twitch.ext && window.Twitch.ext.configuration?.broadcaster) {
      
            window.Twitch.ext.onAuthorized((auth) => {
                setChannelID(auth.channelId);
            })
            const content = window.Twitch.ext.configuration.broadcaster.content;
            const configVersion = window.Twitch.ext.configuration.broadcaster?.version;
            try {
              const jsonContent = JSON.parse(content);
              setConfiguration(jsonContent);
              setConfigVersion(configVersion);
            } catch (err) {
              console.warn('Failed to parse broadcaster config', err);
            }
      
            window.Twitch.ext.configuration.onChanged(() => {
              const content = window.Twitch.ext.configuration.broadcaster?.content;
              if (content === undefined || configVersion === undefined) {
                console.warn('No broadcaster config found');
                return
              }
              try {
                const jsonContent = JSON.parse(content);
                setConfiguration(jsonContent);
                setConfigVersion(configVersion);
              } catch (err) {
                console.warn('Failed to parse broadcaster config onChanged', err);
              }
            });
      
            clearInterval(interval);
          }
        }, 100); // Check every 100ms
      
        return () => clearInterval(interval); // Clean up on unmount
      }, []);
      
    useEffect(() => {
        if (Object.keys(configuration).length === 0) {
            return
        };
        const loadCharacters = async () => {
            for (const characterName of Object.keys(configuration)) {
            // for (const characterName of CHARACTERS) {
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
                    setCharacterBasic(characterName, charBasicRes);
                    setCharacterEXP(characterName, charBasicRes);

                    const itemEquipRes = await queryClient.fetchQuery<OpenAPIItemEquipmentResponse>({
                        queryKey: ['equip', characterName],
                        queryFn: () => fetchCharacterItemEquip(ocidRes.ocid),
                    });
                    setCharacterItemEquip(characterName, itemEquipRes);

                    const symbolRes = await queryClient.fetchQuery<OpenAPISymbolEquipmentResponse>({
                        queryKey: ['symbol', characterName],
                        queryFn: () => fetchCharacterSymbol(ocidRes.ocid),
                    });
                    setCharacterSymbol(characterName, symbolRes);

                    const statRes = await queryClient.fetchQuery<OpenAPIStatResponse>({
                        queryKey: ['stat', characterName],
                        queryFn: () => fetchCharacterStat(ocidRes.ocid),
                    });
                    setCharacterStat(characterName, statRes);

                    // Optional EXP history delay
                    for (let i = 1; i < 5; i++) {
                        await delay(500); // short pause between EXP fetches
                        const expRes = await queryClient.fetchQuery<OpenAPICharacterBasicResponse>({
                            queryKey: [`basic${i}`, characterName],
                            queryFn: () => fetchCharacterEXP(ocidRes.ocid, i),
                        });
                        setCharacterEXP(characterName, expRes);
                    }
                } catch (err) {
                    console.warn(`⚠️ Failed to fetch "${characterName}":`, err);
                }

                // Wait 2 seconds before moving to next character
                await delay(500);
            }
            const fetchedCharacters = getCharacters()
            console.log('Caching latest character info')
            saveCharacterData(channelID, configVersison, fetchedCharacters)
        };
        const cachedCharacters = loadCharacterData(channelID, configVersison)
        if (cachedCharacters == null) {
            console.log('Fetching latest character info')
            loadCharacters();
        } else {
            console.log('Using cahced character info')
            setCharacters(cachedCharacters);
        }
    }, [configuration]);

  return (<div></div>);
}
