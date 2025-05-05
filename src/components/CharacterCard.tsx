import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useCharacterStore } from '../store/characterStore'
import { Character } from '../types/types'
import EquipmentCard from './Equipment/EquipmentCard'
import "./CharacterCard.css"
import EquipmentLayout from './Equipment/EquipmentLayout'
import CharacterEquipmentView from './CharacterEquipmentView'
import { ViewMode } from '../constants/viewModes';
import { useViewStore } from '../store/useCharacterViewStore'
import Header from './Header/Header'
import CharacterAbilityView from './CharacterAbilityView'
import CharacterSymbolView from './CharacterSymbolView'
import CharacterExpView from './CharacterExpView'

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

    if (character.basic === undefined) {
        return <div>Failed to retreive character information</div>
    }
    return (
        <div className="character-card">
            <div className="character-info-grid">
                <div className="character-card-controls"><p className="character-card-controls-text" onClick={onPrev}>{'<'}</p></div>

                <div className="character-card-image-div">
                    <img className="character-card-image" src={character.basic?.character_image}></img>
                </div>
                <div className="character-basic-info">
                    <p className="character-card-line-text character-name">{character.basic?.character_name}</p>
                    <p className="character-card-line-text">{character.basic?.character_class}</p>
                    <p className="character-card-line-text">Level {character.basic?.character_level}</p>
                    <p className="character-card-line-text">{character.basic?.world_name}</p>
                </div>
                <div className="character-card-controls"><p className="character-card-controls-text" onClick={onNext}>{'>'}</p></div>
            </div>
            <Header options={ViewMode} onSelected={handleHeaderSelection} currentRef={currentViewRef} />
            <div className="character-detailed-info">
                {currentView === ViewMode.Ability && <CharacterAbilityView />}
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
    )
}

export default CharacterCard