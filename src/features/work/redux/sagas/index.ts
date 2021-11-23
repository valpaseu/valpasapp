import { takeEvery, call, put } from 'redux-saga/effects'
import * as Sentry from 'sentry-expo'

import ExampleServices from 'features/work/redux/services/example'
import { EXAMPLE_REQUEST, EXAMPLE_SUCCESS, ExampleRequest } from 'features/work/redux/types'

export function* exampleSaga() {
  yield takeEvery(EXAMPLE_REQUEST, function* ({ payload: { id } }: ExampleRequest) {
    try {
      const response = yield call(ExampleServices.exampleRequest, id)
      if (response) {
        yield put({
          type: EXAMPLE_SUCCESS,
          payload: response,
        })
      }
    } catch (error) {
      Sentry.Native.captureException(error)
    }
  })
}
