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

export const Home = () => {
  const navigate = useNavigate()

  const user = getUserData()
  const [naoIniciados, setNaoIniciados] = useState<Project[]>([])

  useEffect(() => {
    if (user) {
      setNaoIniciados(getProjects(user.userId, 'Não iniciado'))
    }
  }, [user])

  const renderProjectCard = (project: Project) => (
    <div
      className="card"
      key={project.projectId}
      onClick={() => {
        navigate(`/projeto/${project.projectId}`)
      }}
    >
      <div className="title">{project.titulo}</div>
      <div className="price">
        R${' '}
        {project.gastos.reduce((acc, curr) => acc + curr.valor, 0).toFixed(2)}
      </div>
      <div className="info">
        <span className="date">{project.dataEntrega}</span>
        <span className="client">Cliente ID: {project.clienteId}</span>
      </div>
    </div>
  )

  return (
    <div className="dashboard-container">
      <Sidebar activePage="Home" />
      <div className="content">
        <Header path={[{ label: 'Início', path: '/home' }]} />
        <div className="body">
        <div className="projetosAndamento">
            <div className="header">Projetos em andamento</div>
            <div className="projetosCards">
              {naoIniciados.map(renderProjectCard)}
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
