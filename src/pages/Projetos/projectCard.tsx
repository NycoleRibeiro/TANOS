import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Project } from '../../database/Types'
import './styleProjectCard.sass'

interface ProjectCardProps {
  project: Project
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate()

  return (
    <div
      className="card"
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
}
