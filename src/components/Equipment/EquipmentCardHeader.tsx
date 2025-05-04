import React from 'react'
import EquipmentStarforce from './EquipmentStarforce';

type EquipmentCardHeaderProps = {
    starforce: string,
    name: string,
    scrollUpgrade: string,
    potentialGrade: string
}

export default function EquipmentCardHeader(props: EquipmentCardHeaderProps) {
    const { starforce, name, scrollUpgrade, potentialGrade } = props;
    const scrollUpgradeModifier = scrollUpgrade !== "0" ? `(+${scrollUpgrade})` : ''
    return (
        <>
            <EquipmentStarforce filled={starforce} />
            <p className="equipment-stat-line-text item-name">{name} {scrollUpgradeModifier}</p>
            {potentialGrade && <p className="equipment-stat-line-text">({potentialGrade} Item)</p>}
        </>
    )
}
