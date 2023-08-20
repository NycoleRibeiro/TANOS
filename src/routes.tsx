import { useState } from 'react'
import { auth } from '../firebaseConfig'
import { Routes, Route } from "react-router-dom";

import { LoadingPage } from "./pages/LoadingPage"
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Projetos } from './pages/Projetos'
import { Clientes } from './pages/Clientes'
import { Servicos } from './pages/Servicos'
import { Gastos } from './pages/Gastos'
import { Relatorios } from './pages/Relatorios'

export function MainRoutes() {

    const [logged, setLogged] = useState(false)
    const [loading, setLoading] = useState(true)

    auth.onAuthStateChanged((user) => {
        if (user) {
          setLogged(true)
          setLoading(false)
        } else {
          setLogged(false)
          setLoading(false)
        }
    })

    return (
        <Routes>
            {loading && <Route path="/" element={<LoadingPage/>} />}
            {!logged && <Route path="/" element={<Login/>} />}
            {logged && <Route path="/*" element={<Home/>} />}
            {logged && <Route path="/projetos" element={<Projetos/>} />}
            {logged && <Route path="/clientes" element={<Clientes/>} />}
            {logged && <Route path="/servicos" element={<Servicos/>} />}
            {logged && <Route path="/gastos" element={<Gastos/>} />}
            {logged && <Route path="/relatorios" element={<Relatorios/>} />}
            <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
    )
}