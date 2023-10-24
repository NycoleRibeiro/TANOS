import './style.sass'

import { Sidebar } from '../../components/sidebar'

import { getUserData } from '../../loggedUser'

export const Servicos = () => {
  return (
    <div className="servicos-container">
      <Sidebar activePage="Servicos" />
      <div className="content">
        <h1>Serviços</h1>
      </div>
    </div>
  )
}
