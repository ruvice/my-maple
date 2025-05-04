import React from 'react'
import EquipmentStarforce from '../Equipment/EquipmentStarforce';
import "./CardHeader.css"

type CardHeaderProps = {
    starforce: string,
    name: string,
    scrollUpgrade: string,
    potentialGrade: string | null,
    equipItem: boolean
}

export default function CardHeader(props: CardHeaderProps) {
    const { starforce, name, scrollUpgrade, potentialGrade, equipItem } = props;
    const scrollUpgradeModifier = scrollUpgrade !== "0" ? `(+${scrollUpgrade})` : ''
    return (
        <>
            {equipItem && <EquipmentStarforce filled={starforce} />}
            <p className="header-line-text card-header-item-name">{name} {scrollUpgradeModifier}</p>
            {potentialGrade && <p className="header-line-text">({potentialGrade} Item)</p>}
        </>
    )
}
