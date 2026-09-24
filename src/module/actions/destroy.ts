import {
  ActionsFnParams,
  DestroyActionPayload,
  DestroyApiResponse,
  State,
  Item
} from 'types'

import { AxiosResponse } from 'axios'

import { run } from '../../utils'

export default (destroyConfig: ActionsFnParams) => {
  return async function (
    this: State,
    payload: DestroyActionPayload = {} as DestroyActionPayload
  ): Promise<AxiosResponse<DestroyApiResponse>> {
    const { apiService, options, resource, idKey } = destroyConfig

    const { id, params, url } = payload

    const customURL = run(url || options.destroyURL, { id })
    const normalizedURL = customURL || `/${resource}/${id}/`

    try {
      const response = await apiService.delete(normalizedURL, { params })

      const index = this.list.findIndex((item: Item) => item[idKey] === id)

      if (~index) {
        this.list.splice(index, 1)
      }

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
