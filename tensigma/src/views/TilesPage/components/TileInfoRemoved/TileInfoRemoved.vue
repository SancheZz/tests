<template>
  <div
    ref="root"
    :style="style"
    class="info-removed"
  >
    <button
      type="button"
      class="info-removed__button"
      @click="handleClick"
    >
      Return tile to trading desk
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import { useMutation } from '@/store';
import type { PropType } from '@vue/composition-api';
import type { InfoTile } from '@/store/TilesPage/types';

export default defineComponent({
  name: 'TileInfoRemoved',

  props: {
    tile: {
      type: Object as PropType<InfoTile>,
      required: true,
    },
  },

  setup (props, context) {
    const style = computed(() => {
      const translateX = `${props.tile.left}px`;
      const translateY = `${props.tile.top}px`;
      return {
        width: `${props.tile.width}px`,
        height: `${props.tile.height}px`,
        transform: `translate(${translateX}, ${translateY})`,
      };
    });

    const setTileValues = useMutation('TilesPage/setTileValues');
    const handleClick = (event: MouseEvent): void => {
      event.stopPropagation();
      const root = context.refs.root as HTMLElement;
      const { offsetWidth, offsetHeight } = root.parentElement as HTMLElement;
      const width = 300;
      const height = 100;

      setTileValues({
        width,
        height,
        id: props.tile.id,
        removed: false,
        left: (offsetWidth - width) / 2,
        top: (offsetHeight - height) / 2,
      });
    };

    return {
      style,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.info-removed {
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid black;

  &__button {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
    cursor: pointer;
  }
}
</style>
