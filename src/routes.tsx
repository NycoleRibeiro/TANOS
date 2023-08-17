import { Routes, Route } from "react-router-dom";
import { Login } from './pages/Login'
import { Home } from './pages/Home'

export function MainRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/home" element={<Home/>} />
        </Routes>
    )
}