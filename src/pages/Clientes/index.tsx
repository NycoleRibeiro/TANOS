import { ChangeEvent, useEffect, useState } from 'react'

import './style.sass'

import { FilledButton } from '../../components/buttons/filledButton'
import { Header } from '../../components/header'
import { AvatarInput } from '../../components/inputs/avatar'
import { Input } from '../../components/inputs/input'
import { SearchInput } from '../../components/inputs/search'
import { Sidebar } from '../../components/sidebar'
import { ToastNotification } from '../../components/toast-notification'

import { listaDeClientes } from '../../database/Clients'
import { getUserData } from '../../loggedUser'

import emailIcon from '../../assets/images/email.svg'
import faceIcon from '../../assets/images/face.svg'
import instaIcon from '../../assets/images/insta.svg'
import linkedinIcon from '../../assets/images/linkedin.svg'
import phoneIcon from '../../assets/images/phone.svg'
import siteIcon from '../../assets/images/site.svg'

export const Clientes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    site: '',
  })
  const [showToast, setShowToast] = useState(false)
  const [clientes, setClientes] = useState([])

  const loadClientes = async () => {}

  useEffect(() => {
    loadClientes()
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSave = async () => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (formData.nome && formData.email && formData.telefone) {
      try {
        const user = getUserData() // Obtém o usuário atual

        if (user) {
          // O usuário está autenticado, podemos acessar seu UID
          const newClientRef = await addDoc(collection(db, 'clientes'), {
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone,
            instagram: formData.instagram || '',
            facebook: formData.facebook || '',
            linkedin: formData.linkedin || '',
            site: formData.site || '',
            userId: user.uid, // Usamos o UID do usuário autenticado
          })

          console.log('Novo cliente adicionado com ID: ', newClientRef.id)

          // Faça algo com os valores em formData
          setIsModalOpen(false)
        } else {
          // O usuário não está autenticado, faça algo apropriado aqui
          console.error('Usuário não autenticado.')
        }
      } catch (error) {
        console.error('Erro ao adicionar cliente: ', error)
      }
    }
  }

  const editClient = (client, event) => {
    event.stopPropagation()
    setIsModalOpen(true)
    setFormData(client)
  }

  const createClient = () => {
    setIsModalOpen(true)
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      instagram: '',
      facebook: '',
      linkedin: '',
      site: '',
    })
  }

  const copyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }

  const handleContactClick = (text) => {
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
          text="Email copiado para área de transferência"
        />
      )}

      <div className="content">
        <Header path={[{ label: 'Clientes', path: '/clientes' }]} />
        <div className="actions">
          <SearchInput placeholder="Nome do cliente" onClick={() => {}} />
          <FilledButton
            text="Adicionar contato"
            size="200px"
            onClick={() => createClient()}
          />
        </div>

        <div className="clients">
          {clientes.map((client, id) => {
            return (
              <div
                className="client"
                key={id}
                onClick={(e) => editClient(client, e)}
              >
                <div className="avatar">
                  <img src="" alt="" />
                </div>

                <div className="name">{client.nome}</div>

                <div className="projects">
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
                </div>

                <div className="buttons">
                  <div
                    className="button-social"
                    onClick={(event) => {
                      event.stopPropagation()
                      window.open(client.instagram, '_blank')
                    }}
                  >
                    <img src={instaIcon} alt="" />
                  </div>
                  <div className="button-social">
                    <img src={faceIcon} alt="" />
                  </div>
                  <div className="button-social">
                    <img src={siteIcon} alt="" />
                  </div>
                  <div className="button-social">
                    <img
                      src={linkedinIcon}
                      alt=""
                      onClick={(event) => {
                        event.stopPropagation()
                        window.open(client.linkedin, '_blank')
                      }}
                    />
                  </div>
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
                <AvatarInput />
                <Input
                  label="Nome"
                  placeholder="Nome do cliente"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                />
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
