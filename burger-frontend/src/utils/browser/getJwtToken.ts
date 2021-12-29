import { browserStorage } from '.'

const getJwtToken = (): string => {
  const token = browserStorage.getItem('jwt')
  return token ? `Bearer ${token}` : ''
}

export default getJwtToken
