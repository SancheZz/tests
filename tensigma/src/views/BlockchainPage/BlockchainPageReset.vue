<template>
  <button
    class="page-reset"
    type="button"
    @click="reset"
  >
    Reset
  </button>
</template>

<script>
import { useMutation } from '@/store';

export default {
  name: 'BlockchainPageReset',

  setup () {
    const reset = useMutation('BlockchainPage/reset');

    return {
      reset,
    };
  },
};
</script>

<style lang="scss" scoped>
.page-reset {
  padding: 10px;
  background: red;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}
</style>
