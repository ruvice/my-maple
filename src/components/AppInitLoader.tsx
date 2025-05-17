import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCharacterStore } from '../store/characterStore';
import { loadCharacters } from '../api';
import { LoadCharacterRequest, TwitchBroadcasterConfiguration } from '../types/types';
import { MapleServer } from '@ruvice/my-maple-models'
import { loadCharacterData } from '../utils/utils';
import { useTwitchStore } from '../store/twitchStore';

export default function AppInitLoader() {
    const queryClient = useQueryClient()
    // Selector based access
    const setCharacters = useCharacterStore((s) => s.setCharacters);
    const setConfiguration = useTwitchStore((s) => s.setConfiguration);
    const setChannelID = useTwitchStore((s) => s.setChannelID);
    const setConfigVersion = useTwitchStore((s) => s.setConfigVersion);
    const getTwitchConfiguration = useTwitchStore((s) => s.getConfiguration);
    const [localTwitchConfiguration, setLocalTwitchConfiguration] = useState<TwitchBroadcasterConfiguration>(getTwitchConfiguration())

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
              setLocalTwitchConfiguration(jsonContent);
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
                setLocalTwitchConfiguration(jsonContent);
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
        if (Object.keys(localTwitchConfiguration).length === 0) {
            return
        };
        const cachedCharacters = loadCharacterData()
        const isCacheEmpty =
            !cachedCharacters ||
            Object.values(MapleServer).every(
                (server) => Object.keys(cachedCharacters[server] ?? {}).length === 0
            );
        if (isCacheEmpty) {
            console.log('Fetching latest character info')
            const loadCharacterRequest: LoadCharacterRequest = {
                configuration: localTwitchConfiguration,
                queryClient: queryClient
            }
            loadCharacters(loadCharacterRequest);
        } else {
            console.log('Using cached character info')
            setCharacters(cachedCharacters);
        }
    }, [localTwitchConfiguration]);

  return (<div></div>);
}
