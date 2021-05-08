<template>
  <button
    class="page-stop"
    type="button"
    @click="unsubscribe"
  >
    Stop
  </button>
</template>

<script>
import { useMutation } from '@/store';

export default {
  name: 'BlockchainPageReset',

  setup () {
    const unsubscribe = useMutation('BlockchainPage/unsubscribe');

    return {
      unsubscribe,
    };
  },
};
</script>

<style lang="scss" scoped>
.page-stop {
  padding: 10px;
  background: orange;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}
</style>
