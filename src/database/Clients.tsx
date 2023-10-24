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

const listaDeClientes = [
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

export const getClients = (userId: number) => {
  // retorna uma lista com todos clientes de um usuário
  for (const user of listaDeClientes) {
    if (user.userId === userId) {
      return user.clients
    }
  }
  console.log(`'UserId não encontrado'`)
  return null
}

export const insertClient = (userId: number, client: Client) => {
  for (const user of listaDeClientes) {
    if (user.userId === userId) {
      user.clients.push(client)
      return 'success'
    }
  }
  console.log(`'UserId não encontrado'`)
  return null
}

export const removeClient = (userId: number, clientId: number) => {
  for (const user of listaDeClientes) {
    if (user.userId === userId) {
      for (const index in user.clients) {
        if (user.clients[index].clientId === clientId) {
          user.clients.splice(Number(index), 1)
          return 'success'
        }
      }
      console.log(`'ClientId não encontrado'`)
      return null
    }
  }
  console.log(`'UserId não encontrado'`)
  return null
}

export const updateClient = (
  userId: number,
  clientId: number,
  client: Client,
) => {
  for (const user of listaDeClientes) {
    if (user.userId === userId) {
      for (const index in user.clients) {
        if (user.clients[index].clientId === clientId) {
          user.clients[Number(index)] = client
          return 'success'
        }
      }
      console.log(`'ClientId não encontrado'`)
      return null
    }
  }
  console.log(`'UserId não encontrado'`)
  return null
}
