import { Expense, Project, ToDoItem, UserProjects } from './Types'

const listaDeProjetos: UserProjects[] = [
  {
    userId: 1,
    projects: [
      {
        projectId: 1,
        titulo: 'Redesign do Site Corporativo',
        descricao:
          'Atualização do layout e estrutura do site corporativo da Empresa ABC.',
        status: 'Concluído',
        dataPedido: '15/11/2023',
        dataEntrega: '30/12/2023',
        clienteId: 1,
        servicos: [
          {
            nome: 'UI/UX Consultoria',
            descricao: 'Consultoria para melhorar a experiência do usuário',
            categoria: 'UI/UX Design',
            valor: 50.0,
            valorFixo: false,
            serviceId: 3,
          },
          {
            nome: 'Redesign de Website',
            descricao: 'Redesenho de sites existentes',
            categoria: 'UI/UX Design',
            valor: 100.0,
            valorFixo: false,
            serviceId: 10,
          },
        ],
        gastos: [
          { titulo: 'Licença de Imagens', tipo: 'Projeto', valor: 30.0 },
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
        dataPedido: '28/12/2023',
        dataEntrega: '20/01/2024',
        clienteId: 2,
        servicos: [
          {
            nome: 'Capa para Facebook',
            descricao: 'Criação do design de uma capa para o Facebook',
            categoria: 'Design Gráfico',
            valor: 40.0,
            valorFixo: true,
            serviceId: 1,
          },
          {
            nome: 'Banner Publicitário',
            descricao: 'Criação de banners publicitários',
            categoria: 'Design Gráfico',
            valor: 35.0,
            valorFixo: true,
            serviceId: 7,
          },
        ],
        gastos: [
          { titulo: 'Anúncios Meta', tipo: 'Cliente', valor: 500.0 },
          { titulo: 'Licença de Imagem', tipo: 'Projeto', valor: 20.0 },
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
        dataPedido: '10/08/2023',
        dataEntrega: '04/01/2024',
        clienteId: 3,
        servicos: [
          {
            nome: 'Prototipagem de Aplicativos',
            descricao: 'Criação de protótipos interativos de aplicativos',
            categoria: 'UI/UX Design',
            valor: 1200.0,
            valorFixo: false,
            serviceId: 8,
          },
          {
            nome: 'Logo Design',
            descricao: 'Design de logotipo profissional',
            categoria: 'Design Gráfico',
            valor: 60.0,
            valorFixo: true,
            serviceId: 2,
          },
        ],
        gastos: [
          { titulo: 'Licença de Software', tipo: 'Projeto', valor: 32.0 },
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
        dataPedido: '05/01/2024',
        dataEntrega: '30/01/2024',
        clienteId: 4,
        servicos: [
          {
            nome: 'Capa para Facebook',
            descricao: 'Criação do design de uma capa para o Facebook',
            categoria: 'Design Gráfico',
            valor: 40.0,
            valorFixo: true,
            serviceId: 1,
          },
          {
            nome: 'Logo Design',
            descricao: 'Design de logotipo profissional',
            categoria: 'Design Gráfico',
            valor: 60.0,
            valorFixo: true,
            serviceId: 2,
          },
          {
            nome: 'Ilustração Digital',
            descricao: 'Ilustrações digitais personalizadas',
            categoria: 'Design Gráfico',
            valor: 50.0,
            valorFixo: true,
            serviceId: 5,
          },
        ],
        gastos: [],
        toDoList: [
          { check: false, descricao: 'Workshop de identidade da marca' },
          { check: false, descricao: 'Desenvolvimento do logotipo' },
          { check: false, descricao: 'Criação do manual da marca' },
        ],
      },
      {
        projectId: 5,
        titulo: 'Cartões de Visita',
        descricao:
          'A cliente solicitou um cartão de visita para o seu negócio de Nail Designer, contendo profissão, WhatsApp e Instagram. \n\nWpp: (99) 99999-9999 \nInsta: @fernandaNailDesign \n\nTO-DO LIST\n\n[  ] Design minimalista e feminino \n[  ] Impressão de 100 cartões - Papel 180g/m² Fotográfico',
        status: 'Não iniciado',
        dataPedido: '02/01/2024',
        dataEntrega: '15/01/2024',
        clienteId: 4,
        servicos: [
          {
            nome: 'Cartão de Visita - Design',
            descricao: 'Design de cartão de visita personalizado',
            categoria: 'Design Gráfico',
            valor: 25.0,
            valorFixo: false,
            serviceId: 4,
          },
          {
            nome: 'Cartão de Visita - Impressão',
            descricao: 'Impressão de cartão de visita',
            categoria: 'Impressão',
            valor: 48.0,
            valorFixo: false,
            serviceId: 11,
          },
        ],
        gastos: [{ titulo: 'Impressão', tipo: 'Projeto', valor: 4.8 }],
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
