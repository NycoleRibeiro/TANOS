import { Route, Routes } from 'react-router-dom'

import { Clientes } from './pages/Clientes'
import { Gastos } from './pages/Gastos'
import { Home } from './pages/Home'
import { LoadingPage } from './pages/LoadingPage'
import { Login } from './pages/Login'
import { Projetos } from './pages/Projetos'
import { Relatorios } from './pages/Relatorios'
import { Servicos } from './pages/Servicos'

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/projetos" element={<Projetos />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/servicos" element={<Servicos />} />
      <Route path="/gastos" element={<Gastos />} />
      <Route path="/relatorios" element={<Relatorios />} />
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  )
}
