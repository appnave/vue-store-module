import {
  ApiService,
  Getters,
  State,
  FactoryActions,
  Actions,
} from "./index"

import { StoreDefinition } from 'pinia'

export type CallbackFn = (...url: unknown[]) => string

export type PiniaStoreDefinition = StoreDefinition<string, State, Getters, Actions>

export type ExternalActions = Record<string, <T extends unknown>(...args: T[]) => unknown>
export type ExternalState = Record<string, unknown>
export type ExternalGetters = Record<keyof (State | ExternalState), unknown> | {}

export interface StoreModuleOptions {
  apiService: ApiService
  idKey?: string
  perPage?: number
}

export interface StoreModuleClass {
  state: () => State
  getters: Getters
  actions: FactoryActions
}

export interface Item {
  [key: string]: any
}

export interface ItemOfItem {
  [key: string]: Item
}
