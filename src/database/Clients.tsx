interface Client {
  nome: string
  instagram: string
  facebook: string
  site: string
  linkedin: string
  email: string
  telefone: string
  clientId: number
}

interface User {
  userId: number
  clients: Client[]
}

const listaDeClientes: User[] = [
  {
    userId: 1,
    clients: [
      {
        nome: 'Ana Silva',
        instagram: 'https://www.instagram.com/nyckpetrova/',
        facebook: 'url_do_facebook1',
        site: 'url_do_site1',
        linkedin: 'https://www.linkedin.com/in/nycoleribeiro/',
        email: 'ana@email.com',
        telefone: '555-123-4567',
        clientId: 1,
      },
      {
        nome: 'Pedro Santos',
        instagram: 'https://www.instagram.com/nyckpetrova/',
        facebook: 'url_do_facebook2',
        site: 'url_do_site2',
        linkedin: '',
        email: 'pedro@email.com',
        telefone: '555-987-6543',
        clientId: 2,
      },
      {
        nome: 'Luisa Oliveira',
        instagram: 'https://www.instagram.com/nyckpetrova/',
        facebook: '',
        site: '',
        linkedin: 'https://www.linkedin.com/in/nycoleribeiro/',
        email: 'luisa@email.com',
        telefone: '555-333-2222',
        clientId: 3,
      },
      {
        nome: 'Rafael Pereira',
        instagram: '',
        facebook: 'url_do_facebook4',
        site: 'url_do_site4',
        linkedin: 'https://www.linkedin.com/in/nycoleribeiro/',
        email: 'rafael@email.com',
        telefone: '555-777-8888',
        clientId: 4,
      },
      {
        nome: 'Mariana Costa',
        instagram: '',
        facebook: 'url_do_facebook5',
        site: '',
        linkedin: '',
        email: 'mariana@email.com',
        telefone: '555-111-9999',
        clientId: 5,
      },
      {
        nome: 'Carlos Rodrigues',
        instagram: 'https://www.instagram.com/nyckpetrova/',
        facebook: '',
        site: 'url_do_site6',
        linkedin: '',
        email: 'carlos@email.com',
        telefone: '555-222-4444',
        clientId: 6,
      },
      {
        nome: 'Isabela Fernandes',
        instagram: 'https://www.instagram.com/nyckpetrova/',
        facebook: 'url_do_facebook7',
        site: '',
        linkedin: '',
        email: 'isabela@email.com',
        telefone: '555-444-5555',
        clientId: 7,
      },
      {
        nome: 'Gustavo Alves',
        instagram: 'https://www.instagram.com/nyckpetrova/',
        facebook: '',
        site: 'url_do_site8',
        linkedin: '',
        email: 'gustavo@email.com',
        telefone: '555-888-3333',
        clientId: 8,
      },
      {
        nome: 'Fernanda Sousa',
        instagram: 'https://www.instagram.com/nyckpetrova/',
        facebook: 'url_do_facebook9',
        site: 'url_do_site9',
        linkedin: 'https://www.linkedin.com/in/nycoleribeiro/',
        email: 'fernanda@email.com',
        telefone: '555-999-1111',
        clientId: 9,
      },
      {
        nome: 'José Lima',
        instagram: 'https://www.instagram.com/nyckpetrova/',
        facebook: 'url_do_facebook10',
        site: '',
        linkedin: 'https://www.linkedin.com/in/nycoleribeiro/',
        email: 'jose@email.com',
        telefone: '555-777-2222',
        clientId: 10,
      },
      {
        nome: 'Patricia Santos',
        instagram: 'https://www.instagram.com/nyckpetrova/',
        facebook: '',
        site: 'url_do_site11',
        linkedin: 'https://www.linkedin.com/in/nycoleribeiro/',
        email: 'patricia@email.com',
        telefone: '555-666-3333',
        clientId: 11,
      },
      {
        nome: 'Antonio Mendes',
        instagram: '',
        facebook: 'url_do_facebook12',
        site: 'url_do_site12',
        linkedin: 'https://www.linkedin.com/in/nycoleribeiro/',
        email: 'antonio@email.com',
        telefone: '555-555-5555',
        clientId: 12,
      },
    ],
  },
  {
    userId: 2,
    clients: [],
  },
]

// Função auxiliar para encontrar um usuário pelo userId
const findUser = (userId: number): User | undefined => {
  return listaDeClientes.find((user) => user.userId === userId)
}

export const getClients = (userId: number): Client[] => {
  const user = findUser(userId)
  if (user) {
    return [...user.clients].sort((a, b) => a.nome.localeCompare(b.nome))
  }
  console.error('UserId não encontrado')
  return []
}

export const insertClient = (userId: number, client: Client): string | null => {
  const user = findUser(userId)
  if (user) {
    user.clients.push(client)
    return 'success'
  }
  console.error('UserId não encontrado')
  return null
}

export const removeClient = (
  userId: number,
  clientId: number,
): string | null => {
  const user = findUser(userId)
  if (user) {
    const index = user.clients.findIndex(
      (client) => client.clientId === clientId,
    )
    if (index !== -1) {
      user.clients.splice(index, 1)
      return 'success'
    }
    console.error('ClientId não encontrado')
    return null
  }
  console.error('UserId não encontrado')
  return null
}

export const updateClient = (
  userId: number,
  updatedClient: Client,
): string | null => {
  const user = findUser(userId)
  if (user) {
    const index = user.clients.findIndex(
      (client) => client.clientId === updatedClient.clientId,
    )
    if (index !== -1) {
      user.clients[index] = updatedClient
      return 'success'
    }
    console.error('ClientId não encontrado')
    return null
  }
  console.error('UserId não encontrado')
  return null
}

export const getClientById = (
  userId: number,
  clientId: number,
): Client | null => {
  const user = findUser(userId)
  if (user) {
    const client = user.clients.find((client) => client.clientId === clientId)
    return client || null
  }
  console.error('UserId não encontrado')
  return null
}
