import React, { useMemo } from 'react'
import "./EquipmentLayout.css"
import { Equipment } from '../../types/equipmentTypes'
import { useModal } from '../../utils/useModal'
import EquipmentCard from './EquipmentCard'
import LoadingView from '../common/Loading/LoadingView'

type EquipmentLayoutProps = {
    equipments: Equipment[] | undefined
}

function EquipmentLayout(props: EquipmentLayoutProps) {
    const { equipments } = props;
    const  { showModal, hideModal, ModalRenderer } = useModal();
    const slots = [
        'ring1','hat','emblem','ring2','pendant','faceaccessory','badge','ring3','pendant2','eyeaccessory','earring','medal','ring4','weapon','top',
        'pocketitem','belt','bottom','glove', 'cape', 'shoes', 'mechanicalheart', 'shoulderdecoration', 'secondaryweapons'
    ]

    const equipmentMap = useMemo(() => {
        const map: Record<string, Equipment> = {};
        equipments?.forEach((equipment) => {
            const slotKey = equipment.item_equipment_slot.toLowerCase().replace(/\s+/g, '');
            map[slotKey] = equipment;
        });
        return map;
    }, [equipments]);
    
    
    if (equipments === undefined) { return <LoadingView />}
    return (
        <>
            <div className="equipment-layout-grid">
                {slots.map((slotKey) => {
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