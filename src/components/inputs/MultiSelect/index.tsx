import React, { useEffect, useRef, useState } from 'react'
import './style.sass'

import { Checkbox } from '../../buttons/Checkbox'

import Close from '../../../assets/icons/close.svg'
import ArrowDownIcon from '../../../assets/icons/simple-arrow-down.svg'
import ArrowRightIcon from '../../../assets/icons/simple-arrow-right.svg'

interface MultiSelectProps {
  onSelect: (selectedItems: string[]) => void
  placeholder: string
  label?: string
  options: string[]
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  placeholder,
  onSelect,
  options,
}) => {
  // Estados para controlar o comportamento do componente
  const [focus, setFocus] = useState(false) // Estado para controlar o foco do input, utilizado para questões de estilo
  const [value, setValue] = useState('') // Estado para controlar o valor do input, utilizado para questões de estilo
  const [selectedItems, setSelectedItems] = useState<string[]>([]) // Estado para controlar as opções selecionadas
  const [isOpen, setIsOpen] = useState(false) // Estado para controlar a abertura do dropdown
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options) // Estado para armazenar opções filtradas

  const multiSelectRef = useRef<HTMLDivElement | null>(null) // Ref para o componente MultiSelect
  const [tagsExpanded, setTagsExpanded] = useState(false)

  // Event listener para fechar o dropdown quando clicar fora do componente
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        multiSelectRef.current &&
        !multiSelectRef.current.contains(event.target as Node)
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

  // Função para selecionar ou desmarcar uma opção
  const toggleOption = (selectedOption: string) => {
    const updatedSelectedItems = selectedItems.includes(selectedOption)
      ? selectedItems.filter((item) => item !== selectedOption)
      : [...selectedItems, selectedOption]

    // Ordena a lista de itens selecionados de acordo com a ordem da lista original passada para o componente
    const sortedSelectedItems = options.filter((option) =>
      updatedSelectedItems.includes(option),
    )
    setSelectedItems(sortedSelectedItems)
    onSelect(sortedSelectedItems)
  }

  // Função para alternar a exibição do dropdown
  const toggleDropdown = () => {
    setFocus(!focus)
    setIsOpen(!isOpen)
    setFilteredOptions(options) // Limpa os filtros em primeiro momento se houver um valor escrito e abrir o dropdown
  }

  return (
    <div className="multi-select" ref={multiSelectRef}>
      {label && (
        <label htmlFor="input" className="text">
          {label}
        </label>
      )}
      <div
        className={`input ${focus || selectedItems.length > 0 ? 'active' : ''}`}
      >
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
            // setValue(selectedItems.join(', ')); // Exibe os itens selecionados separados por vírgula
            setTimeout(() => {
              setFocus(false)
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
              className={`checkbox-option ${
                selectedItems.includes(option) ? 'selected' : ''
              }`}
            >
              <input
                type="checkbox"
                value={option}
                checked={selectedItems.includes(option)}
                onChange={() => toggleOption(option)}
              />
              <Checkbox
                id={index.toString()}
                name={option}
                value={option}
                text={option}
                checked={selectedItems.includes(option)}
                disabled={false}
                onChange={() => toggleOption(option)}
              />
            </label>
          ))}
        </div>
      )}

      <div className="tags">
        {selectedItems
          .slice(0, tagsExpanded ? selectedItems.length : 4)
          .map((item, id) => (
            <div className="tag" key={id}>
              {item}
              <img src={Close} alt="x" onClick={() => toggleOption(item)} />
            </div>
          ))}
        {!tagsExpanded && selectedItems.length > 4 && (
          <div className="tag expand" onClick={() => setTagsExpanded(true)}>
            ...
          </div>
        )}
        {tagsExpanded && selectedItems.length >= 4 && (
          <div className="tag expand" onClick={() => setTagsExpanded(false)}>
            ...
          </div>
        )}
      </div>
    </div>
  )
}
