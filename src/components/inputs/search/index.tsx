import React, { useState } from 'react'
import './style.sass'

import SearchIcon from '../../../assets/images/search.svg'

interface SearchInputProps {
  placeholder: string
  onSearchChange: (searchTerm: string) => void
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onSearchChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    onSearchChange(e.target.value)
  }

  return (
    <div className="searchBox">
      <input
        className="searchInput"
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className="searchButton">
        <img src={SearchIcon} alt="" />
      </button>
    </div>
  )
}
