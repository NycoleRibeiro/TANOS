import { Expense, ToDoItem, Project, UserProjects } from './Types'

const listaDeProjetos: UserProjects[] = [
  {
    userId: 1,
    projects: [
      {
        projectId: 1,
        titulo: 'Redesign do Site Corporativo',
        descricao:
          'Atualização do layout e estrutura do site corporativo da Empresa ABC.',
        status: 'Não iniciado',
        dataPedido: '15/04/2023',
        dataEntrega: '30/06/2023',
        clienteId: 1,
        servicosId: [1, 2],
        gastos: [
          { titulo: 'Licença de Imagens', tipo: 'Projeto', valor: 150.0 },
          { titulo: 'Hospedagem Anual', tipo: 'Cliente', valor: 300.0 },
        ],
        toDoList: [
          { check: false, descricao: 'Definir paleta de cores' },
          { check: false, descricao: 'Revisar conteúdo do site' },
        ],
      },
      {
        projectId: 2,
        titulo: 'Campanha de Marketing Digital',
        descricao:
          'Desenvolvimento de estratégia de marketing digital e SEO para a Empresa XYZ.',
        status: 'Em andamento',
        dataPedido: '01/05/2023',
        dataEntrega: '01/08/2023',
        clienteId: 2,
        servicosId: [3, 4],
        gastos: [
          { titulo: 'Anúncios Facebook', tipo: 'Projeto', valor: 500.0 },
          { titulo: 'Software de SEO', tipo: 'Projeto', valor: 200.0 },
        ],
        toDoList: [
          { check: true, descricao: 'Briefing com o cliente' },
          { check: true, descricao: 'Pesquisa de mercado' },
          {
            check: false,
            descricao: 'Desenvolvimento da estratégia de conteúdo',
          },
          { check: false, descricao: 'Lançamento da campanha' },
        ],
      },
      {
        projectId: 3,
        titulo: 'Aplicativo de Delivery',
        descricao:
          'Criação de um aplicativo de delivery para a cadeia de restaurantes FoodNow.',
        status: 'Concluído',
        dataPedido: '10/03/2023',
        dataEntrega: '20/05/2023',
        clienteId: 3,
        servicosId: [5],
        gastos: [
          { titulo: 'Licença de Software', tipo: 'Projeto', valor: 1000.0 },
          { titulo: 'Serviços de Cloud', tipo: 'Cliente', valor: 1500.0 },
        ],
        toDoList: [
          { check: true, descricao: 'Design das telas' },
          { check: true, descricao: 'Desenvolvimento do backend' },
          { check: true, descricao: 'Testes de usabilidade' },
          { check: true, descricao: 'Lançamento na App Store e Google Play' },
        ],
      },
      {
        projectId: 4,
        titulo: 'Rebranding da Marca',
        descricao:
          'Projeto completo de rebranding para a startup de tecnologia TechInnov.',
        status: 'Não iniciado',
        dataPedido: '05/07/2023',
        dataEntrega: '15/10/2023',
        clienteId: 4,
        servicosId: [6, 7],
        gastos: [
          { titulo: 'Pesquisa de Mercado', tipo: 'Projeto', valor: 300.0 },
          { titulo: 'Consultoria de Branding', tipo: 'Cliente', valor: 1500.0 },
        ],
        toDoList: [
          { check: false, descricao: 'Workshop de identidade da marca' },
          { check: false, descricao: 'Desenvolvimento do logotipo' },
          { check: false, descricao: 'Criação do manual da marca' },
        ],
      },
    ],
  },
  { userId: 2, projects: [] },
]

const findUserProjects = (userId: number): Project[] | undefined => {
  const userProjects = listaDeProjetos.find((user) => user.userId === userId)
  return userProjects ? userProjects.projects : undefined
}

export const getProjects = (userId: number, status?: string): Project[] => {
  const projects = findUserProjects(userId)
  if (projects) {
    return status
      ? projects.filter((project) => project.status === status)
      : projects
  }
  console.error('UserId não encontrado')
  return []
}

export const getProjectById = (
  userId: number,
  projectId: number,
): Project | null => {
  const userProjects = findUserProjects(userId)
  if (userProjects) {
    const project = userProjects.find(
      (project) => project.projectId === projectId,
    )
    if (project) {
      return project
    }
    console.error('ProjectId não encontrado')
    return null
  }
  console.error('UserId não encontrado')
  return null
}

export const insertProject = (
  userId: number,
  project: Project,
): string | null => {
  const projects = findUserProjects(userId)
  if (projects) {
    projects.push(project)
    return 'success'
  }
  console.error('UserId não encontrado')
  return null
}

export const removeProject = (
  userId: number,
  projectId: number,
): string | null => {
  const projects = findUserProjects(userId)
  if (projects) {
    const index = projects.findIndex(
      (project) => project.projectId === projectId,
    )
    if (index !== -1) {
      projects.splice(index, 1)
      return 'success'
    }
    console.error('ProjectId não encontrado')
    return null
  }
  console.error('UserId não encontrado')
  return null
}

export const updateProject = (
  userId: number,
  updatedProject: Project,
): string | null => {
  const projects = findUserProjects(userId)
  if (projects) {
    const index = projects.findIndex(
      (project) => project.projectId === updatedProject.projectId,
    )
    if (index !== -1) {
      projects[index] = updatedProject
      return 'success'
    }
    console.error('ProjectId não encontrado')
    return null
  }
  console.error('UserId não encontrado')
  return null
}

export const updateProjectExpenses = (
  userId: number,
  projectId: number,
  expenses: Expense[],
): string | null => {
  const projects = findUserProjects(userId)
  if (projects) {
    const project = projects.find((project) => project.projectId === projectId)
    if (project) {
      project.gastos = expenses
      return 'success'
    }
    console.error('ProjectId não encontrado')
    return null
  }
  console.error('UserId não encontrado')
  return null
}

export const updateProjectToDoList = (
  userId: number,
  projectId: number,
  toDoList: ToDoItem[],
): string | null => {
  const projects = findUserProjects(userId)
  if (projects) {
    const project = projects.find((project) => project.projectId === projectId)
    if (project) {
      project.toDoList = toDoList
      return 'success'
    }
    console.error('ProjectId não encontrado')
    return null
  }
  console.error('UserId não encontrado')
  return null
}
