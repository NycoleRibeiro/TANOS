import './style.sass'

import { Sidebar } from '../../components/sidebar'


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