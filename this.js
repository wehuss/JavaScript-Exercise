function foo(num) {
  this.count++
}
count = 0
foo.count = 0

for (let i = 0; i < 5; i++) {
  //=>global count 0 foo count 5
  foo.call(foo, i)
  //global count 5 foo count 0
  foo(i)

  //global count 5 foo count 0,使用null或undefined作为this的绑定对象传入是会被忽略
  foo.call(null, i)
}

console.log('global count', count, 'foo count', foo.count)

// 箭头函数this指向为它构建时上下文的this指向，无法被更改
const fn = () => {
  this.count = 777
  console.log(this.count)
}

fn()

fn.call({ count: 888 })

console.log('this',this)