import React, { useEffect, useState } from 'react'
import { FilledButton } from '../../components/buttons/filledButton'
import { SingleSelect } from '../../components/inputs/SingleSelect'
import { TextInput } from '../../components/inputs/TextInput'
import { Expense } from '../../database/Types'

import { ToastNotification } from '../../components/toast-notification'
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
  const [errorDescription, setErrorDescription] = useState('')
  const [tipo, setTipo] = useState<TipoGasto>('Projeto')
  const [errorTipo, setErrorTipo] = useState('')
  const [valor, setValor] = useState('')
  const [errorValor, setErrorValor] = useState('')

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ type: 'ok', text: '' })

  useEffect(() => {
    if (toastMessage.text !== '') {
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
        setToastMessage({ type: 'ok', text: '' })
      }, 5000) // 5 segundos
    }
  }, [toastMessage])

  const handleDescricaoChange = (value: string) => {
    setDescricao(value)
  }

  const handleTipoChange = (selectedItem: string) => {
    if (selectedItem === 'Projeto' || selectedItem === 'Cliente') {
      setTipo(selectedItem as TipoGasto)
      setErrorTipo('')
    } else {
      setErrorTipo('É necessário selecionar um tipo')
    }
  }

  const handleValorChange = (value: string) => {
    // Permite apenas a inserção de números e vírgula
    const valorFormatado = value.replace(/[^0-9,]/g, '')
    setValor(valorFormatado)
  }

  const handleSave = () => {
    setErrorValor('')
    setErrorDescription('')

    // Remover tudo que não é número ou vírgula
    const valorLimpo = valor.replace(/[^0-9,]/g, '').replace(',', '.')

    // Converter para número
    const valorNumerico = parseFloat(valorLimpo)

    if (descricao !== '' && !isNaN(valorNumerico)) {
      onConfirm({
        titulo: descricao, // Mudança feita aqui
        tipo,
        valor: valorNumerico,
      })
    } else {
      // Tratar erros, como descrição vazia ou valor inválido
      if (isNaN(valorNumerico)) {
        setErrorValor('Digite um valor válido')
      }
      if (descricao === '') {
        setErrorDescription('Digite uma descrição para o gasto')
      }
    }
  }

  return (
    <div className="backgroundBlur">
      {showToast && (
        <ToastNotification type={toastMessage.type} text={toastMessage.text} />
      )}
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
          {errorDescription !== '' && (
            <div className="error-message">{errorDescription}</div>
          )}
          <SingleSelect
            onSelect={handleTipoChange}
            placeholder="Tipo de gasto"
            label="Tipo de gasto"
            options={['Projeto', 'Cliente']}
            initialValue={tipo}
          />
          {errorTipo !== '' && <div className="error-message">{errorTipo}</div>}
          <TextInput
            label="Valor"
            placeholder="Digite o valor total do gasto"
            name="valor"
            inputValue={valor}
            onChange={handleValorChange}
          />
          {errorValor !== '' && (
            <div className="error-message">{errorValor}</div>
          )}
        </div>
        <div className="buttons">
          <FilledButton text="Cancelar" size="100px" onClick={onClose} />
          <FilledButton text="Salvar" size="100px" onClick={handleSave} />
        </div>
      </div>
    </div>
  )
}
