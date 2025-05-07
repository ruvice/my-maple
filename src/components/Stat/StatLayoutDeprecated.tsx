import React, { JSX, useMemo } from 'react'
import "./StatLayout.css"
import { useModal } from '../../utils/useModal'
import { Stat } from '../../types/types'
import StatLine from './StatLine'

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

const GROUPINGS = {
    "header": new Set<string>(["combatpower"]),
    "first": new Set<string>(["hp", "mp", "str", "dex", "int", "luk"]),
    "second": new Set<string>(["statatt", "damage", "finaldamage", "bossmonsterdamage", "ignoredef", "normalmonsterdamage", "att", "criticalrate", "matt", "criticaldamage", "cooldownreduction", "buffduration", "unaffectedbycooldown", "ignoreelementalresistance", "abnormalstatusadditionaldamage", "summondurationincrease"]),
    "third": new Set<string>(["mesoobtained", "starforce", "itemdroprate", "arcaneforce", "additonalexpobtained", "authenticforce"]),
    "fourth": new Set<string>(["def", "statusresistance", "speed", "jump", "stance", "attackspeed"])
}

function StatLayout(props: StatLayoutProps) {
    const { stats } = props;
    console.log(stats)
    const statCells = useMemo(() => {
        if (stats) {
            const divMapping: Record<string, JSX.Element> = {}
            let minAtt: string = "", maxAtt: string = "", cdrSec: string = "", cdr: string = ""
            stats.forEach((stat) => {
                const slot = stat.stat_name
                const slotKey = slot.toLowerCase().replace(/\s+/g, '');
                const statLine = <StatLine slotKey={slotKey} stat={stat} />
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
            const statAtt = `${parseInt(minAtt).toLocaleString()} - ${parseInt(maxAtt).toLocaleString()}`
            divMapping['statatt'] = (<StatLine slotKey={'statatt'} stat={{stat_name:"Stat Att", stat_value: statAtt}} />)

            
            // Handling Cooldown Reduction
            const cooldownReduction = `${cdrSec}s / ${cdr}%`
            divMapping['cooldownreduction'] = (<StatLine slotKey={'cooldownreduction'} stat={{stat_name:"Cooldown Reduction", stat_value: cooldownReduction}} />)

            return ORDER.map((slotKey) => divMapping[slotKey])
        }
    }, [stats])
    // const statMap = useMemo(() => {
    //     if (stats) {
    //         const divMapping: Record<string, JSX.Element[]> = {
    //             header: [],
    //             first: [],
    //             second: [],
    //             third: [],
    //             fourth: []
    //         };
    //         let minAtt: string = "", maxAtt: string = "", cdrSec: string = "", cdr: string = ""
    //         stats.forEach((stat) => {
    //             const slot = stat.stat_name
    //             const slotKey = slot.toLowerCase().replace(/\s+/g, '');
    //             const statLine = <StatLine slotKey={slotKey} stat={stat} />
    //             if (GROUPINGS.header.has(slotKey)) {
    //                 divMapping.header.push(statLine)
    //             } else if (GROUPINGS.first.has(slotKey)) {
    //                 divMapping.first.push(statLine)
    //             } else if (GROUPINGS.second.has(slotKey)) {
    //                 divMapping.second.push(statLine)
    //             } else if (GROUPINGS.third.has(slotKey)) {
    //                 divMapping.third.push(statLine)
    //             } else if (GROUPINGS.fourth.has(slotKey)) {
    //                 divMapping.fourth.push(statLine)
    //             } else {
    //                 console.log("missing: ", slotKey)
    //             }
    //             switch (slotKey) {
    //                 case "minimumattstat":
    //                     minAtt = stat.stat_value
    //                     break;
    //                 case "maximumattstat":
    //                     maxAtt = stat.stat_value;
    //                     break;
    //                 case "cooldownreduction(sec)":
    //                     cdrSec = stat.stat_value;
    //                     break;
    //                 case "cooldownreduction(%)":
    //                     cdr = stat.stat_value;
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         })

    //         // Handling ATT Stat
    //         const statAtt = `${parseInt(minAtt).toLocaleString()} - ${parseInt(maxAtt).toLocaleString()}`
    //         divMapping.second.push(<StatLine slotKey={'statatt'} stat={{stat_name:"Stat Att", stat_value: statAtt}} />)

            
    //         // Handling Cooldown Reduction
    //         const cooldownReduction = `${cdrSec}s / ${cdr}%`
    //         divMapping.second.push(<StatLine slotKey={'cooldownreduction'} stat={{stat_name:"Cooldown Reduction", stat_value: cooldownReduction}} />)

    //         return divMapping
    //     }
    // }, [stats])
    if (stats === undefined || statCells  === undefined) { return <div>Failed to get stats</div>}
    return (
        <div className="stat-container">
            {statCells}
            {/* <div className="stat-layout-grid header">{statMap.header}</div>
            <div className="stat-layout-grid first">{statMap.first}</div>
            <div className="stat-layout-grid second">{statMap.second}</div>
            <div className="stat-layout-grid third">{statMap.third}</div> */}
        </div>
    )
}

export default StatLayout