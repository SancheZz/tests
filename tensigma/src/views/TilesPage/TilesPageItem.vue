<template>
  <component
    :is="viewType"
    :tile="tile"
    :active="tile.id === upperTileId"
  ></component>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import { useState } from '@/store';
import TileInfo from './components/TileInfo/TileInfo.vue';
import TileInfoRemoved from './components/TileInfoRemoved/TileInfoRemoved.vue';
import type { PropType } from '@vue/composition-api';
import type { InfoTile } from '@/store/TilesPage/types';

export default defineComponent({
  name: 'TilesPageItem',

  components: {
    TileInfo,
    TileInfoRemoved,
  },

  props: {
    tile: {
      type: Object as PropType<InfoTile>,
      required: true,
    },
  },

  setup (props) {
    const upperTileId = computed(() => useState('TilesPage', 'upperTileId'));

    const viewType = computed(
      () => props.tile.removed
        ? 'TileInfoRemoved'
        : 'TileInfo',
    );

    return {
      upperTileId,
      viewType,
    };
  },
});
</script>
