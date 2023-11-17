import React, { useEffect, useState } from 'react'
import './style.sass'

import { Header } from '../../components/header'
import { Sidebar } from '../../components/sidebar'

import { getProjects } from '../../database/Projects'
import { getUserData } from '../../loggedUser'

interface Expense {
  titulo: string
  tipo: 'Projeto' | 'Cliente'
  valor: number
}

interface ToDoItem {
  check: boolean
  descricao: string
}

interface Project {
  projectId: number
  titulo: string
  descricao: string
  status: 'Não iniciado' | 'Em andamento' | 'Concluído'
  dataPedido: string
  dataEntrega: string
  clienteId: number
  servicosId: number[]
  gastos: Expense[]
  toDoList: ToDoItem[]
}

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

  const renderProjectCard = (project: Project) => (
    <div className="card" key={project.projectId}>
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
    <div className="projetos-container">
      <Sidebar activePage="Projetos" />
      <div className="content">
        <Header path={[{ label: 'Projetos', path: '/projetos' }]} />
        <div className="quadros">
          <div className="quadro">
            <div className="header">Não iniciado</div>
            <div className="cards">{naoIniciados.map(renderProjectCard)}</div>
          </div>
          <div className="quadro">
            <div className="header">Em andamento</div>
            <div className="cards">{emAndamento.map(renderProjectCard)}</div>
          </div>
          <div className="quadro">
            <div className="header">Concluído</div>
            <div className="cards">{concluidos.map(renderProjectCard)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
