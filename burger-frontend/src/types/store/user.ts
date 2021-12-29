export interface UserState {
  isAuth: boolean
  user: User
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  id: number
  login: string
  password?: string
  role: Role
}
