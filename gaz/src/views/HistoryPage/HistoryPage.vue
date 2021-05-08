<template>
  <main>
    <!-- title -->
    <h3>{{ title }}</h3>

    <!-- items -->
    <history-record
      v-for="(record, index) in records"
      :key="index"
      :record="record"
    ></history-record>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import type { PropType } from 'vue';
import HistoryRecord from './components/HistoryRecord/HistoryRecord.vue';

export default defineComponent({
  name: 'HistoryPage',

  components: {
    HistoryRecord,
  },

  props: {
    type: {
      type: String as PropType<'added' | 'removed'>,
      default: 'added',
    },
  },

  setup (props) {
    const store = useStore();
    const addedRecords = store.getters['history/added'];
    const removedRecords = store.getters['history/removed'];

    const title = computed(
      () => props.type === 'added'
        ? 'История добавлений'
        : 'История удалений',
    );

    const records = computed(
      () => props.type === 'added'
        ? addedRecords
        : removedRecords,
    );

    return {
      title,
      records,
    };
  },
});
</script>
