import React, { useState } from 'react'
import { FilledButton } from '../../components/buttons/filledButton'
import { SingleSelect } from '../../components/inputs/SingleSelect'
import { TextInput } from '../../components/inputs/TextInput'
import { Expenses } from '../../database/Types'

import { getExpensesByUserId } from '../../database/Expenses'
import { getUserData } from '../../loggedUser'
import './styleModal.sass'

import deleteIcon from '../../assets/images/delete.svg'

interface ModalNewExpenseProps {
  onClose: () => void
  onConfirm: (gasto: Expenses) => void
  onDelete: (expenseId: number) => void
  gasto: Expenses
}

export const ModalNewExpense: React.FC<ModalNewExpenseProps> = ({
  onClose,
  onConfirm,
  onDelete,
  gasto,
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

  const handleSave = () => {
    const valorNumerico = parseFloat(valor.replace(',', '.'))
    // Valide todos os campos
    if (
      !descricao ||
      isNaN(valorNumerico) ||
      !pagamentoDia ||
      !pagamentoMes ||
      !pagamentoAno
    ) {
      // Trate o erro como achar melhor
      return
    }

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
          <TextInput
            label="Valor"
            placeholder="Digite o valor do gasto"
            name="valor"
            inputValue={valor === '0' ? '' : valor.toString()}
            onChange={handleValorChange}
          />
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
          <SingleSelect
            onSelect={handleRecorrenciaChange}
            placeholder="Recorrência do pagamento"
            label="Recorrência"
            options={['Única', 'Mensal', 'Anual', 'Parcelado']}
            initialValue={gasto.expenseId === 0 ? '' : recorrencia}
          />
          <TextInput
            label="Categoria"
            placeholder="Digite uma categoria"
            name="categoria"
            inputValue={categoria}
            onChange={handleCategoriaChange}
          />
          <SingleSelect
            onSelect={handleFormaPagamentoChange}
            placeholder="Forma de pagamento"
            label="Forma de pagamento"
            options={['Dinheiro', 'Crédito', 'Débito', 'PIX', 'Boleto']}
            initialValue={gasto.expenseId === 0 ? '' : formaPagamento}
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
