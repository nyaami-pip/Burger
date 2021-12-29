import './OrderList.scss'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Custom Hoimport { useCart } from '../../hook/cart'
import { useRestaurant } from '../../hook/restaurant'
import { useUser } from '../../hook/user/useUser'
import { useCart } from '../../hook/cart'

// Utils
import cn from 'classnames'
import dayjs from 'dayjs'

// Interface
interface Props {}

// Component
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const OrderList: FC<Props> = () => {
  const { selectedRestaurant } = useRestaurant()
  const { orders, loadOrders } = useCart()

  const navigate = useNavigate()

  useEffect(() => {
    if (!selectedRestaurant) navigate('/')
    else loadOrders(selectedRestaurant.url)
  }, [])

  return (
    <section className="order">
      <header className="admin-panel-header">
        <h1>Последние заказы</h1>
      </header>
      <div className="order-content">
        {orders.length > 0 && selectedRestaurant ? (
          orders.map((val) => {
            return (
              <div key={val.id}>
                <div>{dayjs(val.dateAdd).format('dddd, MMMM D, YYYY h:mm A')}</div>
              </div>
            )
          })
        ) : (
          <div className="admin-panel-content">
            <div>Loading...</div>
          </div>
        )}
      </div>
    </section>
  )
}

export default OrderList
