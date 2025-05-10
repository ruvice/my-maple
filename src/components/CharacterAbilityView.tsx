import React from 'react'
import { StatInfo } from '../types/types'
import StatLayout from './Stat/StatLayout';
import LoadingView from './common/Loading/LoadingView';

type CharacterAbilityViewProps = {
    stat?: StatInfo;
}

function CharacterAbilityView(props: CharacterAbilityViewProps) {
    const { stat } = props;
    if (stat === undefined) { return <LoadingView /> }
    return (
        <>
            <StatLayout stats={stat.final_stat}/>
        </>
    )
}

export default CharacterAbilityView