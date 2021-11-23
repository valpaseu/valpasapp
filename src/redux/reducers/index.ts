import { combineReducers } from 'redux'

import work from 'features/work/redux/reducers'
import { features, errorLogs, feature } from 'common/redux/reducers'
import authentication from 'features/authentication/redux/reducers'

const createRootReducer = () =>
  combineReducers({
    work,
    authentication,
    features,
    feature,
    errorLogs,
  })

export default createRootReducer
