import { useEffect, useState } from 'react'
import './style.sass'

import { Header } from '../../components/header'
import { Sidebar } from '../../components/sidebar'
import { ProjectCard } from './projectCard'

import { getProjects } from '../../database/Projects'
import { getUserData } from '../../loggedUser'
import { Project } from '../../database/Types'

export const Projetos = () => {
  const user = getUserData()
  const [naoIniciados, setNaoIniciados] = useState<Project[]>([])
  const [emAndamento, setEmAndamento] = useState<Project[]>([])
  const [concluidos, setConcluidos] = useState<Project[]>([])

  useEffect(() => {
    if (user) {
      setNaoIniciados(getProjects(user.userId, 'Não iniciado'))
      setEmAndamento(getProjects(user.userId, 'Em andamento'))
      setConcluidos(getProjects(user.userId, 'Concluído'))
    }
  }, [user])

  return (
    <div className="projetos-container">
      <Sidebar activePage="Projetos" />
      <div className="content">
        <Header path={[{ label: 'Projetos', path: '/projetos' }]} />
        <div className="quadros">
          <div className="quadro">
            <div className="header">Não iniciado</div>
            <div className="cards">
              <div className="buttonCreateProject">Criar novo projeto</div>
              {naoIniciados.map((project) => (
                <ProjectCard key={project.projectId} project={project} />
              ))}
            </div>
          </div>
          <div className="quadro">
            <div className="header">Em andamento</div>
            <div className="cards">
              <div className="buttonCreateProject">Criar novo projeto</div>
              {emAndamento.map((project) => (
                <ProjectCard key={project.projectId} project={project} />
              ))}
            </div>
          </div>
          <div className="quadro">
            <div className="header">Concluído</div>
            <div className="cards">
              <div className="buttonCreateProject">Criar novo projeto</div>
              {concluidos.map((project) => (
                <ProjectCard key={project.projectId} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
