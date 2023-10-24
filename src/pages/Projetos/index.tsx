import './style.sass'

import { Sidebar } from '../../components/sidebar'

import { getUserData } from '../../loggedUser'

export const Projetos = () => {
  return (
    <div className="projetos-container">
      <Sidebar activePage="Projetos" />
      <div className="content">
        <h1>Projetos</h1>
      </div>
    </div>
  )
}
