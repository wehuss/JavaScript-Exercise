function drop(arr: any[], length: number = 1) {

  let dropLength = arr.length - length < 0 ? 0 : arr.length - length

  return arr.reverse().slice(0, dropLength).reverse()
}

console.log(drop([1, 2, 3]))
// => [2, 3]

console.log(drop([1, 2, 3], 2))
// => [3]

console.log(drop([1, 2, 3], 5))
// => []

console.log(drop([1, 2, 3], 0))
// => [1, 2, 3]