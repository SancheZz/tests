<template>
  <section
    ref="root"
    :class="classes"
    :style="style"
    @pointerdown="handlePointerDown"
    @pointerup="handlePointerUp"
    @pointermove="handlePointerMove"
  >
    <header class="info-header">
      <!-- button of remove -->
      <info-remove
        :tile="tile"
        class="info-header__button"
      ></info-remove>

      <!-- title -->
      <h4 class="info-header__title">
        {{ tile.title }}
      </h4>
    </header>

    <!-- resize button -->
    <info-resize
      :tile="tile"
    ></info-resize>

    <!-- shadow of a moved position -->
    <info-shadow
      v-show="isMoving"
      :top.sync="shadowPositionY"
      :left.sync="shadowPositionX"
      :width="tile.width"
      :height="tile.height"
      :container="container"
    ></info-shadow>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from '@vue/composition-api';
import { useMutation } from '@/store';
import InfoResize from './TileInfoResize.vue';
import InfoShadow from './TileInfoShadow.vue';
import InfoRemove from './TileInfoRemove.vue';

import type { Ref, PropType } from '@vue/composition-api';
import type { InfoTile } from '@/store/TilesPage/types';

export default defineComponent({
  name: 'TileInfo',

  components: {
    InfoResize,
    InfoShadow,
    InfoRemove,
  },

  props: {
    tile: {
      type: Object as PropType<InfoTile>,
      required: true,
    },

    active: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },

  setup (props, context) {
    const isMoving = ref(false);
    const positionX = ref(props.tile.left);
    const positionY = ref(props.tile.top);

    const container: Ref<HTMLElement | null> = ref(null);
    const shadowPositionX = ref(positionX.value);
    const shadowPositionY = ref(positionY.value);

    watch([positionX], () => (shadowPositionX.value = positionX.value));
    watch([positionY], () => (shadowPositionY.value = positionY.value));

    const classes = computed(() => {
      const cssClassName = 'tile-info';
      return [cssClassName, {
        [`${cssClassName}--moving`]: isMoving.value,
        [`${cssClassName}--upper`]: props.active,
      }];
    });

    const style = computed(() => {
      const translateX = `${positionX.value}px`;
      const translateY = `${positionY.value}px`;
      return {
        width: `${props.tile.width}px`,
        height: `${props.tile.height}px`,
        transform: `translate(${translateX}, ${translateY})`,
      };
    });

    const setUpper = useMutation('TilesPage/setUpper');
    const handlePointerDown = (event: PointerEvent): void => {
      const element = event.currentTarget as Element;
      element.setPointerCapture(event.pointerId);
      isMoving.value = true;
      setUpper(props.tile.id);
    };

    const setTileValues = useMutation('TilesPage/setTileValues');
    const handlePointerUp = (event: PointerEvent): void => {
      const element = event.currentTarget as Element;
      element.releasePointerCapture(event.pointerId);
      isMoving.value = false;
      positionX.value = shadowPositionX.value;
      positionY.value = shadowPositionY.value;
      setTileValues({
        id: props.tile.id,
        left: positionX.value,
        top: positionY.value,
      });
    };

    const handlePointerMove = (event: PointerEvent): void => {
      console.log(event.movementX);
      if (isMoving.value) {
        positionX.value += event.movementX;
        positionY.value += event.movementY;
      }
    };

    onMounted(() => {
      const element = context.refs.root as HTMLElement;
      container.value = element.parentElement;
    });

    return {
      isMoving,
      shadowPositionX,
      shadowPositionY,
      container,
      style,
      classes,
      handlePointerDown,
      handlePointerUp,
      handlePointerMove,
    };
  },
});
</script>

<style lang="scss" scoped>
.tile-info {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid black;
  will-change: transform;
  background-color: white;
  z-index: 1;

  &--moving {
    cursor: move;
    background-color: transparent;
  }

  &--upper {
    z-index: 2;
  }
}

.info-header {
  display: flex;
  align-items: center;
  padding: 4px 10px;

  &__button {
    flex: 0 0 auto;
  }

  &__title {
    flex: 1 1 100%;
    margin: 0 10px;
  }
}
</style>
