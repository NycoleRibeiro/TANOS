import { Route, Routes } from 'react-router-dom'

import { Clientes } from './pages/Clientes'
import { Gastos } from './pages/Gastos'
import { LoadingPage } from './pages/LoadingPage'
import { Login } from './pages/Login'
import { Projetos } from './pages/Projetos'
import { Projeto } from './pages/Projeto'
import { Relatorios } from './pages/Relatorios'
import { Servicos } from './pages/Servicos'

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Relatorios />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/projetos" element={<Projetos />} />
      <Route path="/projeto/:projectId" element={<Projeto />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/servicos" element={<Servicos />} />
      <Route path="/gastos" element={<Gastos />} />
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  )
}
