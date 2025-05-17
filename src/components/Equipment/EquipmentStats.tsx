import React, { useMemo } from 'react'
import { getLocalisedItemEquipOptions, ItemAddOption, ItemBaseOption, ItemEquipOption, ItemEtcOption, ItemExceptionalOption, ItemStarForceOption, ItemTotalOption, MapleServer } from '@ruvice/my-maple-models'
import EquipmentStatLine from './EquipmentStatLine';
import { useViewStore } from '../../store/useCharacterViewStore';

type EquipmentStatsProps = {
    totalOptions: ItemTotalOption;
    addOptions: ItemAddOption;
    baseOptions: ItemBaseOption;
    etcOptions: ItemEtcOption;
    starforceOptions: ItemStarForceOption;
    exceptionalOptions: ItemExceptionalOption;
}

const STAT_OPTIONS_SEA = [
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

const STAT_OPTIONS_KMS = [
    {label: 'STR :', key: 'str'},
    {label: 'DEX :', key: 'dex'},
    {label: 'INT :', key: 'int'},
    {label: 'LUK :', key: 'luk'},
    {label: '최대 HP :', key: 'max_hp'},
    {label: '최대 MP :', key: 'max_mp'},
    {label: '최대 HP(%) :', key: 'max_hp_rate'},
    {label: '최대 MP(%) :', key: 'max_mp_rate'},
    {label: '공격력 :', key: 'attack_power'},
    {label: '마력 :', key: 'magic_power'},
    {label: '방어력 :', key: 'armor'},
    {label: '보스 공격 시 데미지 증가(%) ', key: 'boss_damage'},
    {label: '몬스터 방어율 무시(%) : ', key: 'ignore_monster_armor'},
    {label: '데미지(%):', key: 'damage'},
    {label: '이동속도:', key: 'speed'},
    {label: '점프력 :', key: 'jump'},
    {label: '올스탯(%) :', key: 'all_stat'},
    {label: '착용 레벨 감소 : ', key: 'equipment_level_decrease'}
]

function EquipmentStats(props: EquipmentStatsProps) {
    const { totalOptions, addOptions, baseOptions, etcOptions, starforceOptions, exceptionalOptions } = props;
    const { currentServer } = useViewStore()
    const equipmentStats = useMemo(() => {
        // const options = currentServer === MapleServer.KMS ? STAT_OPTIONS_KMS : STAT_OPTIONS_SEA;
        return (Object.values(ItemEquipOption) as ItemEquipOption[]).map((key) => {
            const label = getLocalisedItemEquipOptions(key, currentServer);
            return (
                <EquipmentStatLine key={key} {...props} statKey={key} label={label} />
            );
    });
    }, [totalOptions, addOptions, baseOptions, etcOptions, starforceOptions, exceptionalOptions, currentServer])
    return (
        <div>
            {equipmentStats}
        </div>
    )
}

export default EquipmentStats