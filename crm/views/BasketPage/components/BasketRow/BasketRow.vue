<template>
  <tr class="basket-row">
    <td>{{ product.name }}</td>
    <td>{{ count }}</td>
    <td>{{ currencies.rub }} / шт.</td>

    <td>
      <button
        type="button"
        @click="remove"
      >
        Удалить
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api'
import { Product } from '@/types/products'
import { useGetter, useMutation } from '@/store'

export default defineComponent({
  name: 'BasketRow',

  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    },

    count: {
      type: Number as PropType<number>,
      default: 0
    }
  },

  setup (props) {
    const getCurrencies = useGetter('products/getCurrenciesByProduct')
    const currencies = computed(() => getCurrencies(props.product))
    const deleteBasketProducts = useMutation('basket/delete')
    const remove = () => deleteBasketProducts(props.product)

    return {
      currencies,
      remove
    }
  }
})
</script>
