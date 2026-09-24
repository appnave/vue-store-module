import {
  ActionsFnParams,
  ModuleOptions,
  StoreModuleClass,
  StoreModuleOptions
} from 'types'

import {
  state,
  getters,
  destroy,
  fetchList,
  fetchFilters,
  fetchSingle,
  fetchFieldOptions,
  update,
  replace,
  create,
} from './module'

export default class StoreModule {
  constructor (private options: StoreModuleOptions) {
    if (!this.options.apiService) {
      throw new Error('Please, provide the "apiService"')
    }
  }

  public createStoreModule (resource: string, options: ModuleOptions): StoreModuleClass {
    options = options || {}

    const idKey = options?.idKey || this.options.idKey || 'uuid'

    const actions = options.actions || {}
    const gettersData = options.getters || {}
    const stateData = options.state || {}

    const actionsPayload: ActionsFnParams = {
      apiService: this.options.apiService,
      idKey,
      options,
      resource
    }

    const store: StoreModuleClass = {
      state: () => {
        return {
          ...state(),

          ...stateData
        }
      },

      getters: {
        ...getters(idKey),

        ...gettersData
      },

      actions: {
        create: create(actionsPayload),
        destroy: destroy(actionsPayload),
        fetchFieldOptions: fetchFieldOptions(actionsPayload),
        fetchFilters: fetchFilters(actionsPayload),
        fetchList: fetchList(actionsPayload),
        fetchSingle: fetchSingle(actionsPayload),
        replace: replace(actionsPayload),
        update: update(actionsPayload),

        ...actions
      }
    }

    return store
  }
}
