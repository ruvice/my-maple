import React, { useEffect } from 'react'
import { Symbol } from '../../types/equipmentTypes'
import "./SymbolCard.css"
import EquipmentCardHeader from '../Equipment/EquipmentCardHeader'
import CardHeader from '../Card/CardHeader'

enum SymbolRegion {
    Arcane = "ARC",
    Grandis = "AUT"
}

type SymbolCardProps = {
    symbol: Symbol,
    hide: () => void
}

function SymbolCard(props: SymbolCardProps) {
    const { symbol, hide } = props
    if (symbol === undefined) {
        return <p className="symbol-stat-line-text">Failed to retreive symbol information</p>
    }
    let symbolType: SymbolRegion = symbol.symbol_name.toLowerCase().includes("authentic") ? SymbolRegion.Grandis : SymbolRegion.Arcane
    const maxLevel = symbolType === SymbolRegion.Arcane ? 20 : 11
    const growth = symbol.symbol_level == maxLevel ? 'MAX' : `${symbol.symbol_growth_count} / ${symbol.symbol_require_growth_count}`
    return (
        <div className="symbol-card" onClick={hide}>
            <div className='symbol-segment item-header'>
                <CardHeader 
                    starforce={"0"} 
                    name={symbol.symbol_name} 
                    scrollUpgrade={"0"} 
                    potentialGrade={null}
                    equipItem={false} />
            </div>
            <div className='symbol-segment item-details'>
                <img className="item-image" src={symbol.symbol_icon} />
            </div>
            <div className='symbol-segment symbol-stats'>
                <p className="symbol-stat-line-text gold">Growth Level : {symbol.symbol_level}</p>
                <p className="symbol-stat-line-text gold">Growth : {growth}</p>
                {symbol.symbol_str != "0" && <p className="symbol-stat-line-text">STR : +{symbol.symbol_str}</p>}
                {symbol.symbol_dex != "0" && <p className="symbol-stat-line-text">DEX : +{symbol.symbol_dex}</p>}
                {symbol.symbol_int != "0" && <p className="symbol-stat-line-text">INT : +{symbol.symbol_int}</p>}
                {symbol.symbol_luk != "0" && <p className="symbol-stat-line-text">LUK : +{symbol.symbol_luk}</p>}
                {symbol.symbol_hp != "0" && <p className="symbol-stat-line-text">HP : +{symbol.symbol_hp}</p>}
                {symbol.symbol_exp_rate != "0%" && <p className="symbol-stat-line-text">EXP OBTAINED : +{symbol.symbol_exp_rate}</p>}
                {symbol.symbol_meso_rate != "0%" && <p className="symbol-stat-line-text">MESO DROP RATE : +{symbol.symbol_meso_rate}</p>}
                {symbol.symbol_drop_rate != "0%" && <p className="symbol-stat-line-text">Item Drop Rate: +{symbol.symbol_drop_rate}</p>}
                {symbol.symbol_force != "0" && <p className="symbol-stat-line-text">{symbolType}: +{symbol.symbol_force}</p>}
            </div>
            <div className="symbol-segment">
                <p className="symbol-stat-line-text">{symbol.symbol_description}</p>
            </div>
        </div>
    )
}

export default SymbolCard