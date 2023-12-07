import React, { useEffect, useState } from 'react'
import { FilledButton } from '../../components/buttons/filledButton'
import { getServices } from '../../database/Services'; // Função hipotética para buscar a lista de serviços
import { Service } from '../../database/Types'
import { getUserData } from '../../loggedUser'

import './styleModal.sass'

interface ModalNewServiceProps {
  onClose: () => void
  onConfirm: (service: Service) => void
  existingServices: Service[]
}

export const ModalNewService: React.FC<ModalNewServiceProps> = ({
  onClose,
  onConfirm,
  existingServices,
}) => {
  const user = getUserData()
  const [services, setServices] = useState<Service[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const [isValueInputOpen, setIsValueInputOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (user) {
      const fetchedServices = getServices(user.userId) // Função hipotética para buscar a lista de serviços
      setServices(fetchedServices)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      let fetchedServices = getServices(user.userId) // Obtenha a lista total de serviços

      // Filtre os serviços que já estão na lista do projeto
      fetchedServices = fetchedServices.filter(
        (service) =>
          !existingServices.find((s) => s.serviceId === service.serviceId),
      )

      setServices(fetchedServices)
    }
  }, [user, existingServices])

  const handleConfirm = () => {
    if (selectedService) {
      let serviceToConfirm = selectedService

      // Se o valor do serviço não for fixo e o usuário digitou um valor, atualize o serviço com esse valor
      if (!selectedService.valorFixo && !isNaN(parseFloat(inputValue))) {
        serviceToConfirm = {
          ...selectedService,
          valor: parseFloat(inputValue),
        }
      }

      onConfirm(serviceToConfirm) // Confirma o serviço selecionado (com ou sem valor atualizado)
      setIsValueInputOpen(false) // Fecha o input de valor
      setSelectedService(null) // Reseta o serviço selecionado
      setInputValue('') // Limpa o campo de valor
      onClose()
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredServices = services.filter((service) =>
    service.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    if (service.valorFixo) {
      setInputValue('')
      setIsValueInputOpen(false)
    } else {
      setIsValueInputOpen(true)
    }
  }

  return (
    <div className="backgroundBlur">
      <div className="modalGasto">
        <div className="header">Selecionar Serviço</div>
        <div className="content">
          <input
            type="text"
            placeholder="Pesquisar Serviço"
            onChange={handleSearchChange}
            value={searchTerm}
            className="search"
          />

          <div className="serviceList">
            {filteredServices.map((service) => (
              <div
                key={service.serviceId}
                className={`serviceItem ${
                  selectedService?.serviceId === service.serviceId
                    ? 'selected'
                    : ''
                }`}
                onClick={() => handleServiceSelect(service)}
              >
                <div className="name">{service.nome}</div>
                <div className="value">R$ {service.valor.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
        {isValueInputOpen && (
          <div>
            <input
              type="number"
              placeholder="Digite o valor do serviço"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="inputNewValue"
            />
          </div>
        )}
        <div className="buttons">
          <FilledButton text="Cancelar" size="100px" onClick={onClose} />
          <FilledButton text="Salvar" size="100px" onClick={handleConfirm} />
        </div>
      </div>
    </div>
  )
}
