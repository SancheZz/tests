<template>
  <main class="main-page">
    <page-available></page-available>
    <div class="main-page__separator"></div>
    <page-added></page-added>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageAvailable from './MainPageAvailable.vue';
import PageAdded from './MainPageAdded.vue';

export default defineComponent({
  name: 'MainPage',

  components: {
    PageAvailable,
    PageAdded,
  },
});
</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  min-height: 100vh;

  &__separator {
    flex: 0 0 auto;
    border-left: 1px solid gray;
    margin: 10px;
  }
}
</style>
