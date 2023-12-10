import React, { useState } from 'react'
import './style.sass'

import ClearIcon from '../../../assets/images/cancel.svg'

interface TextInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  name: string
  inputValue?: string
  label?: string
  icon?: string
  clearText?: boolean
  error?: string
  isDateField?: boolean
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  name,
  inputValue = '',
  onChange,
  icon,
  clearText = false,
  error,
  isDateField = false,
}) => {
  const [focus, setFocus] = useState(false) // Estado para controlar o foco do input, utilizado para questões de estilo

  const formatValueAsDate = (value: string) => {
    const val = value.replace(/\D/g, '')
    let formattedValue = val

    if (val.length > 2) {
      formattedValue = val.substring(0, 2) + '/' + val.substring(2)
    }
    if (val.length > 4) {
      formattedValue =
        formattedValue.substring(0, 5) + '/' + val.substring(4, 8)
    }

    return formattedValue
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = isDateField
      ? formatValueAsDate(event.target.value)
      : event.target.value
    onChange(value, name) // Atualize para passar o valor e o nome do campo
  }

  return (
    <div className={`text-input ${error ? 'error' : ''}`}>
      {label && (
        <label htmlFor="input" className={`text ${error ? 'error' : ''}`}>
          {label}
        </label>
      )}
      <div className={`input ${focus || inputValue ? 'active' : ''}`}>
        {icon && <img src={icon} alt="" className="icon" />}
        <input
          type="text"
          name={name}
          className="input-text"
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        {clearText && inputValue && (
          <img
            src={ClearIcon}
            alt=""
            className="clear-icon"
            onClick={() => onChange('', name)}
          />
        )}
      </div>

      {error && <p className="error-text">{error}</p>}
    </div>
  )
}
