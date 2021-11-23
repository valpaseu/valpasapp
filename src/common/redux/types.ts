import { ContentfulApiResponse } from 'features/types'
import { ExampleState } from 'features/work/redux/types'
import { AuthenticationState } from 'features/authentication/redux/types'

export const LOAD_DATA = 'LOAD_DATA'
export const LOAD_SUCCESS = 'LOAD_SUCCESS'
export const LOAD_FAILURE = 'LOAD_FAILURE'
export const LOAD_ONE = 'LOAD_ONE'
export const LOAD_ONE_SUCCESS = 'LOAD_ONE_SUCCESS'

export type AppState = {
  features: FeaturesState
  work: ExampleState
  authentication: AuthenticationState
  errorLogs: ErrorLogState
  feature: FeatureState
}

type PickResource<T> = {
  [K in keyof T]: T[K] extends boolean | undefined | Error ? never : K
}[keyof T]

export type FeatureType = NonNullable<PickResource<FeaturesState>>

export type FeatureState = {
  [id: string]: object
}

export type FeaturesState = {
  positions?: {
    all: ContentfulApiResponse
  }
  onboardingContent?: {
    all: ContentfulApiResponse
  }
  welcomeContent?: {
    all: ContentfulApiResponse
  }
}

export type ErrorLogState = { errorMessage?: { message: string } }
