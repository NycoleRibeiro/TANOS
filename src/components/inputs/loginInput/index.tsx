import './styles.sass'

type Props = {
    type: string,
    placeholder: string
}

export const LoginInput = ({ type, placeholder }: Props) => {
  return (
    <div className="group">
        <input required={true} className="main-input" type={type} />
        <label className="label-email">{placeholder}</label>
    </div>
  )
}
