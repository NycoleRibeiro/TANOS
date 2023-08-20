import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebaseConfig'
import { useNavigate } from "react-router-dom";

import './style.sass';

import { LineInput } from '../../components/inputs/lineInput';
import { FilledButton } from '../../components/buttons/filledButton';

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate()

  const handleEmail = (email: string) => {
    setEmail(email);
  }

  const handlePassword = (password: string) => {
    setPassword(password);
  }

  const handleLogin = (e) => {
    e.preventDefault();

    let emailValid = false;
    let passwordValid = false;
    // Validação de email
    if (email === '') {
      setEmailError("Por favor, digite um email válido.");
    } else {
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
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

    if (emailValid && passwordValid) {
      console.log(email);
      console.log(password);

      signInWithEmailAndPassword(auth, email, password)
        // Se o login for bem sucedido, redireciona para a página inicial
        .then((userCredential) => {
          console.log(userCredential)
          navigate('/', { replace: true });
        }) 
        // Se o login falhar, exibe o erro no console e exibe uma mensagem de erro para o usuário
        .catch((error) => {
          console.log(error.message)
          // Caso o email não esteja cadastrado
          if (error.message.includes("user-not-found")) {
            setEmailError("Este email não está cadastrado em nosso sistema.")
          } else {
            setEmailError("")
          }
          // Caso a senha esteja incorreta
          if (error.message.includes("wrong-password")){
            setPasswordError("Senha incorreta")
          } 
          // Em caso de muitas tentativas de login
          else if (error.message.includes("too-many-requests")) {
            setPasswordError("Limite de tentativas atingido. Crie uma nova senha ou tente novamente mais tarde.")
          } else {
            setPasswordError("")
          }
        })
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
          <FilledButton text="ENTRAR" />
        </div>
      </form>
    </div>
  )
}