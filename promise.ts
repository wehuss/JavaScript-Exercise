const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 实现简易的promise，实现了单promise函数的简单链式调用：promise().then().catch()
// 未实现多promise函数的调用：promiseFn1().then(promiseFn2()).then().catch ======>Error
interface MyPromise {
  state: 'pending' | 'fulfilled' | 'rejected';
  result: any;
  onRejected: ((reason?: any) => any)[]
  onFulfilled: ((result?: any) => any)[]
}

class MyPromise implements MyPromise {
  constructor(executor: (resolve: (value?: any) => any, reject: (reason?: any) => any) => any) {
    this.state = PENDING
    this.result = null
    this.onRejected = []
    this.onFulfilled = []

    const resolve = (value: any) => {
      console.log('resolve')
      this.state = FULFILLED
      this.result = value
      this.onFulfilled.forEach(fn => this.then(fn.bind(this, this.result)))
    }

    const reject = (reason: any) => {
      console.log('reject')
      this.state = REJECTED
      this.result = reason
      this.onRejected.forEach(fn => this.catch(fn.bind(this, this.result)))
    }

    executor(resolve, reject)
  }

  then(fulfilledFn: (result?: any) => any) {
    console.log('this', this, 'fulfilledFn', fulfilledFn, 'state', this.state)
    switch (this.state) {
      case 'pending':
        console.log('进入pending')
        this.onFulfilled.push(fulfilledFn)
        break
      case 'fulfilled':
        console.log('进入fulfilled')
        fulfilledFn()
        break
    }
    return {
      catch: this.catch.bind(this),
    }
  }

  catch(rejectedFn: (reason?: any) => any) {
    switch (this.state) {
      case 'pending':
        this.onRejected.push(rejectedFn)
        break
      case 'rejected':
        rejectedFn(this.result)
        break
    }
  }
}

const promiseFn = () => new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log('time out')
    resolve('test value')
  }, 1000);
})

promiseFn().then((data) => console.log('promiseFn then', data)).catch(() => { console.log('catch') })