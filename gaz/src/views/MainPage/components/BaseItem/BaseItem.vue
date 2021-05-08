<template>
  <span class="base-item">
    <span class="base-item__name">
      <slot></slot>
    </span>

    <component
      :is="actionType"
      class="base-item__action"
      @click="handleActionClick"
    ></component>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Types } from './props';
import BaseItemAdd from './BaseItemAdd.vue';
import BaseItemRemove from './BaseItemRemove.vue';

export default defineComponent({
  name: 'BaseItem',

  components: {
    BaseItemAdd,
    BaseItemRemove,
  },

  props: {
    type: {
      type: String as PropType<keyof typeof Types>,
      default: 'add',
    },
  },

  setup (props, { emit }) {
    const actionType = computed(() => Types[props.type]);
    const handleActionClick = () => {
      emit(props.type);
    };

    return {
      actionType,
      handleActionClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-item {
  display: inline-flex;
  align-items: center;
  margin: 4px;
  padding: 4px 6px;
  border: 1px solid gray;
  border-radius: 4px;

  &__name {
    flex: 1 1 100%;
    margin: 0 4px 0 0;
  }

  &__action {
    flex: 0 0 auto;
  }
}
</style>
