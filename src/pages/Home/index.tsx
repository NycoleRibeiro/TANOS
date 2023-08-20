import './style.sass'

import { Sidebar } from '../../components/sidebar'


export const Home = () => {
  return (
    <div className="dashboard-container">
      <Sidebar activePage="Home" />
      <div className="content">
        <h1>Dashboard</h1>
      </div>
    </div>
  )
}