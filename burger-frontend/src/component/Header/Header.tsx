import './Header.scss'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../hook/user/useUser'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Custom Hooks

// Utils
import cn from 'classnames'
import { Role } from '../../types'

// Interface
interface Props {}

// Component
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Header: FC<Props> = () => {
  const { user, isAuth } = useUser()

  return (
    <header className="header">
      <ul className="header-nav">
        <li className="header-item">
          <Link to="/">Рестораны</Link>
        </li>
        <li className="header-item">
          <Link to="/restaurant/hot-burger-tverskaya">Ассортимент</Link>
        </li>
        {user.role == Role.ADMIN && (
          <li className="header-item isAdmin">
            <Link to="/admin-panel">Админ панель</Link>
          </li>
        )}

        <li className={cn('header-item', { isAdmin: user.role == Role.ADMIN })}>
          <Link to="/orders">Список заказов</Link>
        </li>
        <li className="header-item ">{isAuth ? <Link to="/profile">Профиль</Link> : <Link to="/signin">Вход</Link>}</li>
      </ul>
    </header>
  )
}

export default Header
