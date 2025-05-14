import React from 'react'
import EquipmentStarforce from '../Equipment/EquipmentStarforce';
import "./CardHeader.css"

type CardHeaderProps = {
    starforce: string,
    maxStarforce?: number,
    name: string,
    scrollUpgrade: string,
    potentialGrade: string | null,
    equipItem: boolean
}

export default function CardHeader(props: CardHeaderProps) {
    const { starforce, maxStarforce, name, scrollUpgrade, potentialGrade, equipItem } = props;
    const scrollUpgradeModifier = scrollUpgrade !== "0" ? `(+${scrollUpgrade})` : ''
    return (
        <>
            {equipItem && <EquipmentStarforce filled={starforce} total={maxStarforce} />}
            <p className="header-line-text card-header-item-name">{name} {scrollUpgradeModifier}</p>
            {potentialGrade && <p className="header-line-text">({potentialGrade} Item)</p>}
        </>
    )
}
