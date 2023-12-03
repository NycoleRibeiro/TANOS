import { Expenses, UserExpenses } from './Types'

const listaDeGastos: UserExpenses[] = [
  {
    userId: 1,
    expenses: [
      {
        expenseId: 1,
        pago: true,
        descricao: 'Amazon Prime',
        valor: 14.99,
        pagamentoDia: 2,
        pagamentoMes: 12,
        pagamentoAno: 2023,
        categoria: 'Diversão',
        formaPagamento: 'Crédito',
        recorrencia: 'Mensal',
      },
      {
        expenseId: 2,
        pago: true,
        descricao: 'Netflix',
        valor: 39.9,
        pagamentoDia: 2,
        pagamentoMes: 12,
        pagamentoAno: 2023,
        categoria: 'Diversão',
        formaPagamento: 'Crédito',
        recorrencia: 'Mensal',
      },
      {
        expenseId: 3,
        pago: true,
        descricao: 'Conta de luz',
        valor: 80.7,
        pagamentoDia: 5,
        pagamentoMes: 12,
        pagamentoAno: 2023,
        categoria: 'Contas',
        formaPagamento: 'PIX',
        recorrencia: 'Única',
      },
      {
        expenseId: 4,
        pago: true,
        descricao: 'Google One',
        valor: 69.99,
        pagamentoDia: 15,
        pagamentoMes: 12,
        pagamentoAno: 2023,
        categoria: 'Contas',
        formaPagamento: 'Crédito',
        recorrencia: 'Anual',
      },
      {
        expenseId: 5,
        pago: false,
        descricao: 'Internet',
        valor: 120,
        pagamentoDia: 20,
        pagamentoMes: 12,
        pagamentoAno: 2023,
        categoria: 'Contas',
        formaPagamento: 'PIX',
        recorrencia: 'Mensal',
      },
    ],
  },
  { userId: 2, expenses: [] },
]

export const getExpensesByUserId = (userId: number): Expenses[] => {
  const userExpenses = listaDeGastos.find((user) => user.userId === userId)
  return userExpenses ? userExpenses.expenses : []
}

export const addExpense = (userId: number, expense: Expenses): string => {
  const userExpenses = listaDeGastos.find((user) => user.userId === userId)
  if (userExpenses) {
    userExpenses.expenses.push(expense)
    return 'success'
  }
  return 'error'
}

export const deleteExpense = (userId: number, expenseId: number): string => {
  // Encontre o usuário pelo userId
  const userExpenses = listaDeGastos.find((user) => user.userId === userId)

  if (userExpenses) {
    // Encontre o índice do gasto a ser removido
    const expenseIndex = userExpenses.expenses.findIndex(
      (expense) => expense.expenseId === expenseId,
    )

    if (expenseIndex !== -1) {
      // Remova o gasto do array
      userExpenses.expenses.splice(expenseIndex, 1)
      return 'success'
    } else {
      return 'error: expense not found'
    }
  } else {
    return 'error: user not found'
  }
}

export const updateExpense = (
  userId: number,
  updatedExpense: Expenses,
): string => {
  // Encontre o usuário pelo userId
  const userExpenses = listaDeGastos.find((user) => user.userId === userId)

  if (userExpenses) {
    // Encontre o índice do gasto que será atualizado
    const expenseIndex = userExpenses.expenses.findIndex(
      (expense) => expense.expenseId === updatedExpense.expenseId,
    )

    if (expenseIndex !== -1) {
      // Atualize o gasto com as novas informações
      userExpenses.expenses[expenseIndex] = updatedExpense
      return 'success'
    } else {
      return 'error: expense not found'
    }
  } else {
    return 'error: user not found'
  }
}
