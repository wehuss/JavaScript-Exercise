import { MockMethod } from 'vite-plugin-mock'
import { ProductList } from '../src/types/productList'

const productList: ProductList[] = [
  {
    imageUrl: 'https://img11.360buyimg.com/n1/jfs/t1/151244/32/4743/434561/5f9aa570Ed90af142/5a17a266b29e293a.png',
    name: '技嘉 RTX3070 GAMING OC魔鹰',
    price: 5000.00
  },
  {
    imageUrl: 'https://img13.360buyimg.com/n1/jfs/t1/170809/25/2893/201652/6002524aE85b4a509/b2e3fcc59f59a368.jpg',
    name: 'RTX 3060Ti Vulcan火神 OC 8G',
    price: 4100.00
  },
  {
    imageUrl: 'https://img10.360buyimg.com/n1/s450x450_jfs/t1/139822/17/10437/93338/5f83f4a4E35e6ef0d/d0eca33d417ab932.jpg',
    name: '英特尔（Intel）i5-10600KF ',
    price: 1400.00
  },
  {
    imageUrl: 'https://img14.360buyimg.com/n1/s450x450_jfs/t1/121696/26/17096/70007/5f9e307bEbf457f1c/3ca325d89f518d63.jpg',
    name: 'AMD 锐龙5 5600X 处理器',
    price: 2300.00
  },
  {
    imageUrl: 'https://img12.360buyimg.com/n1/s450x450_jfs/t1/147815/18/12804/68064/5f9e2f25E76d6ebca/c218aad136a6ef4e.jpg',
    name: 'AMD 锐龙9 5950X 处理器',
    price: 7500.00
  },
  {
    imageUrl: 'https://img10.360buyimg.com/n1/s450x450_jfs/t1/136326/28/8148/72224/5f45fa5eEeca30302/7e3311a2f38d367c.jpg',
    name: '英特尔（Intel）i9-10900KF',
    price: 4000.00
  },
  {
    imageUrl: 'https://img14.360buyimg.com/n1/s450x450_jfs/t1/121696/26/17096/70007/5f9e307bEbf457f1c/3ca325d89f518d63.jpg',
    name: 'AMD 锐龙7 5700X 处理器',
    price: 3000.00
  },
  {
    imageUrl: 'https://img12.360buyimg.com/n1/s450x450_jfs/t1/147815/18/12804/68064/5f9e2f25E76d6ebca/c218aad136a6ef4e.jpg',
    name: 'AMD 锐龙5 3600 处理器',
    price: 1200.00
  }
]

export default [
  {
    url: '/api/productList',
    method: 'get',
    response: () => {
      // console.log('body>>>>>>>>', body)
      return {
        code: 0,
        message: 'ok',
        data: productList
      }
    }
  }
] as MockMethod[]
