import { gql } from '@apollo/client'

export const BURGERS = gql`
  query ($url: String!) {
    burgers(url: $url) {
      id
      restaurantId
      img
      name
      desc
      price
      status
    }
  }
`
