import './AdminPanel.scss'
import { FC, useEffect } from 'react'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import BurgerEdit from './BurgerEdit/BurgerEdit'
import BurgerAdd from './BurgerAdd/BurgerAdd'
import { useBurger } from '../../hook/restaurant'
import { useRestaurant } from '../../hook/restaurant/useRestaurant'
import { useNavigate } from 'react-router-dom'

// Custom Hooks

// Utils

// Interface
interface Props {}

// Component
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const AdminPanel: FC<Props> = () => {
  const { burger, loadBurgers } = useBurger()
  const { selectedRestaurant } = useRestaurant()

  const navigate = useNavigate()

  useEffect(() => {
    if (!selectedRestaurant) navigate('/')
    else if (!burger.isLoad) loadBurgers(selectedRestaurant.url)
  }, [])

  return (
    <section className="admin-panel">
      <header className="admin-panel-header">
        <h1>Панель администратора</h1>
      </header>
      {burger.isLoad && selectedRestaurant ? (
        <div className="admin-panel-content">
          {burger.burgers.map((val) => {
            return <BurgerEdit key={val.id} burger={val} />
          })}
          <BurgerAdd restaurantId={selectedRestaurant?.id} />
        </div>
      ) : (
        <div className="admin-panel-content">
          <div>Loading...</div>
        </div>
      )}
    </section>
  )
}

export default AdminPanel
