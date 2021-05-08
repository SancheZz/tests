<template>
  <div class="tiles-page">
    <div class="tiles-page__items">
      <page-item
        v-for="tile in tiles"
        :key="tile.id"
        :tile="tile"
      ></page-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from '@vue/composition-api';
import { useState, useMutation } from '@/store';
import PageItem from './TilesPageItem.vue';

export default defineComponent({
  name: 'TilesPage',

  components: {
    PageItem,
  },

  setup () {
    const tiles = computed(() => useState('TilesPage', 'tiles'));
    const initState = useMutation('TilesPage/initState');

    onMounted(() => initState(undefined));

    return {
      tiles,
    };
  },
});
</script>

<style lang="scss" scoped>
.tiles-page {
  &__items {
    position: relative;
    width: 900px;
    height: 900px;
    overflow: hidden;
    margin: 0 auto;
    background-image: repeating-linear-gradient(
      -45deg,
      transparent 0 10px,
      rgba(129, 123, 123, .1) 10px 12px
    );
  }
}
</style>
