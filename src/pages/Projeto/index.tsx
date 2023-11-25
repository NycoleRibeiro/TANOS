import React from 'react'
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

import { getClientById } from '../../database/Clients'
import { getProjectById } from '../../database/Projects'
import { getServicesById } from '../../database/Services'
import { getUserData } from '../../loggedUser'

export const Projeto = () => {
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

  const { projectId } = useParams()
  const projectIdNumber = projectId ? parseInt(projectId, 10) : null
  const user = getUserData()
  let projeto: Project = {
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

  let client: Client = {
    nome: '',
    instagram: '',
    facebook: '',
    site: '',
    linkedin: '',
    email: '',
    telefone: '',
    clientId: 0,
  }

  let services = []

  if (user && projectIdNumber !== null) {
    const fetchedProject = getProjectById(user.userId, projectIdNumber)
    if (fetchedProject) {
      projeto = fetchedProject
      const fetchedClient = getClientById(user.userId, fetchedProject.clienteId)
      if (fetchedClient) {
        client = fetchedClient
      }
      const fetchedServices = getServicesById(
        user.userId,
        fetchedProject.servicosId,
      )
      if (fetchedServices) {
        services = fetchedServices
      }
    }
  }

  const handleStatusChange = (newStatus) => {
    setProjeto({ ...projeto, status: newStatus })
  }

  return (
    <div className="projeto-container">
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
              onChange={() => {}}
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
              name="pedidoData"
              inputValue={projeto.dataPedido}
              onChange={() => {}}
            />
            <TextInput
              label="Data de entrega"
              placeholder="DD/MM/AAAA"
              name="pedidoData"
              inputValue={projeto.dataEntrega}
              onChange={() => {}}
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
              onChange={() => {}}
            />
          </div>
          <div className="col3">Col3</div>
        </div>
      </div>
    </div>
  )
}
