import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.sass'

import { getProjects } from '../../database/Projects'
import { Client, Project, Service } from '../../database/Types'
import { getUserData } from '../../loggedUser'

import serviceIcon from '../../assets/images/group.svg'
import projectIcon from '../../assets/images/table-add.svg'
import clientIcon from '../../assets/images/user-add-outlined.svg'
import { Header } from '../../components/header'
import { Sidebar } from '../../components/sidebar'
import { ProjectCard } from '../Projetos/projectCard'

export const Home = () => {
  const user = getUserData()
  const [emAndamento, setEmAndamento] = useState<Project[]>([])

  useEffect(() => {
    if (user) {
      setEmAndamento(getProjects(user.userId, 'Em andamento'))
    }
  }, [user])

  return (
    <div className="dashboard-container">
      <Sidebar activePage="Home" />
      <div className="content">
        <Header path={[{ label: 'Início', path: '/home' }]} />
        <div className="body">
          <div className="projetosAndamento">
            <div className="header">Projetos em andamento</div>
            <div className="projetosCards">
              {emAndamento.map((project) => (
                <ProjectCard key={project.projectId} project={project} />
              ))}
            </div>
          </div>
          <div className="atalhos">
            <div className="atalho">
              <div className="icon">
                <img src={clientIcon} alt="" />
              </div>
              <div className="name">Cadastrar cliente</div>
            </div>
            <div className="atalho">
              <div className="icon">
                <img src={serviceIcon} alt="" />
              </div>
              <div className="name">Cadastrar serviço</div>
            </div>
            <div className="atalho">
              <div className="icon">
                <img src={projectIcon} alt="" />
              </div>
              <div className="name">Criar projeto</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
