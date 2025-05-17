import React, { JSX, useMemo } from 'react'
import "./StatLayout.css"
import { useModal } from '../../utils/useModal'
import { Stat, StatName } from '@ruvice/my-maple-models'
import StatLine from './StatLine'
import LoadingView from '../common/Loading/LoadingView'

type StatLayoutProps = {
    stats: Stat[] | undefined
}

const ORDER: StatName[] = [
  StatName.CombatPower,
  StatName.Hp,
  StatName.Mp,
  StatName.Str,
  StatName.Dex,
  StatName.Int,
  StatName.Luk,
  StatName.StatAtt,
  StatName.Damage,
  StatName.FinalDamage,
  StatName.BossMonsterDamage,
  StatName.IgnoreDef,
  StatName.NormalMonsterDamage,
  StatName.Att,
  StatName.CriticalRate,
  StatName.MAtt,
  StatName.CriticalDamage,
  StatName.CooldownReduction,
  StatName.BuffDuration,
  StatName.UnaffectedByCooldown,
  StatName.IgnoreElementalResistance,
  StatName.AbnormalStatusAdditionalDamage,
  StatName.SummonDurationIncrease,
  StatName.MesoObtained,
  StatName.Starforce,
  StatName.ItemDropRate,
  StatName.ArcaneForce,
  StatName.AdditionalExpObtained,
  StatName.AuthenticForce,
  StatName.Def,
  StatName.StatusResistance,
  StatName.Speed,
  StatName.Jump,
  StatName.Stance,
  StatName.AttackSpeed
];

function StatLayout(props: StatLayoutProps) {
    const { stats } = props;
    const statCells = useMemo(() => {
        if (stats) {
            const divMapping: Partial<Record<StatName, JSX.Element>> = {}
            let minAtt: number = 0, maxAtt: number = 0, cdrSec: number = 0, cdr: number = 0
            stats.forEach((stat) => {
                const slot = stat.stat_name
                const statLine = <StatLine key={slot} slotKey={slot} stat={stat} />
                divMapping[slot] = statLine
                switch (slot) {
                    case StatName.MinimumAttStat:
                        minAtt = stat.stat_value
                        break;
                    case StatName.MaximumAttStat:
                        maxAtt = stat.stat_value;
                        break;
                    case StatName.CooldownReductionSec:
                        cdrSec = stat.stat_value;
                        break;
                    case StatName.CooldownReductionPercent:
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
                stat={{stat_name:StatName.StatAtt, stat_value: 0}} 
                displayValue={statAtt} />
            )

            // Handling Cooldown Reduction
            const cooldownReduction = `${cdrSec}s / ${cdr}%`
            divMapping['cooldownreduction'] = (
                <StatLine 
                    key={'cooldownreduction'} 
                    slotKey={'cooldownreduction'} 
                    stat={{stat_name:StatName.CooldownReduction, stat_value: 0}} 
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