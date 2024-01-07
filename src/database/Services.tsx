import { Service, UserServices } from './Types'

const listaDeServicos: UserServices[] = [
  {
    userId: 1,
    services: [
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
        nome: 'UI/UX Consultoria',
        descricao: 'Consultoria para melhorar a experiência do usuário',
        categoria: 'UI/UX Design',
        valor: 30.0,
        valorFixo: false,
        serviceId: 3,
      },
      {
        nome: 'Cartão de Visita - Design',
        descricao: 'Design de cartão de visita personalizado',
        categoria: 'Design Gráfico',
        valor: 25.0,
        valorFixo: false,
        serviceId: 4,
      },
      {
        nome: 'Ilustração Digital',
        descricao: 'Ilustrações digitais personalizadas',
        categoria: 'Design Gráfico',
        valor: 50.0,
        valorFixo: true,
        serviceId: 5,
      },
      {
        nome: 'Web Design',
        descricao: 'Design de interfaces de websites',
        categoria: 'UI/UX Design',
        valor: 80.0,
        valorFixo: false,
        serviceId: 6,
      },
      {
        nome: 'Banner Publicitário',
        descricao: 'Criação de banners publicitários',
        categoria: 'Design Gráfico',
        valor: 35.0,
        valorFixo: true,
        serviceId: 7,
      },
      {
        nome: 'Prototipagem de Aplicativos',
        descricao: 'Criação de protótipos interativos de aplicativos',
        categoria: 'UI/UX Design',
        valor: 45.0,
        valorFixo: false,
        serviceId: 8,
      },
      {
        nome: 'Identidade Visual Completa',
        descricao: 'Design de identidade visual completa para empresas',
        categoria: 'Design Gráfico',
        valor: 150.0,
        valorFixo: true,
        serviceId: 9,
      },
      {
        nome: 'Redesign de Website',
        descricao: 'Redesenho de sites existentes',
        categoria: 'UI/UX Design',
        valor: 70.0,
        valorFixo: false,
        serviceId: 10,
      },
      {
        nome: 'Cartão de Visita - Impressão',
        descricao: 'Impressão de cartão de visita',
        categoria: 'Impressão',
        valor: 50.0,
        valorFixo: false,
        serviceId: 11,
      },
    ],
  },
  {
    userId: 2,
    services: [
      {
        nome: 'Desenvolvimento de Website',
        descricao: 'Criação de sites personalizados',
        categoria: 'Programação',
        valor: 200.0,
        valorFixo: false,
        serviceId: 1,
      },
      {
        nome: 'Desenvolvimento de Aplicativos Móveis',
        descricao: 'Criação de aplicativos para iOS e Android',
        categoria: 'Programação',
        valor: 250.0,
        valorFixo: false,
        serviceId: 2,
      },
      {
        nome: 'Manutenção de Websites',
        descricao: 'Manutenção e atualização de sites existentes',
        categoria: 'Programação',
        valor: 80.0,
        valorFixo: true,
        serviceId: 3,
      },
      {
        nome: 'E-commerce Personalizado',
        descricao: 'Desenvolvimento de lojas online personalizadas',
        categoria: 'Programação',
        valor: 300.0,
        valorFixo: false,
        serviceId: 4,
      },
      {
        nome: 'API Integration',
        descricao: 'Integração de APIs de terceiros em aplicativos',
        categoria: 'Programação',
        valor: 120.0,
        valorFixo: true,
        serviceId: 5,
      },
      {
        nome: 'Sistema de Gerenciamento de Conteúdo',
        descricao: 'Criação de sistemas CMS personalizados',
        categoria: 'Programação',
        valor: 150.0,
        valorFixo: false,
        serviceId: 6,
      },
      {
        nome: 'Desenvolvimento de Plugins',
        descricao: 'Desenvolvimento de plugins personalizados para sites',
        categoria: 'Programação',
        valor: 50.0,
        valorFixo: true,
        serviceId: 7,
      },
      {
        nome: 'Aplicativo de Gerenciamento Empresarial',
        descricao: 'Desenvolvimento de aplicativos para empresas',
        categoria: 'Programação',
        valor: 180.0,
        valorFixo: false,
        serviceId: 8,
      },
      {
        nome: 'Web Scraping',
        descricao: 'Coleta de dados na web por meio de scraping',
        categoria: 'Programação',
        valor: 70.0,
        valorFixo: true,
        serviceId: 9,
      },
      {
        nome: 'Hospedagem e Manutenção de Servidores',
        descricao: 'Serviços de hospedagem e manutenção de servidores',
        categoria: 'Programação',
        valor: 100.0,
        valorFixo: true,
        serviceId: 10,
      },
    ],
  },
]

const findUserServices = (userId: number): Service[] | undefined => {
  const user = listaDeServicos.find((user) => user.userId === userId)
  return user ? user.services : undefined
}

export const getServices = (userId: number, categoria?: string): Service[] => {
  const services = findUserServices(userId)
  if (services) {
    return categoria
      ? services.filter((service) => service.categoria === categoria)
      : services
  }
  console.error('UserId não encontrado')
  return []
}

export const insertService = (
  userId: number,
  service: Service,
): string | null => {
  const services = findUserServices(userId)
  if (services) {
    services.push(service)
    return 'success'
  }
  console.error('UserId não encontrado')
  return null
}

export const removeService = (
  userId: number,
  serviceId: number,
): string | null => {
  const services = findUserServices(userId)
  if (services) {
    const index = services.findIndex(
      (service) => service.serviceId === serviceId,
    )
    if (index !== -1) {
      services.splice(index, 1)
      return 'success'
    }
    console.error('ServiceId não encontrado')
    return null
  }
  console.error('UserId não encontrado')
  return null
}

export const updateService = (
  userId: number,
  updatedService: Service,
): string | null => {
  const services = findUserServices(userId)
  if (services) {
    const index = services.findIndex(
      (service) => service.serviceId === updatedService.serviceId,
    )
    if (index !== -1) {
      services[index] = updatedService
      return 'success'
    }
    console.error('ServiceId não encontrado')
    return null
  }
  console.error('UserId não encontrado')
  return null
}

export const getServicesById = (
  userId: number,
  serviceIds: number[],
): Service[] => {
  const userServices = findUserServices(userId)
  if (userServices) {
    return userServices.filter((service) =>
      serviceIds.includes(service.serviceId),
    )
  }
  console.error('UserId ou ServiceIds não encontrado')
  return []
}
