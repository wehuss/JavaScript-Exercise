function fill(array: any[], value: any, start: number = 0, end: number = array.length) {
  for (let i = start; i < end; i++) {
    array[i] = value
  }
  return array
}

let array = [1, 2, 3]
console.log('array', fill(array, 'a'), array)
// => ['a', 'a', 'a']

console.log(fill(Array(3), 2))
// => [2, 2, 2]

console.log(fill([4, 6, 8, 10], '*', 1, 3))
// => [4, '*', '*', 10]