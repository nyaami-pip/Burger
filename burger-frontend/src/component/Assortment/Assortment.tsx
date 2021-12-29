import './Assortment.scss'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import AssortmentBurger from './AssortmentBurger/AssortmentBurger'
import AssortmentAside from './AssortmentAside/AssortmentAside'

// Custom Hooks
import { useAside } from '../../hook/app'
import { useBurger } from '../../hook/restaurant'

// Utils
import cn from 'classnames'

// Interface
interface Props {}

// Component
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Assortment: FC<Props> = (props) => {
  const { burger, loadBurgers } = useBurger()
  const { closeAside, openAside, isAside } = useAside()

  let { url } = useParams()

  useEffect(() => {
    if (!burger.isLoad && url) loadBurgers(url)
  }, [])

  return (
    <section className={cn('assortment', { active: isAside })}>
      <div className="assortment-content">
        <header className="top">
          <div className="wrap">
            <div className="header-content">
              <div className="header-rating">
                <div className="header-rating_tag">Рейтинг</div>
                <div className="header-rating_icon">★★★★★</div>
              </div>
              <div className="header-divider"></div>
              <h1 className="font-effect-fire-animation">Hot Burgers</h1>
              <h3>
                <span>
                  Быстрая доставка горячих
                  <span className="sub-header"> бургеров</span>
                </span>
              </h3>
            </div>
          </div>
        </header>

        <div className="assortment-burgers">
          {burger.isLoad ? (
            burger.burgers.map((val) => {
              return <AssortmentBurger burger={val} key={val.id} />
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      <AssortmentAside />
    </section>
  )
}

export default Assortment
