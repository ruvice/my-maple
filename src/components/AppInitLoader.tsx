import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCharacterStore } from '../store/characterStore';
import { fetchCharacter } from '../api';
import { TwitchBroadcasterConfiguration, ProxyCharacterResponse } from '../types/types';
import { loadCharacterData, saveCharacterData } from '../utils/utils';

export default function AppInitLoader() {
    const queryClient = useQueryClient()
    // Selector based access
    const setCharacters = useCharacterStore((s) => s.setCharacters);
    const getCharacters = useCharacterStore((s) => s.getCharacters);
    const setCharacter = useCharacterStore((s) => s.setCharacter);
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
        const loadCharacters = async() => {{
            for (const characterName of Object.keys(configuration)) {
                const charRes = await queryClient.fetchQuery<ProxyCharacterResponse>({
                    queryKey: ['character', characterName],
                    queryFn: () => fetchCharacter(characterName),
                });
                setCharacter(characterName, charRes);
            }
            const fetchedCharacters = getCharacters()
            console.log('Caching latest character info')
            saveCharacterData(channelID, configVersison, fetchedCharacters)
        }}
        const cachedCharacters = loadCharacterData(channelID, configVersison)
        if (cachedCharacters == null || Object.keys(cachedCharacters).length === 0) {
            console.log('Fetching latest character info')
            loadCharacters();
        } else {
            console.log('Using cached character info')
            setCharacters(cachedCharacters);
        }
    }, [configuration]);

  return (<div></div>);
}
