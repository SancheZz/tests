<template>
  <article class="products-page">
    <h3 class="products-page__title">
      Продукты
    </h3>

    <page-group
      v-for="group in groups"
      :key="group.id"
      :group="group"
    />
  </article>
</template>

<script lang="ts">
import { defineComponent, useFetch, onMounted, onUnmounted } from '@nuxtjs/composition-api'
import { useState, useAction } from '@/store'
import PageGroup from './ProductsPageGroup.vue'

export default defineComponent({
  name: 'ProductsPage',

  components: {
    PageGroup
  },

  setup () {
    const loadGroups = useAction('products/loadGroups')
    const loadData = useAction('products/loadData')
    const updateData = useAction('products/updateData')

    const { fetch } = useFetch(async () => {
      await loadGroups()
      await loadData()
    })

    const products = useState('products')

    fetch()

    let isMounted = false

    onMounted(async () => {
      isMounted = true
      // eslint-disable-next-line no-unmodified-loop-condition
      while (isMounted && products.exchangeRub < 80) {
        await updateData(products.exchangeRub + 1)
      }
    })

    onUnmounted(() => {
      isMounted = false
    })

    return {
      groups: products.groups
    }
  }
})
</script>

<style lang="scss" scoped>
.products-page {
  width: 800px;
  margin: 0 auto;
  font-size: 14px;

  &__title {
    border-bottom: 1px solid black;
    padding: 10px 0;
    font-weight: normal;
    margin: 0 0 30px;
  }
}
</style>
