import { VuexModule, Module, MutationAction, getModule } from 'vuex-module-decorators'
import { ProductList } from '@/types/productList'
import axios, { AxiosResponse } from 'axios'
import store from '../index'

@Module({ dynamic: true, store, name: 'Shopping' })
class Shopping extends VuexModule {
  productList: ProductList[] = []

  @MutationAction
  async getProductList() {
    const data = await axios.get<any, AxiosResponse<{ data: ProductList[] }>>('/api/productList')
    return {
      productList: data.data.data
    }
  }
}

export default getModule<Shopping>(Shopping)
