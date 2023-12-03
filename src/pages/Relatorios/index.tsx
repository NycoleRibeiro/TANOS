import './style.sass'

import { Header } from '../../components/header'
import { SingleSelect } from '../../components/inputs/SingleSelect'
import { Sidebar } from '../../components/sidebar'

import { getUserData } from '../../loggedUser'

export const Relatorios = () => {
  return (
    <div className="relatorios-container">
      <Sidebar activePage="Relatorios" />
      <div className="content">
        <Header path={[{ label: 'Relatórios', path: '/relatorios' }]} />
        <div className="subheader">
          <div className="title">Relatórios de Dezembro / 2023</div>
          <div className="dataSelection">
            <SingleSelect
              onSelect={() => {}}
              placeholder="Mês"
              label="Mês"
              options={[
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
              ]}
              initialValue={'Dezembro'}
            />
            <SingleSelect
              onSelect={() => {}}
              placeholder="Ano"
              label="Ano"
              options={['2023', '2024']}
              initialValue={'2023'}
            />
          </div>
        </div>
        <div className="body">
          <div className="valores">
            <div className="card">
              <div className="text">Lucro dos Projetos</div>
              <div className="valor">R$5.214,00</div>
            </div>
            <div className="card">
              <div className="text">Gastos do mês</div>
              <div className="valor">R$245,91</div>
            </div>
            <div className="card">
              <div className="text">Restante</div>
              <div className="valor">R$2.878,09</div>
            </div>
          </div>
          <div className="relatorioGeral">
            <div className="header">Relatório Geral</div>
            <div className="content">
              <div className="dado">
                <div className="number">3</div>
                <div className="text">Novos Clientes Cadastrados</div>
              </div>
              <div className="dado">
                <div className="number">5</div>
                <div className="text">Novos Projetos Solicitados</div>
              </div>
              <div className="dado">
                <div className="number">7</div>
                <div className="text">Projetos Concluídos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
