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

  const [errorMessages, setErrorMessages] = useState({
    nome: '',
    email: '',
    telefone: '',
  })

  const formatPhone = (phone) => {
    // Remove caracteres não numéricos
    const digits = phone.replace(/\D/g, '')

    if (digits.length <= 8) {
      // Formata como '9999-9999'
      return digits.replace(/(\d{4})(\d{1,4})/, '$1-$2')
    } else if (digits.length <= 9) {
      // Formata como '99999-9999'
      return digits.replace(/(\d{5})(\d{1,4})/, '$1-$2')
    } else if (digits.length <= 11) {
      // Formata como '(99) 99999-9999'
      return digits.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3')
    } else if (digits.length <= 13) {
      // Formata como '+99 (99) 99999-9999'
      return digits.replace(/(\d{2})(\d{2})(\d{5})(\d{1,4})/, '+$1 ($2) $3-$4')
    }

    // Se for mais longo que 13 dígitos, retorna os primeiros 13 formatados
    return digits
      .slice(0, 13)
      .replace(/(\d{2})(\d{2})(\d{5})(\d{1,4})/, '+$1 ($2) $3-$4')
  }

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,4}\.[0-9]{1,4}\.[0-9]{1,4}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    let formattedValue = value
    if (name === 'telefone') {
      formattedValue = formatPhone(value)
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    })
  }

  const handleSave = () => {
    let isValid = true
    const errors = { nome: '', email: '', telefone: '' }
    // Limpa o número de telefone antes de salvar
    const cleanPhone = formData.telefone.replace(/\D/g, '')

    const clientDataToSave = {
      ...formData,
      telefone: cleanPhone,
    }

    if (!clientDataToSave.nome) {
      errors.nome = 'Nome é obrigatório'
      isValid = false
    }
    if (!clientDataToSave.email || !validateEmail(formData.email)) {
      errors.email = 'Email inválido'
      isValid = false
    }
    if (!clientDataToSave.telefone.match(/^[0-9]+$/)) {
      errors.telefone = 'Telefone deve conter apenas números'
      isValid = false
    }

    setErrorMessages(errors)

    if (isValid) {
      onSave(clientDataToSave)
    }
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
          {errorMessages.nome && (
            <div className="error-message">{errorMessages.nome}</div>
          )}
          <Input
            label="Email"
            placeholder="Email do cliente"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errorMessages.email && (
            <div className="error-message">{errorMessages.email}</div>
          )}
          <Input
            label="Telefone"
            placeholder="+55 99 99999-9999"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
          />
          {errorMessages.telefone && (
            <div className="error-message">{errorMessages.telefone}</div>
          )}

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
