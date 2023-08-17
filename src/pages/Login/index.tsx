import './style.sass';
import { LineInput } from '../../components/inputs/lineInput';
import { FilledButton } from '../../components/buttons/filledButton';

export const Login = () => {
  return (
    <div className="container">
      <form className="form" onSubmit={() => {}}>
        <h1 className="logo">TANOS</h1>
        <LineInput type="email" placeholder="Email" onChange={() => {}} />
        <LineInput type="password" placeholder="Senha" onChange={() => {}} />
        <div className="button">
          <FilledButton text="ENTRAR" />
        </div>
      </form>
    </div>
  )
}