import { gql } from '@apollo/client'

export const RESTAURANTS = gql`
  query {
    restaurants {
      id
      url
      title
    }
  }
`
