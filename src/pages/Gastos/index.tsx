import './style.sass'

import { Header } from '../../components/header'
import { SingleSelect } from '../../components/inputs/SingleSelect'
import { Sidebar } from '../../components/sidebar'

import { useEffect, useState } from 'react'
import { FilledButton } from '../../components/buttons/filledButton'
import {
  addExpense,
  deleteExpense,
  getExpensesByUserId,
  updateExpense,
} from '../../database/Expenses'
import { Expenses } from '../../database/Types'
import { getUserData } from '../../loggedUser'

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
    formaPagamento: 'Crédito',
    recorrencia: 'Única',
  })
  const [showToast, setShowToast] = useState(false)
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

  const handleMonthSelect = (month) => {
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

  const handleYearSelect = (year) => {
    setSelectedYear(parseInt(year, 10))
  }

  const gerarOpcoesAno = () => {
    const anoAtual = new Date().getFullYear()
    const opcoesAno = []
    for (let i = 0; i <= 5; i++) {
      opcoesAno.push((anoAtual - i).toString())
    }
    return opcoesAno
  }

  const opcoesAno = gerarOpcoesAno()

  const handlePagoChange = (expenseToUpdate) => {
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

  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor)
  }

  const formatarData = (dia, mes, ano) => {
    const diaFormatado = String(dia).padStart(2, '0')
    const mesFormatado = String(mes).padStart(2, '0')
    return `${diaFormatado}/${mesFormatado}/${ano}`
  }

  return (
    <div className="gastos-container">
      <Sidebar activePage="Gastos" />
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
          <FilledButton text="Novo Gasto" size="150px" onClick={() => {}} />
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
                <div className="line" key={expense.expenseId}>
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
