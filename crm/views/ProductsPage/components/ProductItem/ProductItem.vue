<template>
  <tr
    v-if="product.count"
    :class="classes"
  >
    <td class="product-item__name">
      {{ product.name }}
    </td>

    <td class="product-item__count">
      {{ product.count }}
      {{ wordCount }}
    </td>

    <td class="product-item__currency">
      {{ product.price }} USD
      ({{ currencies.rub }} RUB)
    </td>

    <td class="product-item__button">
      <button
        class="item-add"
        @click="addItem"
      >
        Добавить в корзину
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import type { PropType } from '@nuxtjs/composition-api'
import type { Product } from '@/types/products'
import { defineComponent, computed, watch, ref } from '@nuxtjs/composition-api'
import plural from 'plural-ru'
import { useGetter, useMutation } from '@/store'

export default defineComponent({
  name: 'ProductItem',

  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  },

  setup (props) {
    const getCurrencies = useGetter('products/getCurrenciesByProduct')
    const currencies = computed(() => getCurrencies(props.product))

    const wordCount = plural(
      props.product.count,
      'штука', 'штуки', 'штук'
    )

    const isGreater = ref(false)
    const isLess = ref(false)

    const classes = computed(() => {
      const cssClassName = 'product-item'
      return [cssClassName, {
        [`${cssClassName}--red`]: isGreater.value,
        [`${cssClassName}--green`]: isLess.value
      }]
    })

    watch(currencies, (newCurrencies, oldCurrencies) => {
      const newRub = Number(newCurrencies?.rub)
      const oldRub = Number(oldCurrencies?.rub)

      if (newRub !== oldRub) {
        const condition = newRub > oldRub
        isGreater.value = condition
        isLess.value = !condition
      }
    })

    watch(isGreater, (value) => {
      if (value) {
        setTimeout(() => (isGreater.value = false), 100)
      }
    })

    watch(isLess, (value) => {
      if (value) {
        setTimeout(() => (isLess.value = false), 100)
      }
    })

    const addBasketItem = useMutation('basket/add')
    const countBasketProduct = useGetter('basket/count')
    const count = computed(() => countBasketProduct(props.product))
    const addItem = () => {
      if (count.value < props.product.count) {
        addBasketItem(props.product)
      }
    }

    return {
      classes,
      currencies,
      wordCount,
      addItem
    }
  }
})
</script>

<style lang="scss" scoped>
@mixin cell {
  padding: 4px;
}

.product-item {
  transition: background 0.1s linear;

  &__name {
    @include cell;

    width: 100%;
  }

  &__count {
    @include cell;

    white-space: nowrap;
  }

  &__currency {
    @include cell;

    white-space: nowrap;
  }

  &__button {
    @include cell;

    vertical-align: middle;
    text-align: center;
    white-space: nowrap;
  }

  &--red {
    background: red;
  }

  &--green {
    background: green;
  }
}

.item-add {
  cursor: pointer;
}
</style>
