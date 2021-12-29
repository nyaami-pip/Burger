import './SignIn.scss'
import '../Auth.scss'
import { FC, useState } from 'react'
import { useUser } from '../../../hook/user'
import { TextField } from '@mui/material'
import { Link } from 'react-router-dom'

interface Props {}

const SignIn: FC<Props> = () => {
  const { isAuth, user, signUp, signIn, auth, errors } = useUser()

  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleChangePhone = (event: any) => setPhone(event.target.value)
  const handleChangePassword = (event: any) => setPassword(event.target.value)

  const handleClickSubmit = async (e: any) => {
    e.preventDefault()
    setPassword('')
    await signIn({ login: phone, password: password })

    if (errors) console.log('signInErrors', errors)
  }

  return (
    <section className="signin">
      <h1 className="signin-header">Авторизация</h1>
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

        <div className="submit">
          <button className="first" onClick={handleClickSubmit}>
            Авторизироваться
          </button>
          <Link className="second" to="/signup">
            Нет аккаунта
          </Link>
        </div>
      </form>
    </section>
  )
}

export default SignIn
