import React, { useCallback, useRef, useState } from 'react'
import {
    QueryClientProvider,
    useQueryClient,
  } from '@tanstack/react-query'
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

function ConfigView() {
    const queryClient = useQueryClient()
    const getTwitchConfiguration = useTwitchStore((s) => s.getConfiguration);
    const [server, setServer] = useState<MapleServer>(MapleServer.KMS)
    const currentServerRef = useRef<MapleServer>(server);
    const [configuration, setConfiguration] = useState<TwitchBroadcasterConfiguration>(getTwitchConfiguration())
    const [characterName, setCharacterName] = useState('')
    const { showModal, hideModal, ModalRenderer } = useModal();
    const handleHeaderSelection = (server: MapleServer) => {
        setServer(server)
        currentServerRef.current = server;
    }

    window.Twitch.ext.configuration.onChanged(() => {
        if (window.Twitch.ext.configuration.broadcaster) {
            const content = window.Twitch.ext.configuration.broadcaster.content
            const jsonContent: TwitchBroadcasterConfiguration = JSON.parse(content)
            setConfiguration(jsonContent)
            setServer(MapleServer.SEA)
            currentServerRef.current = MapleServer.SEA;
            // if (Object.keys(jsonContent[MapleServer.KMS]).length > 0) {
            //     setServer(MapleServer.KMS)
            //     currentServerRef.current = MapleServer.KMS;
            // } else if (Object.keys(jsonContent[MapleServer.SEA]).length > 0) {
            //     setServer(MapleServer.SEA)
            //     currentServerRef.current = MapleServer.SEA;
            // }
        }
    })
    const handleDelete = useCallback((characterName: string) => {
        const editedConfig = { ...configuration };
        delete editedConfig[server][characterName];
        const newConfig = JSON.stringify(editedConfig);
        window.Twitch.ext.configuration.set("broadcaster", "1.0", newConfig);
        setConfiguration(editedConfig)
    }, [configuration]);
    
    const characters = () => {
        return Object.keys(configuration[currentServerRef.current]).map((characterName) => {
            return <RegisteredCharacter characterName={characterName} onClick={() => handleDelete(characterName)}/>
        })
    }

    const handleSubmit = async () => {
        try {
            const ocidRes = await queryClient.fetchQuery<OpenAPIOcidQueryResponse>({
                queryKey: ['ocid', characterName],
                queryFn: () => fetchCharacterOCID(characterName, currentServerRef.current),
            });
            const newConfig = JSON.stringify(
                { 
                    ...configuration,
                    [currentServerRef.current]: {
                        ...configuration[currentServerRef.current],
                        [characterName]: ocidRes.ocid 
                    }
                })
            const timestamp = Date.now().toString();
            window.Twitch.ext.configuration.set("broadcaster", timestamp, newConfig)
            setConfiguration((prev) => (
                { 
                    ...prev,
                    [currentServerRef.current]: {
                        ...configuration[currentServerRef.current],
                        [characterName]: ocidRes.ocid 
                    } 
                }
            ))
        } catch (err) {
            if (err instanceof Error) {
                showModal(<p style={{color: 'white'}}><ChatDialog message={err.message} onCancel={hideModal} onClickCTA={hideModal} /></p>)
            } else {
                showModal(<p style={{color: 'white'}}><ChatDialog message={'Something went wrong, try again later.'} onCancel={hideModal} onClickCTA={hideModal} /></p>)
            }
        }
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div className='config-view light-gray-background'>
                <h1 className='config-view-header'>Manage Characters</h1>
                <Header 
                    options={MapleServer} 
                    onSelected={handleHeaderSelection}
                    currentRef={currentServerRef}
                    labelFontSize={18}
                    labelFontWeight={700} />
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
                            onChange={(e) => setCharacterName(e.target.value)} // 3. Update state
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