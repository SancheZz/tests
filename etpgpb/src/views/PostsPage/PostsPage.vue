<template>
  <main :class="classes">
    <div class="page-content">
      <!-- posts -->
      <div class="page-content__items">
        <!-- dark and light themes -->
        <page-themes></page-themes>

        <!-- add post form -->
        <page-adding></page-adding>

        <!-- posts -->
        <user-post
          v-for="post in posts"
          :key="post.id"
          :post="post"
        ></user-post>
      </div>

      <!-- popular -->
      <page-popular></page-popular>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from '@vue/composition-api';
import { useState, useMutation } from '@/store';
import PageThemes from './PostsPageThemes.vue';
import PageAdding from './PostsPageAdding.vue';
import PagePopular from './PostsPagePopular.vue';
import UserPost from './components/UserPost/UserPost.vue';

export default defineComponent({
  name: 'PostsPage',

  components: {
    PageAdding,
    PageThemes,
    PagePopular,
    UserPost,
  },

  setup () {
    const scheme = computed(() => useState('PostsPage', 'theme'));
    const classes = computed(() => {
      const cssClassName = 'posts-page';
      return [
        cssClassName,
        `${cssClassName}--${scheme.value}`,
      ];
    });

    const posts = computed(() => useState('PostsPage', 'posts'));

    const initPosts = useMutation('PostsPage/initPosts');
    onMounted(() => initPosts(undefined));

    return {
      classes,
      posts,
    };
  },
});
</script>

<style lang="scss" scoped>
.posts-page {
  min-height: 100vh;

  &--light {
    color: black;
    background-color: white;
  }

  &--dark {
    color: white;
    background-color: black;
  }
}

.page-content {
  display: flex;
  width: 1024px;
  margin: 0 auto;

  &__items {
    flex: 0 0 700px;
    margin: 0 40px 0 0;
  }
}
</style>
