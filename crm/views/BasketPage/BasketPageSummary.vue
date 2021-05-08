<template>
  <div class="page-summary">
    Общая стоимость
    {{ summary }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { useGetter } from '~/store'

export default defineComponent({
  name: 'BasketPageSummary',

  setup () {
    const getCurrencies = useGetter('products/getCurrenciesByProduct')
    const basketProducts = computed(() => useGetter('basket/products'))
    const summary = computed(() => {
      return Object.values(basketProducts.value)
        .reduce(function (summary, info) {
          const rub = getCurrencies(info.product).rub
          const price = Number(rub) * info.count || 0
          return summary + price
        }, 0)
    })

    const visibleSummary = computed(() => {
      return (summary.value || 0).toFixed(1)
    })

    return {
      summary: visibleSummary
    }
  }
})
</script>

<style lang="scss" scoped>
.page-summary {
  border: 1px solid black;
}
</style>
