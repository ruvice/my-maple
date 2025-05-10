import React, { useEffect, useMemo, useState } from 'react'
import { useCharacterStore } from '../store/characterStore'
import CharacterCard from './CharacterCard'
import LoadingView from './common/Loading/LoadingView';

function Character() {
    const { characters } = useCharacterStore()
    const [selectedIndex, setSelectedIndex] = useState(0);
    const next = () => setSelectedIndex((prev) => (prev + 1) % (characterCardArr ? characterCardArr.length : 0));
    const prev = () => setSelectedIndex((prev) => (prev - 1 + (characterCardArr ? characterCardArr.length : 0)) % (characterCardArr ? characterCardArr.length : 0));
    const characterCardArr = useMemo(() => {
        if (Object.keys(characters).length !== 0) {
            return Object.values(characters).map((character) => (
                <CharacterCard key={character.name} character={character} onNext={next} onPrev={prev} />
            ))
        }
    }, [characters])
    if (Object.keys(characters).length === 0) { return <LoadingView /> }
    return (
        <>
            {characterCardArr && characterCardArr[selectedIndex]}
        </>
    )
}

export default Character