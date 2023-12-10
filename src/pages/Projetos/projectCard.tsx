import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getClientById } from '../../database/Clients'; // Supondo que você tenha essa função
import { Client, Project } from '../../database/Types'
import { getUserData } from '../../loggedUser'
import './styleProjectCard.sass'

interface ProjectCardProps {
  project: Project
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const user = getUserData()
  const navigate = useNavigate()
  const [clientName, setClientName] = useState('Cliente não informado')

  useEffect(() => {
    if (project.clienteId !== 0) {
      const client = getClientById(user.userId, project.clienteId)
      if (client) {
        setClientName(client.nome)
      }
    }
  }, [project.clienteId])

  return (
    <div
      className="card"
      onClick={() => {
        navigate(`/projeto/${project.projectId}`)
      }}
    >
      <div className="title">
        {project.titulo || 'Nome do Projeto não Informado'}
      </div>
      <div className="price">
        R${' '}
        {project.gastos.reduce((acc, curr) => acc + curr.valor, 0).toFixed(2)}
      </div>
      <div className="info">
        <span className="date">
          {project.dataEntrega || 'Prazo não informado'}
        </span>
        <span className="client">{clientName}</span>
      </div>
    </div>
  )
}
