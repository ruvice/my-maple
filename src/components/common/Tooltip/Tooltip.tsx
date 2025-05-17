import React from 'react'

type TooltipProps = {
    message: string;
    position: DOMRect;
}

function Tooltip(props: TooltipProps) {
    const { message, position } = props;
    return (
        <div className="tooltip" 
        style={{
            position: 'fixed',
            top: position.bottom + 5,
            left: position.left,
            backgroundColor: '#333',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            zIndex: 9999,
            pointerEvents: 'none',
            }}>
            <p className='tooltip-text'>{message}</p>
        </div>
  )
}

export default Tooltip