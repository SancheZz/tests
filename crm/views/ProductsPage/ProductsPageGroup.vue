<template>
  <table
    v-if="hasProducts"
    class="page-group"
  >
    <thead>
      <tr>
        <td
          class="page-group__name"
          colspan="4"
        >
          {{ group.name }}
        </td>
      </tr>
    </thead>

    <tbody>
      <product-item
        v-for="product in group.products"
        :key="product.id"
        :product="product"
      />
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import type { PropType } from '@nuxtjs/composition-api'
import type { Group } from '@/types/products'
import ProductItem from './components/ProductItem/ProductItem.vue'

export default defineComponent({
  name: 'ProductsPageGroup',

  components: {
    ProductItem
  },

  props: {
    group: {
      type: Object as PropType<Group>,
      required: true
    }
  },

  setup (props) {
    const hasProducts = computed(() => {
      return props.group.products.some(product => product.count)
    })

    return {
      hasProducts
    }
  }
})
</script>

<style lang="scss" scoped>
.page-group {
  border-collapse: collapse;
  width: 100%;

  &__name {
    grid-area: name;
    border-bottom: 1px solid black;
    padding: 8px 4px;
    margin: 0 0 4px;
  }
}
</style>
