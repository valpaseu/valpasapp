export const EXAMPLE_REQUEST = 'EXAMPLE_REQUEST'
export const EXAMPLE_SUCCESS = 'EXAMPLE_SUCCESS'

export type ExampleState = {
  id: string
  desc: string
}

export type ExampleRequest = {
  type: typeof EXAMPLE_REQUEST
  payload: {
    id: string
  }
}

export type ExampleSuccess = {
  type: typeof EXAMPLE_SUCCESS
  payload: {
    id: string
  }
}

export type ExampleActions = ExampleRequest | ExampleSuccess
