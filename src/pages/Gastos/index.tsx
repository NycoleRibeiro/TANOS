import './style.sass'

import { Sidebar } from '../../components/sidebar'

import { getUserData } from '../../loggedUser'

export const Gastos = () => {
  return (
    <div className="gastos-container">
      <Sidebar activePage="Gastos" />
      <div className="content">
        <h1>Gastos</h1>
      </div>
    </div>
  )
}
