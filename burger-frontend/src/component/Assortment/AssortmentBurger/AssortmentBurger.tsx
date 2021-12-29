import './AssortmentBurger.scss'
import { FC } from 'react'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Custom Hooks

// Utils
import { Burger } from '../../../types'
import { useCart } from '../../../hook/cart'

// Interface
interface Props {
  burger: Burger
}

// Component
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const AssortmentBurger: FC<Props> = (props) => {
  const { item, add, remove, submit } = useCart()

  const handleClickAdd = (e: any) => {
    add(props.burger)
  }

  return (
    <li className="menu-burger">
      <div className="image-container">
        <img src={props.burger.img} alt={'burger'} />
      </div>
      <div className="burger-details">
        <h3 className="burger-name">
          {props.burger.name}
          <span className="price">{props.burger.price}₽</span>
        </h3>
        <p>{props.burger.desc}</p>
        {props.burger.status ? (
          <button onClick={handleClickAdd} type="submit" className="buttonOrder" disabled={false}>
            Заказать
          </button>
        ) : (
          <button type="submit" className="buttonOrder disabled" disabled={false}>
            Временно нет
          </button>
        )}
      </div>
    </li>
  )
}

export default AssortmentBurger
