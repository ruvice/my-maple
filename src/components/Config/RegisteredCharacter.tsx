import React from 'react'
import './RegisteredCharacter.css'
import { Trash2 } from 'lucide-react';

type RegisteredCharacterProps = {
    characterName: string;
    onClick: () => void;
}

function RegisteredCharacter(props: RegisteredCharacterProps) {
    const { characterName, onClick } = props;
    return (
        <div className="registered-character-view">
            <p className='registered-character-text'>{ characterName }</p>
            <Trash2 color="red" size={12} onClick={onClick} className='registered-character-delete' />
        </div>
    )
}

export default RegisteredCharacter