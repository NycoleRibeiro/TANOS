import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './style.sass'

import PlusIcon from '../../assets/images/add.svg'
import deleteIcon from '../../assets/images/delete.svg'
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
import { addToHistory } from '../../database/History'
import { ModalNewClient } from './modalNewCliente'
import { ModalNewGasto } from './modalNewGasto'

import { getClientById } from '../../database/Clients'
import {
  getProjectById,
  insertProject,
  removeProject,
  updateProject,
  updateProjectExpenses,
} from '../../database/Projects'
import { getUserData } from '../../loggedUser'

import { FilledButton } from '../../components/buttons/filledButton/index'
import { Client, Expense, Project, Service } from '../../database/Types'
import { ModalNewService } from './modalNewService'
import { ModalConfirm } from './modalConfirm'

export const Projeto = () => {
  const { projectId } = useParams()
  const projectIdNumber = projectId ? parseInt(projectId, 10) : 0
  const user = getUserData()
  const navigate = useNavigate()

  const initialProjectState: Project = {
    projectId: projectIdNumber,
    titulo: '',
    descricao: '',
    status: 'Não iniciado',
    dataPedido: '',
    dataEntrega: '',
    clienteId: 0,
    servicos: [],
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
  const [toastMessage, setToastMessage] = useState('')
  const [isModalGastosOpen, setIsModalGastosOpen] = useState(false)
  const [isModalClientesOpen, setIsModalClientesOpen] = useState(false)
  const [isModalServicesOpen, setIsModalServicesOpen] = useState(false)
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false)

  const [totalServicos, setTotalServicos] = useState(0)
  const [totalGastosProjeto, setTotalGastosProjeto] = useState(0)
  const [totalCliente, setTotalCliente] = useState(0)
  const [totalLucro, setTotalLucro] = useState(0)

  let logMessage = ''

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
        const fetchedServices = fetchedProject.servicos
        if (fetchedServices) {
          setServices(fetchedServices)
        }
      } else {
        insertProject(user.userId, initialProjectState)
        setToastMessage('Novo projeto criado com sucesso')
      }
    }
  }, [user, projectIdNumber])

  useEffect(() => {
    if (toastMessage) {
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
        setToastMessage('')
      }, 5000) // 5 segundos
    }
  }, [toastMessage])

  useEffect(() => {
    // Soma dos valores dos serviços
    const totalServicos = services.reduce(
      (acc, service) => acc + service.valor,
      0,
    )

    // Soma dos gastos do projeto
    const totalGastosProjeto = gastos
      .filter((gasto) => gasto.tipo === 'Projeto')
      .reduce((acc, gasto) => acc + gasto.valor, 0)

    // Soma dos gastos do tipo cliente
    const totalGastosCliente = gastos
      .filter((gasto) => gasto.tipo === 'Cliente')
      .reduce((acc, gasto) => acc + gasto.valor, 0)

    // Total a ser cobrado do cliente
    const totalCliente = totalServicos + totalGastosCliente

    // Lucro (serviços menos gastos do tipo projeto)
    const lucro = totalServicos - totalGastosProjeto

    // Atualiza o estado aqui com os novos valores calculados
    setTotalServicos(totalServicos)
    setTotalGastosProjeto(totalGastosProjeto)
    setTotalCliente(totalCliente)
    setTotalLucro(lucro)
  }, [services, gastos])

  const handleStatusChange = (newStatus: string) => {
    if (newStatus !== '') {
      const updatedProject = { ...projeto, status: newStatus }
      setProjeto(updatedProject)
      if (newStatus === 'Concluído') {
        // Atualiza o histórico
        logMessage = `O Projeto ${projeto.titulo} foi concluído!`
      } else {
        logMessage = ''
      }
    }
  }

  const handleInputChange = (value: string, fieldName: string) => {
    const updatedProject = { ...projeto, [fieldName]: value }
    setProjeto(updatedProject)
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    const updatedProject = { ...projeto, [name]: value }
    setProjeto(updatedProject)
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
    setToastMessage('Valor copiado para área de transferência')
  }

  const handleNewGasto = (novoGasto: Expense) => {
    // Validação básica
    if (!novoGasto.titulo || novoGasto.valor <= 0) {
      setToastMessage(
        'Preencha todos os campos e forneça um valor de gasto válido.',
      )
      return
    }
    setGastos((gastosAtual) => [...gastosAtual, novoGasto])
    setIsModalGastosOpen(false)
  }

  const handleRemoveGasto = (gastoTitulo: string) => {
    const updatedGastos = gastos.filter((gasto) => gasto.titulo !== gastoTitulo)
    setGastos(updatedGastos)
  }

  const handleClientSelect = (selectedClient: Client) => {
    const updatedProject = { ...projeto, clienteId: selectedClient.clientId }
    setProjeto(updatedProject)
    setClient(selectedClient)
    setIsModalClientesOpen(false)
    setToastMessage('Cliente alterado com sucesso!')
  }

  const handleRemoveService = (serviceId: number) => {
    const updatedServices = services.filter(
      (service) => service.serviceId !== serviceId,
    )
    const updatedProject = { ...projeto, servicos: updatedServices }
    setProjeto(updatedProject) // Atualiza o estado do projeto
    setServices(updatedServices) // Atualiza o estado dos serviços
  }

  const handleAddService = (newService: Service) => {
    const updatedServices = [...services, newService]
    const updatedProject = { ...projeto, servicos: updatedServices }
    setProjeto(updatedProject) // Atualiza o estado do projeto
    setServices(updatedServices) // Atualiza o estado dos serviços
  }

  const handleSaveClick = () => {
    const result = updateProject(user.userId, projeto)
    const resultGastos = updateProjectExpenses(
      user.userId,
      projeto.projectId,
      gastos,
    )
    if (result === 'success') {
      if (resultGastos === 'success') {
        setToastMessage('Projeto salvo com sucesso!')
      } else {
        setToastMessage('Erro ao salvar gastos')
      }
      if (logMessage !== '') {
        addToHistory(user.userId, logMessage)
      }
    } else {
      setToastMessage('Erro ao salvar o projeto.')
    }
  }

  const handleDeleteProject = () => {
    const result = removeProject(user.userId, projeto.projectId)
    if (result === 'success') {
      setToastMessage('Projeto excluído com sucesso!')
      navigate('/projetos')
    } else {
      setToastMessage('Erro ao excluir o projeto.')
    }
  }

  return (
    <div className="projeto-container">
      {showToast && <ToastNotification type="ok" text={toastMessage} />}
      {isModalGastosOpen && (
        <ModalNewGasto
          onClose={() => {
            setIsModalGastosOpen(false)
          }}
          onConfirm={handleNewGasto}
        />
      )}
      {isModalClientesOpen && (
        <ModalNewClient
          onClose={() => {
            setIsModalClientesOpen(false)
          }}
          onConfirm={handleClientSelect}
        />
      )}
      {isModalServicesOpen && (
        <ModalNewService
          onClose={() => setIsModalServicesOpen(false)}
          onConfirm={handleAddService}
          existingServices={projeto.servicos}
        />
      )}
      {isModalConfirmOpen && (
        <ModalConfirm
          onClose={() => {
            setIsModalConfirmOpen(false)
          }}
          onConfirm={handleDeleteProject}
        />
      )}

      <Sidebar activePage="Projetos" />
      <div className="content">
        <Header
          path={[
            { label: 'Projetos /', path: '/projetos' },
            { label: 'Dados', path: '' },
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
              isDateField={true}
            />
            <TextInput
              label="Data de entrega"
              placeholder="DD/MM/AAAA"
              name="dataEntrega"
              inputValue={projeto.dataEntrega}
              onChange={handleInputChange}
              isDateField={true}
            />

            <div className="clientBox">
              <div className="header">
                <div className="title">Cliente</div>
                <div
                  className="addButton"
                  onClick={() => {
                    setIsModalClientesOpen(true)
                  }}
                >
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
                <div
                  className="addButton"
                  onClick={() => {
                    setIsModalServicesOpen(true)
                  }}
                >
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
                      <div
                        className="delButton"
                        onClick={() => handleRemoveService(service.serviceId)}
                      >
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
              name="descricao"
              inputValue={projeto.descricao}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="col3">
            <div className="gastosBox">
              <div className="header">
                <div className="title">Gastos</div>
                <div
                  className="addButton"
                  onClick={() => {
                    setIsModalGastosOpen(true)
                  }}
                >
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
                        <img
                          src={PlusIcon}
                          alt=""
                          onClick={() => {
                            handleRemoveGasto(gasto.titulo)
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="tabelaValores">
              <div className="line">
                <div className="name">Serviços</div>
                <div className="value">{`R$${totalServicos.toFixed(2)}`}</div>
              </div>
              <div className="line">
                <div className="name">Gastos do Projeto</div>
                <div className="value">{`R$${totalGastosProjeto.toFixed(
                  2,
                )}`}</div>
              </div>
              <div className="line">
                <div className="name">Total do Cliente</div>
                <div className="value">{`R$${totalCliente.toFixed(2)}`}</div>
              </div>
              <div className="line">
                <div className="name">Lucro</div>
                <div className={`value ${totalLucro < 0 ? 'red' : ''}`}>
                  {totalLucro < 0
                    ? `-R$${Math.abs(totalLucro).toFixed(2)}`
                    : `R$${totalLucro.toFixed(2)}`}
                </div>
              </div>
            </div>
            <div className="buttons">
              <FilledButton
                icon={deleteIcon}
                size="40px"
                color="#DC362E"
                onClick={() => {
                  setIsModalConfirmOpen(true)
                }}
              />
              <FilledButton
                text="Salvar"
                size="120px"
                onClick={handleSaveClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
