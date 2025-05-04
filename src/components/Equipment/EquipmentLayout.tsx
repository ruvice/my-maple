import React, { useMemo } from 'react'
import "./EquipmentLayout.css"
import { Equipment } from '../../types/equipmentTypes'
import { useModal } from '../../utils/useModal'
import EquipmentCard from './EquipmentCard'

type EquipmentLayoutProps = {
    equipments: Equipment[] | undefined
}

function EquipmentLayout(props: EquipmentLayoutProps) {
    const { equipments } = props;
    const  { showModal, ModalRenderer } = useModal();
    const equipmentCells = useMemo(() => {
        if (equipments) {
            return equipments.map((equipment) => {
                const slot = equipment.item_equipment_slot
                const slotKey = slot.toLowerCase().replace(/\s+/g, '');
                const potentialGrade = equipment.potential_option_grade?.toLowerCase()
                return (
                    <div key={slotKey} className={`${slotKey} ${potentialGrade}-border equipment-cell`} onClick={() => showModal(<EquipmentCard equipment={equipment} />)}>
                        <img className={`equipment-cell-image`} src={equipment.item_icon} />
                    </div>
                )
            })
        }
    }, [equipments])
    if (equipments === undefined) { return <div>Failed to get equipments</div>}
    return (
        <>
            <div className="equipment-layout-grid">
                {equipmentCells}
            </div>
            <ModalRenderer />
        </>
    )
}

export default EquipmentLayout