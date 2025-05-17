import React, { useEffect } from 'react'
import { getLocalisedStatName, Stat } from '@ruvice/my-maple-models';
import './StatLine.css'
import { useViewStore } from '../../store/useCharacterViewStore';

type StatLineProps = {
    slotKey: string;
    stat: Stat;
    displayValue?: string;
}

const PERCENTAGE_STATS_SET = new Set([
    "damage", "finaldamage", "bossmonsterdamage", "ignoredef", "normalmonsterdamage", "criticalrate",
    "criticaldamage", "buffduration", "unaffectedbycooldown", "ignoreelementalresistance",
    "abnormalstatusadditionaldamage", "summondurationincrease", "mesoobtained", "itemdroprate",
    "additonalexpobtained", "speed", "jump", "stance"
])

function StatLine(props: StatLineProps) {
    const { slotKey, stat, displayValue } = props;
    const { currentServer } = useViewStore();
    let label = getLocalisedStatName(stat.stat_name, currentServer)
    const value = stat.stat_value.toLocaleString() ?? stat.stat_value

    return (
        <div className={`${slotKey} stat-cell`}>
            <p className={`stat-line name ${slotKey === 'combatpower' && 'gold'} bold-text`}>{label}</p>
            <p className={`stat-line value ${slotKey === 'combatpower' && 'gold'} light-text`}>{displayValue ? displayValue : value}{PERCENTAGE_STATS_SET.has(slotKey) && '%'}</p>
        </div>
    )
}

export default StatLine