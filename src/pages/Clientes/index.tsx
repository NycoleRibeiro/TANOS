import { ChangeEvent, useEffect, useState } from 'react'

import './style.sass'

import deleteIcon from '../../assets/images/delete.svg'
import { FilledButton } from '../../components/buttons/filledButton'
import { Header } from '../../components/header'
import { AvatarInput } from '../../components/inputs/avatar'
import { Input } from '../../components/inputs/input'
import { SearchInput } from '../../components/inputs/search'
import { Sidebar } from '../../components/sidebar'
import { ToastNotification } from '../../components/toast-notification'

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
  interface Client {
    nome: string
    instagram: string
    facebook: string
    site: string
    linkedin: string
    email: string
    telefone: string
    clientId: number
  }

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
  const [clients, setClients] = useState(user ? getClients(user.userId) : [])
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
  }

  const filteredClients = clients.filter((client) =>
    client.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSave = () => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (formData.nome && formData.email && formData.telefone) {
      if (user) {
        if (formData.clientId === 0) {
          // Cria um novo cliente
          const newClientId = getNextClientId(clients)

          // Define o novo clientId seguindo formData
          const newClient = { ...formData, clientId: newClientId }

          // Adiciona o novo cliente
          insertClient(user.userId, newClient)
          console.log('Novo cliente adicionado com sucesso: ', newClient)
          setIsModalOpen(false)

          // Atualize manualmente o estado da lista de clientes
          const updatedClients = getClients(user.userId)
          setClients(updatedClients)
        } else {
          // Atualiza um cliente
          updateClient(user.userId, formData)
          console.log('Cliente atualizado com sucesso: ', formData)
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
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 5000) // 5 segundos
  }

  return (
    <div className="clientes-container">
      <Sidebar activePage="Clientes" />
      {showToast && (
        <ToastNotification
          type="ok"
          text="Valor copiado para área de transferência"
        />
      )}

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
          <div className="add-contact">
            <div className="modal">
              <div className="header">Dados do cliente</div>

              <div className="content">
                {/* <AvatarInput /> */}
                <div className="line">
                  <Input
                    label="Nome"
                    placeholder="Nome do cliente"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                  />

                  {formData.clientId !== 0 && (
                    <div className="delButton" onClick={deleteClient}>
                      <img src={deleteIcon} alt="" />
                    </div>
                  )}
                </div>
                <Input
                  label="Email"
                  placeholder="Email do cliente"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Input
                  label="Telefone"
                  placeholder="+55 99 99999-9999"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                />

                <div className="socialmedia">
                  <p>Instagram</p>
                  <Input
                    label="Link"
                    placeholder="https://"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="socialmedia">
                  <p>Facebook</p>
                  <Input
                    label="Link"
                    placeholder="https://"
                    name="facebook"
                    onChange={handleInputChange}
                    value={formData.facebook}
                  />
                </div>

                <div className="socialmedia">
                  <p>Linkedin</p>
                  <Input
                    label="Link"
                    placeholder="https://"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="socialmedia">
                  <p>Site</p>
                  <Input
                    label="Link"
                    placeholder="https://"
                    name="site"
                    value={formData.site}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="buttons">
                <FilledButton
                  text="Cancelar"
                  size="100px"
                  onClick={() => setIsModalOpen(false)}
                />
                <FilledButton text="Salvar" size="100px" onClick={handleSave} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
