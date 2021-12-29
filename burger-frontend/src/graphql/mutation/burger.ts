import { gql } from '@apollo/client'

export const UPDATE_BURGER = gql`
  mutation (
    $id: Int!
    $name: String!
    $price: Int!
    $desc: String!
    $img: String!
    $status: Int!
    $restaurantId: Int!
  ) {
    updateBurger(
      updateBurgerInput: {
        id: $id
        name: $name
        price: $price
        desc: $desc
        img: $img
        status: $status
        restaurantId: $restaurantId
      }
    ) {
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

export const CREATE_BURGER = gql`
  mutation ($name: String!, $price: Int!, $desc: String!, $img: String!, $status: Int!, $restaurantId: Int!) {
    createBurger(
      createBurgerInput: {
        name: $name
        price: $price
        desc: $desc
        img: $img
        status: $status
        restaurantId: $restaurantId
      }
    ) {
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

export const REMOVE_BURGER = gql`
  mutation ($id: Int!) {
    removeBurger(id: $id) {
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
