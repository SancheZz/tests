<template>
  <section class="page-popular">
    <h3 class="page-popular__title">
      Самые часто обсуждаемые посты
    </h3>

    <popular-item
      v-for="item in items"
      :key="item.id"
      :item="item"
    ></popular-item>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import { useGetter } from '@/store';
import PopularItem from './components/PopularItem/PopularItem.vue';

export default defineComponent({
  name: 'PostsPagePopular',

  components: {
    PopularItem,
  },

  setup () {
    const popularItems = computed(() => useGetter('PostsPage/popularItems'));
    const lastTheeitems = computed(
      () => popularItems
        .value
        .reverse()
        .slice(0, 3),
    );

    return {
      items: lastTheeitems,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-popular {
  flex: 1 1 100%;

  &__title {
    font-size: 26px;
    margin: 25px 0 10px;
  }
}
</style>
