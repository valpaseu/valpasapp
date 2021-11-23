import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _isEmpty from 'lodash/isEmpty'

import { AppState } from 'common/redux/types'
import { loadOne } from 'common/redux/actions/feature'

type ReturnType = {
  data: any
  loading: boolean
}

export default function useResource(query: string, id: string): ReturnType {
  const dispatch = useDispatch()
  const data = useSelector((state: AppState) => state.feature[id] ?? null)

  useEffect(() => {
    if (_isEmpty(data)) {
      dispatch(loadOne(query, id))
    }
  }, [dispatch, query, id])

  return { data, loading: !data }
}
