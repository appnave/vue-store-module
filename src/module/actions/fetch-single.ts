import {
  ActionsFnParams,
  FetchSingleActionPayload,
  FetchSingleApiResponse,
  Item,
  State
} from 'types'

import { AxiosResponse } from 'axios'

import { run } from '../../utils'

export default (configParams: ActionsFnParams) => {
  return async function (
    this: State,
    payload: FetchSingleActionPayload = {} as FetchSingleActionPayload
  ): Promise<AxiosResponse<FetchSingleApiResponse>> {
    const { apiService, options, resource, idKey } = configParams

    const { form, id, params, url } = payload

    const customURL = run(url || options.fetchSingleURL, { form, id })
    const automaticURL = form
      ? `/${resource}/${id ? `${id}/edit`
      : 'new'}/` : `/${resource}/${id}/`

    const normalizedURL = customURL || automaticURL

    try {
      const response = await apiService.get(normalizedURL, { params })
      const { result } = response.data

      if (result) {
        const index = this.list.findIndex(
          (item: Item) => item[idKey] === result[idKey]
        )

        if (~index) {
          this.list.splice(index, 1, result)
        } else {
          this.list.push(result)
        }
      }

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
