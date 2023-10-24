import './style.sass'

import { Sidebar } from '../../components/sidebar'

import { getUserData } from '../../loggedUser'

export const Relatorios = () => {
  return (
    <div className="relatorios-container">
      <Sidebar activePage="Relatorios" />
      <div className="content">
        <h1>Relatórios</h1>
      </div>
    </div>
  )
}
