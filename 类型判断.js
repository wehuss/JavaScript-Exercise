function fn1(target){
  return Object.prototype.toString.call(target)
}

function fn2(target){
  return typeof target
}


console.log(fn1({}))
// ->[object Object]

console.log(fn1([]))
// ->[object Array] 

console.log(fn1(''))
// ->[object String]

console.log(fn2({}))
// ->object

console.log(fn2([]))
// ->object

console.log(fn2(''))
// ->string