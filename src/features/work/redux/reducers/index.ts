import { EXAMPLE_SUCCESS, ExampleState, ExampleActions } from 'features/work/redux/types'

const defaulState: ExampleState = {
  id: '',
  desc: '',
}

export default function work(state: ExampleState = defaulState, action: ExampleActions): ExampleState {
  switch (action.type) {
    case EXAMPLE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      }
    }

    default:
      return state
  }
}
