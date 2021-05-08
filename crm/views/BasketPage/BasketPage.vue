<template>
  <div class="basket-page">
    <table>
      <tbody>
        <basket-row
          v-for="(info, index) in products"
          :key="index"
          :product="info.product"
          :count="info.count"
        />
      </tbody>
    </table>

    <basket-summary />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { useGetter } from '@/store'
import BasketRow from './components/BasketRow/BasketRow.vue'
import BasketSummary from './BasketPageSummary.vue'

export default defineComponent({
  name: 'BasketPage',

  components: {
    BasketRow,
    BasketSummary
  },

  setup () {
    const basketProducts = computed(() => useGetter('basket/products'))
    const products = computed(() => Object.values(basketProducts.value))

    return {
      products
    }
  }
})
</script>

<style lang="scss" scoped>
.basket-page {
  width: 800px;
  margin: 100px auto 0;
  font-size: 14px;
}
</style>
