import React from 'react'
import { Character, SymbolInfo } from '../types/types'
import SymbolLayout from './Symbol/SymbolLayout';
import './CharacterSymbolView.css'
import LoadingView from './common/Loading/LoadingView';

type CharacterSymbolProps = {
    symbol?: SymbolInfo;
}

function CharacterSymbolView(props: CharacterSymbolProps) {
    const { symbol } = props;
    const symbols = symbol?.symbol
    if (symbols === undefined) { return <LoadingView /> } 
    return (
        <div className="character-symbol-view">
            <SymbolLayout symbols={symbols} />
        </div>
    )
}

export default CharacterSymbolView