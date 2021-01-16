// 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
const debounce = (fn, delay) => {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...arguments)
    }, delay);
  }
}

// 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
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