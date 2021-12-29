import './AssortmentAside.scss'
import { FC, Fragment, useState } from 'react'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { ReactComponent as CartIcon } from '../../../assets/icon/cart.svg'
import OrderDialog from '../../OrderDialog/OrderDialog'

// Custom Hooks
import { useAside } from '../../../hook/app'
import { useCart } from '../../../hook/cart'
import { useUser } from '../../../hook/user'

// Utils
import cn from 'classnames'
import { Cart } from '../../../types'
import { Link } from 'react-router-dom'

// Interface
interface Props {}

// Component
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const AssortmentAside: FC<Props> = () => {
  const { item, add, remove, submit, calculatePrice, calculateTotalPrice } = useCart()
  const { closeAside, openAside, isAside } = useAside()
  const { isAuth } = useUser()

  const [isOrder, setIsOrder] = useState(false)

  const handleClickClose = (e: any) => closeAside()
  const handleClickOpen = (e: any) => openAside()
  const handleClickAdd = (cart: Cart) => (e: any) => add(cart.burger)
  const handleClickRemove = (cart: Cart) => (e: any) => remove(cart.burger)
  const handleClickOrder = (e: any) => setIsOrder(true)

  return (
    <Fragment>
      <div className={cn('assortment-aside', { active: isAside })}>
        <div className="assortment-aside-content">
          <header className="assortment-aside-header">
            <h1>Ваш заказ</h1>
          </header>

          {item.map((val, key) => {
            return (
              <div key={key + '-' + val.count} className="assortment-aside-item">
                <p>
                  <span>{val.count}</span> <span>{val.burger.name}</span> <span>{calculatePrice(val)}</span>
                </p>
                <div>
                  <button onClick={handleClickRemove(val)}>-</button>
                  <button onClick={handleClickAdd(val)}>+</button>
                </div>
              </div>
            )
          })}

          <div className="assortment-aside-total">
            <div>Итого: {calculateTotalPrice()} ₽</div>
          </div>

          <div className="assortment-aside-optional optional">
            <svg
              onClick={handleClickClose}
              className="optional__close"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            {!isAuth ? (
              <Link to={'/signin'} className="optional__notauth">
                Авторизируйтесь
              </Link>
            ) : (
              <button onClick={handleClickOrder} className="optional__submit">
                Заказать
              </button>
            )}
          </div>
        </div>
      </div>
      <div onClick={handleClickOpen} className={cn('assortment-aside-tip', { active: !isAside })}>
        <div className="assortment-aside-tip__inner">
          <CartIcon />
          <span className={cn('assortment-aside-tip__total', { active: item.length > 0 })}>{item.length}</span>
        </div>
      </div>
      <OrderDialog isOrder={isOrder} setIsOrder={setIsOrder} />
    </Fragment>
  )
}

export default AssortmentAside
