import React, { useState } from 'react'
import { Equipment } from '../types/equipmentTypes'
import EquipmentLayout from './Equipment/EquipmentLayout';
import './CharacterEquipmentView.css'
import LoadingView from './common/Loading/LoadingView';

type CharacterEquipmentViewProps = {
  active?: Equipment[],
  preset1?: Equipment[],
  preset2?: Equipment[],
  preset3?: Equipment[]
}

const CharacterEquipmentView = ({ active, preset1, preset2, preset3 }: CharacterEquipmentViewProps) => {
  const loadouts = [active, preset1, preset2, preset3];
  const labels = ["C", "1", "2", "3"];
  const [selectedLoadout, setSelectedLoadout] = useState(0);
  if (active === undefined && preset1 ===  undefined && preset2 === undefined && preset3 === undefined) {
    return (<LoadingView />)
  }

  return (
    <div className="character-equipment-view">
      <EquipmentLayout equipments={loadouts[selectedLoadout]} />
      <div className="character-equipment-view-preset">
        <div className="character-equipment-view-labels">
            {labels.map((label, index) => (
            <div key={index} onClick={() => setSelectedLoadout(index)} className={`square-box ${index === selectedLoadout && 'green-selection-background'} bold-text`}>
                {label}
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CharacterEquipmentView;
