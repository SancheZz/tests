import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}

export type { State } from './state'
export type { Getters } from './getters'
export type { Mutations } from './mutations'
export type { Actions } from './actions'
