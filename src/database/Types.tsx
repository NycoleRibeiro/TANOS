export interface Client {
  nome: string
  instagram: string
  facebook: string
  site: string
  linkedin: string
  email: string
  telefone: string
  clientId: number
}

export interface User {
  userId: number
  clients: Client[]
}

export interface Service {
  nome: string
  descricao: string
  categoria: string
  valor: number
  valorFixo: boolean
  serviceId: number
}

export interface UserServices {
  userId: number
  services: Service[]
}

export interface Expense {
  titulo: string
  tipo: 'Projeto' | 'Cliente'
  valor: number
}

export interface ToDoItem {
  check: boolean
  descricao: string
}

export interface Project {
  projectId: number
  titulo: string
  descricao: string
  status: 'Não iniciado' | 'Em andamento' | 'Concluído'
  dataPedido: string
  dataEntrega: string
  clienteId: number
  servicosId: number[]
  gastos: Expense[]
  toDoList: ToDoItem[]
}

export interface UserProjects {
  userId: number
  projects: Project[]
}
