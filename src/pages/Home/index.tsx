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
import { ClientModal } from '../Clientes/clientModal'
import { ProjectCard } from '../Projetos/projectCard'
import { getClients, insertClient, updateClient } from '../../database/Clients'

export const Home = () => {
  const user = getUserData()
  const [emAndamento, setEmAndamento] = useState<Project[]>([])

  const [isModalClientOpen, setIsModalClientOpen] = useState(false)

  const [formData, setFormData] = useState({
    nome: '',
    instagram: '',
    facebook: '',
    site: '',
    linkedin: '',
    email: '',
    telefone: '',
    clientId: 0,
  })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const [clients, setClients] = useState(user ? getClients(user.userId) : [])

  useEffect(() => {
    if (user) {
      setEmAndamento(getProjects(user.userId, 'Em andamento'))
    }
  }, [user])

  const handleSave = (newClientData: Client) => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (newClientData.nome && newClientData.email && newClientData.telefone) {
      if (user) {
        if (newClientData.clientId === 0) {
          // Cria um novo cliente
          const newClientId = getNextClientId(clients)

          // Define o novo clientId seguindo formData
          const newClient = { ...newClientData, clientId: newClientId }

          // Adiciona o novo cliente
          insertClient(user.userId, newClient)
          console.log('Novo cliente adicionado com sucesso: ', newClient)
          setIsModalClientOpen(false)

          // Atualize manualmente o estado da lista de clientes
          const updatedClients = getClients(user.userId)
          setClients(updatedClients)
        } else {
          // Atualiza um cliente
          updateClient(user.userId, newClientData)
          console.log('Cliente atualizado com sucesso: ', newClientData)
          setIsModalClientOpen(false)

          // Atualize manualmente o estado da lista de clientes
          const updatedClients = getClients(user.userId)
          setClients(updatedClients)
        }
      } else {
        // O usuário não está autenticado, faça algo apropriado aqui
        console.error('Usuário não autenticado.')
      }
    }
  }

  const getNextClientId = (clients: Client[]) => {
    // Encontre o próximo clientId disponível
    let maxClientId = 0
    for (const client of clients) {
      if (client.clientId > maxClientId) {
        maxClientId = client.clientId
      }
    }
    return maxClientId + 1
  }

  return (
    <div className="dashboard-container">
      {isModalClientOpen && (
        <ClientModal
          client={formData}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
          onDelete={deleteClient}
        />
      )}
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
