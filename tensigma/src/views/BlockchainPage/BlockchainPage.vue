<template>
  <div>
    <div class="blockchain-header">
      <page-run></page-run>
      <page-stop></page-stop>
      <page-reset></page-reset>
    </div>

    <table class="transactions">
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Sum</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(transaction, index) in transactions"
          :key="`${transaction.from}${index}`"
        >
          <!-- from addr -->
          <td>{{ transaction.from }}</td>

          <!-- transaction to -->
          <td>
            <div
              v-for="to in transaction.to"
              :key="to.addr"
              class="separator"
            >
              {{ to.addr }}
            </div>
          </td>

          <!-- transaction sum -->
          <td>
            <div
              v-for="to in transaction.to"
              :key="to.addr"
              class="separator"
            >
              {{ to.sum }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from '@vue/composition-api';
import { useGetter, useMutation } from '@/store';
import PageRun from './BlockchainPageRun.vue';
import PageStop from './BlockchainPageStop.vue';
import PageReset from './BlockchainPageReset.vue';

export default defineComponent({
  name: 'BlockchainPage',

  components: {
    PageRun,
    PageStop,
    PageReset,
  },

  setup () {
    const transactions = computed(() => useGetter('BlockchainPage/transactions'));

    const subscribe = useMutation('BlockchainPage/subscribe');
    onMounted(() => subscribe());

    return {
      transactions,
    };
  },
});
</script>

<style lang="scss" scoped>
.blockchain-header {
  display: flex;
  justify-content: space-evenly;
}

.transactions {
  vertical-align: top;
}

.separator {
  border-bottom: 1px solid black;
  white-space: nowrap;

  &:first-of-type {
    margin: 10px 0 0;
  }

  &:last-of-type {
    border: none;
  }
}
</style>
