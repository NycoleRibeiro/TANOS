import './style.sass'

import { Sidebar } from '../../components/sidebar'


export const Clientes = () => {
  return (
    <div className="clientes-container">
      <Sidebar activePage="Clientes" />
      <div className="content">
        <h1>Clientes</h1>
      </div>
    </div>
  )
}