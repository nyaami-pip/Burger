import * as ActionCreators from '../../store/cart.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useTypesSelector } from '../useTypesSelector'
import { useCallback } from 'react'
import { browserStorage, getJwtToken } from '../../utils'

// GraphQL
import { SUBMIT_CART, SUBMIT_CART_BURGERS } from '../../graphql/mutation'
import { ORDERS } from '../../graphql/queries'

// Utils
import { Burger, Cart } from '../../types'
import { apolloClient } from '../../graphql'
import { useNavigate } from 'react-router-dom'

////////////////////////////////////////////////////////////////////////////////
export const useCart = () => {
  const dispatch = useDispatch()

  const { addBurger, removeBurger, submitCart, requestOrders, receiveOrders } = bindActionCreators(
    ActionCreators,
    dispatch
  )
  const { item, orders } = useTypesSelector((state) => state.cart)

  const navigate = useNavigate()

  const loadOrders = useCallback(async (url: string) => {
    // requestOrders()

    const { data } = await apolloClient.query({
      query: ORDERS,
      variables: { url },
    })

    receiveOrders(data.orders)
  }, [])

  const add = useCallback(
    (burger: Burger) => {
      let burgers = JSON.parse(JSON.stringify(item))

      const isExist = burgers.findIndex((x: Cart) => x.burger.id === burger.id)

      if (isExist !== -1) burgers[isExist].count += 1
      else burgers.push({ burger, count: 1 })

      addBurger(burgers)
    },
    [item]
  )

  const remove = useCallback(
    (burger: Burger) => {
      let burgers = JSON.parse(JSON.stringify(item))

      const isExist = burgers.findIndex((x: Cart) => x.burger.id === burger.id)

      if (isExist === -1) return
      else if (burgers[isExist].count === 1) burgers.splice(isExist, 1)
      else burgers[isExist].count -= 1

      removeBurger(burgers)
    },
    [item]
  )

  const calculatePrice = useCallback(
    (cart: Cart): number => {
      return cart.burger.price * cart.count
    },
    [item]
  )

  const calculateTotalPrice = useCallback((): number => {
    return item.reduce((prev, val) => {
      return (prev += calculatePrice(val))
    }, 0)
  }, [item])

  const submit = useCallback(
    async (item: Cart[], userId: number) => {
      try {
        const cart: Cart[] = JSON.parse(JSON.stringify(item))
        submitCart()
        navigate('/')

        const { data } = await apolloClient.mutate({
          mutation: SUBMIT_CART,
          variables: {
            userId: userId,
            restaurantId: cart[0].burger.restaurantId,
          },
          context: {
            headers: {
              authorization: getJwtToken(),
            },
          },
        })

        cart.forEach((val) => {
          apolloClient.mutate({
            mutation: SUBMIT_CART_BURGERS,
            variables: {
              orderId: data.createOrder.id,
              burgerId: val.burger.id,
              count: val.count,
            },
            context: {
              headers: {
                authorization: getJwtToken(),
              },
            },
          })
        })
      } catch (e: any) {
        console.log('submitCart', e)
      }
    },
    [item]
  )

  return { loadOrders, item, orders, add, remove, submit, calculatePrice, calculateTotalPrice }
}
