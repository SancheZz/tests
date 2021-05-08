<template>
  <portal to="author">
    <div
      :style="style"
      :class="classes"
    >
      {{ author.username }}
    </div>
  </portal>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import { useState } from '@/store';

import type { PropType } from '@vue/composition-api';
import type { Author, TooltipPosition } from './types';

export default defineComponent({
  name: 'UserPostAuthorName',

  props: {
    author: {
      type: Object as PropType<Author>,
      required: true,
    },

    position: {
      type: Object as PropType<TooltipPosition>,
      default: null,
    },
  },

  setup (props) {
    const theme = computed(() => useState('PostsPage', 'theme'));
    const classes = computed(() => {
      const cssClassName = 'author-name';
      return [cssClassName, `${cssClassName}--${theme.value}`];
    });
    const style = computed(() => {
      if (props.position) {
        const translateX = `${props.position.left}px`;
        const translateY = `${props.position.top + props.position.height + 10}px`;
        return {
          transform: `translate(${translateX}, ${translateY})`,
        };
      }
    });

    return {
      classes,
      style,
    };
  },
});
</script>

<style lang="scss" scoped>
.author-name {
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
  padding: 10px;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;

  &--light {
    background: white;
    color: black;
    border-color: black;

    @supports(filter: drop-shadow(0 0 1px black)) {
      border-color: transparent;
      filter: drop-shadow(0 0 1px black);
    }
  }

  &--dark {
    background: black;
    color: white;
    border-color: white;
  }
}
</style>
