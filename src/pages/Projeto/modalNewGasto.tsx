import React, { useState } from 'react'
import { FilledButton } from '../../components/buttons/filledButton'
import { SingleSelect } from '../../components/inputs/SingleSelect'
import { TextInput } from '../../components/inputs/TextInput'
import { Expense } from '../../database/Types'

import './styleModal.sass'

type TipoGasto = 'Projeto' | 'Cliente'

interface ModalNewGastoProps {
  onClose: () => void
  onConfirm: (gasto: Expense) => void
}

export const ModalNewGasto: React.FC<ModalNewGastoProps> = ({
  onClose,
  onConfirm,
}) => {
  const [descricao, setDescricao] = useState('')
  const [tipo, setTipo] = useState<TipoGasto>('Projeto')
  const [valor, setValor] = useState('')

  const handleDescricaoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescricao(event.target.value)
  }

  const handleTipoChange = (selectedItem: string) => {
    if (selectedItem === 'Projeto' || selectedItem === 'Cliente') {
      setTipo(selectedItem as TipoGasto)
    }
  }

  const handleValorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValor(event.target.value)
  }

  const handleSave = () => {
    const valorNumerico = parseFloat(valor.replace(',', '.'))
    if (!descricao || !tipo || isNaN(valorNumerico)) {
      // Trate o erro como achar melhor
      return
    }

    onConfirm({
      titulo: descricao, // Mudança feita aqui
      tipo,
      valor: valorNumerico,
    })
  }

  return (
    <div className="backgroundBlur">
      <div className="modalGasto">
        <div className="header">Inserir novo gasto</div>
        <div className="content">
          <TextInput
            label="Descrição"
            placeholder="Digite uma breve descrição do gasto"
            name="descricao"
            inputValue={descricao}
            onChange={handleDescricaoChange}
          />
          <SingleSelect
            onSelect={handleTipoChange}
            placeholder="Tipo de gasto"
            label="Tipo de gasto"
            options={['Projeto', 'Cliente']}
            initialValue={tipo}
          />
          <TextInput
            label="Valor"
            placeholder="Digite o valor total do gasto"
            name="valor"
            inputValue={valor}
            onChange={handleValorChange}
          />
        </div>
        <div className="buttons">
          <FilledButton text="Cancelar" size="100px" onClick={onClose} />
          <FilledButton text="Salvar" size="100px" onClick={handleSave} />
        </div>
      </div>
    </div>
  )
}
