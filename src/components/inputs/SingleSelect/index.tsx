import React, { useEffect, useRef, useState } from 'react'
import './style.sass'

import ArrowDownIcon from '../../../assets/images/simple-arrow-down.svg'
import ArrowRightIcon from '../../../assets/images/simple-arrow-right.svg'

interface SingleSelectProps {
  onSelect: (selectedItem: string) => void
  placeholder: string
  label?: string
  options: string[]
  initialValue?: string
}

export const SingleSelect: React.FC<SingleSelectProps> = ({
  label,
  placeholder,
  onSelect,
  options,
  initialValue = '',
}) => {
  // Estados para controlar o comportamento do componente
  const [focus, setFocus] = useState(false) // Estado para controlar o foco do input, utilizado para questões de estilo
  const [value, setValue] = useState(initialValue) // Estado para controlar o valor do input, utilizado para questões de estilo
  console.log(value)
  console.log(initialValue)
  const [selectedItem, setSelectedItem] = useState(initialValue) // Estado para controlar a opção selecionada
  const [isOpen, setIsOpen] = useState(false) // Estado para controlar a abertura do dropdown
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options) // Estado para armazenar opções filtradas
  const singleSelectRef = useRef<HTMLDivElement | null>(null) // Ref para o componente MultiSelect

  useEffect(() => {
    setValue(initialValue)
    setSelectedItem(initialValue)
  }, [initialValue])

  // Event listener para fechar o dropdown quando clicar fora do componente
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        singleSelectRef.current &&
        !singleSelectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setFocus(false)
      }
    }

    // Adicionar o event listener quando o componente for montado
    document.addEventListener('mousedown', handleClickOutside)

    // Remover o event listener quando o componente for desmontado
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Função para lidar com a mudança de valor do input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setValue(inputValue)

    // Filtra as opções com base no texto digitado
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase()),
    )
    setFilteredOptions(filtered)
  }

  // Função para selecionar uma opção
  const selectOption = (selectedOption: string) => {
    setValue(selectedOption)
    setSelectedItem(selectedOption)

    setIsOpen(false)
    onSelect(selectedOption)
  }

  // Função para alternar a exibição do dropdown
  const toggleDropdown = () => {
    setFocus(!focus)
    setIsOpen(!isOpen)
    setFilteredOptions(options) // limpa os filtros em primeiro momento se houver um valor selecionado e abrir o dropdown
  }

  return (
    <div className="simple-select" ref={singleSelectRef}>
      {label && (
        <label htmlFor="input" className="text">
          {label}
        </label>
      )}
      <div className={`input ${focus || value ? 'active' : ''}`}>
        <input
          type="text"
          name="input"
          className="input-text"
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={() => {
            setFocus(true)
            setIsOpen(true)
          }}
          onBlur={() => {
            setValue(selectedItem)
            setTimeout(() => {
              setFocus(false)
              setIsOpen(false)
            }, 200)
          }}
        />

        <div className="icon">
          <img
            src={isOpen ? ArrowDownIcon : ArrowRightIcon}
            alt=""
            className="arrow-icon"
            onClick={toggleDropdown}
          />
        </div>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="options-container">
          {filteredOptions.map((option, index) => (
            <label
              key={index}
              className={`radio-option ${
                option === selectedItem ? 'selected' : ''
              }`}
            >
              <input
                type="radio"
                value={option}
                checked={option === selectedItem}
                onChange={() => selectOption(option)}
                // Função para que quando o usuário clique em uma opção já marcada, ela seja desmarcada.
                onClick={() => {
                  if (option === selectedItem) {
                    setValue('')
                    setSelectedItem('')
                    setIsOpen(false)
                    onSelect('')
                  }
                }}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
