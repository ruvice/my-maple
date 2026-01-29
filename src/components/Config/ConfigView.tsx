import React, { useCallback, useEffect, useRef, useState } from 'react'
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { MapleServer, OpenAPIOcidQueryResponse } from '@ruvice/my-maple-models'
import { TwitchBroadcasterConfiguration } from '../../types/types'
import { fetchCharacterOCID } from '../../api'
import { useModal } from '../../utils/useModal'
import ChatDialog from '../common/ChatDialog/ChatDialog'
import './ConfigView.css'
import Button, { ButtonType } from '../common/Button/Button'
import RegisteredCharacter from './RegisteredCharacter'
import { useTwitchStore } from '../../store/twitchStore'
import Header from '../common/Header/Header'

const CONFIG_VERSION = "0.0.3"
const DEFAULT_CONFIG: TwitchBroadcasterConfiguration = {
  [MapleServer.KMS]: {},
  [MapleServer.SEA]: {},
  [MapleServer.TMS]: {},
};

function ConfigView() {
  const queryClient = useQueryClient()
  const getTwitchConfiguration = useTwitchStore((s) => s.getConfiguration);

  const [server, setServer] = useState<MapleServer>(MapleServer.KMS)
  const currentServerRef = useRef<MapleServer>(server);

  const [configuration, setConfiguration] =
    useState<TwitchBroadcasterConfiguration>(() => {
      const cfg = getTwitchConfiguration();
      // ensure shape on first run
      return { ...DEFAULT_CONFIG, ...(cfg ?? {}) };
    });

  const [characterName, setCharacterName] = useState('')
  const { showModal, hideModal, ModalRenderer } = useModal();

  useEffect(() => {
    const handler = () => {
      // broadcaster may be null/undefined before first set/handshake
      const broadcaster = window.Twitch.ext.configuration.broadcaster;
      if (!broadcaster) return;

      let content: string;
      if (broadcaster.version !== CONFIG_VERSION) {
        content = JSON.stringify(DEFAULT_CONFIG);
        window.Twitch.ext.configuration.set("broadcaster", CONFIG_VERSION, content);
      } else {
        content = broadcaster.content;
      }

      const jsonContent: TwitchBroadcasterConfiguration = JSON.parse(content);
      const normalized = { ...DEFAULT_CONFIG, ...(jsonContent ?? {}) };

      setConfiguration(normalized);

      if (Object.keys(normalized[MapleServer.KMS]).length > 0) {
        setServer(MapleServer.KMS);
        currentServerRef.current = MapleServer.KMS;
      } else if (Object.keys(normalized[MapleServer.SEA]).length > 0) {
        setServer(MapleServer.SEA);
        currentServerRef.current = MapleServer.SEA;
      } else if (Object.keys(normalized[MapleServer.TMS]).length > 0) {
        setServer(MapleServer.TMS);
        currentServerRef.current = MapleServer.TMS;
      }
    };

    window.Twitch.ext.configuration.onChanged(handler);
    return () => {
      // Twitch helper doesn't always expose an "off", so we can't reliably unsubscribe.
      // But at least we stop re-registering it every render by using useEffect.
    };
  }, []);

  const handleHeaderSelection = (s: MapleServer) => {
    setServer(s)
    currentServerRef.current = s;
  }

  const handleDelete = useCallback((name: string) => {
    const serverKey = currentServerRef.current;
    setConfiguration((prev) => {
      const edited: TwitchBroadcasterConfiguration = {
        ...DEFAULT_CONFIG,
        ...prev,
        [serverKey]: { ...(prev?.[serverKey] ?? {}) },
      };

      delete edited[serverKey][name];

      const newConfig = JSON.stringify(edited);
      window.Twitch.ext.configuration.set("broadcaster", CONFIG_VERSION, newConfig);
      return edited;
    });
  }, []);

  const characters = () => {
    const serverConfig = configuration?.[currentServerRef.current] ?? {};
    return Object.keys(serverConfig).map((name) => (
      <RegisteredCharacter
        key={name}
        characterName={name}
        onClick={() => handleDelete(name)}
      />
    ));
  };

  const handleSubmit = async () => {
    try {
      const serverKey = currentServerRef.current;

      const ocidRes = await queryClient.fetchQuery<OpenAPIOcidQueryResponse>({
        queryKey: ['ocid', serverKey, characterName], // include server to avoid cache collisions
        queryFn: () => fetchCharacterOCID(characterName, serverKey),
      });

      setConfiguration((prev) => {
        const next: TwitchBroadcasterConfiguration = {
          ...DEFAULT_CONFIG,
          ...prev,
          [serverKey]: {
            ...(prev?.[serverKey] ?? {}),
            [characterName]: ocidRes.ocid,
          },
        };

        const newConfig = JSON.stringify(next);
        window.Twitch.ext.configuration.set("broadcaster", CONFIG_VERSION, newConfig);

        return next;
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong, try again later.';
      showModal(
        <p style={{ color: 'white' }}>
          <ChatDialog message={msg} onCancel={hideModal} onClickCTA={hideModal} />
        </p>
      );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className='config-view light-gray-background'>
        <h1 className='config-view-header'>Manage Characters</h1>
        <Header
          options={MapleServer}
          onSelected={handleHeaderSelection}
          currentRef={currentServerRef}
          labelFontSize={18}
          labelFontWeight={700}
        />
        <div className='config-view-grid'>
          <div className='config-view-manage-cell dark-gray-background'>
            <h2 className='config-view-subheader'>Registered Characters</h2>
            {characters()}
          </div>

          <div className='config-view-add-cell dark-gray-background'>
            <h2 className='config-view-subheader'>Add a character</h2>
            <div className='config-view-character-add-section'>
              <textarea
                className="character-name-input"
                placeholder='Enter character name'
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
              />
              <Button type={ButtonType.OK} className="config-view-button" onClick={handleSubmit} label="Submit" />
            </div>
          </div>

          <ModalRenderer />
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default ConfigView
