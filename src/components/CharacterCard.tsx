import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useCharacterStore } from '../store/characterStore'
import { Character } from '../types/types'
import EquipmentCard from './Equipment/EquipmentCard'
import "./CharacterCard.css"
import EquipmentLayout from './Equipment/EquipmentLayout'
import CharacterEquipmentView from './CharacterEquipmentView'
import { ViewMode } from '../constants/viewModes';
import { useViewStore } from '../store/useCharacterViewStore'
import Header from './common/Header/Header'
import CharacterAbilityView from './CharacterAbilityView'
import CharacterSymbolView from './CharacterSymbolView'
import CharacterExpView from './CharacterExpView'
import mapleScouterLogo from '../assets/maplescouter_logo.png'
import mapleStalkerSeaLogo from '../assets/maplestalkersea_logo.png'
import MapleGGLogo from '../assets/MapleGGLogo'
import { imageMap, backgroundMap } from '../utils/imageMap'
import { ArrowLeft, ArrowRight } from 'lucide-react';

type CharacterCardProps = {
    character: Character;
    onNext: () => void;
    onPrev: () => void;
}

function CharacterCard(props: CharacterCardProps) {
    const { character, onNext, onPrev } = props
    const { currentView, setView } = useViewStore();
    const currentViewRef = useRef<ViewMode>(currentView);
    const handleHeaderSelection = (mode: ViewMode) => {
        setView(mode)
        currentViewRef.current = mode;
    }

    const jobName = character.basic?.character_class ?? ''
    const background = imageMap[jobName];
    const overlayBackground = backgroundMap[jobName]

    if (character.basic === undefined) {
        return <div>Failed to retreive character information</div>
    }
    const mapleScouterURL = 'https://www.mapleseascouter.com/character/' + character.ocid
    const mapleStalkerSeaURL = 'https://www.maplestalkersea.com/equipment?character=' + character.name
    const mapleGGURL = 'https://msea.maple.gg/u/' + character.name
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
            <div className="character-info-grid">
                
                <div className="character-card-controls"><ArrowLeft color={'white'} size={12} onClick={onPrev}/></div>
                <div className='character-card-basic-info-container'>
                    <div className="character-card-image-div">
                        <img className="character-card-image" src={character.basic?.character_image}></img>
                    </div>
                    <div className="character-basic-info">
                        <p className="`character-card`-line-text character-name bold-text">{character.basic?.character_name}</p>
                        <p className="character-card-line-text">{character.basic?.character_class}</p>
                        <p className="character-card-line-text">Level {character.basic?.character_level}</p>
                        <p className="character-card-line-text">{character.basic?.world_name}</p>
                    </div>
                </div>
                <div className="character-card-controls"><ArrowRight color={'white'} size={12} onClick={onNext}/></div>
                <div className='character-card-logo-container'>
                    <img className="character-card-logo-image character-card-logo" src={mapleScouterLogo} alt="MapleScouter" onClick={() => window.open(mapleScouterURL, '_blank')}/>
                    <img className="character-card-logo-image character-card-logo" src={mapleStalkerSeaLogo} alt="MapleStalkerSEA" onClick={() => window.open(mapleStalkerSeaURL, '_blank')}/>
                    <MapleGGLogo className="character-card-logo" onClick={() => window.open(mapleGGURL, '_blank')} />
                </div>
            </div>
            <Header options={ViewMode} onSelected={handleHeaderSelection} currentRef={currentViewRef} />
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
        </div>
    )
}

export default CharacterCard