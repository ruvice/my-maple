import React, { useEffect, useMemo, useState } from 'react'
import { useCharacterStore } from '../store/characterStore'
import CharacterCard from './CharacterCard'

function Character() {
    const { characters } = useCharacterStore()
    const [selectedIndex, setSelectedIndex] = useState(0);
    const next = () => setSelectedIndex((prev) => (prev + 1) % characterCardArr.length);
    const prev = () => setSelectedIndex((prev) => (prev - 1 + characterCardArr.length) % characterCardArr.length);
    console.log(characters)
    const characterCardArr = useMemo(() => {
        return Object.values(characters).map((character) => (
            <CharacterCard key={character.name} character={character} onNext={next} onPrev={prev} />
        ))
    }, [characters])
    return (
        <>
            {characterCardArr[selectedIndex]}
        </>
    )
}

export default Character