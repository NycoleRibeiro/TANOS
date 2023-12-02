import React, { useState, useEffect } from 'react'
import { getClients } from '../../database/Clients'
import { Client } from '../../database/Types'
import { getUserData } from '../../loggedUser'

import { FilledButton } from '../../components/buttons/filledButton'

import './styleModal.sass'

interface ModalNewClienteProps {
  onClose: () => void
  onConfirm: (cliente: Client) => void
}

export const ModalNewClient: React.FC<ModalNewClienteProps> = ({
  onClose,
  onConfirm,
}) => {
  const user = getUserData()
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  useEffect(() => {
    if (user) {
      const fetchedClients = getClients(user.userId)
      setClients(fetchedClients)
    }
  }, [user])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredClients = clients.filter((client) =>
    client.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client)
  }

  const handleConfirm = () => {
    if (selectedClient) {
      onConfirm(selectedClient)
    }
  }

  return (
    <div className="backgroundBlur">
      <div className="modalGasto">
        <div className="header">Selecionar Cliente</div>
        <div className="content">
          <input
            type="text"
            placeholder="Pesquisar Cliente"
            onChange={handleSearchChange}
            value={searchTerm}
            className="search"
          />

          <div className="clientList">
            {filteredClients.map((client) => (
              <div
                key={client.clientId}
                className={`clientItem ${
                  selectedClient?.clientId === client.clientId ? 'selected' : ''
                }`}
                onClick={() => handleClientSelect(client)}
              >
                <div className="avatar">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
                    alt=""
                  />
                </div>
                {client.nome}
              </div>
            ))}
          </div>
        </div>
        <div className="buttons">
          <FilledButton text="Cancelar" size="100px" onClick={onClose} />
          <FilledButton text="Salvar" size="100px" onClick={handleConfirm} />
        </div>
      </div>
    </div>
  )
}
