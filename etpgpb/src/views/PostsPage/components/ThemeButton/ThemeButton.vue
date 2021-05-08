<template>
  <page-button
    :class="classes"
    :disabled="isCurrent"
    type="button"
    @click.native="handleClick"
  >
    <slot></slot>
  </page-button>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import { useState, useMutation } from '@/store';
import PageButton from '../PageButton/PageButton.vue';

import type { PropType } from '@vue/composition-api';
import type { ColorScheme } from '@/store/PostsPage/types';

export default defineComponent({
  name: 'ThemeButton',

  components: {
    PageButton,
  },

  props: {
    scheme: {
      type: String as PropType<ColorScheme>,
      required: true,
    },
  },

  setup (props) {
    const scheme = computed(() => useState('PostsPage', 'theme'));
    const isCurrent = computed(() => props.scheme === scheme.value);

    const classes = computed(() => {
      const cssClassName = 'theme-button';
      return [cssClassName, {
        [`${cssClassName}--current`]: isCurrent.value,
      }];
    });

    const setTheme = useMutation('PostsPage/setTheme');
    const handleClick = () => {
      setTheme(props.scheme);
    };

    return {
      classes,
      isCurrent,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.theme-button {
  border: 1px solid gray;
  cursor: pointer;

  &--current {
    background: transparent;
    border-color: transparent;
  }

  &:disabled {
    cursor: not-allowed;
  }
}
</style>
