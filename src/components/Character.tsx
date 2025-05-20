import React, { useMemo, useState } from 'react'
import { useCharacterStore } from '../store/characterStore'
import CharacterCard from './CharacterCard'
import { useViewStore } from '../store/useCharacterViewStore';
import LoadingView from './common/Loading/LoadingView';
import ErrorView from './common/ErrorView/ErrorView';

function Character() {
    const { server } = useCharacterStore()
    const { currentServer, loading } = useViewStore()
    const [selectedIndex, setSelectedIndex] = useState(0);
    const next = () => setSelectedIndex((prev) => (prev + 1) % (characterCardArr ? characterCardArr.length : 0));
    const prev = () => setSelectedIndex((prev) => (prev - 1 + (characterCardArr ? characterCardArr.length : 0)) % (characterCardArr ? characterCardArr.length : 0));
    const characterCardArr = useMemo(() => {
        if (currentServer !== undefined) {
            const curLength = Object.keys(server[currentServer]).length;
            if (curLength !== 0) {
                setSelectedIndex(0);
                return Object.values(server[currentServer]).map((character) => (
                    <CharacterCard key={character.name} character={character} onNext={next} onPrev={prev} hasMultiple={curLength > 1}/>
                ))
            }
        }
    }, [server, currentServer])
    
    if (loading) { return <LoadingView />}
    if (currentServer === undefined || (currentServer && Object.keys(server[currentServer]).length === 0)) { return <ErrorView message="Oops we couldn't find any characters" /> }
    return (
        <>
            {characterCardArr && characterCardArr[selectedIndex]}
        </>
    )
}

export default Character