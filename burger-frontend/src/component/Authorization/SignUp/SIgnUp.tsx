import './SignUp.scss'
import '../Auth.scss'
import { FC, useState } from 'react'
import { useUser } from '../../../hook/user'
import { TextField } from '@mui/material'
import { Link } from 'react-router-dom'

interface Props {}

const SignUp: FC<Props> = () => {
  const { isAuth, user, signUp, signIn, auth, errors } = useUser()

  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [rePassword, setRePassword] = useState<string>('')

  const handleChangePhone = (event: any) => setPhone(event.target.value)
  const handleChangePassword = (event: any) => setPassword(event.target.value)
  const handleChangeRePassword = (event: any) => setRePassword(event.target.value)

  const handleClickSubmit = async (e: any) => {
    e.preventDefault()
    await signUp({ login: phone, password: password, rePassword: rePassword })

    setPassword('')
    setRePassword('')

    if (errors) console.log('signUpErrors', errors)
  }

  return (
    <section className="signup">
      <h1 className="signup-header">Регистриция</h1>
      <form className="form-auth">
        <TextField
          onChange={handleChangePhone}
          id="outlined-phone-input"
          label="Номер телефона"
          type="phone"
          autoComplete="current-password"
        />
        <TextField
          onChange={handleChangePassword}
          id="outlined-password-input"
          label="Пароль"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          onChange={handleChangeRePassword}
          id="outlined-re-password-input"
          label="Повторите пароль"
          type="password"
        />
        <div className="submit">
          <button className="first" onClick={handleClickSubmit}>
            Зарегистрироваться
          </button>
          <Link className="second" to="signin">
            Есть аккаунта
          </Link>
        </div>
      </form>
    </section>
  )
}

export default SignUp
