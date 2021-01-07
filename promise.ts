const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

let i = 0

// 实现简易的promise，实现了单promise函数的简单链式调用：promise().then().catch()
// 未实现多promise函数的调用：promiseFn1().then(promiseFn2()).then().catch ======>Error
interface MyPromise {
  state: 'pending' | 'fulfilled' | 'rejected';
  result: any;
  name: string;
  onRejected: ((reason?: any) => any)[]
  onFulfilled: ((result?: any) => any)[]
}

class MyPromise implements MyPromise {
  constructor(executor: (resolve: (value?: any) => void, reject: (reason?: any) => void) => any, name: string) {
    this.state = PENDING
    this.result = null
    this.onRejected = []
    this.onFulfilled = []
    this.name = name

    const resolve = (value: any) => {
      this.state = FULFILLED
      this.result = value
      // console.log('resolve->this', this)
      this.onFulfilled.forEach(fn => this.then(fn))
    }

    const reject = (reason: any) => {
      this.state = REJECTED
      this.result = reason
      this.onRejected.forEach(fn => this.catch(fn.bind(this, this.result)))
    }

    executor(resolve, reject)
  }

  then(fulfilledFn?: (result?: any) => void, rejectedFn?: (result?: any) => void) {
    // console.log('this',this)
    const returnPromise = new MyPromise((resolve) => {
      switch (this.state) {
        case 'pending':
          // console.log('pending')
          fulfilledFn && this.onFulfilled.push(fulfilledFn)
          rejectedFn && this.onRejected.push(rejectedFn)
          // console.log('fulfilledFn',fulfilledFn,this.onFulfilled,this.onFulfilled.length)
          break
        case 'fulfilled':
          // console.log('this','fulfilled')
          const callbackValue = fulfilledFn && fulfilledFn(this.result)
          resolve(callbackValue)
          break
        case 'rejected':
          rejectedFn && rejectedFn(this.result)
      }
    }, `函数${i++}`)
    console.log('<<<<<<<<<<<<<<<<<<<<<<')
    console.log('this', this)
    console.log('-------------------------------')
    console.log('returnPromise', returnPromise)
    // console.log('returnPromise',returnPromise,fulfilledFn,rejectedFn)
    console.log('-------------------------------')
    console.log('fulfilledFn', fulfilledFn, 'rejectedFn', rejectedFn)
    console.log('>>>>>>>>>>>>>>>>>>>>>>')
    // console.log('this', this, 'fulfilledFn', fulfilledFn, 'state', this.state)
    // console.log('returnPromise',returnPromise)
    return returnPromise
  }

  catch(rejectedFn: (reason?: any) => void) {
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
    resolve('test value')
  }, 100);
}, '函数一')

promiseFn().then((data) => {
  console.log('promiseFn then', data)
  return 100
}, () => { }).then((data) => {
  console.log('promiseFn then2', data)
})
