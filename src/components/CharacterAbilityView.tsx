import React from 'react'
import { StatInfo } from '../types/types'
import StatLayout from './Stat/StatLayout';

type CharacterAbilityViewProps = {
    stat: StatInfo;
}

function CharacterAbilityView(props: CharacterAbilityViewProps) {
    const { stat } = props;
    if (stat === undefined) { return <div>Failed to get stats</div> }
    return (
        <>
            <StatLayout stats={stat.final_stat}/>
        </>
    )
}

export default CharacterAbilityView