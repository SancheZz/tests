<template>
  <div class="page-available">
    <!-- search input -->
    <input
      v-model="search"
      class="page-available__input-control"
      type="text"
    >

    <!-- items -->
    <base-item
      v-for="item in filteredItems"
      :key="item.id"
      type="add"
      @add="handleAdd(item)"
    >
      {{ item.name }}
    </base-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import type { Item } from '@/store/main/types';
import BaseItem from './components/BaseItem/BaseItem.vue';

export default defineComponent({
  name: 'MainPageAvailable',

  components: {
    BaseItem,
  },

  setup () {
    const store = useStore();
    const filterAvailableItems = store.getters['main/filterAvailableItems'];
    const search = ref('');

    const filteredItems = ref<Item[]>([]);

    watchEffect(() => {
      filteredItems.value = filterAvailableItems(search.value);
    });

    const handleAdd = (item: Item) => {
      store.commit('main/addItem', item);
      store.commit('history/addRecord', {
        item,
        type: 'added',
      });
    };

    return {
      search,
      filteredItems,
      handleAdd,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-available {
  flex: 0 1 50%;

  &__input-control {
    box-sizing: border-box;
    display: block;
    height: 32px;
    width: 100%;
    margin: 0 0 10px;
  }
}
</style>
