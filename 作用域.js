let a=1

function foo(a){
  function foo(a=7){
    // 遮蔽效应
    console.log(a)
  }
  foo()
}

// 7
foo(3)

let b=3
function foo2(a,c){
  eval(a)
  console.log(b,c)
}
//      => 3,3
// 推测可能是eval执行时产生了块级作用域
foo2('let b=4',3)

//      =>  4 3
foo2('var b=4',3)

//ReferenceError: b is not defined
//如果注释掉外层的b就会报错
//foo2('"use strict";var b=4',3)
