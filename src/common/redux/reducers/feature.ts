import { FetchActions, FetchSuccessLoadOne } from 'common/redux/actions/feature'
import { FeatureState, LOAD_ONE_SUCCESS } from 'common/redux/types'

export function feature(state: FeatureState = {}, action: FetchActions): FeatureState {
  switch (action.type) {
    case LOAD_ONE_SUCCESS: {
      if (!(action as FetchSuccessLoadOne).payload) return { ...state }
      const { id, data } = (action as FetchSuccessLoadOne).payload

      return {
        ...state,
        [id]: data as any,
      }
    }
    default:
      return state
  }
}
