import { LOAD_AUTH, REMOVE_AUTH, AuthProps, AuthenticationActions } from 'features/authentication/redux/types'

export function removeAuth(): AuthenticationActions {
  return {
    type: REMOVE_AUTH,
  }
}

export function loadAuth({ accessToken, profile }: AuthProps): AuthenticationActions {
  return {
    type: LOAD_AUTH,
    payload: {
      accessToken,
      profile,
    },
  }
}
