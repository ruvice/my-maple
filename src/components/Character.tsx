import React, { useEffect, useMemo } from 'react'
import { useCharacterStore } from '../store/characterStore'
import CharacterCard from './CharacterCard'

function Character() {
    const { characters } = useCharacterStore()
    console.log(characters)
    const characterCards = useMemo(() => {
        return Object.values(characters).map((character) => (
            <CharacterCard key={character.name} character={character} />
        ))
    }, [characters])
    return (
        <>
            {characterCards}
        </>
    )
}

export default Character