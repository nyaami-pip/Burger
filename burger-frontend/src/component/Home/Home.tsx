import './Home.scss'
import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Custom Hooks
import { useRestaurant } from '../../hook/restaurant'
import { useBurger } from '../../hook/restaurant/useBurger'

// Utils

// Interface
interface Props {}

// Component
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Home: FC<Props> = () => {
  const { restaurant, loadRestaurants, select } = useRestaurant()
  const { loadBurgers } = useBurger()

  useEffect(() => {
    if (!restaurant.isLoad) {
      loadRestaurants()
    }
  }, [])

  return (
    <section className="home">
      <div className="home-content">
        {restaurant.isLoad ? (
          restaurant.restaurants.map((val) => {
            return (
              <Link onClick={() => select(val)} key={val.id} to={'restaurant/' + val.url} className="home-item">
                <svg className="home-icon" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M32.9,-40.6C46.6,-27.6,64.6,-21.1,70.5,-9.2C76.4,2.6,70.2,19.8,62,37.4C53.8,55.1,43.5,73.3,30.6,73.3C17.7,73.3,2.1,55.1,-15.6,46.9C-33.4,38.7,-53.4,40.5,-66.9,31.6C-80.4,22.7,-87.4,3,-82.8,-13.1C-78.2,-29.3,-61.9,-41.8,-46.2,-54.5C-30.5,-67.2,-15.2,-79.9,-2.8,-76.5C9.6,-73.1,19.1,-53.7,32.9,-40.6Z"
                    transform="translate(100 100)"
                  />
                </svg>
                <div className="home-title">{val.title}</div>
              </Link>
            )
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </section>
  )
}

export default Home
