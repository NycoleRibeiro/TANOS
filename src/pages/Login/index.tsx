import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../AuthContext';

import './style.sass';

import { LineInput } from '../../components/inputs/lineInput';
import { FilledButton } from '../../components/buttons/filledButton';

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const auth = useAuth();
  const navigate = useNavigate()

  interface User {
    userid: number;
    nome: string;
    email: string;
    senha: string;
  }

  async function getUserByEmail(email: string): Promise<User | null> {
    const encodedEmail = encodeURIComponent(email);
  
    try {
      const response = await fetch(`http://localhost:3001/login?email=${encodedEmail}`);
      const data = await response.json();
      if (data && data.length > 0) {
        return data[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar usuário por email:", error);
      return null; // Retorne null em caso de erro
    }
  }
  

  const handleEmail = (email: string) => {
    setEmail(email);
  }

  const handlePassword = (password: string) => {
    setPassword(password);
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Limpar os erros antes de fazer novas validações
    setEmailError('');
    setPasswordError('');
  
    let emailValid = false;
    let passwordValid = false;

    // Validação de email
    if (email === '') {
      setEmailError("Por favor, digite um email válido.");
    } else {
      const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      emailValid = regexEmail.test(email);
      setEmailError(!emailValid ? 'Por favor, digite um email válido.' : '');
    }
    // Validação de senha
    if (password === '') {
      setPasswordError("Sua senha deve conter pelo menos 6 dígitos, uma letra e um número.");
    } else {
      const regexPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;
      passwordValid = regexPassword.test(password);
      setPasswordError(!passwordValid ? "Sua senha deve conter pelo menos 6 dígitos, uma letra e um número." : "");
    }
  
    if (emailValid && passwordValid && auth) {
      try {
        const userData = await getUserByEmail(email);
        if (userData) {
          if (password === userData.senha) {
            auth.login(userData)
            navigate('/', { replace: true });
          } else {
            setPasswordError("Senha incorreta");
          }
        } else {
          setEmailError("Email não cadastrado no sistema");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário por email:", error);
      }
    }

  }
  



  return (
    <div className="login-container">
      <form className="form" onSubmit={handleLogin}>
        <h1 className="logo">TANOS</h1>

        <LineInput type="email" placeholder="Email" onChange={handleEmail} />
        {emailError != '' && <p className="error">{emailError}</p>}

        <LineInput type="password" placeholder="Senha" onChange={handlePassword} />
        {passwordError != '' && <p className="error">{passwordError}</p>}
        
        <div className="button">
          <FilledButton text="ENTRAR" size="100%"/>
        </div>
      </form>
    </div>
  )
}