import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './style.sass'

import PlusIcon from '../../assets/images/add.svg'
import { Header } from '../../components/header'
import { LargeTextInput } from '../../components/inputs/LargeTextInput'
import { SingleSelect } from '../../components/inputs/SingleSelect'
import { TextInput } from '../../components/inputs/TextInput'
import { Sidebar } from '../../components/sidebar'

import { getProjectById } from '../../database/Projects'
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

  if (user && projectIdNumber !== null) {
    const fetchedProject = getProjectById(user.userId, projectIdNumber)
    if (fetchedProject) {
      projeto = fetchedProject
    }
  }

  const handleStatusChange = (newStatus) => {
    setProjeto({...projeto, status: newStatus});
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
              <div className="content">Cliente vai aqui</div>
            </div>

            <div className="servicesBox">
              <div className="header">
                <div className="title">Serviços</div>
                <div className="addButton">
                  <img src={PlusIcon} alt="" />
                </div>
              </div>
              <div className="content">Serviços vão aqui</div>
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
