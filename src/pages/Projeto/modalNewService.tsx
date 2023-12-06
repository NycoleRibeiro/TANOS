import React, { useEffect, useState } from 'react'
import { FilledButton } from '../../components/buttons/filledButton'
import { getServices } from '../../database/Services'; // Função hipotética para buscar a lista de serviços
import { Service } from '../../database/Types'
import { getUserData } from '../../loggedUser'

import './styleModal.sass'

interface ModalNewServiceProps {
  onClose: () => void
  onConfirm: (service: Service) => void
}

export const ModalNewService: React.FC<ModalNewServiceProps> = ({
  onClose,
  onConfirm,
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

  const handleConfirm = () => {
    if (selectedService) {
      if (!selectedService.valorFixo && !isNaN(parseFloat(inputValue))) {
        // Confirma com o valor inserido pelo usuário
        const updatedService = {
          ...selectedService,
          valor: parseFloat(inputValue),
        }
        onConfirm(updatedService)
      } else {
        // Confirma imediatamente se o valor for fixo
        onConfirm(selectedService)
      }
      setIsValueInputOpen(false)
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
    if (!service.valorFixo) {
      setIsValueInputOpen(true) // Abre o input para definir o valor
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
            />
            <FilledButton
              text="Confirmar Valor"
              size="100px"
              onClick={handleConfirm}
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
