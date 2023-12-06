import React, { ChangeEvent, useState } from 'react'
import { FilledButton } from '../../components/buttons/filledButton'
import { Input } from '../../components/inputs/input'
import { Client } from '../../database/Types'

import deleteIcon from '../../assets/images/delete.svg'

import './styleClientModal.sass'

interface ClientModalProps {
  client: Client | null // 'null' para um novo cliente
  onSave: (client: Client) => void
  onClose: () => void
  onDelete?: () => void // Opcional, dependendo se você permite deletar a partir do modal
}

export const ClientModal: React.FC<ClientModalProps> = ({
  client,
  onSave,
  onClose,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Client>({
    nome: client?.nome || '',
    instagram: client?.instagram || '',
    facebook: client?.facebook || '',
    site: client?.site || '',
    linkedin: client?.linkedin || '',
    email: client?.email || '',
    telefone: client?.telefone || '',
    clientId: client?.clientId || 0,
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSave = () => {
    onSave(formData)
  }
  return (
    <div className="add-contact">
      <div className="modal">
        <div className="header">Dados do cliente</div>

        <div className="content">
          {/* <AvatarInput /> */}
          <div className="line">
            <Input
              label="Nome"
              placeholder="Nome do cliente"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
            />

            {formData.clientId !== 0 && (
              <div className="delButton" onClick={onDelete}>
                <img src={deleteIcon} alt="" />
              </div>
            )}
          </div>
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
          <FilledButton text="Cancelar" size="100px" onClick={onClose} />
          <FilledButton text="Salvar" size="100px" onClick={handleSave} />
        </div>
      </div>
    </div>
  )
}
