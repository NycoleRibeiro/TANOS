import { HistoryEntry, UserHistory } from './Types'

const listaHistorico: UserHistory[] = [
  {
    userId: 1,
    history: [
      {
        id: 1,
        message: 'Novo cliente adicionado ao sistema',
        timestamp: '2023-12-01T10:00:00.000Z',
      },
      {
        id: 2,
        message: 'Um novo projeto foi criado',
        timestamp: '2023-12-02T15:30:00.000Z',
      },
      {
        id: 3,
        message: 'Novo serviço criado no sistema',
        timestamp: '2023-12-04T14:45:00.000Z',
      },
      {
        id: 4,
        message: 'O projeto Aplicativo de Delivery foi concluído',
        timestamp: '2023-12-05T17:00:00.000Z',
      },
    ],
  },
  {
    userId: 2,
    history: [],
  },
]

const findUser = (userId: number): UserHistory | undefined => {
  return listaHistorico.find((user) => user.userId === userId)
}

export const getHistory = (userId: number): HistoryEntry[] => {
  const user = findUser(userId)
  if (user) {
    return user.history
  }
  console.error('UserId não encontrado')
  return []
}

export const addToHistory = (userId: number, message: string): void => {
  const user = findUser(userId)
  if (user) {
    const newId =
      user.history.length > 0
        ? Math.max(...user.history.map((entry) => entry.id)) + 1
        : 1
    user.history.push({
      id: newId,
      message,
      timestamp: new Date().toISOString(),
    })
  } else {
    console.error('UserId não encontrado')
  }
}
