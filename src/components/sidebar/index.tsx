import React from 'react'
import { useNavigate } from 'react-router-dom'

import { setUserData } from '../../loggedUser'

import relatoriosIcon from '../../assets/images/clipboard-list.png'
import gastosIcon from '../../assets/images/dollar-sign.png'
import projetosIcon from '../../assets/images/layout-dashboard.png'
import logoutIcon from '../../assets/images/logout.png'
import servicosIcon from '../../assets/images/ri_service-line.png'
import homeIcon from '../../assets/images/tanos.png'
import clientesIcon from '../../assets/images/users.png'

import './style.sass'

interface SidebarProps {
  activePage:
    | 'Home'
    | 'Clientes'
    | 'Projetos'
    | 'Servicos'
    | 'Gastos'
    | 'Relatorios'
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
  const navigate = useNavigate()

  const handleSignOut = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setUserData(null)
    navigate('/', { replace: true })
  }

  return (
    <div className="sidebar-container">
      <div
        className={activePage === 'Home' ? 'menu-active' : 'menu'}
        onClick={() => {
          navigate('/home', { replace: true })
        }}
      >
        <div className="icon">
          <img src={homeIcon} alt="" />
        </div>
        <div className="page-name">Dashboard</div>
      </div>

      <div
        className={activePage === 'Projetos' ? 'menu-active' : 'menu'}
        onClick={() => {
          navigate('/projetos')
        }}
      >
        <div className="icon">
          <img src={projetosIcon} alt="" />
        </div>
        <div className="page-name">Projetos</div>
      </div>

      <div
        className={activePage === 'Clientes' ? 'menu-active' : 'menu'}
        onClick={() => {
          navigate('/clientes')
        }}
      >
        <div className="icon">
          <img src={clientesIcon} alt="" />
        </div>
        <div className="page-name">Clientes</div>
      </div>

      <div
        className={activePage === 'Servicos' ? 'menu-active' : 'menu'}
        onClick={() => {
          navigate('/servicos')
        }}
      >
        <div className="icon">
          <img src={servicosIcon} alt="" />
        </div>
        <div className="page-name">Serviços</div>
      </div>

      <div
        className={activePage === 'Gastos' ? 'menu-active' : 'menu'}
        onClick={() => {
          navigate('/gastos')
        }}
      >
        <div className="icon">
          <img src={gastosIcon} alt="" />
        </div>
        <div className="page-name">Gastos</div>
      </div>

      {/* <div
        className={activePage === 'Relatorios' ? 'menu-active' : 'menu'}
        onClick={() => {
          navigate('/relatorios')
        }}
      >
        <div className="icon">
          <img src={relatoriosIcon} alt="" />
        </div>
        <div className="page-name">Relatórios</div>
      </div> */}

      <div className="menu bottom" onClick={(event) => handleSignOut(event)}>
        <div className="icon">
          <img src={logoutIcon} alt="" />
        </div>
        <div className="page-name">Desconectar</div>
      </div>
    </div>
  )
}
