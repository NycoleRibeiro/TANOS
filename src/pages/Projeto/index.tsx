import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './style.sass'

import PlusIcon from '../../assets/images/add.svg'
import emailIcon from '../../assets/images/email.svg'
import faceIcon from '../../assets/images/face.svg'
import instaIcon from '../../assets/images/insta.svg'
import linkedinIcon from '../../assets/images/linkedin.svg'
import phoneIcon from '../../assets/images/phone.svg'
import siteIcon from '../../assets/images/site.svg'

import { Header } from '../../components/header'
import { LargeTextInput } from '../../components/inputs/LargeTextInput'
import { SingleSelect } from '../../components/inputs/SingleSelect'
import { TextInput } from '../../components/inputs/TextInput'
import { Sidebar } from '../../components/sidebar'
import { ToastNotification } from '../../components/toast-notification'

import { getClientById } from '../../database/Clients'
import { getProjectById } from '../../database/Projects'
import { getServicesById } from '../../database/Services'
import { getUserData } from '../../loggedUser'

import { Client, Project, Service } from '../../database/Types'

export const Projeto = () => {
  const { projectId } = useParams()
  const projectIdNumber = projectId ? parseInt(projectId, 10) : null
  const user = getUserData()

  const initialProjectState: Project = {
    projectId: 0,
    titulo: '',
    descricao: '',
    status: 'Não iniciado',
    dataPedido: '',
    dataEntrega: '',
    clienteId: user ? user.userId : 0,
    servicosId: [],
    gastos: [],
    toDoList: [],
  }

  const initialClientState: Client = {
    nome: '',
    instagram: '',
    facebook: '',
    site: '',
    linkedin: '',
    email: '',
    telefone: '',
    clientId: 0,
  }

  const [projeto, setProjeto] = useState<Project>(initialProjectState)
  const [client, setClient] = useState<Client>(initialClientState)
  const [services, setServices] = useState<Service[]>([])
  const [gastos, setGastos] = useState(projeto.gastos)

  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (user && projectIdNumber !== null) {
      const fetchedProject = getProjectById(user.userId, projectIdNumber)
      if (fetchedProject) {
        setProjeto(fetchedProject)
        setGastos(fetchedProject.gastos)
        const fetchedClient = getClientById(
          user.userId,
          fetchedProject.clienteId,
        )
        if (fetchedClient) {
          setClient(fetchedClient)
        }
        const fetchedServices = getServicesById(
          user.userId,
          fetchedProject.servicosId,
        )
        if (fetchedServices) {
          setServices(fetchedServices)
        }
      }
    }
  }, [user, projectIdNumber])

  const handleStatusChange = (newStatus: string) => {
    setProjeto({ ...projeto, status: newStatus })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setProjeto({ ...projeto, [name]: value })
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setProjeto({ ...projeto, [name]: value })
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
    <div className="projeto-container">
      {showToast && (
        <ToastNotification
          type="ok"
          text="Valor copiado para área de transferência"
        />
      )}
      <Sidebar activePage="Projetos" />
      <div className="content">
        <Header
          path={[
            { label: 'Projetos >', path: '/projetos' },
            { label: 'Dados', path: '/projeto' },
          ]}
        />
        <div className="projectData">
          <div className="col1">
            <TextInput
              label="Título *"
              placeholder="Digite um título"
              name="titulo"
              inputValue={projeto.titulo}
              onChange={handleInputChange}
            />
            <SingleSelect
              onSelect={handleStatusChange}
              placeholder="Status do projeto"
              label="Status"
              options={['Não iniciado', 'Em andamento', 'Concluído']}
              initialValue={projeto.status}
            />
            <TextInput
              label="Data do pedido"
              placeholder="DD/MM/AAAA"
              name="dataPedido"
              inputValue={projeto.dataPedido}
              onChange={handleInputChange}
            />
            <TextInput
              label="Data de entrega"
              placeholder="DD/MM/AAAA"
              name="dataEntrega"
              inputValue={projeto.dataEntrega}
              onChange={handleInputChange}
            />

            <div className="clientBox">
              <div className="header">
                <div className="title">Cliente</div>
                <div className="addButton">
                  <img src={PlusIcon} alt="" />
                </div>
              </div>
              <div className="content">
                {client.clientId !== 0 && (
                  <div className="client" key={client.clientId}>
                    <div className="avatar">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
                        alt=""
                      />
                    </div>

                    <div className="name">{client.nome}</div>

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
                )}
              </div>
            </div>

            <div className="servicesBox">
              <div className="header">
                <div className="title">Serviços</div>
                <div className="addButton">
                  <img src={PlusIcon} alt="" />
                </div>
              </div>
              <div className="content">
                {services.map((service) => {
                  return (
                    <div className="service" key={service.serviceId}>
                      <div className="name">{service.nome}</div>
                      <div
                        className={`value ${
                          service.valorFixo ? 'fixed-value' : ''
                        }`}
                      >
                        R${service.valor.toFixed(2)}
                      </div>
                      <div className="delButton">
                        <img src={PlusIcon} alt="" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="col2">
            <LargeTextInput
              label="Descrição"
              placeholder="Digite uma descrição para o projeto"
              name="description"
              inputValue={projeto.descricao}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="col3">
            <div className="gastosBox">
              <div className="header">
                <div className="title">Gastos</div>
                <div className="addButton">
                  <img src={PlusIcon} alt="" />
                </div>
              </div>
              <div className="content">
                {gastos.map((gasto, id) => {
                  return (
                    <div className="gasto" key={id}>
                      <div className="name">{gasto.titulo}</div>
                      <div className="type">{gasto.tipo}</div>
                      <div className="valor">R${gasto.valor.toFixed(2)}</div>
                      <div className="delButton">
                        <img src={PlusIcon} alt="" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="tabelaValores">
              <div className="line">
                <div className="name">Serviços</div>
                <div className="value">R$0,00</div>
              </div>
              <div className="line">
                <div className="name">Gastos do projeto</div>
                <div className="value">R$0,00</div>
              </div>
              <div className="line">
                <div className="name">Total do cliente</div>
                <div className="value">R$0,00</div>
              </div>
              <div className="line">
                <div className="name">Lucro</div>
                <div className="value">R$0,00</div>
              </div>
            </div>
            <div className="buttons">
              <div className="button excluir">Excluir</div>
              <div className="button salvar">Salvar</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
