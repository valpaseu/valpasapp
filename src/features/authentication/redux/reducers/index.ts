import { AuthenticationActions, AuthenticationState, LOAD_AUTH, REMOVE_AUTH } from 'features/authentication/redux/types'

const defaultState: AuthenticationState = {}

export default function authentication(
  state: AuthenticationState = defaultState,
  action: AuthenticationActions
): AuthenticationState {
  switch (action.type) {
    case REMOVE_AUTH: {
      return state
    }
    case LOAD_AUTH: {
      return { ...state, ...action.payload }
    }

    default:
      return state
  }
}
