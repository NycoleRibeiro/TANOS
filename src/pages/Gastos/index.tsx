import './style.sass'

import { Header } from '../../components/header'
import { SingleSelect } from '../../components/inputs/SingleSelect'
import { Sidebar } from '../../components/sidebar'

import { useEffect, useState } from 'react'
import { FilledButton } from '../../components/buttons/filledButton'
import { ToastNotification } from '../../components/toast-notification'
import {
  addExpense,
  deleteExpense,
  getExpensesByUserId,
  updateExpense,
} from '../../database/Expenses'
import { Expenses } from '../../database/Types'
import { getUserData } from '../../loggedUser'
import { ModalNewExpense } from './modalGasto'

export const Gastos = () => {
  const user = getUserData() // Obtém o usuário atual
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    expenseId: 0,
    pago: false,
    descricao: '',
    valor: 0,
    pagamentoDia: 0,
    pagamentoMes: 0,
    pagamentoAno: 0,
    categoria: '',
    formaPagamento: 'Dinheiro' as
      | 'Dinheiro'
      | 'Crédito'
      | 'Débito'
      | 'PIX'
      | 'Boleto',
    recorrencia: 'Única' as 'Única' | 'Mensal' | 'Anual' | 'Parcelado',
  })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [expenses, setExpenses] = useState(
    user ? getExpensesByUserId(user.userId) : [],
  )

  const currentMonthIndex = new Date().getMonth() // Mês atual como número (0-11)
  const currentYear = new Date().getFullYear() // Ano atual como número

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  const currentMonthName = monthNames[currentMonthIndex]

  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex + 1) // Mês atual como número (1-12)
  const [selectedYear, setSelectedYear] = useState(currentYear)

  useEffect(() => {
    if (toastMessage !== '') {
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
        setToastMessage('')
      }, 5000)
    }
  }, [toastMessage])

  useEffect(() => {
    updateExpensesList()
  }, [user, selectedMonth, selectedYear])

  const updateExpensesList = () => {
    const filteredExpenses = getExpensesByUserId(user.userId).filter(
      (expense) => {
        return (
          expense.pagamentoMes === selectedMonth &&
          expense.pagamentoAno === selectedYear
        )
      },
    )
    setExpenses(filteredExpenses)
  }

  const handleMonthSelect = (month: string) => {
    const monthIndex =
      [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ].indexOf(month) + 1
    setSelectedMonth(monthIndex)
  }

  const handleYearSelect = (year: string) => {
    setSelectedYear(parseInt(year, 10))
  }

  const gerarOpcoesAno = () => {
    const anoAtual = new Date().getFullYear()
    const opcoesAno = []
    opcoesAno.push((anoAtual + 1).toString())
    for (let i = 0; i <= 5; i++) {
      opcoesAno.push((anoAtual - i).toString())
    }
    return opcoesAno
  }

  const opcoesAno = gerarOpcoesAno()

  const handlePagoChange = (expenseToUpdate: Expenses) => {
    // Atualiza o estado de 'pago' do gasto
    const updatedExpense = {
      ...expenseToUpdate,
      pago: !expenseToUpdate.pago,
    }

    // Chama a função de atualização do "banco"
    const result = updateExpense(user.userId, updatedExpense)
    if (result === 'success') {
      // Atualize o estado local dos gastos para refletir a mudança
      setExpenses(
        expenses.map((expense) =>
          expense.expenseId === updatedExpense.expenseId
            ? updatedExpense
            : expense,
        ),
      )
      // Mostrar um toast para indicar o sucesso da operação
    } else {
      // Mostrar um toast para indicar a falha da operação
    }
  }

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor)
  }

  const formatarData = (dia: number, mes: number, ano: number) => {
    const diaFormatado = String(dia).padStart(2, '0')
    const mesFormatado = String(mes).padStart(2, '0')
    return `${diaFormatado}/${mesFormatado}/${ano}`
  }

  const handleAddNewExpense = (newExpenseData: Expenses) => {
    if (
      expenses.some((expense) => expense.expenseId === newExpenseData.expenseId)
    ) {
      // Atualiza o gasto existente
      const result = updateExpense(user.userId, newExpenseData)
      if (result === 'success') {
        setExpenses(
          expenses.map((expense) =>
            expense.expenseId === newExpenseData.expenseId
              ? newExpenseData
              : expense,
          ),
        )
        setIsModalOpen(false)
        setToastMessage('Gasto atualizado com sucesso')
      } else {
        setToastMessage('Falha ao atualizar gasto')
      }
    } else {
      // Adiciona um novo gasto
      const result = addExpense(user.userId, newExpenseData)
      if (result === 'success') {
        setExpenses([...expenses, newExpenseData])
        setIsModalOpen(false)
        setToastMessage('Novo gasto cadastrado com sucesso')
      } else {
        setToastMessage('Falha ao cadastrar novo gasto')
      }
    }
  }

  const handleDeleteExpense = (expenseId: number) => {
    if (user && user.userId !== undefined) {
      const deleteResponse = deleteExpense(user.userId, expenseId)
      if (deleteResponse === 'success') {
        setIsModalOpen(false)
        setToastMessage('Gasto deletado com sucesso!')
        // Atualize a lista de despesas após a exclusão
        updateExpensesList()
      } else {
        setToastMessage('Falha ao deletar gasto!')
      }
    } else {
      setToastMessage('Usuário não identificado!')
    }
  }

  const clearFormData = () => {
    setFormData({
      expenseId: 0,
      pago: false,
      descricao: '',
      valor: 0,
      pagamentoDia: 0,
      pagamentoMes: 0,
      pagamentoAno: 0,
      categoria: '',
      formaPagamento: 'Dinheiro',
      recorrencia: 'Única',
    })
  }

  return (
    <div className="gastos-container">
      <Sidebar activePage="Gastos" />
      {isModalOpen && (
        <ModalNewExpense
          onClose={() => {
            setIsModalOpen(false)
          }}
          onConfirm={handleAddNewExpense}
          onDelete={handleDeleteExpense}
          gasto={formData}
          clearFormData={clearFormData}
        />
      )}
      {showToast && <ToastNotification type="ok" text={toastMessage} />}
      <div className="content">
        <Header path={[{ label: 'Gastos', path: '/gastos' }]} />
        <div className="subheader">
          <div className="title">
            Gastos de {monthNames[selectedMonth - 1]} / {selectedYear}
          </div>
          <div className="dataSelection">
            <SingleSelect
              onSelect={handleMonthSelect}
              placeholder="Mês"
              label="Mês"
              options={monthNames}
              initialValue={currentMonthName}
            />
            <SingleSelect
              onSelect={handleYearSelect}
              placeholder="Ano"
              label="Ano"
              options={opcoesAno}
              initialValue={currentYear.toString()}
            />
          </div>
          <FilledButton
            text="Novo Gasto"
            size="150px"
            onClick={() => {
              setIsModalOpen(true)
            }}
          />
        </div>
        <div className="body">
          <div className="table">
            <div className="header">
              <div className="col1">Pago</div>
              <div className="col2">Descrição</div>
              <div className="col3">Valor</div>
              <div className="col4">Pagamento em</div>
              <div className="col5">Recorrência</div>
              <div className="col6">Categoria</div>
              <div className="col7">Forma de pagamento</div>
            </div>
            {expenses.map((expense) => {
              return (
                <div
                  className="line"
                  key={expense.expenseId}
                  onClick={() => {
                    setFormData(expense)
                    setIsModalOpen(true)
                  }}
                >
                  <div className="col1">
                    <input
                      type="checkbox"
                      className="PagoCheck"
                      checked={expense.pago}
                      onChange={() => handlePagoChange(expense)}
                    />
                  </div>
                  <div className="col2">{expense.descricao}</div>
                  <div className="col3">{formatarValor(expense.valor)}</div>
                  <div className="col4">
                    {formatarData(
                      expense.pagamentoDia,
                      expense.pagamentoMes,
                      expense.pagamentoAno,
                    )}
                  </div>
                  <div className="col5">{expense.recorrencia}</div>
                  <div className="col6">
                    <div className="categoria">{expense.categoria}</div>
                  </div>
                  <div className="col7">
                    <div className="formaPagamento">
                      {expense.formaPagamento}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
