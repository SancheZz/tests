<template>
  <div>
    <comments-item
      v-for="comment in post.comments"
      :key="comment.id"
      :comment="comment"
    ></comments-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import CommentsItem from './UserPostCommentsItem.vue';

import type { PropType } from '@vue/composition-api';
import type { UserPost } from '@/store/PostsPage/types';

export default defineComponent({
  name: 'UserPostComments',

  components: {
    CommentsItem,
  },

  props: {
    post: {
      type: Object as PropType<UserPost>,
      required: true,
    },
  },
});
</script>
