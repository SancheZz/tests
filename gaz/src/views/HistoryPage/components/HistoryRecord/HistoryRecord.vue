<template>
  <span class="history-record">
    <span class="history-record__time">
      {{ time }}
    </span>

    <span class="history-record__id">
      {{ item.id }}
    </span>

    <span class="history-record__name">
      {{ item.name }}
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { HistoryRecord } from '@/store/history/types';

const dateFormat = new Intl.DateTimeFormat('ru', {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});

export default defineComponent({
  name: 'HistoryRecord',

  props: {
    record: {
      type: Object as PropType<HistoryRecord>,
      required: true,
    },
  },

  setup (props) {
    return {
      time: dateFormat.format(props.record.date),
      item: props.record.item,
    };
  },
});
</script>

<style lang="scss" scoped>
.history-record {
  display: inline-flex;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 2px;
  margin: 0 8px 0 0;

  &__time {
    flex: 0 0 auto;
    padding: 0 2px 0 0;
  }

  &__id {
    padding: 0 2px;
    border: 1px solid gray;
    border-width: 0 1px;
  }

  &__name {
    padding: 0 0 0 2px;
  }
}
</style>
