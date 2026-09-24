import {
  ApiService,
  ItemOfItem,
  Item,
  FetchSingleURL,
  RunCallbackFn,

  // API RESPONSE
  FetchFieldOptionsApiResponse,
  UpdateApiResponse,
  ReplaceApiResponse,
  CreateApiResponse,
  DestroyApiResponse,
  FetchFiltersApiResponse,
  FetchListApiResponse,
  FetchSingleApiResponse,

  ExternalActions,
  ExternalGetters,
  ExternalState,

  // ACTIONS PAYLOAD
  FetchListActionPayload,
  FetchFiltersActionPayload,
  FetchSingleActionPayload,
  DestroyActionPayload,
  FetchFieldOptionsActionPayload,
  UpdateActionPayload,
  ReplaceActionPayload,
  CreateActionPayload,
  DestroyURL,
  UpdateURL,
  ReplaceURL
} from 'types'

import { AxiosResponse } from 'axios'

export interface ActionsFnParams {
  apiService: ApiService,
  idKey: string
  options: ModuleOptions
  resource: string
}

export type ActionsPayload = (
  FetchListActionPayload &
  FetchFiltersActionPayload &
  FetchSingleActionPayload &
  DestroyActionPayload &
  FetchFieldOptionsActionPayload &
  UpdateActionPayload &
  ReplaceActionPayload &
  CreateActionPayload
)

export interface ModuleOptions {
  actions?: ExternalActions
  createURL?: string
  destroyURL?: RunCallbackFn<DestroyURL>
  fetchFieldOptionsURL?: string
  fetchFiltersURL?: string
  fetchListURL?: string
  fetchSingleURL?: RunCallbackFn<FetchSingleURL>
  getters?: ExternalGetters
  idKey?: string
  replaceURL?: RunCallbackFn<ReplaceURL>
  state?: ExternalState
  updateURL?: RunCallbackFn<UpdateURL>
  perPage?: number
}

export type PayloadActionType = (
  FetchListActionPayload |
  DestroyActionPayload |
  FetchFiltersActionPayload |
  FetchSingleActionPayload |
  FetchFieldOptionsActionPayload |
  UpdateActionPayload |
  ReplaceActionPayload |
  CreateActionPayload
)

export type ActionCallback<T, A> = (
  payload?: T
) => Promise<AxiosResponse<A>>

export interface FactoryActions {
  destroy: ActionCallback<DestroyActionPayload, DestroyApiResponse>
  fetchFieldOptions: ActionCallback<FetchFieldOptionsActionPayload, FetchFieldOptionsApiResponse>
  fetchFilters: ActionCallback<FetchFiltersActionPayload, FetchFiltersApiResponse>
  fetchList: ActionCallback<FetchListActionPayload, FetchListApiResponse>
  fetchSingle: ActionCallback<FetchSingleActionPayload, FetchSingleApiResponse>
  update: ActionCallback<UpdateActionPayload, UpdateApiResponse>
  replace: ActionCallback<ReplaceActionPayload, ReplaceApiResponse>
  create: ActionCallback<CreateActionPayload, CreateApiResponse>
}

export interface Actions {
  destroy: (payload: DestroyActionPayload) => Promise<AxiosResponse<DestroyApiResponse>>
  fetchFieldOptions: (payload: FetchFieldOptionsActionPayload) => Promise<AxiosResponse<FetchFieldOptionsApiResponse>>
  fetchFilters: (payload: FetchFiltersActionPayload) => Promise<AxiosResponse<FetchFiltersApiResponse>>
  fetchList: (payload: FetchListActionPayload) => Promise<AxiosResponse<FetchListApiResponse>>
  fetchSingle: (payload: FetchSingleActionPayload) => Promise<AxiosResponse<FetchSingleApiResponse>>
  update: (payload: UpdateActionPayload) => Promise<AxiosResponse<UpdateApiResponse>>
  replace: (payload: ReplaceActionPayload) => Promise<AxiosResponse<ReplaceApiResponse>>
  create: (payload: CreateActionPayload) => Promise<AxiosResponse<CreateApiResponse>>
}

export type ReplaceUpdateApiResponse = Pick<ApiResponse, 'fields' | 'result' | 'status'>

export interface ApiResponseStatus {
  code: 200 | 401 | 403 | 404 | 500
  text?: string
}

export interface ApiResponse {
  count?: number
  errors?: ItemOfItem
  fields?: ItemOfItem
  metadata?: ItemOfItem
  results?: Item[]
  result?: Item
  status: ApiResponseStatus
}
