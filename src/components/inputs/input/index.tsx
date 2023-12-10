import React, { ChangeEvent } from 'react'
import './style.sass'

interface InputProps {
  label: string
  placeholder: string
  value: string
  name: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  name,
  onChange,
}) => {
  return (
    <div className="coolinput">
      <label htmlFor="input" className="text">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        className="input"
        onChange={onChange}
      />
    </div>
  )
}
