<template>
  <div>
    <products-page />
    <basket-page />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ProductsPage from '@/views/ProductsPage/ProductsPage.vue'
import BasketPage from '@/views/BasketPage/BasketPage.vue'

export default defineComponent({
  name: 'PageProducts',

  components: {
    ProductsPage,
    BasketPage
  }
})
</script>
