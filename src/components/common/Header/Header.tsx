import React, { RefObject } from 'react'
import './Header.css'

type HeaderProps = {
    options: Object;
    onSelected: (val: any) => void;
    currentRef: RefObject<any>;
}

function Header(props: HeaderProps) {
    const { options, onSelected, currentRef } = props;
    const current = currentRef.current;
    return (
        <div className="header">
            {Object.values(options).map((mode) => (
                <div
                    key={mode}
                    className={`tab ${current === mode ? 'active light-blue-background' : 'removing light-gray-background'}`}
                    onClick={() => onSelected(mode)}
                >
                    <p className="tab-label">{mode}</p>
                </div>
            ))}
        </div>
    )
}

export default Header