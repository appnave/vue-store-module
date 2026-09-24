import {
  ActionsFnParams,
  FetchFieldOptionsActionPayload,
  FetchFieldOptionsApiResponse
} from 'types'

import { AxiosResponse } from 'axios'

export default function fetchFieldOptions (configParams: ActionsFnParams) {
  return function (
    payload: FetchFieldOptionsActionPayload = {} as FetchFieldOptionsActionPayload
  ): Promise<AxiosResponse<FetchFieldOptionsApiResponse>> {
    const { apiService, options, resource } = configParams

    const { params, url, field } = payload

    const normalizedURL = url || options.fetchFieldOptionsURL || `/${resource}/options/${field}`

    return apiService.get(normalizedURL, { params })
  }
}
