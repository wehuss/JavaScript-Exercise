const arr = [0, 1, 2, 3, 4, 5, 6, 7]
// 循环速度(大概):for > while > for of ≈ for in > forEach
const callbackFn = (num) => {
  let _num = num
  _num++
  _num--
  _num++
  _num--
  ++_num
}


let whileIndex = 0

console.time('while')

while (whileIndex < arr.length) {
  callbackFn(arr[whileIndex])
  whileIndex++
}

console.timeEnd('while')
// while: 0.005ms


console.time('for')

for (let i = 0; i < arr.length; i++) {
  callbackFn(arr[i])
}

console.timeEnd('for')
// for: 0.005ms

console.time('for in')

for (let index in arr) {
  callbackFn(arr[index])
}

console.timeEnd('for in')
// ->for in: 0.013ms

console.time('forEach')

arr.forEach(n => {
  callbackFn(n)
})

console.timeEnd('forEach')
// ->forEach: 0.091ms

console.time('for of')

for (let value of arr) {
  callbackFn(value)
}

console.timeEnd('for of')
// ->for of: 0.012ms


