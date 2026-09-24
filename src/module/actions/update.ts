import {
  ActionsFnParams,
  Item,
  UpdateActionPayload,
  UpdateApiResponse,
  State
} from 'types'

import { AxiosResponse } from 'axios'

import { run } from '../../utils'

export default (configParams: ActionsFnParams) => {
  return async function (
    this: State,
    payload: UpdateActionPayload = {} as UpdateActionPayload
  ): Promise<AxiosResponse<UpdateApiResponse>> {
    const { apiService, idKey, options, resource } = configParams

    const { id, payload: body, url } = payload

    const customURL = run(url || options.updateURL, { id })
    const normalizedURL = customURL || `/${resource}/${id}/`

    try {
      const response = await apiService.patch(normalizedURL, body)
      const { result } = response.data

      for (const index in this.list) {
        const item: Item = this.list[index]

        if (item[idKey] === result[idKey]) {
          this.list.splice(+index, 1, { ...item, ...result })
          break
        }
      }

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
