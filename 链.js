class LazyManClass {
  constructor(name) {
    this.taskList = []
    this.name = name
    setTimeout(() => {
      this.next()
    }, 0);
  }

  eat(food) {
    this.taskList.push(() => {
      console.log(`I am eating ${food}`);
      this.next()
    })
    return this
  }

  sleep(time) {
    this.taskList.push(() => setTimeout(() => {
      // console.log(`过去了${time}秒`)
      this.next()
    }, time * 1000))
    return this
  }

  sleepFirst(time) {
    this.taskList.unshift(() => setTimeout(() => {
      // console.log(`过去了${time}秒`)
      this.next()
    }, time * 1000))
    return this
  }

  next() {
    // console.log(this.taskList)
    let fn = this.taskList.shift()
    fn && fn()
  }
}

const lazyMan = new LazyManClass('我')

lazyMan.eat('饭').sleepFirst(10).sleep(1).eat('饭')