export const REMOVE_AUTH = 'REMOVE_AUTH'
export const LOAD_AUTH = 'LOAD_AUTH'

export type ProfileProps = {
  email: string
  email_verified?: string
  phone_number: string
  phone_number_verified?: string
}

export type AuthProps = {
  accessToken?: string
  profile?: ProfileProps
}

export type AuthenticationState = AuthProps

export type RemoveAuth = {
  type: typeof REMOVE_AUTH
}

export type LoadAuth = {
  type: typeof LOAD_AUTH
  payload: AuthProps
}

export type AuthenticationActions = LoadAuth | RemoveAuth
