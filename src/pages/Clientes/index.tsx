import { useEffect, useState } from 'react'

import './style.sass'

import { FilledButton } from '../../components/buttons/filledButton'
import { Header } from '../../components/header'

import { SearchInput } from '../../components/inputs/search'
import { Sidebar } from '../../components/sidebar'
import { ToastNotification } from '../../components/toast-notification'
import { addToHistory } from '../../database/History'
import { Client } from '../../database/Types'
import { ClientModal } from './clientModal'

import {
  getClients,
  insertClient,
  removeClient,
  updateClient,
} from '../../database/Clients'
import { getUserData } from '../../loggedUser'

import emailIcon from '../../assets/images/email.svg'
import faceIcon from '../../assets/images/face.svg'
import instaIcon from '../../assets/images/insta.svg'
import linkedinIcon from '../../assets/images/linkedin.svg'
import phoneIcon from '../../assets/images/phone.svg'
import siteIcon from '../../assets/images/site.svg'

export const Clientes = () => {
  const user = getUserData() // Obtém o usuário atual
  const [isModalOpen, setIsModalOpen] = useState(false)

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
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (toastMessage !== '') {
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
        setToastMessage('')
      }, 5000)
    }
  }, [toastMessage])

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
  }

  const filteredClients = clients.filter((client) =>
    client.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
          setToastMessage('Novo cliente criado com sucesso')
          setIsModalOpen(false)

          // Atualize manualmente o estado da lista de clientes
          const updatedClients = getClients(user.userId)
          setClients(updatedClients)

          // Atualiza o histórico
          const logMessage = 'Novo cliente adicionado ao sistema'
          addToHistory(user.userId, logMessage)
        } else {
          // Atualiza um cliente
          updateClient(user.userId, newClientData)
          setToastMessage('Dados salvos com sucesso')
          setIsModalOpen(false)

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

  const editClient = (client: Client, event) => {
    event.stopPropagation()
    setIsModalOpen(true)
    setFormData(client)
  }

  const createClient = () => {
    setIsModalOpen(true)
    setFormData({
      nome: '',
      instagram: '',
      facebook: '',
      site: '',
      linkedin: '',
      email: '',
      telefone: '',
      clientId: 0,
    })
  }

  const deleteClient = () => {
    if (user) {
      removeClient(user.userId, formData.clientId)
      // Atualize manualmente o estado da lista de clientes
      const updatedClients = getClients(user.userId)
      setClients(updatedClients)
      setIsModalOpen(false)
      setToastMessage('Cliente excluído com sucesso')
    }
  }

  const copyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }

  const handleContactClick = (text: string) => {
    copyTextToClipboard(text)
    setToastMessage('Valor copiado para área de transferência')
  }

  return (
    <div className="clientes-container">
      <Sidebar activePage="Clientes" />
      {showToast && <ToastNotification type="ok" text={toastMessage} />}

      <div className="content">
        <Header path={[{ label: 'Clientes', path: '/clientes' }]} />
        <div className="actions">
          <SearchInput
            placeholder="Nome do cliente"
            onSearchChange={handleSearchChange}
          />
          <FilledButton
            text="Adicionar contato"
            size="200px"
            onClick={() => createClient()}
          />
        </div>

        <div className="clients">
          {filteredClients.map((client) => {
            return (
              <div
                className="client"
                key={client.clientId}
                onClick={(e) => editClient(client, e)}
              >
                <div className="avatar">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
                    alt=""
                  />
                </div>

                <div className="name">{client.nome}</div>

                {/* <div className="projects">
                  <div className="project">
                    <div className="number">{client.projetosPendentes}</div>
                    <p>Projetos pendentes</p>
                  </div>
                  <div className="project">
                    <div className="number">{client.projetosEmAndamento}</div>
                    <p>Projetos em andamento</p>
                  </div>
                  <div className="project">
                    <div className="number">{client.projetosConcluidos}</div>
                    <p>Projetos concluídos</p>
                  </div>
                </div> */}

                <div className="buttons">
                  {client.instagram !== '' && (
                    <div
                      className="button-social"
                      onClick={(event) => {
                        event.stopPropagation()
                        window.open(client.instagram, '_blank')
                      }}
                    >
                      <img src={instaIcon} alt="" />
                    </div>
                  )}

                  {client.facebook !== '' && (
                    <div
                      className="button-social"
                      onClick={(event) => {
                        event.stopPropagation()
                        window.open(client.facebook, '_blank')
                      }}
                    >
                      <img src={faceIcon} alt="" />
                    </div>
                  )}

                  {client.site !== '' && (
                    <div
                      className="button-social"
                      onClick={(event) => {
                        event.stopPropagation()
                        window.open(client.site, '_blank')
                      }}
                    >
                      <img src={siteIcon} alt="" />
                    </div>
                  )}

                  {client.linkedin !== '' && (
                    <div
                      className="button-social"
                      onClick={(event) => {
                        event.stopPropagation()
                        window.open(client.linkedin, '_blank')
                      }}
                    >
                      <img src={linkedinIcon} alt="" />
                    </div>
                  )}

                  <div
                    className="button-contact"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleContactClick(client.email)
                    }}
                  >
                    <img src={emailIcon} alt="" />
                  </div>
                  <div
                    className="button-contact"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleContactClick(client.telefone)
                    }}
                  >
                    <img src={phoneIcon} alt="" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <ClientModal
            client={formData}
            onSave={handleSave}
            onClose={() => setIsModalOpen(false)}
            onDelete={deleteClient}
          />
        )}
      </div>
    </div>
  )
}
