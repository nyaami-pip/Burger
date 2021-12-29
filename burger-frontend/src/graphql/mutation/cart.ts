import { gql } from '@apollo/client'

export const SUBMIT_CART = gql`
  mutation ($userId: Int!, $restaurantId: Int!) {
    createOrder(input: { userId: $userId, restaurantId: $restaurantId }) {
      id
      userId
      dateAdd
      restaurantId
    }
  }
`

export const SUBMIT_CART_BURGERS = gql`
  mutation ($orderId: Int!, $burgerId: Int!, $count: Int!) {
    createOrderDetail(input: { orderId: $orderId, burgerId: $burgerId, count: $count }) {
      id
      orderId
      burgerId
      count
    }
  }
`
