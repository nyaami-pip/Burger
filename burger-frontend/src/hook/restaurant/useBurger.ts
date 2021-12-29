import * as ActionCreators from '../../store/restaurant.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useTypesSelector } from '../useTypesSelector'
import { useCallback } from 'react'
import { apolloClient } from '../../graphql'

// GraphQL
import { BURGERS } from '../../graphql/queries/burger'
import { CREATE_BURGER, REMOVE_BURGER, UPDATE_BURGER } from '../../graphql/mutation'

// Utils
import { Burger } from '../../types'
import { getJwtToken } from '../../utils'

// Interface
interface CreateBurger {
  name: string
  price: number
  desc: string
  img: string
  status: number
  restaurantId: number
}

interface UpdateBurger {
  id: number
  name: string
  price: number
  desc: string
  img: string
  status: number
  restaurantId: number
}

////////////////////////////////////////////////////////////////////////////////
export const useBurger = () => {
  const dispatch = useDispatch()

  const { requestBurgers, receiveBurgers, errorsBurgers, updateBurger } = bindActionCreators(ActionCreators, dispatch)
  const { burger } = useTypesSelector((state) => state.restaurant)

  const loadBurgers = useCallback(async (url: string) => {
    requestBurgers()

    apolloClient
      .query({
        query: BURGERS,
        variables: { url },
      })
      .then(({ data }) => {
        receiveBurgers(data.burgers)
      })
      .catch((error) => {
        errorsBurgers(error)
      })
  }, [])

  const update = useCallback(async (variables: UpdateBurger) => {
    apolloClient
      .mutate({
        mutation: UPDATE_BURGER,
        variables: {
          id: variables.id,
          name: variables.name,
          price: variables.price,
          desc: variables.desc,
          img: variables.img,
          status: variables.status,
          restaurantId: variables.restaurantId,
        },
        context: {
          headers: {
            authorization: getJwtToken(),
          },
        },
      })
      .then(({ data }) => {
        const burgers: Burger[] = JSON.parse(JSON.stringify(burger.burgers)).map((val: Burger) => {
          return val.id === data.updateBurger.id ? (val = data.updateBurger) : val
        })

        updateBurger(burgers)
      })
      .catch((error) => {
        errorsBurgers(error)
      })
  }, [])

  const remove = useCallback(async (id: number, burgers: Burger[]) => {
    updateBurger(
      JSON.parse(JSON.stringify(burgers)).filter((val: Burger) => {
        return val.id != id ? true : false
      })
    )

    apolloClient
      .mutate({
        mutation: REMOVE_BURGER,
        variables: { id: id },
        context: {
          headers: {
            authorization: getJwtToken(),
          },
        },
      })
      .then(({ data }) => {
        // updateBurger(data.removeBurger)
      })
      .catch((error) => {
        errorsBurgers(error)
      })
  }, [])

  const create = useCallback(async (variables: CreateBurger) => {
    apolloClient
      .mutate({
        mutation: CREATE_BURGER,
        variables: {
          name: variables.name,
          price: variables.price,
          desc: variables.desc,
          img: variables.img,
          status: variables.status,
          restaurantId: variables.restaurantId,
        },
        context: {
          headers: {
            authorization: getJwtToken(),
          },
        },
      })
      .then(({ data }) => {
        const burgers: Burger[] = JSON.parse(JSON.stringify(burger.burgers))
        burgers.push(data.createBurger)
        updateBurger(burgers)
      })
      .catch((error) => {
        errorsBurgers(error)
      })
  }, [])

  return { burger, loadBurgers, update, create, remove }
}
