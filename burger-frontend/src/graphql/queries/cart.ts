import { gql } from '@apollo/client'

export const ORDERS = gql`
  query ($url: String!) {
    orders(url: $url) {
      id
      userId
      restaurantId
      dateAdd
    }
  }
`
