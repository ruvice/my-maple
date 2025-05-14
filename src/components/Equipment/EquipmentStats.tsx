import React, { useMemo } from 'react'
import { ItemAddOption, ItemBaseOption, ItemEtcOption, ItemExceptionalOption, ItemStarForceOption, ItemTotalOption } from '@ruvice/my-maple-models'
import EquipmentStatLine from './EquipmentStatLine';

type EquipmentStatsProps = {
    totalOptions: ItemTotalOption,
    addOptions: ItemAddOption,
    baseOptions: ItemBaseOption,
    etcOptions: ItemEtcOption,
    starforceOptions: ItemStarForceOption,
    exceptionalOptions: ItemExceptionalOption
}

const STAT_OPTIONS = [
    {label: 'STR :', key: 'str'},
    {label: 'DEX :', key: 'dex'},
    {label: 'INT :', key: 'int'},
    {label: 'LUK :', key: 'luk'},
    {label: 'MaxHP :', key: 'max_hp'},
    {label: 'MaxMP :', key: 'max_mp'},
    {label: 'HP :', key: 'max_hp_rate'},
    {label: 'MP :', key: 'max_mp_rate'},
    {label: 'WEAPON ATTACK :', key: 'attack_power'},
    {label: 'MAGIC ATTACK :', key: 'magic_power'},
    {label: 'DEF :', key: 'armor'},
    {label: 'When attacking bosses, damage ', key: 'boss_damage'},
    {label: 'Ignore Monster Defense :', key: 'ignore_monster_armor'},
    {label: 'Total Damage:', key: 'damage'},
    {label: 'SPEED :', key: 'speed'},
    {label: 'JUMP :', key: 'jump'},
    {label: 'All Stats :', key: 'all_stat'},
    {label: 'Wearer \'s Level is reduced : ', key: 'equipment_level_decrease'}

]

function EquipmentStats(props: EquipmentStatsProps) {
    const { totalOptions, addOptions, baseOptions, etcOptions, starforceOptions, exceptionalOptions } = props;
    const equipmentStats = useMemo(() => {
        return STAT_OPTIONS.map(({ key, label }) => (
            <EquipmentStatLine {...props} statKey={key} label={label} />
        ))
    }, [totalOptions, addOptions, baseOptions, etcOptions, starforceOptions, exceptionalOptions, ])
    return (
        <div>
            {equipmentStats}
        </div>
    )
}

export default EquipmentStats