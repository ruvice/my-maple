import React, { useRef } from 'react'
import { Character, MapleServer } from '@ruvice/my-maple-models'
import "./CharacterCard.css"
import CharacterEquipmentView from './CharacterEquipmentView'
import { ViewMode } from '../constants/viewModes';
import { useViewStore } from '../store/useCharacterViewStore'
import Header from './common/Header/Header'
import CharacterAbilityView from './CharacterAbilityView'
import CharacterSymbolView from './CharacterSymbolView'
import CharacterExpView from './CharacterExpView'
import { imageMap, backgroundMap } from '../utils/imageMap'
import CardBasicInfo from './CardBasicInfo/CardBasicInfo';

type CharacterCardProps = {
    character?: Character;
    hasMultiple: boolean;
    onNext: () => void;
    onPrev: () => void;
}

function CharacterCard(props: CharacterCardProps) {
    const { character, onNext, onPrev, hasMultiple } = props
    const { currentView, setView } = useViewStore();
    const currentViewRef = useRef<ViewMode>(currentView);

    const handleCharacterInfoHeaderSelection = (mode: ViewMode) => {
        setView(mode)
        currentViewRef.current = mode;
    }

    if (!character || character.basic === undefined) {
        return <div>Failed to retreive character information</div>
    }
    const background = imageMap[character.basic.character_class];
    const overlayBackground = backgroundMap[character.basic.character_class]
    
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
                <CardBasicInfo character={character} onNext={onNext} onPrev={onPrev} hasMultiple={hasMultiple} />
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
        </div>
    )
}

export default CharacterCard