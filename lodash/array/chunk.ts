function chunk(array: any[], size = 1) {
  // if (array instanceof Array) {
  //   throw new TypeError('error')
  // }
  const newArray = []
  // 循环切块的次数
  const count = Math.ceil(array.length / size)
  for (let i = 0; i < count; i++) {
    newArray.push(array.slice(i * size, (i * size + size)))
  }

  return newArray
}


console.log(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3))
//=>[ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]