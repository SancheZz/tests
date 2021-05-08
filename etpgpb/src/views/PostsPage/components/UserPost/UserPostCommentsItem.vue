<template>
  <div class="comments-item">
    <post-author
      :author="comment"
      :image-size="30"
      class="comments-item__author"
    ></post-author>

    <div class="comments-item__message">
      {{ comment.message }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import PostAuthor from '../UserPostAuthor/UserPostAuthor.vue';

import type { PropType } from '@vue/composition-api';
import type { PostComment } from '@/store/PostsPage/types';

export default defineComponent({
  name: 'UserPostCommentsItem',

  components: {
    PostAuthor,
  },

  props: {
    comment: {
      type: Object as PropType<PostComment>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.comments-item {
  display: flex;
  align-items: flex-start;
  margin: 10px 0;

  &__author {
    flex: 0 0 30px;
    margin: 0 20px 0 0;
  }

  &__message {
    flex: 1 1 100%;
  }

  &:first-of-type {
    margin-top: 20px;
  }
}
</style>
