import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.sass'

import { Header } from '../../components/header'
import { Sidebar } from '../../components/sidebar'
import { ProjectCard } from './projectCard'

import { getProjects } from '../../database/Projects'
import { Project } from '../../database/Types'
import { getUserData } from '../../loggedUser'

import { addToHistory } from '../../database/History'

export const Projetos = () => {
  const user = getUserData()
  const navigate = useNavigate()
  const [todosProjetos, setTodosProjetos] = useState<Project[]>([])
  const [naoIniciados, setNaoIniciados] = useState<Project[]>([])
  const [emAndamento, setEmAndamento] = useState<Project[]>([])
  const [concluidos, setConcluidos] = useState<Project[]>([])

  useEffect(() => {
    if (user) {
      setTodosProjetos(getProjects(user.userId))
      setNaoIniciados(getProjects(user.userId, 'Não iniciado'))
      setEmAndamento(getProjects(user.userId, 'Em andamento'))
      setConcluidos(getProjects(user.userId, 'Concluído'))
    }
  }, [user])

  const criarNovoProjeto = () => {
    // Encontra o ID máximo entre os projetos existentes
    const maxId = todosProjetos.reduce(
      (max, projeto) => Math.max(max, projeto.projectId),
      0,
    )
    // Atualiza o histórico
    const logMessage = `Um novo projeto foi criado`
    addToHistory(user.userId, logMessage)
    // Navega para a página de projeto com um novo ID
    navigate(`/projeto/${maxId + 1}`)
  }

  return (
    <div className="projetos-container">
      <Sidebar activePage="Projetos" />
      <div className="content">
        <Header path={[{ label: 'Projetos', path: '/projetos' }]} />
        <div className="quadros">
          <div className="quadro">
            <div className="header">Não iniciado</div>
            <div className="cards">
              <div className="buttonCreateProject" onClick={criarNovoProjeto}>
                Criar novo projeto
              </div>
              {naoIniciados.map((project) => (
                <ProjectCard key={project.projectId} project={project} />
              ))}
            </div>
          </div>
          <div className="quadro">
            <div className="header">Em andamento</div>
            <div className="cards">
              {emAndamento.map((project) => (
                <ProjectCard key={project.projectId} project={project} />
              ))}
            </div>
          </div>
          <div className="quadro">
            <div className="header">Concluído</div>
            <div className="cards">
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
