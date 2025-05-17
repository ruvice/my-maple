import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Character, getLocalisedCharacterClass, MapleServer } from '@ruvice/my-maple-models'
import "./CharacterCard.css"
import CharacterEquipmentView from './CharacterEquipmentView'
import { ViewMode } from '../constants/viewModes';
import { useViewStore } from '../store/useCharacterViewStore'
import Header from './common/Header/Header'
import CharacterAbilityView from './CharacterAbilityView'
import CharacterSymbolView from './CharacterSymbolView'
import CharacterExpView from './CharacterExpView'
import { imageMap, backgroundMap } from '../utils/imageMap'
import { ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';
import { loadCharacters } from '../api'
import { LoadCharacterRequest } from '../types/types';
import { useQueryClient } from '@tanstack/react-query';
import { useModal } from '../utils/useModal';
import Tooltip from './common/Tooltip/Tooltip';
import CharacterCardExternalLinks from './CharacterCardExternalLinks';

type CharacterCardProps = {
    character: Character;
    onNext: () => void;
    onPrev: () => void;
}

function CharacterCard(props: CharacterCardProps) {
    const { character, onNext, onPrev } = props
    const { currentView, setView, currentServer, setCurrentServer } = useViewStore();
    const { showModal, hideModal, ModalRenderer } = useModal();
    const currentServerRef = useRef(currentServer);
    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
    const currentViewRef = useRef<ViewMode>(currentView);
    const queryClient = useQueryClient()
    const handleServerHeaderSelection = (server: MapleServer) => {
        setCurrentServer(server);
        currentServerRef.current = server
    }

    const handleCharacterInfoHeaderSelection = (mode: ViewMode) => {
        setView(mode)
        currentViewRef.current = mode;
    }

    if (character.basic === undefined) {
        return <div>Failed to retreive character information</div>
    }
    const jobName = getLocalisedCharacterClass(character.basic.character_class, currentServer)
    const background = imageMap[character.basic.character_class];
    const overlayBackground = backgroundMap[character.basic.character_class]

    const refreshData = () => {
        const loadCharacterRequest: LoadCharacterRequest = {
            queryClient: queryClient
        }
        loadCharacters(loadCharacterRequest)
    }

    const handlePointerEnter = (e: React.PointerEvent<Element>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        hoverTimeout.current = setTimeout(() => {
            showModal(<Tooltip message="Data updated every 20 minutes" position={rect} />, true)
        }, 200); // 200ms delay
    }

    const handlePointerLeave = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = null;
        }
        hideModal()
    }
    return (
        <div 
            className="character-card"
            style={{
                backgroundImage: overlayBackground ? `url(${overlayBackground})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div
                className='character-card-job-image'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: background ? `url(${background})` : undefined,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }} >
            <Header 
                options={MapleServer} 
                onSelected={handleServerHeaderSelection} 
                currentRef={currentServerRef} />
            <div className="character-info-grid">
                <div className="character-card-controls"><ArrowLeft color={'white'} size={12} onClick={onPrev}/></div>
                <div className='character-card-basic-info-container'>
                    <div className="character-card-image-div">
                        <img className="character-card-image" src={character.basic?.character_image}></img>
                    </div>
                    <div className="character-basic-info">
                        <div className='character-basic-name'>
                            <p className="`character-card`-line-text character-name bold-text">{character.basic?.character_name}</p>
                            <RotateCw className="character-card-refresh" 
                                color={'white'} 
                                size={12} 
                                onClick={refreshData} 
                                onPointerEnter={handlePointerEnter}
                                onPointerLeave={handlePointerLeave}
                                />
                        </div>
                        <p className="character-card-line-text">{jobName}</p>
                        <p className="character-card-line-text">Level {character.basic?.character_level}</p>
                        <p className="character-card-line-text">{character.basic?.world_name}</p>
                    </div>
                </div>
                <div className="character-card-controls"><ArrowRight color={'white'} size={12} onClick={onNext}/></div>
                <CharacterCardExternalLinks character={character} />
            </div>
            <Header options={ViewMode} onSelected={handleCharacterInfoHeaderSelection} currentRef={currentViewRef} />
            <div className="character-detailed-info">
                {currentView === ViewMode.Ability && <CharacterAbilityView stat={character.stat}/>}
                {currentView === ViewMode.Equipment && 
                <CharacterEquipmentView 
                    active={character.equips?.item_equipment} 
                    preset1={character.equips?.item_equipment_preset_1} 
                    preset2={character.equips?.item_equipment_preset_2} 
                    preset3={character.equips?.item_equipment_preset_3} />}
                {currentView === ViewMode.Symbols && <CharacterSymbolView symbol={character.symbol}/>}
                {currentView === ViewMode.EXP && <CharacterExpView expProgression={character.expProgression}/>}
            </div>
            </div>
            <ModalRenderer />
        </div>
    )
}

export default CharacterCard