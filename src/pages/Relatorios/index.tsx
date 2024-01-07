import React, { useEffect, useState } from 'react'
import './style.sass'

import { Header } from '../../components/header'
import { SingleSelect } from '../../components/inputs/SingleSelect'
import { Sidebar } from '../../components/sidebar'

import { getExpensesByUserId } from '../../database/Expenses'
import { getHistory } from '../../database/History'
import { getProjects } from '../../database/Projects'
import { HistoryEntry } from '../../database/Types'
import { getUserData } from '../../loggedUser'

export const Relatorios = () => {
  const user = getUserData()
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [lucroProjetos, setLucroProjetos] = useState(0)
  const [gastosDoMes, setGastosDoMes] = useState(0)
  const [valorRestante, setValorRestante] = useState(0)

  useEffect(() => {
    if (user) {
      const userHistory = getHistory(user.userId)
      const sortedHistory = userHistory.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      })
      const filteredHistory = sortedHistory.filter((entry) => {
        const entryDate = new Date(entry.timestamp)
        return (
          entryDate.getMonth() + 1 === selectedMonth &&
          entryDate.getFullYear() === selectedYear
        )
      })
      setHistory(filteredHistory)
      // Calcule o lucro dos projetos concluídos
      calcularLucroProjetos()
      // Calcule os gastos do mês
      calcularGastosDoMes()
      // Calcula o valor restante
      const restante = lucroProjetos - gastosDoMes
      setValorRestante(restante)
    }
  }, [user, selectedMonth, selectedYear, lucroProjetos, gastosDoMes])

  const getMonthName = (monthNumber) => {
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
    return monthNames[monthNumber - 1]
  }

  const selectedMonthName = getMonthName(selectedMonth)

  const calcularLucroProjetos = () => {
    const projetos = getProjects(user.userId)
    let lucroTotal = 0
    projetos.forEach((projeto) => {
      if (projeto.status === 'Concluído') {
        // Converter a string de data 'DD/MM/AAAA' para um objeto Date
        const [dia, mes, ano] = projeto.dataEntrega.split('/').map(Number)
        const dataEntrega = new Date(ano, mes - 1, dia)

        // Verificar se a data de entrega corresponde ao mês e ano selecionados
        if (
          dataEntrega.getFullYear() === selectedYear &&
          dataEntrega.getMonth() + 1 === selectedMonth
        ) {
          const lucroProjeto = calcularLucroPorProjeto(projeto)
          lucroTotal += lucroProjeto
        }
      }
    })
    setLucroProjetos(lucroTotal)
  }

  const calcularLucroPorProjeto = (projeto) => {
    const totalServicos = projeto.servicos.reduce(
      (acc, servico) => acc + servico.valor,
      0,
    )
    const totalGastosProjeto = projeto.gastos
      .filter((gasto) => gasto.tipo === 'Projeto')
      .reduce((acc, gasto) => acc + gasto.valor, 0)
    return totalServicos - totalGastosProjeto
  }

  const handleMonthSelect = (month: string) => {
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

  const handleYearSelect = (year: string) => {
    setSelectedYear(parseInt(year, 10))
  }

  const calcularGastosDoMes = () => {
    const gastos = getExpensesByUserId(user.userId)

    const totalGastosMes = gastos
      .filter((gasto) => {
        return (
          gasto.pagamentoMes === selectedMonth &&
          gasto.pagamentoAno === selectedYear
        )
      })
      .reduce((acc, gastoAtual) => acc + gastoAtual.valor, 0)

    setGastosDoMes(totalGastosMes)
  }

  return (
    <div className="relatorios-container">
      <Sidebar activePage="Home" />
      <div className="content">
        <Header path={[{ label: 'Dashboard', path: '/home' }]} />
        <div className="subheader">
          <div className="title">
            Relatórios de {selectedMonthName} / {selectedYear}
          </div>
          <div className="dataSelection">
            <SingleSelect
              onSelect={handleMonthSelect}
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
              initialValue={selectedMonthName}
            />
            <SingleSelect
              onSelect={handleYearSelect}
              placeholder="Ano"
              label="Ano"
              options={['2023', '2024']}
              initialValue={selectedYear.toString()}
            />
          </div>
        </div>
        <div className="body">
          <div className="valores">
            <div className="card">
              <div className="text">Lucro dos Projetos</div>
              <div className={`valor ${lucroProjetos < 0 ? 'red' : ''}`}>
                {lucroProjetos < 0
                  ? `- R$${Math.abs(lucroProjetos).toFixed(2)}`
                  : `R$${lucroProjetos.toFixed(2)}`}
              </div>
            </div>
            <div className="card">
              <div className="text">Gastos do mês</div>
              <div className="valor">R${gastosDoMes.toFixed(2)}</div>
            </div>
            <div className="card">
              <div className="text">Restante</div>
              <div className={`valor ${valorRestante < 0 ? 'red' : ''}`}>
                {valorRestante < 0
                  ? `- R$${Math.abs(valorRestante).toFixed(2)}`
                  : `R$${valorRestante.toFixed(2)}`}
              </div>
            </div>
          </div>
          <div className="relatorioGeral">
            <div className="header">Atividades do mês</div>
            <div className="content">
              {history.map((entry, index) => (
                <div className="dado" key={index}>
                  <div className="text">{entry.message}</div>
                  <div className="timestamp">
                    {new Date(entry.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
