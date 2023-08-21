import './style.sass'

import { Sidebar } from '../../components/sidebar'
import { Header } from '../../components/header'


export const Clientes = () => {
  return (
    <div className="clientes-container">
      <Sidebar activePage="Clientes" />
      <div className="content">
        <Header path={[
          { label: 'Clientes', path: '/clientes' },
        ]} />
        <h1>Clientes</h1>
      </div>
    </div>
  )
}