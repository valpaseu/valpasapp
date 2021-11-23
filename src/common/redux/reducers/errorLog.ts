import { FetchActions } from 'common/redux/actions'
import { ErrorLogState, LOAD_FAILURE } from 'common/redux/types'

export function errorLogs(state: ErrorLogState = {}, action: FetchActions): ErrorLogState {
  switch (action.type) {
    case LOAD_FAILURE: {
      const { error } = action.payload
      return {
        ...state,
        errorMessage: error,
      }
    }

    default:
      return { ...state }
  }
}
