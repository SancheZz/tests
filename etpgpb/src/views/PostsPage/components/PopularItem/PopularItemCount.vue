<template>
  <div class="item-count">
    <div class="item-count__number">
      {{ count }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import type { PropType } from '@vue/composition-api';

export default defineComponent({
  name: 'PopularItemCount',

  props: {
    count: {
      type: Number as PropType<number>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.item-count {
  flex: 0 0 auto;
  position: relative;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 50%;
  margin: 0 10px 0 0;

  &__number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
