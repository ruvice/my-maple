import React from 'react'
import Loading from '../../../assets/class/loading.gif'
import './LoadingView.css'

function LoadingView() {
  return (
    <div className='loading-view'>
        <img className='loading-gif' src={Loading} />
        <p className='loading-text' >Loading</p>
    </div>
  )
}

export default LoadingView