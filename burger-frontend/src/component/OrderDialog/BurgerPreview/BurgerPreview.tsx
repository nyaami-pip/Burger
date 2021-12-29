import '../../Assortment/AssortmentBurger/AssortmentBurger.scss'
import { FC, Fragment } from 'react'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Custom Hooks
import { useCart } from '../../../hook/cart/useCart'

// Utils
import { Cart } from '../../../types'

// Interface
interface Props {
  cart: Cart
}

// Component
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const BurgerPreview: FC<Props> = (props) => {
  const { calculatePrice } = useCart()

  return (
    <Fragment>
      <li className="menu-burger">
        <div className="image-container">
          <img src={props.cart.burger.img} alt={'burger'} />
        </div>
        <div className="burger-details">
          <h3 className="burger-name">
            {props.cart.burger.name}
            <span className="price">x {props.cart.count} </span>
            <span className="price">{calculatePrice(props.cart)}₽</span>
          </h3>
          <p>{props.cart.burger.desc}</p>
        </div>
      </li>
      <hr className="menu-burger-hr" />
    </Fragment>
  )
}

export default BurgerPreview
