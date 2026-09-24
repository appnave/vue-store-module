import {
  ActionsFnParams,
  CreateActionPayload,
  CreateApiResponse,
  State
} from 'types'

import { AxiosResponse } from 'axios'

export default (configParams: ActionsFnParams) => {
  return async function (
    this: State,
    payload: CreateActionPayload = {} as CreateActionPayload
  ): Promise<AxiosResponse<CreateApiResponse>> {
    const { apiService, options, resource } = configParams

    const { payload: body, url } = payload

    const normalizedURL = url || options.createURL || `/${resource}/`

    try {
      const response = await apiService.post(normalizedURL, body)
      const { result } = response.data

      const hasResult: boolean = !!Object.keys(result || {}).length

      if (hasResult) {
        this.list.push(result)
      }

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
