<template>
  <div class="page-themes">
    <!-- light -->
    <theme-button
      scheme="light"
      class="page-themes__button"
    >
      Set light mode
    </theme-button>

    <!-- dark -->
    <theme-button
      scheme="dark"
      class="page-themes__button"
    >
      Set dark mode
    </theme-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ThemeButton from './components/ThemeButton/ThemeButton.vue';

export default defineComponent({
  name: 'PostsPageThemes',

  components: {
    ThemeButton,
  },
});
</script>

<style lang="scss" scoped>
.page-themes {
  margin: 20px 0 10px 0;

  &__button {
    margin: 0 10px 0 0;
  }
}
</style>
