import React from 'react'
import './styles.sass'

type Props = {
    name: string
}

export const BlueGradientButton = ({ name }:Props) => {
  return (        
    <button 
        className="btn"
        type="button"
        //disabled={email === "" || password === ""}
        //onClick={handleLogin}
        >
        {name}
    </button>
  )
}
