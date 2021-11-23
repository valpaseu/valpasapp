import { LOAD_ONE, LOAD_ONE_SUCCESS, LOAD_FAILURE } from 'common/redux/types'
import { FetchFailureAction } from './features'

export type FetchLoadOne = {
  type: typeof LOAD_ONE
  payload: {
    query: string
    id: string
  }
}

export type FetchSuccessLoadOne = {
  type: typeof LOAD_ONE_SUCCESS
  payload: {
    id: string
    data: any
  }
}

export type FetchActions = FetchLoadOne | FetchSuccessLoadOne

export const loadOne = (query: string, id: string): FetchLoadOne => ({
  type: LOAD_ONE,
  payload: {
    query,
    id,
  },
})

export function loadOneSuccess(id: string, data: any): FetchSuccessLoadOne {
  return {
    type: LOAD_ONE_SUCCESS,
    payload: {
      id,
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
