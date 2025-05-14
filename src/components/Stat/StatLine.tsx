import React, { useEffect } from 'react'
import { Stat } from '@ruvice/my-maple-models';
import './StatLine.css'

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

function parseStrictInt(str: string): number | null {
    if (/^-?\d+$/.test(str.trim())) {
      return Number(str);
    }
    return null;
}

function StatLine(props: StatLineProps) {
    const { slotKey, stat, displayValue } = props;
    let label = stat.stat_name;
    // Handling stupid edge cases
    switch (stat.stat_name) {
        case "Abnormal Status Additional Damage":
            label = "Abnormal Status Add. Damage"
            break;
        case "Additonal EXP Obtained":
            label = "Additional EXP Obtained"
            break;
        default:
            break;
    }
    
    const value = stat.stat_value.toLocaleString() ?? stat.stat_value

    return (
        <div className={`${slotKey} stat-cell`}>
            <p className={`stat-line name ${slotKey === 'combatpower' && 'gold'} bold-text`}>{label}</p>
            <p className={`stat-line value ${slotKey === 'combatpower' && 'gold'} light-text`}>{displayValue ? displayValue : value}{PERCENTAGE_STATS_SET.has(slotKey) && '%'}</p>
        </div>
    )
}

export default StatLine