import React, { useState } from 'react'
import './style.sass'

import ClearIcon from '../../../assets/images/cancel.svg'

interface LargeTextInputProps {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder: string
  name: string
  inputValue?: string
  label?: string
  icon?: string
  clearText?: boolean
  error?: string
}

export const LargeTextInput: React.FC<LargeTextInputProps> = ({
  label,
  placeholder,
  name,
  inputValue = '',
  onChange,
  icon,
  clearText = false,
  error,
}) => {
  const [focus, setFocus] = useState(false) // Estado para controlar o foco do input, utilizado para questões de estilo

  // Função para lidar com a mudança de valor do input
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event) // Chama a função passada por prop para lidar com a mudança de valor
  }

  return (
    <div className={`large-text-input ${error ? 'error' : ''}`}>
      {label && (
        <label htmlFor="input" className={`text ${error ? 'error' : ''}`}>
          {label}
        </label>
      )}
      <div className={`input ${focus || inputValue ? 'active' : ''}`}>
        {icon && <img src={icon} alt="" className="icon" />}
        <textarea
          name={name}
          className="input-text"
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          rows={4} // Defina o número de linhas inicial
        />
        {clearText && inputValue && (
          <img
            src={ClearIcon}
            alt=""
            className="clear-icon"
            onClick={() => {}}
          />
        )}
      </div>

      {error && <p className="error-text">{error}</p>}
    </div>
  )
}
