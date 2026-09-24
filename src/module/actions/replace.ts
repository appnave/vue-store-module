import {
  ActionsFnParams,
  Item,
  ReplaceActionPayload,
  ReplaceApiResponse,
  State
} from 'types'

import { AxiosResponse } from 'axios'

import { run } from '../../utils'

export default (configParams: ActionsFnParams) => {
  return async function (
    this: State,
    payload: ReplaceActionPayload = {} as ReplaceActionPayload
  ): Promise<AxiosResponse<ReplaceApiResponse>> {
    const { apiService, idKey, options, resource } = configParams

    const { id, payload: body, url } = payload

    const customURL = run(url || options.replaceURL, { id })
    const normalizedURL = customURL || `/${resource}/${id}/`

    try {
      const response = await apiService.put(normalizedURL, body)
      const { result } = response.data

      const index = this.list.findIndex(
        (item: Item) => item[idKey] === result[idKey]
      )

      if (~index) {
        this.list.splice(index, 1, result)
      }

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
