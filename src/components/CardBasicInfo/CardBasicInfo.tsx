import { Character, getLocalisedCharacterClass } from '@ruvice/my-maple-models'
import React, { useMemo, useRef } from 'react'
import { ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';
import { LoadCharacterRequest } from '../../types/types';
import { loadCharacters } from '../../api';
import { useQueryClient } from '@tanstack/react-query';
import Tooltip from '../common/Tooltip/Tooltip';
import { useModal } from '../../utils/useModal';
import CharacterCardExternalLinks from '../CharacterCardExternalLinks';
import { useViewStore } from '../../store/useCharacterViewStore';

type CardBasicInfoProps = {
    character?: Character
    onNext?: () => void;
    onPrev?: () => void;
}

function CardBasicInfo(props: CardBasicInfoProps) {
    const { character, onNext, onPrev } = props;
    const { currentServer } = useViewStore()
    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
    const { showModal, hideModal, ModalRenderer } = useModal();
    const queryClient = useQueryClient()
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
    const jobName = character?.basic ? getLocalisedCharacterClass(character.basic.character_class, currentServer) : ''

    const characterBasicInfo = useMemo(() => {
        if (character) {
            return (
            <>
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
            </>
            )
        }
    }, [character])
  return (
    <>
        {characterBasicInfo}
        <ModalRenderer />
    </>
  )
}

export default CardBasicInfo