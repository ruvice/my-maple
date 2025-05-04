import React from 'react'
import { Character, SymbolInfo } from '../types/types'
import SymbolLayout from './Symbol/SymbolLayout';
import './CharacterSymbolView.css'

type CharacterSymbolProps = {
    symbol?: SymbolInfo;
}

function CharacterSymbolView(props: CharacterSymbolProps) {
    const { symbol } = props;
    const symbols = symbol?.symbol
    if (symbols === undefined) { return <div>Failed to get symbols</div> } 
    return (
        <div className="character-symbol-view">
            <SymbolLayout symbols={symbols} />
        </div>
    )
}

export default CharacterSymbolView