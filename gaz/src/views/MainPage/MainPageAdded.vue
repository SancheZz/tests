<template>
  <div class="page-added">
    <!-- title -->
    <h3 class="page-added__title">
      Добавленные
    </h3>

    <!-- items -->
    <base-item
      v-for="item in addedItems"
      :key="item.id"
      type="remove"
      @remove="handleRemove(item)"
    >
      {{ item.name }}
    </base-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import type { Item } from '@/store/main/types';
import BaseItem from './components/BaseItem/BaseItem.vue';

export default defineComponent({
  name: 'MainPageAdded',

  components: {
    BaseItem,
  },

  setup () {
    const store = useStore();
    const addedItems = computed(() => store.getters['main/addedItems']);

    const handleRemove = (item: Item) => {
      store.commit('main/removeItem', item);
      store.commit('history/addRecord', {
        item,
        type: 'removed',
      });
    };

    return {
      addedItems,
      handleRemove,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-added {
  flex: 0 1 50%;

  &__title {
    font-size: 26px;
    line-height: 32px;
    margin: 0 0 10px;
  }
}
</style>
