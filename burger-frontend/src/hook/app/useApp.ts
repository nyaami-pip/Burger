import * as ActionCreators from '../../store/app.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useTypesSelector } from '../useTypesSelector'
import { useCallback } from 'react'
import { browserStorage } from '../../utils'
import { useUser } from '../user'
import { useRestaurant } from '../restaurant/useRestaurant'

export const useApp = () => {
  const { auth } = useUser()
  const { select } = useRestaurant()

  const dispatch = useDispatch()

  const { appLoad } = bindActionCreators(ActionCreators, dispatch)

  const { isLoad, isAside } = useTypesSelector((state) => state.app)

  const load = useCallback(() => {
    const restaurant = browserStorage.getItem('restaurant')
    select(restaurant)
    auth()
    appLoad()
  }, [])

  return { load, isLoad, isAside }
}
