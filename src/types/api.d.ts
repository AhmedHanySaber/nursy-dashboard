import { Admin } from "./models"

type LoginResponse = {
  token: string
  admin: Admin
}

type LoginProps = {
  data: LoginData
  rememberMe?: boolean
}
