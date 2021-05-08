<template>
  <button
    class="item-remove"
    type="button"
  >-</button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseItemRemove',
});
</script>

<style lang="scss" scoped>
.item-remove {
  width: 20px;
  height: 20px;
  cursor: pointer;
  padding: 0 4px;
}
</style>
