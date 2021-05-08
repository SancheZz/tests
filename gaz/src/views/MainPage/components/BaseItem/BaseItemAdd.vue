<template>
  <button
    class="item-add"
    type="button"
  >+</button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseItemAdd',
});
</script>

<style lang="scss" scoped>
.item-add {
  width: 20px;
  height: 20px;
  cursor: pointer;
  padding: 0 4px;
}
</style>
