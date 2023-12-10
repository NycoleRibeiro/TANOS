import React from 'react'
import './style.sass'

interface ButtonProps {
  text?: string
  icon?: string
  onClick?: () => void
  size?: string
  color?: string
}

export const FilledButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  icon,
  size,
  color,
}) => {
  return (
    <button
      className="filled-button"
      type={onClick ? 'button' : 'submit'}
      onClick={onClick}
      style={{
        width: size,
        background: color,
      }}
    >
      {icon && <img className="icon" src={icon} alt="icon" />}
      {text !== '' && text}
    </button>
  )
}
