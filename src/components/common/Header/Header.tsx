import React, { RefObject } from 'react'
import './Header.css'

type HeaderProps = {
    options: Object;
    onSelected: (val: any) => void;
    currentRef: RefObject<any>;
    labelFontSize?: number;
    labelFontWeight?: number;
}

function Header(props: HeaderProps) {
    const { options, onSelected, currentRef, labelFontSize, labelFontWeight } = props;
    const current = currentRef.current;
    return (
        <div className="header">
            {Object.values(options).map((mode) => (
                <div
                    key={mode}
                    className={`tab ${current === mode ? 'active light-blue-background' : 'removing light-gray-background'}`}
                    onClick={() => onSelected(mode)}
                >
                    <p className="tab-label" style={{fontSize: labelFontSize ?? 12, fontWeight: labelFontWeight}}>{mode}</p>
                </div>
            ))}
        </div>
    )
}

export default Header