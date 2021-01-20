<template>
  <van-empty v-if="isEmpty" description="购物车中没有商品" />
  <div
    v-for="(num, key) in data.purchaseQuantity"
    :key="key"
    style="display: flex"
  >
    <div
      style="
        display: flex;
        width: 12%;
        justify-content: center;
        background: #fafafa;
      "
    >
      <van-checkbox v-model="data.checkedList[key]" shape="square" />
    </div>
    <van-card
      :key="key"
      :price="`${productList[key].price * num}.00`"
      :title="productList[key].name"
      :num="num"
      :thumb="productList[key].imageUrl"
      currency="合计:"
      style="width: 88%"
    />
  </div>
  <div style="height: 55px" />
  <!--将isSelectAll作为参数传入selectAll方法，如果在selectAll直接调用isSelectAll的话无法正常工作,因为isSelectAll依赖于checkedList,而selectAll方法会改变checkedList-->
  <van-submit-bar :price="totalPrice" button-text="提交订单">
    <van-checkbox
      v-model="isSelectAll"
      :disabled="isEmpty"
      @click="selectAll(!isSelectAll)"
    >全选</van-checkbox>
  </van-submit-bar>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount, computed } from 'vue'
import shopping from '@/store/modules/shopping'
import { PurchaseQuantity } from '@/types/productList'

interface CheckedList {
  [key: number]: boolean;
}

interface Data {
  purchaseQuantity: PurchaseQuantity;
  checkedList: CheckedList;
}

export default defineComponent({
  setup() {
    const { productList } = shopping
    const data = reactive<Data>({
      checkedList: {},
      purchaseQuantity: {}
    })

    // 判断购物车是否为空
    const isEmpty = computed(
      () => Object.keys(data.purchaseQuantity).length === 0
    )

    // 判断是否全选
    const isSelectAll = computed(() => {
      // 如果购物车为空直接返回false
      if (isEmpty.value) {
        return false
      }
      let _isSelectAll = true
      const { checkedList } = data

      for (const key in checkedList) {
        if (!checkedList[key]) {
          _isSelectAll = false
          break
        }
      }

      return _isSelectAll
    })

    // 计算总价
    const totalPrice = computed(() => {
      let _totalPrice = 0
      const { checkedList, purchaseQuantity } = data

      for (const key in checkedList) {
        if (checkedList[key]) {
          _totalPrice += purchaseQuantity[key] * productList[key].price
        }
      }
      // van-submit-bar中price单位为分
      return _totalPrice * 100
    })

    // 全选
    const selectAll = (checked: boolean) => {
      const { checkedList } = data

      for (const key in checkedList) {
        checkedList[key] = checked
      }
    }

    onBeforeMount(() => {
      const obj: PurchaseQuantity = {}
      const _checkedList: CheckedList = {}
      const _purchaseQuantity = shopping.purchaseQuantity
      for (const key in _purchaseQuantity) {
        // 进行过滤，只留下数量大于1的
        if (_purchaseQuantity[key] > 0) {
          obj[key] = _purchaseQuantity[key]
          _checkedList[key] = false
        }
      }
      data.purchaseQuantity = obj
      data.checkedList = _checkedList
    })

    return {
      productList,
      data,
      isSelectAll,
      selectAll,
      totalPrice,
      isEmpty
    }
  }
})
</script>
