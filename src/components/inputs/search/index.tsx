import React from 'react'
import './style.sass'

import SearchIcon from '../../../assets/images/search.svg'

interface SearchInputProps {
    placeholder: string;
    onClick: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onClick }) => {
  return (
    <div className="searchBox">
        <input className="searchInput" type="text" name="" placeholder={placeholder} />
        <button className="searchButton" onClick={onClick}>
            <img src={SearchIcon} alt="" />
        </button>
    </div>
  )
}
