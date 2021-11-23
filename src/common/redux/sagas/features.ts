import { takeEvery, call, put } from 'redux-saga/effects'
import * as Sentry from 'sentry-expo'

import { LOAD_DATA } from 'common/redux/types'
import { FetchDataAction, loadFailure, loadSuccess } from 'common/redux/actions/features'
import Services from 'common/redux/services/features'

export function* loadData() {
  yield takeEvery(LOAD_DATA, function* ({ payload: { query, feature } }: FetchDataAction) {
    try {
      const response = yield call(Services.loadData, query)
      if (!response.data) throw response
      yield put(loadSuccess(feature, response.data))
    } catch (error) {
      yield put(loadFailure(error.errors[0].message))
      Sentry.Native.captureException(error)
    }
  })
}
