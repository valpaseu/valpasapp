import axios from 'axios'

import { ExampleState } from 'features/work/redux/types'

export default {
  async exampleRequest(id: string): Promise<ExampleState> {
    return await axios.get<ExampleState>(`https://testlink/${id}`).then((res) => res.data)
  },
}
