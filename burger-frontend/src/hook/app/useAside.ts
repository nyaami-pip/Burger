import * as ActionCreators from '../../store/app.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useTypesSelector } from '../useTypesSelector'

export const useAside = () => {
  const dispatch = useDispatch()

  const { closeAside, openAside } = bindActionCreators(ActionCreators, dispatch)
  const { isAside } = useTypesSelector((state) => state.app)

  return { closeAside, openAside, isAside }
}
