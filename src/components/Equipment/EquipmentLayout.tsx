import React, { useMemo } from 'react'
import "./EquipmentLayout.css"
import { Equipment, ItemEquipmentSlot } from '@ruvice/my-maple-models'
import { useModal } from '../../utils/useModal'
import EquipmentCard from './EquipmentCard'
import LoadingView from '../common/Loading/LoadingView'

type EquipmentLayoutProps = {
    equipments: Equipment[] | undefined
}

function EquipmentLayout(props: EquipmentLayoutProps) {
    const { equipments } = props;
    const  { showModal, hideModal, ModalRenderer } = useModal();
    const equipmentMap = useMemo(() => {
        const map: Partial<Record<ItemEquipmentSlot, Equipment>> = {};
        equipments?.forEach((equipment) => {
            const slotKey = equipment.item_equipment_slot;
            map[slotKey] = equipment;
        });
        return map;
    }, [equipments]);
    
    
    if (equipments === undefined) { return <LoadingView />}
    return (
        <>
            <div className="equipment-layout-grid">
                {(Object.values(ItemEquipmentSlot) as ItemEquipmentSlot[]).map((slotKey) => {
                    const equipment = equipmentMap[slotKey];
                    if (equipment) {
                        const potentialGrade = equipment.potential_option_grade?.toLowerCase();
                        return (
                            <div
                                key={slotKey}
                                className={`${slotKey} ${potentialGrade}-border equipment-cell`}
                                onClick={() =>
                                    showModal(<EquipmentCard equipment={equipment} hide={hideModal} />)
                                }
                            >
                                <img className="equipment-cell-image" src={equipment.item_icon} />
                            </div>
                        );
                    } else {
                        // Default / empty slot
                        return (
                            <div key={slotKey} className={`${slotKey} equipment-cell`}>
                            </div>
                        );
                    }
                })}
            </div>
            <ModalRenderer />
        </>
    )
}

export default EquipmentLayout