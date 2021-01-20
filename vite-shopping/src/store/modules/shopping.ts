import { VuexModule, Module, MutationAction, getModule, Mutation } from 'vuex-module-decorators'
import { ProductList, PurchaseQuantity } from '@/types/productList'
import axios, { AxiosResponse } from 'axios'
import store from '../index'

@Module({ dynamic: true, store, name: 'Shopping' })
class Shopping extends VuexModule {
  productList: ProductList[] = []

  purchaseQuantity: PurchaseQuantity = {}

  @Mutation
  changePurchaseQuantity({ key, add }: { key: number, add: boolean }) {
    if (add) {
      this.purchaseQuantity[key]++
    } else {
      this.purchaseQuantity[key] > 0 && this.purchaseQuantity[key]--
    }
  }

  @MutationAction
  async getProductList() {
    const data = (await axios.get<any, AxiosResponse<{ data: ProductList[] }>>('/api/productList')).data.data
    // 初始化
    const purchaseQuantity: PurchaseQuantity = {}
    data.forEach((_product, index) => {
      purchaseQuantity[index] = 0
    })

    return {
      productList: data,
      purchaseQuantity
    }
  }
}

export default getModule<Shopping>(Shopping)
