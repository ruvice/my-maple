import React, { useEffect, useMemo } from 'react'
import { useCharacterStore } from '../store/characterStore'
import { Character } from '../types/types'
import EquipmentCard from './Equipment/EquipmentCard'
import "./CharacterCard.css"
import EquipmentLayout from './Equipment/EquipmentLayout'
import CharacterEquipmentView from './CharacterEquipmentView'

type CharacterCardProps = {
    character: Character
}

function CharacterCard(props: CharacterCardProps) {
    const { character } = props
    if (character.basic === undefined) {
        return <div>Failed to retreive character information</div>
    }
    return (
        <div className="character-card">
            <div className="character-info-grid">
                <img className="character-card-image" src={character.basic?.character_image}></img>
                <div className="character-basic-info">
                    <p className="character-card-line-text character-name">{character.basic?.character_name}</p>
                    <p className="character-card-line-text">{character.basic?.character_class}</p>
                    <p className="character-card-line-text">Level {character.basic?.character_level}</p>
                    <p className="character-card-line-text">{character.basic?.world_name}</p>
                </div>
                
            </div>
            <div className="character-detailed-info">
                <CharacterEquipmentView 
                    active={character.equips?.item_equipment} 
                    preset1={character.equips?.item_equipment_preset_1} 
                    preset2={character.equips?.item_equipment_preset_2} 
                    preset3={character.equips?.item_equipment_preset_3} />
            </div>
        </div>
    )
}

export default CharacterCard