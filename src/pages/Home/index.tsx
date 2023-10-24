import './style.sass'

import { getUserData } from '../../loggedUser'

import { Sidebar } from '../../components/sidebar'

export const Home = () => {
  console.log(getUserData())

  return (
    <div className="dashboard-container">
      <Sidebar activePage="Home" />
      <div className="content">
        <h1>Dashboard</h1>
      </div>
    </div>
  )
}
