import { FeatureType, LOAD_DATA, LOAD_FAILURE, LOAD_SUCCESS } from 'common/redux/types'
import { ContentfulApiResponse } from 'features/types'

export type FetchDataAction = {
  type: typeof LOAD_DATA
  payload: {
    query: string
    feature: FeatureType
  }
}

export type FetchSuccessAction = {
  type: typeof LOAD_SUCCESS
  payload: {
    feature: FeatureType
    data: ContentfulApiResponse
  }
}

export type FetchFailureAction = {
  type: typeof LOAD_FAILURE
  payload: {
    error: { message: string }
  }
}

export type FetchActions = FetchDataAction | FetchSuccessAction | FetchFailureAction

export function loadData(query: string, feature: FeatureType): FetchActions {
  return {
    type: LOAD_DATA,
    payload: {
      query,
      feature,
    },
  }
}

export function loadSuccess(feature: FeatureType, data: any): FetchActions {
  return {
    type: LOAD_SUCCESS,
    payload: {
      feature,
      data,
    },
  }
}

export function loadFailure(error: { message: string }): FetchFailureAction {
  return {
    type: LOAD_FAILURE,
    payload: {
      error,
    },
  }
}
