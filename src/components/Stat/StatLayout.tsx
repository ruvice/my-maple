import React, { JSX, useMemo } from 'react'
import "./StatLayout.css"
import { useModal } from '../../utils/useModal'
import { Stat } from '@ruvice/my-maple-models'
import StatLine from './StatLine'
import LoadingView from '../common/Loading/LoadingView'

type StatLayoutProps = {
    stats: Stat[] | undefined
}

const ORDER = [
    "combatpower", "hp", "mp", "str", "dex", "int", "luk", "statatt", "damage", "finaldamage",
    "bossmonsterdamage", "ignoredef", "normalmonsterdamage", "att", "criticalrate", "matt",
    "criticaldamage", "cooldownreduction", "buffduration", "unaffectedbycooldown", "ignoreelementalresistance",
    "abnormalstatusadditionaldamage", "summondurationincrease", "mesoobtained", "starforce", "itemdroprate", "arcaneforce",
    "additonalexpobtained", "authenticforce", "def", "statusresistance", "speed", "jump", "stance", "attackspeed"
]

function StatLayout(props: StatLayoutProps) {
    const { stats } = props;
    const statCells = useMemo(() => {
        if (stats) {
            const divMapping: Record<string, JSX.Element> = {}
            let minAtt: number = 0, maxAtt: number = 0, cdrSec: number = 0, cdr: number = 0
            stats.forEach((stat) => {
                const slot = stat.stat_name
                const slotKey = slot.toLowerCase().replace(/\s+/g, '');
                const statLine = <StatLine key={slotKey} slotKey={slotKey} stat={stat} />
                divMapping[slotKey] = statLine
                switch (slotKey) {
                    case "minimumattstat":
                        minAtt = stat.stat_value
                        break;
                    case "maximumattstat":
                        maxAtt = stat.stat_value;
                        break;
                    case "cooldownreduction(sec)":
                        cdrSec = stat.stat_value;
                        break;
                    case "cooldownreduction(%)":
                        cdr = stat.stat_value;
                        break;
                    default:
                        break;
                }
            })

            // Handling ATT Stat
            const statAtt = `${minAtt.toLocaleString()} - ${maxAtt.toLocaleString()}`
            divMapping['statatt'] = (
                <StatLine 
                key={'statatt'} 
                slotKey={'statatt'} 
                stat={{stat_name:"Stat Att", stat_value: 0}} 
                displayValue={statAtt} />
            )

            
            // Handling Cooldown Reduction
            const cooldownReduction = `${cdrSec}s / ${cdr}%`
            divMapping['cooldownreduction'] = (
                <StatLine 
                    key={'cooldownreduction'} 
                    slotKey={'cooldownreduction'} 
                    stat={{stat_name:"Cooldown Reduction", stat_value: 0}} 
                    displayValue={cooldownReduction} />
                )

            return ORDER.map((slotKey) => divMapping[slotKey])
        }
    }, [stats])
    if (stats === undefined || statCells  === undefined) { return <LoadingView />}
    return (
        <div className="stat-wrapper">
            <div className="stat-container">
                {statCells}
            </div>
        </div>
    )
}

export default StatLayout