import { useState } from 'react';
import './styles.sass'

import { LoginInput } from '../../components/inputs/loginInput'

export const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  return (
    <div className="container">
      <h1 className="logo">TANOS</h1>
      <p className="slogan">
        O <span>poder</span> de <span>controlar seu negócio</span>,
        <br/> 
        na palma da sua mão.
        </p>
      <form className="form">
        <LoginInput type="email" placeholder="Email"/>
        {emailError && <p className="error">Por favor, digite um email válido.</p>}

        <LoginInput type="password" placeholder="Senha"/>
        {passwordError && <p className="error">Sua senha deve conter pelo menos 6 dígitos, uma letra e um número.</p>}

        <div className="container-login-form-btn">
          <button 
          className="login-form-btn"
          type="button"
          disabled={email === "" || password === ""}
          //onClick={handleLogin}
          >
            Logar
          </button>
        </div>

        <p className="loginWithText">ou faça login com:</p>
        <div className="loginWith">
          <button className="loginWithGoogle">G</button>
          <button className="loginWithFacebook">f</button>
        </div>
      </form>
    </div>
  )
}