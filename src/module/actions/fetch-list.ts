import {
  ActionsFnParams,
  FetchListActionPayload,
  FetchListApiResponse,
  State
} from 'types'

import { AxiosResponse } from 'axios'

export default (configParams: ActionsFnParams) => {
  return async function (
    this: State,
    payload: FetchListActionPayload = {} as FetchListActionPayload
  ): Promise<AxiosResponse<FetchListApiResponse>> {
    const { apiService, options, resource } = configParams

    const {
      filters,
      increment,
      limit,
      ordering,
      page,
      search,
      url
    } = payload

    const defaultPerPage = options.perPage || 36

    const params = {
      ...filters,
      limit: limit || defaultPerPage,
      offset: ((page || 1) - 1) * (limit || defaultPerPage),
      ordering: ordering?.length ? ordering.join(',') : null,
      search
    }

    const normalizedURL = url || options.fetchListURL || `/${resource}/`

    try {
      const response = await apiService.get(normalizedURL, { params })
      const { results, count } = response.data

      increment && page > 1
        ? this.list.push(...results)
        : this.list = results || []

      this.totalPages = Math.ceil(count / defaultPerPage)

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
