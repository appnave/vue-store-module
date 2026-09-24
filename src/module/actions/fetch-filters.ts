import {
  ActionsFnParams,
  FetchFiltersActionPayload,
  FetchFiltersApiResponse,
  State
} from 'types'

import { AxiosResponse } from 'axios'

export default (configParams: ActionsFnParams) => {
  return async function (
    this: State,
    payload: FetchFiltersActionPayload = {} as FetchFiltersActionPayload
  ): Promise<AxiosResponse<FetchFiltersApiResponse>> {
    const { apiService, options, resource } = configParams

    const { params, url } = payload

    const normalizedURL = url || options.fetchFiltersURL || `/${resource}/filters/`

    try {
      const response = await apiService.get(normalizedURL, { params })
      const { fields } = response.data

      this.filters = fields

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
