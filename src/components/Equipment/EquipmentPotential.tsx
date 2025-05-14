import React from 'react'
import "./EquipmentPotential.css"

type EquipmentPotentialProps = {
    flag: boolean,
    grade: string,
    option: string,
    option2: string,
    option3: string,
    isAdditional: boolean
}

function EquipmentPotential(props: EquipmentPotentialProps) {
    const { flag, grade, option, option2, option3, isAdditional } = props;
    return (
        <div>
            {flag ?
            <>
                <p className='equipment-stat-line-text'>Potential talent is sealed.</p>
                <p className='equipment-stat-line-text'>(You can check by clicking on the Item window's magnifying button.)</p>
            </> :
            <>
                {grade && 
                <>
                    <div className="potential-label">
                        <div className={`${grade.toLowerCase()}-background octagon`}>{grade.charAt(0)}</div>
                        <p className={`${grade.toLowerCase()} equipment-stat-line-text`}>{isAdditional && 'Additional '}Potential</p>
                    </div>
                </>}
                
                <p className="equipment-stat-line-text">{option}</p>
                <p className="equipment-stat-line-text">{option2}</p>
                <p className="equipment-stat-line-text">{option3}</p>
            </>
            }
        </div>
    )
}

export default EquipmentPotential