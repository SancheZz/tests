<template>
  <button
    class="page-run"
    type="button"
    @click="subscribe"
  >
    Run
  </button>
</template>

<script>
import { useMutation } from '@/store';

export default {
  name: 'BlockchainPageReset',

  setup () {
    const subscribe = useMutation('BlockchainPage/subscribe');

    return {
      subscribe,
    };
  },
};
</script>

<style lang="scss" scoped>
.page-run {
  padding: 10px;
  background: green;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}
</style>
