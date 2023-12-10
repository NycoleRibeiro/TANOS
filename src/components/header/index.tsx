import React from 'react'
import { Link } from 'react-router-dom'
import './style.sass'

import BackBtn from '../../assets/images/backBtn.svg'

interface HeaderProps {
  path: {
    label: string
    path: string
  }[]
}

export const Header: React.FC<HeaderProps> = ({ path }) => {
  // Verifica se existem mais de um item no array path
  const showBackButton = path.length > 1

  return (
    <div className="header-container">
      {showBackButton && (
        <Link to={path[path.length - 2].path}>
          <img src={BackBtn} alt="Voltar" className="back"/>
        </Link>
      )}
      {path.map((item, index) => {
        const isLastItem = index === path.length - 1
        return (
          <span key={index}>
            {isLastItem ? (
              <span className="text">{item.label}</span>
            ) : (
              <Link
                className="text"
                style={{ textDecoration: 'inherit' }}
                to={item.path}
              >
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </div>
  )
}
