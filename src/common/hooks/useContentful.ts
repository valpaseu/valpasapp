import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import _isEmpty from 'lodash/isEmpty'

import { FeatureType } from 'common/redux/types'
import { ContentfulApiResponse } from 'features/types'

type ReturnType = {
  data: ContentfulApiResponse | null
  loading?: boolean
}

export default function useContentful(query: string, feature: FeatureType): ReturnType {

  const data = null
  
  return { data }
}
