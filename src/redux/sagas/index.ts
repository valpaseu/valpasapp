import { fork, all } from 'redux-saga/effects'

import { exampleSaga } from 'features/work/redux/sagas/index'
import { loadData, loadOne } from 'common/redux/sagas'

export default function* rootSaga() {
  yield all([fork(exampleSaga), fork(loadData), fork(loadOne)])
}
