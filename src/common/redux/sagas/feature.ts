import { takeEvery, call, put } from 'redux-saga/effects'
import * as Sentry from 'sentry-expo'

import { LOAD_ONE } from 'common/redux/types'
import { FetchLoadOne, loadOneSuccess, loadFailure } from 'common/redux/actions/feature'
import Services from 'common/redux/services/features'

export function* loadOne() {
  yield takeEvery(LOAD_ONE, function* ({ payload: { query, id } }: FetchLoadOne) {
    try {
      const response = yield call(Services.loadData, query)
      if (response) {
        yield put(loadOneSuccess(id, response))
      }
    } catch (error) {
      yield put(loadFailure(error.errors[0].message))
      Sentry.Native.captureException(error)
    }
  })
}
