<template>
  <div
    ref="root"
    :style="style"
    class="info-shadow"
  ></div>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect, onBeforeUnmount } from '@vue/composition-api';
import type { PropType } from '@vue/composition-api';

export default defineComponent({
  name: 'TileInfoShadow',

  props: {
    top: {
      type: Number as PropType<number>,
      required: true,
    },

    left: {
      type: Number as PropType<number>,
      required: true,
    },

    width: {
      type: Number as PropType<number>,
      required: true,
    },

    height: {
      type: Number as PropType<number>,
      required: true,
    },

    container: {
      type: HTMLElement as PropType<HTMLElement>,
    },
  },

  setup (props, context) {
    const translateY = computed(() => Math.round(props.top / 10) * 10);
    const translateX = computed(() => Math.round(props.left / 10) * 10);

    const style = computed(() => {
      return {
        transform: `translate(${translateX.value}px, ${translateY.value}px)`,
        width: `${props.width}px`,
        height: `${props.height}px`,
      };
    });

    watchEffect(() => context.emit('update:top', translateY.value));
    watchEffect(() => context.emit('update:left', translateX.value));
    watchEffect(() => {
      if (props.container && context.refs.root) {
        props.container.append(context.refs.root as HTMLElement);
      }
    });

    onBeforeUnmount(() => {
      (context.refs.root as HTMLElement).remove();
    });

    return {
      style,
    };
  },
});
</script>

<style lang="scss" scoped>
.info-shadow {
  background-image: repeating-linear-gradient(
    45deg,
    transparent 0 20px,
    green 20px 40px
  );
  opacity: .1;
}
</style>
