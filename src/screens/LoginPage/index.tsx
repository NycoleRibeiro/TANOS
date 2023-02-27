import { useState } from 'react';
import './styles.sass'

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
        <div className="wrap-input">
          <input 
          className={email !== "" ? "input has-val" : "input"}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          //onBlur={validateEmail}
          />
          <span className="focus-input" data-placeholder="Email" />
        </div>
        {emailError && <p className="error">Por favor, digite um email válido.</p>}

        <div className="wrap-input">
          <input 
          className={password !== "" ? "input has-val" : "input"}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          //onBlur={validatePassword}
          />
          <span className="focus-input" data-placeholder="Senha" />
        </div>
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