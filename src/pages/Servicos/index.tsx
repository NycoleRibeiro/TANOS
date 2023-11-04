import { ChangeEvent, useEffect, useState } from 'react'

import './style.sass'

import deleteIcon from '../../assets/images/delete.svg'
import { FilledButton } from '../../components/buttons/filledButton'
import { Header } from '../../components/header'
import { Input } from '../../components/inputs/input'
import { SearchInput } from '../../components/inputs/search'
import { Sidebar } from '../../components/sidebar'
import { ToastNotification } from '../../components/toast-notification'

import {
  getServices,
  insertService,
  removeService,
  updateService,
} from '../../database/Services'
import { getUserData } from '../../loggedUser'

export const Servicos = () => {
  interface Service {
    nome: string
    descricao: string
    categoria: string
    valor: number
    valorFixo: boolean
    serviceId: number
  }

  const user = getUserData() // Obtém o usuário atual
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    valor: 0,
    valorFixo: true,
    serviceId: 0,
  })
  const [showToast, setShowToast] = useState(false)
  const [services, setServices] = useState(user ? getServices(user.userId) : [])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    // Verifica se o campo alterado é o 'valor' e se a string pode ser convertida para um número
    if (name === 'valor' && !isNaN(Number(value))) {
      setFormData({
        ...formData,
        [name]: Number(value), // Converte a string para número
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSave = () => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (
      formData.nome &&
      formData.descricao &&
      formData.categoria &&
      formData.valor !== 0
    ) {
      if (user) {
        if (formData.serviceId === 0) {
          // Cria um novo serviço
          const newServiceId = getNextServiceId(services)

          // Define o novo serviceId seguindo formData
          const newService = { ...formData, serviceId: newServiceId }

          // Adiciona o novo serviço
          insertService(user.userId, newService)
          console.log('Novo serviço adicionado com sucesso: ', newService)
          setIsModalOpen(false)

          // Atualize manualmente o estado da lista de serviços
          const updatedServices = getServices(user.userId)
          setServices(updatedServices)
        } else {
          // Atualiza um serviço
          updateService(user.userId, formData)
          console.log('Serviço atualizado com sucesso: ', formData)
          setIsModalOpen(false)

          // Atualize manualmente o estado da lista de serviços
          const updatedServices = getServices(user.userId)
          setServices(updatedServices)
        }
      } else {
        // O usuário não está autenticado, faça algo apropriado aqui
        console.error('Usuário não autenticado.')
      }
    }
  }

  const getNextServiceId = (services: Service[]) => {
    // Encontre o próximo serviceId disponível
    let maxServiceId = 0
    for (const service of services) {
      if (service.serviceId > maxServiceId) {
        maxServiceId = service.serviceId
      }
    }
    return maxServiceId + 1
  }

  const editService = (service: Service, event) => {
    event.stopPropagation()
    setIsModalOpen(true)
    console.log(service)
    setFormData(service)
  }

  const createService = () => {
    setIsModalOpen(true)
    setFormData({
      nome: '',
      descricao: '',
      categoria: '',
      valor: 0,
      valorFixo: true,
      serviceId: 0,
    })
  }

  const deleteService = () => {
    if (user) {
      removeService(user.userId, formData.serviceId)
      // Atualize manualmente o estado da lista de serviços
      const updatedServices = getServices(user.userId)
      setServices(updatedServices)
      setIsModalOpen(false)
    }
  }

  return (
    <div className="servicos-container">
      <Sidebar activePage="Servicos" />
      {showToast && (
        <ToastNotification
          type="ok"
          text="Valor copiado para área de transferência"
        />
      )}

      <div className="content">
        <Header path={[{ label: 'Serviços', path: '/servicos' }]} />
        <div className="actions">
          <SearchInput placeholder="Nome do serviço" onClick={() => {}} />
          <FilledButton
            text="Adicionar serviço"
            size="200px"
            onClick={() => createService()}
          />
        </div>

        <div className="services">
          {services.map((service) => {
            return (
              <div
                className="service"
                key={service.serviceId}
                onClick={(e) => editService(service, e)}
              >
                <div className="name">{service.nome}</div>
                <div className="description">{service.descricao}</div>
                <div className="category">{service.categoria}</div>
                <div className="value">R${service.valor.toFixed(2)}</div>
              </div>
            )
          })}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="add-service">
            <div className="modal">
              <div className="header">Dados do serviço</div>

              <div className="content">
                <Input
                  label="Nome"
                  placeholder="Nome do serviço"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                />
                <Input
                  label="Descrição"
                  placeholder="Descrição do serviço"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                />
                <Input
                  label="Categoria"
                  placeholder="Categoria do serviço"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                />
                <Input
                  label="Valor (R$)"
                  placeholder="Valor do serviço"
                  name="valor"
                  value={formData.valor.toString()}
                  onChange={handleInputChange}
                />
                <label className="fixValue">
                  <input
                    type="checkbox"
                    name="valorFixo"
                    checked={formData.valorFixo}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        valorFixo: event.target.checked,
                      })
                    }
                  />
                  Valor Fixo
                </label>
              </div>

              <div className="buttons">
                <FilledButton
                  text="Cancelar"
                  size="100px"
                  onClick={() => setIsModalOpen(false)}
                />
                <FilledButton text="Salvar" size="100px" onClick={handleSave} />
                {formData.serviceId !== 0 && (
                  <FilledButton
                    text="Excluir"
                    size="100px"
                    onClick={deleteService}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
