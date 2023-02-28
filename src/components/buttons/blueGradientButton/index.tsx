import React from 'react'
import './styles.sass'

type Props = {
    name: string
    onClick: () => void
}

export const BlueGradientButton = ({ name, onClick }:Props) => {
  return (        
    <button 
        className="btn"
        type="button"
        onClick={onClick}
        >
        {name}
    </button>
  )
}
