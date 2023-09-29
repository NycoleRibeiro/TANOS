import { Routes, Route } from "react-router-dom";
import { useAuth } from './AuthContext';

import { LoadingPage } from "./pages/LoadingPage"
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Projetos } from './pages/Projetos'
import { Clientes } from './pages/Clientes'
import { Servicos } from './pages/Servicos'
import { Gastos } from './pages/Gastos'
import { Relatorios } from './pages/Relatorios'

export function MainRoutes() {
  const auth = useAuth();

  if (!auth) {
    // O contexto de autenticação ainda não foi carregado (pode ser útil para exibir um loader, se necessário)
    return <LoadingPage />;
  }

  if (!auth.loggedUser) {
    // Se o usuário não estiver logado, redirecione para a página de login
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    )
  }

  // Se o usuário estiver logado, exiba as rotas autenticadas
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projetos" element={<Projetos />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/servicos" element={<Servicos />} />
      <Route path="/gastos" element={<Gastos />} />
      <Route path="/relatorios" element={<Relatorios />} />
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  );
}
