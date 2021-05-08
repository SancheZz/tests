<template>
  <button :class="classes">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { useState } from '@/store';

export default defineComponent({
  name: 'PageButton',

  setup () {
    const scheme = computed(() => useState('PostsPage', 'theme'));
    const classes = computed(() => {
      const cssClassName = 'page-button';
      return [cssClassName, `${cssClassName}--${scheme.value}`];
    });

    return {
      classes,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-button {
  border: 1px solid gray;
  cursor: pointer;

  &--dark {
    color: white;
    background-color: black;
    border-color: white;
  }
}
</style>
