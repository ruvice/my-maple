import React from 'react'
import './Button.css'

export enum ButtonType {
    OK = "GreenOk",
    Cancel = "GrayCancel"
}

type ButtonProps = {
    type: ButtonType;
    label: string;
    onClick?: () => void;
    className?: string;
}
function Button(props: ButtonProps) {
    const { type, label, onClick, className } = props;
    let buttonStyle = ''
    switch (type) {
        case ButtonType.OK:
            buttonStyle = 'green-selection-background'
            break
        case ButtonType.Cancel:
            buttonStyle = 'cancel-gray-background'
            break
    }
    return (
        <button className={`${buttonStyle} ${className}`} onClick={onClick}>
            <p className='button-label bold-text'>{label}</p>
        </button>
    )
}

export default Button