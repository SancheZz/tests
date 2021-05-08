<template>
  <div class="post-wrapper">
    <div class="user-post">
      <!-- user photo -->
      <post-author
        :author="post"
        :image-size="70"
        class="user-post__author"
      ></post-author>

      <!-- post message -->
      <div class="post-content">
        <img
          v-if="image"
          :src="image"
          class="post-content__image"
          alt="post image"
        >

        <div class="post-content__message">
          <span class="message-date">
            {{ date }}
          </span>

          {{ post.message }}
        </div>
      </div>
    </div>

    <!-- comments -->
    <post-comments
      :post="post"
    ></post-comments>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { format } from 'date-fns';
import PostAuthor from '../UserPostAuthor/UserPostAuthor.vue';
import PostComments from './UserPostComments.vue';

import type { PropType } from '@vue/composition-api';
import type { UserPost } from '@/store/PostsPage/types';

const imageRegexp = /http(?:s)?:\/\/.*?\.(?:png|jpg|jpeg)/;

export default defineComponent({
  name: 'UserPost',

  components: {
    PostAuthor,
    PostComments,
  },

  props: {
    post: {
      type: Object as PropType<UserPost>,
      required: true,
    },
  },

  setup (props) {
    const image = props.post.message.match(imageRegexp);

    const date = computed(() => format(props.post.date, 'do MMMM, HH:mm:ss'));

    return {
      date,
      image,
    };
  },
});
</script>

<style lang="scss" scoped>
.post-wrapper {
  margin: 0 0 40px;
}

.user-post {
  display: flex;
  padding: 20px;
  margin: 10px 0;
  border: 1px solid black;

  &__author {
    flex: 0 0 70px;
    margin: 0 30px 0 0;
  }
}

.post-content {
  flex: 1 1 100%;

  &__image {
    display: block;
    max-width: 100%;
    margin: 0 0 10px;
  }

  &__message {
    line-height: 1.5;
    word-break: break-all;
  }
}

.message-date {
  font-weight: bold;
}
</style>
