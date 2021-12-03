import { ExampleState } from 'features/work/redux/types'
import {AuthProps} from "./src/features/authentication/redux/types";

export type AppState = {
  work: ExampleState,
  authentication: AuthProps
}
