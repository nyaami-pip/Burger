import * as ActionCreators from '../../store/restaurant.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useTypesSelector } from '../useTypesSelector'
import { useCallback } from 'react'
import { apolloClient } from '../../graphql'
import { RESTAURANTS } from '../../graphql/queries'

// Utils
import { Restaurant } from '../../types'
import { browserStorage } from '../../utils'

////////////////////////////////////////////////////////////////////////////////
export const useRestaurant = () => {
  const dispatch = useDispatch()

  const { selectRestaurant, requestRestaurants, receiveRestaurants, errorsRestaurants } = bindActionCreators(
    ActionCreators,
    dispatch
  )
  const { restaurant, selectedRestaurant } = useTypesSelector((state) => state.restaurant)

  const loadRestaurants = useCallback(async () => {
    requestRestaurants()

    apolloClient
      .query({
        query: RESTAURANTS,
      })
      .then(({ data }) => {
        receiveRestaurants(data.restaurants)
      })
      .catch((error) => {
        errorsRestaurants(error)
      })
  }, [])

  const select = useCallback((val: Restaurant) => {
    browserStorage.setItem('restaurant', val)
    selectRestaurant(val)
  }, [])

  return { restaurant, selectedRestaurant, loadRestaurants, select }
}
