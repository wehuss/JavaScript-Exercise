function foo() {
  console.log(a)
}

function bar() {
  var a = 3
  foo()
}

var a = 2

// =>2 javascript没有动态作用域
bar()