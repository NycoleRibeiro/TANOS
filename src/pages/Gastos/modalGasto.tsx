import React, { useEffect, useState } from 'react'
import { FilledButton } from '../../components/buttons/filledButton'
import { SingleSelect } from '../../components/inputs/SingleSelect'
import { TextInput } from '../../components/inputs/TextInput'
import { Expenses } from '../../database/Types'

import { getExpensesByUserId } from '../../database/Expenses'
import { getUserData } from '../../loggedUser'
import './styleModal.sass'

import deleteIcon from '../../assets/images/delete.svg'
import { ToastNotification } from '../../components/toast-notification'

interface ModalNewExpenseProps {
  onClose: () => void
  onConfirm: (gasto: Expenses) => void
  onDelete: (expenseId: number) => void
  gasto: Expenses
  clearFormData: () => void
}

export const ModalNewExpense: React.FC<ModalNewExpenseProps> = ({
  onClose,
  onConfirm,
  onDelete,
  gasto,
  clearFormData,
}) => {
  const user = getUserData()
  const [descricao, setDescricao] = useState(gasto.descricao)
  const [valor, setValor] = useState(gasto.valor.toString())
  const [pagamentoDia, setPagamentoDia] = useState(
    gasto.pagamentoDia.toString(),
  )
  const [pagamentoMes, setPagamentoMes] = useState(
    gasto.pagamentoMes.toString(),
  )
  const [pagamentoAno, setPagamentoAno] = useState(
    gasto.pagamentoAno.toString(),
  )
  const [categoria, setCategoria] = useState(gasto.categoria)
  const [formaPagamento, setFormaPagamento] = useState(gasto.formaPagamento)
  const [recorrencia, setRecorrencia] = useState(gasto.recorrencia)

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const [erroDescricao, setErroDescricao] = useState('')
  const [erroValor, setErroValor] = useState('')
  const [erroDia, setErroDia] = useState('')
  const [erroMes, setErroMes] = useState('')
  const [erroAno, setErroAno] = useState('')
  const [erroCategoria, setErroCategoria] = useState('')
  const [erroFormaPagamento, setErroFormaPagamento] = useState('')
  const [erroRecorrencia, setErroRecorrencia] = useState('')

  useEffect(() => {
    if (toastMessage !== '') {
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
        setToastMessage('')
      }, 5000)
    }
  }, [toastMessage])

  const handleDescricaoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescricao(event.target.value)
  }

  const handlePagamentoDiaChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPagamentoDia(event.target.value)
  }

  const handleValorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValor(event.target.value)
  }

  const handlePagamentoMesChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPagamentoMes(event.target.value)
  }

  const handlePagamentoAnoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPagamentoAno(event.target.value)
  }

  const handleCategoriaChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCategoria(event.target.value)
  }

  const handleFormaPagamentoChange = (selectedItem: string) => {
    setFormaPagamento(selectedItem)
  }

  const handleRecorrenciaChange = (selectedItem: string) => {
    setRecorrencia(selectedItem)
  }

  const limparMensagensErro = () => {
    setErroDescricao('')
    setErroValor('')
    setErroDia('')
    setErroMes('')
    setErroAno('')
    setErroCategoria('')
    setErroFormaPagamento('')
    setErroRecorrencia('')
  }

  const handleSave = () => {
    // Validação dos campos
    limparMensagensErro()

    let temErro = false
    const valorNumerico = parseFloat(valor.replace(',', '.'))
    const diaNumerico = parseInt(pagamentoDia, 10)
    const mesNumerico = parseInt(pagamentoMes, 10)
    const anoNumerico = parseInt(pagamentoAno, 10)

    if (!descricao) {
      setErroDescricao('Descrição não pode ser vazia')
      temErro = true
    }
    if (isNaN(valorNumerico) || valorNumerico === 0) {
      setErroValor('Valor inválido')
      temErro = true
    }
    if (isNaN(diaNumerico) || diaNumerico < 1 || diaNumerico > 31) {
      setErroDia('Dia inválido')
      temErro = true
    }
    if (isNaN(mesNumerico) || mesNumerico < 1 || mesNumerico > 12) {
      setErroMes('Mês inválido')
      temErro = true
    }
    if (isNaN(anoNumerico) || anoNumerico < 1) {
      setErroAno('Ano inválido')
      temErro = true
    }
    if (!categoria) {
      setErroCategoria('Categoria não pode ser vazia')
      temErro = true
    }
    if (!formaPagamento) {
      setErroFormaPagamento('Forma de pagamento não pode ser vazia')
      temErro = true
    }
    if (!recorrencia) {
      setErroRecorrencia('Recorrência não pode ser vazia')
      temErro = true
    }

    if (temErro) {
      setToastMessage('Não foi possível salvar')
      return
    }

    // Se estamos editando um gasto existente, usamos o ID existente
    // Caso contrário, geramos um novo ID
    const gastoId = gasto.expenseId !== 0 ? gasto.expenseId : getNextExpenseId()

    const gastoAtualizado: Expenses = {
      expenseId: gastoId,
      pago: gasto.pago,
      descricao,
      valor: valorNumerico,
      pagamentoDia: parseInt(pagamentoDia, 10),
      pagamentoMes: parseInt(pagamentoMes, 10),
      pagamentoAno: parseInt(pagamentoAno, 10),
      categoria,
      formaPagamento,
      recorrencia,
    }

    clearFormData()
    onConfirm(gastoAtualizado)
  }

  const getNextExpenseId = () => {
    const userExpenses = getExpensesByUserId(user.userId)
    let maxExpenseId = 0
    for (const expense of userExpenses) {
      if (expense.expenseId > maxExpenseId) {
        maxExpenseId = expense.expenseId
      }
    }
    return maxExpenseId + 1
  }

  return (
    <div className="backgroundBlur">
      {showToast && <ToastNotification type="error" text={toastMessage} />}
      <div className="modalGasto">
        <div className="header">
          {gasto.expenseId === 0 ? 'Editar Gasto' : 'Inserir Novo Gasto'}
        </div>
        <div className="content">
          <div className="line">
            <TextInput
              label="Descrição"
              placeholder="Digite uma breve descrição do gasto"
              name="descricao"
              inputValue={descricao}
              onChange={handleDescricaoChange}
            />
            {gasto.expenseId !== 0 && (
              <div
                className="delButton"
                onClick={() => onDelete(gasto.expenseId)}
              >
                <img src={deleteIcon} alt="" />
              </div>
            )}
          </div>
          {erroDescricao && (
            <div className="error-message">{erroDescricao}</div>
          )}
          <TextInput
            label="Valor"
            placeholder="Digite o valor do gasto"
            name="valor"
            inputValue={valor === '0' ? '' : valor.toString()}
            onChange={handleValorChange}
          />
          {erroValor && <div className="error-message">{erroValor}</div>}
          <div className="info">Data de Pagamento</div>
          <div className="dataPagamento">
            <TextInput
              label="Dia"
              placeholder="DD"
              name="Dia"
              inputValue={pagamentoDia === '0' ? '' : pagamentoDia}
              onChange={handlePagamentoDiaChange}
            />
            <div className="barra">/</div>
            <TextInput
              label="Mês"
              placeholder="MM"
              name="pagamentoMes"
              inputValue={pagamentoMes === '0' ? '' : pagamentoMes}
              onChange={handlePagamentoMesChange}
            />
            <div className="barra">/</div>
            <TextInput
              label="Ano"
              placeholder="AAAA"
              name="pagamentoAno"
              inputValue={pagamentoAno === '0' ? '' : pagamentoAno}
              onChange={handlePagamentoAnoChange}
            />
          </div>
          {erroDia && <div className="error-message">{erroDia}</div>}
          {erroMes && <div className="error-message">{erroMes}</div>}
          {erroAno && <div className="error-message">{erroAno}</div>}
          <SingleSelect
            onSelect={handleRecorrenciaChange}
            placeholder="Recorrência do pagamento"
            label="Recorrência"
            options={['Única', 'Mensal', 'Anual', 'Parcelado']}
            initialValue={recorrencia}
          />
          {erroRecorrencia && (
            <div className="error-message">{erroRecorrencia}</div>
          )}
          <TextInput
            label="Categoria"
            placeholder="Digite uma categoria"
            name="categoria"
            inputValue={categoria}
            onChange={handleCategoriaChange}
          />
          {erroCategoria && (
            <div className="error-message">{erroCategoria}</div>
          )}
          <SingleSelect
            onSelect={handleFormaPagamentoChange}
            placeholder="Forma de pagamento"
            label="Forma de pagamento"
            options={['Dinheiro', 'Crédito', 'Débito', 'PIX', 'Boleto']}
            initialValue={formaPagamento}
          />
          {erroFormaPagamento && (
            <div className="error-message">{erroFormaPagamento}</div>
          )}
        </div>
        <div className="buttons">
          <FilledButton
            text="Cancelar"
            size="100px"
            onClick={() => {
              clearFormData()
              onClose()
            }}
          />
          <FilledButton text="Salvar" size="100px" onClick={handleSave} />
        </div>
      </div>
    </div>
  )
}
