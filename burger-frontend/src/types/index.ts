export * from './store'

export interface Errors {
  message: string
  name: string
  stack: string
  config: any[]
}

export interface SignUpQL {
  login: string
  password: string
  rePassword: string
}

export interface SignInQL {
  login: string
  password: string
}
