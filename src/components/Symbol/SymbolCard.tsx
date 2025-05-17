import React, { useMemo } from 'react'
import { getLocalisedSymbolEquipOptions, MapleServer, MapleSymbol, SymbolEquipOption, SymbolRegion } from '@ruvice/my-maple-models'
import "./SymbolCard.css"
import CardHeader from '../Card/CardHeader'
import { useViewStore } from '../../store/useCharacterViewStore'

type SymbolCardProps = {
    symbol: MapleSymbol,
    hide: () => void
}

function SymbolCard(props: SymbolCardProps) {
    const { symbol, hide } = props
    const { currentServer } = useViewStore()
    const maxLevel = symbol.region === SymbolRegion.Arcane ? 20 : 11
    const growth = symbol.symbol_level == maxLevel ? 'MAX' : `${symbol.symbol_growth_count} / ${symbol.symbol_require_growth_count}`
    const symbolStats = useMemo(() => {
        return (Object.values(SymbolEquipOption) as SymbolEquipOption[]).map((key) => {
            const label = getLocalisedSymbolEquipOptions(key, currentServer)
            if (key === SymbolEquipOption.Growth) {
                return (<p className="symbol-stat-line-text gold">{label} {growth}</p>)
            } else if (key === SymbolEquipOption.SymbolLevel) {
                return (<p className="symbol-stat-line-text gold">{label} {symbol[key]}</p>)
            } else if (symbol[key] !== 0 && symbol[key] !== "0%") {
                return (<p className="symbol-stat-line-text">{label} {symbol[key]}</p>)
            }
        })
    }, [currentServer])
    if (symbol === undefined) {
        return <p className="symbol-stat-line-text">Failed to retreive symbol information</p>
    }
    return (
        <div className="symbol-card" onClick={hide}>
            <div className='symbol-segment item-header'>
                <CardHeader 
                    starforce={0} 
                    name={symbol.symbol_name} 
                    scrollUpgrade={0} 
                    potentialGrade={null}
                    equipItem={false} />
            </div>
            <div className='symbol-segment item-details'>
                <img className="item-image" src={symbol.symbol_icon} />
            </div>
            <div className='symbol-segment symbol-stats'>
                {symbolStats}
                {symbol.symbol_force !== 0 && <p className="symbol-stat-line-text">{symbol.region}: +{symbol.symbol_force}</p>}
            </div>
            <div className="symbol-segment">
                <p className="symbol-stat-line-text">{symbol.symbol_description}</p>
            </div>
        </div>
    )
}

export default SymbolCard