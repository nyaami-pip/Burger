import './Profile.scss'
import { FC } from 'react'
import { useUser } from '../../hook/user/useUser'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Custom Hooks

// Utils
import cn from 'classnames'

// Interface
interface Props {}

// Component
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Profile: FC<Props> = () => {
  const { user, isAuth, logOut } = useUser()

  const handleClickExit = () => {
    logOut()
  }

  return (
    <section className="profile">
      <div className="profile-content">
        <h1 className="profile-phone">{user.login}</h1>
        <button onClick={handleClickExit} className="profile-exit">
          Выйти
        </button>
      </div>
    </section>
  )
}

export default Profile
