const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

let i = 0

// enum PromiseState{
//   PENDING='pending',
//   FULFILLED='fulfilled',
//   REJECTED=rejected
// }
interface MyPromise {
  state: 'pending' | 'fulfilled' | 'rejected';
  result: any;
  nextFn: MyPromise;
  name: string
  onRejected: ((reason?: any) => any) | null;
  onFulfilled: ((result?: any) => any) | null;
}

class MyPromise implements MyPromise {
  constructor(executor: (resolve: (value?: any, that?: MyPromise) => void, reject: (reason?: any, that?: MyPromise) => void) => any, name: string) {
    this.state = PENDING
    this.result = null
    this.onRejected = null
    this.onFulfilled = null
    // 用于测试时区分返回的promise，无实际作用
    this.name = name

    const resolve = (value: any, that?: MyPromise): void => {
      const _this = that || this
      _this.state = FULFILLED
      _this.result = value
      _this.onFulfilled && _this.then(_this.onFulfilled)
    }

    const reject = (reason: any, that?: MyPromise): void => {
      const _this = that || this
      _this.state = REJECTED
      _this.result = reason
      _this.onRejected && _this.then(undefined,_this.onRejected)
      // _this.onRejected.forEach(fn => _this.then(undefined, fn))
    }

    executor(resolve, reject)
  }

  // 异步调用resolve的话then会执行两次，一次pending，一次fulfilled/rejected
  then(fulfilledFn?: (result?: any) => any, rejectedFn?: (reason?: any) => any) {
    // 返回一个新的promise，实现链式调用
    const returnPromise = new MyPromise((resolve, reject) => {
      try {
        switch (this.state) {
          case 'pending':
            // fulfilledFn && this.onFulfilled.push(fulfilledFn)
            // rejectedFn && this.onRejected.push(rejectedFn)
            if (fulfilledFn) {
              this.onFulfilled = fulfilledFn
            }
            if (rejectedFn) {
              this.onRejected = rejectedFn
            }
            break
          case 'fulfilled':
            const callbackValue = fulfilledFn && fulfilledFn(this.result)
            // 用resolve.call(this.nextFn,...)的话resolve函数的this还是会指向新的returnPromise而不是传入promise，故暂时使用参数的方式传递
            resolve(callbackValue, this.nextFn)//调用下一个promise的then
            break
          case 'rejected':
            rejectedFn && rejectedFn(this.result)
        }
      } catch (e) {
        reject('我是抛出的错误w(ﾟДﾟ)w', this.nextFn)
      }
    }, `函数${i++}`)
    if (!this.nextFn) {
      // 绑定下一个promise函数,如果是异步调用resolve的话第二次调用时会产生一个下的returnPromise，无法拿到传入的回调函数
      this.nextFn = returnPromise
    }
    return returnPromise
  }

  // catch还没想好怎么处理，暂时注释
  // catch(rejectedFn: (reason?: any) => void) {
  //   switch (this.state) {
  //     case 'pending':
  //       this.onRejected.push(rejectedFn)
  //       break
  //     case 'rejected':
  //       rejectedFn(this.result)
  //       break
  //   }
  // }
}

const promiseFn = () => new MyPromise((resolve) => {
  setTimeout(() => {
    resolve('test value')
  }, 100);
}, '函数1')

promiseFn().then((data) => {
  console.log('promiseFn then', data)
  throw new Error()
}).then((data) => {
  return 'then2 value'                                                         
}, (error) => { console.log('捕获到抛出的错误:',error) }).then(data => console.log('then3', data))
// catch无法工作
// .catch(() => { console.log('出错了。。。。。。。。。。') })
