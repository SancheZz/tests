<template>
  <div class="post-author">
    <img
      ref="userPhoto"
      :src="author.userPhoto"
      :width="imageSize"
      :height="imageSize"
      class="post-author__photo"
      @mouseenter="setNameVisibility(true)"
      @mouseleave="setNameVisibility(false)"
      @load="handleImageLoad"
    >

    <author-name
      v-if="isNameShowed"
      :author="author"
      :position="position"
    ></author-name>

    <!-- portals -->
    <portal-target
      name="author"
    ></portal-target>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import AuthorName from './UserPostAuthorName.vue';

import type { PropType } from '@vue/composition-api';
import type { Author, TooltipPosition } from './types';

export default defineComponent({
  name: 'UserPostAuthor',

  components: {
    AuthorName,
  },

  props: {
    author: {
      type: Object as PropType<Author>,
      required: true,
    },

    imageSize: {
      type: Number as PropType<number>,
      required: true,
    },
  },

  setup (props, context) {
    const position = ref<TooltipPosition | null>(null);
    const isNameShowed = ref(false);

    onMounted(() => {
      const image = context.refs.userPhoto as HTMLImageElement;
      position.value = image.getBoundingClientRect();
    });

    const setNameVisibility = (condition: boolean) => {
      isNameShowed.value = condition;
    };

    const handleImageLoad = (event: Event) => {
      const image = event.currentTarget as HTMLImageElement;
      const imagePosition = image.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;
      position.value = {
        top: imagePosition.top + scrollY,
        left: imagePosition.left + scrollX,
        height: imagePosition.height,
        width: imagePosition.width,
      };
    };

    return {
      position,
      isNameShowed,
      handleImageLoad,
      setNameVisibility,
    };
  },
});
</script>

<style lang="scss" scoped>
.post-author {
  &__photo {
    border-radius: 50%;
  }
}
</style>
