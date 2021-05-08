<template>
  <button
    class="info-resize"
    type="button"
    @pointerdown="handlePointerDown"
    @pointerup="handlePointerUp"
    @pointermove="handlePointerMove"
  ></button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useMutation } from '@/store';
import type { PropType } from '@vue/composition-api';
import type { InfoTile } from '@/store/TilesPage/types';

export default defineComponent({
  name: 'TileInfoResize',

  props: {
    tile: {
      type: Object as PropType<InfoTile>,
      required: true,
    },
  },

  setup (props) {
    let isResizing = false;

    const setUpper = useMutation('TilesPage/setUpper');
    const handlePointerDown = (event: PointerEvent): void => {
      event.stopPropagation();
      const element = event.currentTarget as HTMLElement;
      element.setPointerCapture(event.pointerId);
      isResizing = true;
      setUpper(props.tile.id);
    };

    const handlePointerUp = (event: PointerEvent): void => {
      event.stopPropagation();
      const element = event.currentTarget as HTMLElement;
      element.releasePointerCapture(event.pointerId);
      isResizing = false;
    };

    const setTileValues = useMutation('TilesPage/setTileValues');
    const handlePointerMove = (event: PointerEvent): void => {
      event.stopPropagation();
      if (isResizing) {
        setTileValues({
          id: props.tile.id,
          width: props.tile.width + event.movementX,
          height: props.tile.height + event.movementY,
        });
      }
    };

    return {
      handlePointerDown,
      handlePointerUp,
      handlePointerMove,
    };
  },
});
</script>

<style lang="scss" scoped>
.info-resize {
  position: absolute;
  right: 0;
  bottom: 0;
  background-image: url(https://media.prod.mdn.mozit.cloud/attachments/2012/07/09/12/cd13501be6ac34c9d6e2b10f98d6cb0f/col-resize.gif);
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  border: 1px solid black;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
}
</style>
