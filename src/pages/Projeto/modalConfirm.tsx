import React from 'react'
import { FilledButton } from '../../components/buttons/filledButton'

import { Expense } from '../../database/Types'

import './styleModal.sass'

interface ModalConfirmProps {
  onClose: () => void
  onConfirm: () => void
}

export const ModalConfirm: React.FC<ModalConfirmProps> = ({
  onClose,
  onConfirm,
}) => {
  return (
    <div className="backgroundBlur">
      <div className="modalGasto">
        <div className="header">Excluir projeto</div>
        <div className="content">
          <div className="text-message">
            Essa ação é permanente. Tem certeza que deseja excluir este projeto?
          </div>
        </div>
        <div className="buttons-center">
          <FilledButton
            text="Sim"
            color="#DC362E"
            size="100px"
            onClick={onConfirm}
          />
          <FilledButton
            text="Não"
            size="100px"
            color="#7A7289"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  )
}
