import React, { useMemo } from 'react'
import { Symbol } from '../../types/equipmentTypes';
import { useModal } from '../../utils/useModal';
import "./SymbolLayout.css"
import SymbolCard from './SymbolCard';
import LoadingView from '../common/Loading/LoadingView';

type SymbolLayoutProps = {
    symbols: Symbol[]
}

function SymbolLayout(props: SymbolLayoutProps) {
    const { symbols } = props;
    const  { showModal, hideModal, ModalRenderer } = useModal();
    const symbolCells = useMemo(() => {
        if (symbols) {
            return symbols.map((symbol) => {
                return (
                    <div className="symbol-cell" onClick={() => showModal(<SymbolCard symbol={symbol} hide={hideModal}/>)}>
                        <img src={symbol.symbol_icon}/>
                        <p className="symbol-cell-text">Lv. {symbol.symbol_level}</p>
                    </div>
                )
            })
        }
    }, [symbols])
    if (symbols === undefined) { return <LoadingView />}
    return (
        <>
            <div className="symbol-layout-grid">
                {symbolCells}
            </div>
            <ModalRenderer />
        </>
    )
}

export default SymbolLayout