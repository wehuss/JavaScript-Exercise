let currentEffect;

class Dep {
  constructor() {
    // 确保不会添加重复的effect
    this.effects = new Set()
  }

  // 获取proxy的值时会调用此方法
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect)
    }
  }

  // 更改proxy的值时会调用此方法执行所有effect
  notify() {
    this.effects.forEach(effect => effect())
  }
}

const watchEffect = (effect) => {
  currentEffect = effect
  // 调用传入的effect，如果读取了proxy的值就会将传入的effect加入到订阅列表中
  effect()
  currentEffect = null
}

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
const targetMap = new WeakMap()

const reactive = (raw) => {
  const getDep = (target, key) => {
    // 先通过proxy的target找到该proxy所有的effect
    let depsMap = targetMap.get(target)

    // 第一次调用此方法时初始化一个空map
    if (!depsMap) {
      depsMap = new Map()
      // 将proxy的target设为键
      targetMap.set(target, depsMap)
    }

    let dep = depsMap.get(key)

    // 第一次调用此方法时初始化一个空dep
    if (!dep) {
      dep = new Dep()
      depsMap.set(key, dep)
    }
    // console.log('targetMap',targetMap,'depsMap',depsMap,'dep',dep)
    return dep
  }

  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(target, key)
      // 添加effect
      dep.depend()

      return Reflect.get(...arguments)
    },
    // 被修改后时调用dep的notify通知所有effect
    set(target, key) {
      const dep = getDep(target, key)
      Reflect.set(...arguments)
      dep.notify()
    }
  })
}