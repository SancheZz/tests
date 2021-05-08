import type { ActionTree } from 'vuex'
import type { State } from './state'
import type { Getters } from './getters'
import type { Mutations } from './mutations'
import type { Module } from '~/store/utils'

// eslint-disable-next-line no-use-before-define
type Context = Module<State, Getters, Mutations, Actions>;

export type Actions = {
  loadGroups(context: Context): Promise<void>;
  loadData(context: Context): Promise<void>;
  updateData(context: Context, exchange: number): Promise<void>;
}

export default {
  async loadGroups ({ commit }) {
    const response = await import('./mock/names.json')
    const groups = response.default
    commit('saveGroups', groups)
  },

  async loadData ({ commit }) {
    const response = await import('./mock/data.json')
    const data = response.default
    commit('saveData', data)
  },

  updateData ({ commit, dispatch }, exchange) {
    const timeout = 15_000
    return new Promise(function (resolve) {
      setTimeout(async function () {
        await dispatch('loadData', undefined)
        commit('setExchange', exchange)
        resolve()
      }, timeout)
    })
  }
} as Actions & ActionTree<State, State>
