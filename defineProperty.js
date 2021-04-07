let obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: [
    1, 2, 3, 4
  ]
}

Object.defineProperty(obj, 'a', {
  configurable: false
})

delete obj.a
console.log(obj) //a无法被删除

Object.defineProperty(obj, 'b', {
  enumerable: false
})

for (let key in obj) {
  console.log('key', key) //没有b
}

console.log(obj) // 直接打印obj也看不到b属性
console.log(obj.b) //但可以正常读取

Object.defineProperty(obj, 'c', {
  writable: false
})

obj.c = 5

console.log(obj) //无法被修改

Object.defineProperty(obj, 'd', {
  get() {
    // console.log('this', this)
    return this.e
  },
  set(value) {
    this.e = value
  }
})

console.log(obj.d)

obj.d = [3, 4, 5, 6, 7, 8, 9]

console.log(obj.d)
