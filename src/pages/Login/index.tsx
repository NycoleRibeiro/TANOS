import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { listaDeUsuarios } from '../../database/Users'
import { setUserData, getUserData } from '../../loggedUser'
import './style.sass'

import { FilledButton } from '../../components/buttons/filledButton'
import { LineInput } from '../../components/inputs/lineInput'

export const Login = () => {
  interface User {
    userId: number
    nome: string
    email: string
    senha: string
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const getUserByEmail = (email: string): User | null => {
    for (const usuario of listaDeUsuarios) {
      if (usuario.email === email) {
        return usuario // Retorna o usuário se encontrar o email correspondente
      }
    }
    return null // Retorna null se o email não for encontrado
  }

  const handleEmail = (email: string) => {
    setEmail(email)
  }

  const handlePassword = (password: string) => {
    setPassword(password)
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Limpar os erros antes de fazer novas validações
    setEmailError('')
    setPasswordError('')

    let emailValid = false
    let passwordValid = false

    // Validação de email
    if (email === '') {
      setEmailError('Por favor, digite um email válido.')
    } else {
      const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
      emailValid = regexEmail.test(email)
      setEmailError(!emailValid ? 'Por favor, digite um email válido.' : '')
    }
    // Validação de senha
    if (password === '') {
      setPasswordError(
        'Sua senha deve conter pelo menos 6 dígitos, uma letra e um número.',
      )
    } else {
      const regexPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/
      passwordValid = regexPassword.test(password)
      setPasswordError(
        !passwordValid
          ? 'Sua senha deve conter pelo menos 6 dígitos, uma letra e um número.'
          : '',
      )
    }

    if (emailValid && passwordValid) {
      const userData = getUserByEmail(email)
      if (userData) {
        if (password === userData.senha) {
          setUserData(userData)
          navigate('/home', { replace: true })
        } else {
          setPasswordError('Senha incorreta')
        }
      } else {
        setEmailError('Email não cadastrado no sistema')
      }
    }
  }

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleLogin}>
        <h1 className="logo">TANOS</h1>

        <LineInput type="email" placeholder="Email" onChange={handleEmail} />
        {emailError !== '' && <p className="error">{emailError}</p>}

        <LineInput
          type="password"
          placeholder="Senha"
          onChange={handlePassword}
        />
        {passwordError !== '' && <p className="error">{passwordError}</p>}

        <div className="button">
          <FilledButton text="ENTRAR" size="100%" />
        </div>
      </form>
    </div>
  )
}
