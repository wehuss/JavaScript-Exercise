const debounce = (fn, delay) => {
  let timer = null
  return function () {
    // if(timer){
    //   timer=null
    // }
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...arguments)
    }, delay);
  }
}

const throttle = (fn, delay) => {
  let timer = null

  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.call(this, ...arguments)
        timer = null
      }, delay);
    }
  }
}

const testDebounceFn = debounce((frequency) => console.log('第几次被调用:', frequency), 1000)
testDebounceFn()
testDebounceFn()
testDebounceFn()
testDebounceFn()
testDebounceFn()
testDebounceFn()
testDebounceFn()
// 等待一秒后执行此函数
testDebounceFn('最后一次调用')

const testThrottleFn = throttle((frequency) => console.log('第几次被调用:', frequency), 1000)

// 等待一秒后执行此函数
testThrottleFn('第一次调用')
testThrottleFn()
testThrottleFn()
testThrottleFn()