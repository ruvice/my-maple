import React, { useEffect } from 'react'
import { Equipment } from '../../types/equipmentTypes'
import EquipmentStats from './EquipmentStats'
import EquipmentPotential from './EquipmentPotential'
import "./EquipmentCard.css"
import CardHeader from '../Card/CardHeader'
import { getMaximumStars } from '../../utils/equipmentUtils'

type EquipmentCardProps = {
    equipment: Equipment,
    hide: () => void
}

function EquipmentCard(props: EquipmentCardProps) {
    const { equipment, hide } = props
    const maxStarforce = getMaximumStars(
        parseInt(equipment.scroll_upgrade), 
        parseInt(equipment.scroll_upgradeable_count), 
        parseInt(equipment.scroll_resilience_count), 
        equipment.item_base_option.base_equipment_level,
        equipment.item_name
    )
    if (equipment === undefined) {
        return <p className="equipment-stat-line-text">Failed to retreive equipment information</p>
    }
    return (
        <div className="equipment-card" onClick={hide}>
            <div className='equipment-segment item-header'>
                <CardHeader 
                    starforce={equipment.starforce}
                    maxStarforce={maxStarforce}
                    name={equipment.item_name} 
                    scrollUpgrade={equipment.scroll_upgrade} 
                    potentialGrade={equipment.potential_option_grade}
                    equipItem={true} />
            </div>
            <div className='equipment-segment item-details'>
                <img className="item-image" src={equipment.item_icon} />
                <p className="equipment-stat-line-text">Required level: {equipment.item_base_option.base_equipment_level}</p>
            </div>
            <div className='equipment-segment equipment-stats'>
                <p className="equipment-stat-line-text">CATEGORY : {equipment.item_equipment_part}</p>
                <EquipmentStats 
                    totalOptions={equipment.item_total_option} 
                    addOptions={equipment.item_add_option}
                    baseOptions={equipment.item_base_option} 
                    etcOptions={equipment.item_etc_option}
                    starforceOptions={equipment.item_starforce_option}
                    exceptionalOptions={equipment.item_exceptional_option} />
            </div>
            {equipment.potential_option_grade !== null &&
                <div className='equipment-segment equipment-potential'>
                    <EquipmentPotential 
                        flag={equipment.potential_option_flag} 
                        grade={equipment.potential_option_grade} 
                        option={equipment.potential_option_1} 
                        option2={equipment.potential_option_2} 
                        option3={equipment.potential_option_3} 
                        isAdditional={false} />
                </div>
            }
            {equipment.additional_potential_option_grade !== null &&
                <div className='equipment-segment equipment-potential'>
                    <EquipmentPotential 
                        flag={equipment.additional_potential_option_flag} 
                        grade={equipment.additional_potential_option_grade} 
                        option={equipment.additional_potential_option_1} 
                        option2={equipment.additional_potential_option_2} 
                        option3={equipment.additional_potential_option_3} 
                        isAdditional={true} />
                </div>
            }
        </div>
    )
}

export default EquipmentCard