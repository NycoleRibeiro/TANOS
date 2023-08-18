import { auth } from '../../../firebaseConfig'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

import './style.sass'


export const Home = () => {
  const navigate = useNavigate()

  const handleSignOut = (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        console.log("Usuário deslogado!")
        navigate('/', { replace: true });
      }).catch((error) => {
        console.log(error)
      });
  }

  return (
    <div className="content">
      <h1>Dashboard <br/>em construção</h1>
      <button className="button" onClick={(event) => handleSignOut(event)}>Deslogar</button>
    </div>
  )
}