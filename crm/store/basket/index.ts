import state from './state'
import getters from './getters'
import mutations from './mutations'

export default {
  state,
  getters,
  mutations,
  namespaced: true
}

export type { State } from './state'
export type { Getters } from './getters'
export type { Mutations } from './mutations'
