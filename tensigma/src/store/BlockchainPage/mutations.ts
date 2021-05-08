/* eslint-disable @typescript-eslint/no-non-null-assertion */

import Vue from 'vue';
import type { MutationTree } from 'vuex';
import type { State } from './state';
import type { TransactionInfo } from './types';

export interface Mutations {
  subscribe(state: State): void;
  unsubscribe(state: State): void;
  setTransactions(state: State, transactionInfo: TransactionInfo): void;
  reset(state: State): void;
}

export default {
  subscribe (state) {
    state.subscribed = true;
  },

  unsubscribe (state) {
    state.subscribed = false;
  },

  setTransactions (state, transactionInfo) {
    const from = transactionInfo.inputs[0]!.prev_out;
    const to = transactionInfo.out;

    if (!state.transactions[from.addr]) {
      Vue.set(state.transactions, from.addr, {});
    }

    const fromAddr = state.transactions[from.addr]!;
    for (const toAddr of to) {
      if (!fromAddr[toAddr.addr]) {
        fromAddr[toAddr.addr] = 0;
      }
      fromAddr[toAddr.addr] += toAddr.value;
    }
  },

  reset (state) {
    state.transactions = {};
  },
} as Mutations & MutationTree<State>;
