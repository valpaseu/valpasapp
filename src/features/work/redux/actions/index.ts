import { EXAMPLE_REQUEST, ExampleActions } from 'features/work/redux/types'

export function exampleRequest(id: string): ExampleActions {
  return {
    type: EXAMPLE_REQUEST,
    payload: {
      id,
    },
  }
}
