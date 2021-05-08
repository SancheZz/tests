<template>
  <form
    class="page-adding"
    @submit="handleSubmit"
  >
    <input
      v-model="message"
      type="text"
      class="page-adding__input"
    >

    <page-button
      :disabled="isSubmitDisabled"
      class="page-adding__submit"
    >
      Добавить
    </page-button>
  </form>
</template>

<script lang="ts">
import { useMutation } from '@/store';
import { defineComponent, ref, computed } from '@vue/composition-api';
import PageButton from './components/PageButton/PageButton.vue';

export default defineComponent({
  name: 'PostsPageAdding',

  components: {
    PageButton,
  },

  setup () {
    const message = ref('');
    const isSubmitDisabled = computed(() => !message.value.trim());

    const addPost = useMutation('PostsPage/addPost');
    const handleSubmit = (event: Event) => {
      event.preventDefault();
      addPost({ message: message.value });
      message.value = '';
    };

    return {
      message,
      isSubmitDisabled,
      handleSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-adding {
  display: flex;
  margin: 0 0 40px;

  &__input {
    flex: 1 1 100%;
    margin: 0 10px 0 0;
    padding: 8px 4px;
  }

  &__submit {
    flex: 0 0 auto;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }
}
</style>
