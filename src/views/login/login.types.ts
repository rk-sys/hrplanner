export type TLoginForm = {
  login: string,
  password: string,
}

export type TResponseLogin = {
  admin: boolean
  login: string
  role: string
  status: number
  token: string
}
