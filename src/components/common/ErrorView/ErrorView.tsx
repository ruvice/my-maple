import React from 'react'
import ErrorMushroom from '../../../assets/SadHornedMushroom.gif'
import './ErrorView.css'

type ErrorViewProps = {
    message?: string;
}

function ErrorView(props: ErrorViewProps) {
    const { message } = props;
    return (
        <div className='error-view'>
            <img className='error-gif' src={ErrorMushroom} />
            <p className='error-text' >{message ?? 'Oops something went wrong'}</p>
        </div>
    )
}

export default ErrorView