function* test() {
  yield 1
  yield 2
  yield 3
  yield 4
  yield 5
  yield 6
  yield 7

  return 'return value'
}

let value = test()

let item
// 拿不到最后的返回值
while (!(item = value.next()).done) {
  console.log('item', item)
}

// let item={done:false}
// 拿的到最后的返回值
// while(!item.done){
//   item=value.next()
//   console.log('item')
// }