<template>
  <button
    type="button"
    class="info-remove"
    @click="handleClick"
    @pointerdown="handlePointerDown"
  >
    -
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useMutation } from '@/store';
import type { PropType } from '@vue/composition-api';
import type { InfoTile } from '@/store/TilesPage/types';

export default defineComponent({
  name: 'TileInfoRemove',

  props: {
    tile: {
      type: Object as PropType<InfoTile>,
      required: true,
    },
  },

  setup (props) {
    const setTileValues = useMutation('TilesPage/setTileValues');
    const handleClick = (event: MouseEvent): void => {
      event.stopPropagation();
      setTileValues({
        id: props.tile.id,
        removed: true,
      });
    };

    const handlePointerDown = (event: PointerEvent): void => {
      event.stopPropagation();
    };

    return {
      handleClick,
      handlePointerDown,
    };
  },
});
</script>

<style lang="scss" scoped>
.info-remove {
  background-color: transparent;
  border: 1px solid black;
  cursor: pointer;
  height: 20px;
}
</style>
