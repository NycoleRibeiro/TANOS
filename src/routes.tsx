import { useState } from 'react'
import { auth } from '../firebaseConfig'
import { Routes, Route } from "react-router-dom";

import { LoadingPage } from "./pages/LoadingPage"
import { Login } from './pages/Login'
import { Home } from './pages/Home'

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
            <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
    )
}