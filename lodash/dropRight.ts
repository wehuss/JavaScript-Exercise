function dropRight(arr: any[], length: number = 1) {

  let dropRightLength = arr.length - length < 0 ? 0 : arr.length - length

  return arr.slice(0, dropRightLength)
}

console.log(dropRight([1, 2, 3]))
// => [1, 2]

console.log(dropRight([1, 2, 3], 2))
// => [1]

console.log(dropRight([1, 2, 3], 5))
// => []

console.log(dropRight([1, 2, 3], 0))
// => [1, 2, 3]