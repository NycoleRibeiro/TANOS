import { ChangeEvent, useEffect, useState } from 'react'

import './style.sass'

import deleteIcon from '../../assets/images/delete.svg'
import { FilledButton } from '../../components/buttons/filledButton'
import { Header } from '../../components/header'
import { Input } from '../../components/inputs/input'
import { SearchInput } from '../../components/inputs/search'
import { Sidebar } from '../../components/sidebar'
import { ToastNotification } from '../../components/toast-notification'

import { addToHistory } from '../../database/History'

import {
  getServices,
  insertService,
  removeService,
  updateService,
} from '../../database/Services'
import { Service } from '../../database/Types'
import { getUserData } from '../../loggedUser'

export const Servicos = () => {
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

  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [services, setServices] = useState(user ? getServices(user.userId) : [])
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessages, setErrorMessages] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    valor: '',
  })

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

  const filteredAndSortedServices = services
    .filter((service) =>
      service.nome.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => a.nome.localeCompare(b.nome))

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    if (name === 'valor') {
      // Permite apenas números e vírgula
      const valorFormatado = value.replace(/[^0-9,]/g, '')
      setFormData({ ...formData, [name]: valorFormatado })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSave = () => {
    let isValid = true
    const newErrorMessages = {
      nome: '',
      descricao: '',
      categoria: '',
      valor: '',
    }

    if (!formData.nome) {
      newErrorMessages.nome = 'Nome é obrigatório.'
      isValid = false
    }
    if (!formData.descricao) {
      newErrorMessages.descricao = 'Descrição é obrigatória.'
      isValid = false
    }
    if (!formData.categoria) {
      newErrorMessages.categoria = 'Categoria é obrigatória.'
      isValid = false
    }
    if (formData.valor <= 0) {
      newErrorMessages.valor = 'Valor deve ser maior que zero.'
      isValid = false
    }

    setErrorMessages(newErrorMessages)

    if (!isValid) {
      return // Interrompe a execução se houver erro
    }

    // Limpa o valor de qualquer formatação para salvar como número
    const valorLimpo = parseFloat(formData.valor.replace(',', '.'))
    const dadosParaSalvar = {
      ...formData,
      valor: valorLimpo,
    }

    // Implemente a lógica de salvamento aqui, por exemplo:
    if (user) {
      if (formData.serviceId === 0) {
        // Cria um novo serviço e o adiciona
        const newServiceId = getNextServiceId(services)
        const newService = { ...dadosParaSalvar, serviceId: newServiceId }
        insertService(user.userId, newService)
        setIsModalOpen(false)
        setToastMessage('Serviço criado com sucesso')
      } else {
        // Atualiza um serviço existente
        updateService(user.userId, dadosParaSalvar)
        setIsModalOpen(false)
        setToastMessage('Serviço atualizado com sucesso')
      }

      // Atualize a lista de serviços
      const updatedServices = getServices(user.userId)
      setServices(updatedServices)
    } else {
      setToastMessage('Erro: usuário não autenticado.')
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
      setToastMessage('Serviço removido com sucesso')
    }
  }

  const handleValorChange = (event: ChangeEvent<HTMLInputElement>) => {
    let valor = event.target.value

    // Remove caracteres que não são números ou vírgula
    valor = valor.replace(/[^0-9,]/g, '')

    // Substitui a vírgula por ponto para conversão para número
    const valorNumerico = parseFloat(valor.replace(',', '.'))

    // Verifica se o valor é um número válido
    if (!isNaN(valorNumerico)) {
      // Limita a duas casas decimais e converte para formato de moeda
      valor = valorNumerico.toFixed(2).replace('.', ',')
    }

    // Atualiza o estado com o valor formatado
    setFormData({
      ...formData,
      valor,
    })
  }

  return (
    <div className="servicos-container">
      <Sidebar activePage="Servicos" />
      {showToast && <ToastNotification type="ok" text={toastMessage} />}

      <div className="content">
        <Header path={[{ label: 'Serviços', path: '/servicos' }]} />
        <div className="actions">
          <SearchInput
            placeholder="Nome do serviço"
            onSearchChange={handleSearchChange}
          />
          <FilledButton
            text="Adicionar serviço"
            size="200px"
            onClick={() => createService()}
          />
        </div>

        <div className="services">
          {filteredAndSortedServices.map((service) => {
            return (
              <div
                className="service"
                key={service.serviceId}
                onClick={(e) => editService(service, e)}
              >
                <div className="name">{service.nome}</div>
                <div className="description">{service.descricao}</div>
                <div className="category">{service.categoria}</div>
                <div
                  className={`value ${service.valorFixo ? 'fixed-value' : ''}`}
                >
                  R${service.valor.toFixed(2)}
                </div>
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
                <div className="line">
                  <Input
                    label="Nome"
                    placeholder="Nome do serviço"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                  />
                  {formData.serviceId !== 0 && (
                    <div className="delButton" onClick={deleteService}>
                      <img src={deleteIcon} alt="" />
                    </div>
                  )}
                </div>
                {errorMessages.nome && (
                  <div className="error-message">{errorMessages.nome}</div>
                )}
                <Input
                  label="Descrição"
                  placeholder="Descrição do serviço"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                />
                {errorMessages.descricao && (
                  <div className="error-message">{errorMessages.descricao}</div>
                )}
                <Input
                  label="Categoria"
                  placeholder="Categoria do serviço"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                />
                {errorMessages.categoria && (
                  <div className="error-message">{errorMessages.categoria}</div>
                )}
                <Input
                  label="Valor (R$)"
                  placeholder="Valor do serviço"
                  name="valor"
                  value={formData.valor.toString()}
                  onChange={handleInputChange}
                />
                {errorMessages.valor && (
                  <div className="error-message">{errorMessages.valor}</div>
                )}
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
