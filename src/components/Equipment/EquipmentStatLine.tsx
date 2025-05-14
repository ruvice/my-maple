import React from 'react'
import { ItemTotalOption, ItemAddOption, ItemBaseOption, ItemEtcOption, ItemStarForceOption, ItemExceptionalOption } from '@ruvice/my-maple-models'
import './EquipmentStats.css'

type EquipmentStatLineProps = {
    totalOptions: ItemTotalOption,
    addOptions: ItemAddOption,
    baseOptions: ItemBaseOption,
    etcOptions: ItemEtcOption,
    starforceOptions: ItemStarForceOption,
    exceptionalOptions: ItemExceptionalOption,
    statKey: string,
    label: string
}

function EquipmentStatLine(props:  EquipmentStatLineProps) {
    const { totalOptions, addOptions, baseOptions, etcOptions, starforceOptions, exceptionalOptions, statKey, label } = props;
    const parts: { value: number | string, className: string }[] = [];
    const modifier = statKey === 'equipment_level_decrease' ? '-' : '+';
    const isPercent = ['all_stat', 'boss_damage', 'damage', 'max_hp_rate', 'max_mp_rate'].includes(statKey);

    const total = totalOptions[statKey]
    if (total == 0) { return null }

    const base = baseOptions[statKey];
    if (total == base) {
        return (
            <div className='equipment-stat-line'>
                <p className="equipment-stat-line-text">{label} {modifier}{total}</p>
            </div>
        )
    }
    if (base !== undefined && base) parts.push({ value: base, className: 'base' });

    const add = addOptions[statKey];
    if (add !== undefined && add !== 0) parts.push({ value: add, className: 'add' });

    const etc = etcOptions[statKey];
    if (etc !== undefined && etc !== 0) parts.push({ value: etc, className: 'etc' });

    const starforce = starforceOptions[statKey];
    if (starforce !== undefined && starforce !== 0) parts.push({ value: starforce, className: 'starforce' });

    const exceptional = exceptionalOptions[statKey];
    let percentageModifier = false
    if (statKey === 'all_stat' || statKey === 'boss_damage' || statKey === 'damage' || statKey === 'max_hp_rate' || statKey === "max_mp_rate") {
        percentageModifier = true
    }
    if (exceptional !== undefined && exceptional !== 0) parts.push({ value: exceptional, className: 'exceptional' });


    return (
        <div className='equipment-stat-line'>
            <p className="equipment-stat-line-text">
                <span className='enhanced'>{label} {modifier}{total}{isPercent && '%'}</span>&nbsp;(
                {parts.map((part, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && ' + '}
                        <span className={part.className}>{part.value}{isPercent && '%'}</span>
                    </React.Fragment>
                ))}
                )
            </p>
        </div>
    );
}

export default EquipmentStatLine