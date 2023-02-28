import { useState } from 'react';
import './styles.sass';

import { LoginInput } from '../../components/inputs/loginInput';
import { BlueGradientButton } from '../../components/buttons/blueGradientButton';
import { SocialLoginButtons } from '../../components/buttons/socialLoginButtons';

export const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmail = (email:string) => {
    setEmail(email);
  }

  const handlePassword = (password:string) => {
    setPassword(password);
  }

  const handleLogin = () => {
    let emailValid = false;
    let passwordValid = false;
    // Validação de email
    if (email === '') {
      setEmailError(true);
    } else {
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      emailValid = regexEmail.test(email);
      setEmailError(!emailValid ? true : false);
    }
    // Validação de senha
    if (password === '') {
      setPasswordError(true);
    } else {
      const regexPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;
      passwordValid = regexPassword.test(password);
      setPasswordError(!passwordValid? true : false);
    }

    if (emailValid && passwordValid) {
      console.log('Logado com sucesso!');
      console.log(email);
      console.log(password);
    }
  }

  return (
    <div className="container">
      <h1 className="logo">TANOS</h1>
      <p className="slogan">
        O <span>poder</span> de <span>controlar seu negócio</span>,
        <br/> na palma da sua mão.
      </p>
      <form className="form">
        <LoginInput type="email" placeholder="Email" onChange={handleEmail}/>
        {emailError && <p className="error">Por favor, digite um email válido.</p>}

        <LoginInput type="password" placeholder="Senha" onChange={handlePassword}/>
        {passwordError && <p className="error">Sua senha deve conter pelo menos 6 dígitos, uma letra e um número.</p>}

        <div className="container-login-form-btn">
          <BlueGradientButton name="Logar" onClick={handleLogin}/>
        </div>
        

        <p className="loginWithText">ou faça login com:</p>
        <SocialLoginButtons/>
      </form>
    </div>
  )
}