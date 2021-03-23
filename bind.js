let obj1 = {
  value: 'obj1 value',
  getValue() {
    console.log(this)
    console.log(this.value)
  }
}

let obj2 = {
  value: 'obj2 value',
  getValue() {
    console.log(this.value)
  }
}

let obj3 = {
  value: 'obj3 value',
  getValue() {
    console.log(this.value)
  }
}

let fn = obj1.getValue.bind(obj2)
let fn2 = obj1.getValue
obj1.getValue()
fn() //  --->obj2
fn2() // --->undefind

// 通过bind创建的函数无法再改变指向
fn.call(obj3) // --->obj2
fn2.call(obj3) // --->obj3
