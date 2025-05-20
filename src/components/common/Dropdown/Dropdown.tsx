import React, { useMemo, useState } from 'react'
import "./Dropdown.css"

type DropdownProps = {
    options: any[];
    handleSelection: (arg0: any) => void;
    currentSelection: any;
}

function Dropdown(props: DropdownProps) {
    const { options, handleSelection, currentSelection } = props;
    const [selected, setSelected] = useState(currentSelection);
    const onClick = (e: any) => {
        handleSelection(e)
        setSelected(e)
    }
    return (
        <div className='dropdown'>
            <select
                className='dropdown-select'
                id="dropdown"
                value={selected}
                onChange={(e) => onClick(e.target.value)}
            >
                <option value="">{selected}</option>
                {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown
