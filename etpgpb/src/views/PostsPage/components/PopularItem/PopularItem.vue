<template>
  <div class="popular-item">
    <item-count
      :count="item.count"
    ></item-count>

    <div class="popular-item__message">
      {{ item.message }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ItemCount from './PopularItemCount.vue';

import type { PropType } from '@vue/composition-api';
import type { PopularItem } from '@/store/PostsPage/types';

export default defineComponent({
  name: 'PopularItem',

  components: {
    ItemCount,
  },

  props: {
    item: {
      type: Object as PropType<PopularItem>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.popular-item {
  display: flex;
  align-items: center;
  margin: 0 0 10px 0;

  &__message {
    flex: 1 1 100%;
  }
}
</style>
