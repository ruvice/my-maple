import React from 'react'
import "./ChatDialog.css"
import Button, { ButtonType } from '../Button/Button';

type ChatDialogProps = {
    message: string;
    onClickCTA?: () => void;
    onCancel?: () => void;
}

function ChatDialog(props: ChatDialogProps) {
    const { message, onClickCTA, onCancel } = props;
    return (
        <div className='chat-dialog-view'>
            <div className='chat-dialog-message-block light-blue-background'>
                <p className='chat-dialog-message-text'>{message}</p>
            </div>
            <div className='chat-dialog-cta-block dialog-white-background'>
                <Button className="dialog-button" type={ButtonType.OK} label={'OK'} onClick={onClickCTA} />
                <Button className="dialog-button" type={ButtonType.Cancel} label={'Cancel'} onClick={onCancel} />
            </div>
        </div>
    )
}

export default ChatDialog