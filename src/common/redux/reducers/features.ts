import { FetchActions } from 'common/redux/actions/features'
import { FeaturesState, LOAD_SUCCESS } from 'common/redux/types'

export function features(state: FeaturesState = {}, action: FetchActions): FeaturesState {
  switch (action.type) {
    case LOAD_SUCCESS: {
      const { feature, data } = action.payload
      return {
        ...state,
        [feature]: {
          all: data,
        },
      }
    }

    default:
      return { ...state }
  }
}
