function indexOf<T>(array: T[], value: T, fromIndex: number = 0) {
  let index = -1
  for (let i = fromIndex; i < array.length; i++) {
    if (array[i] === value) {
      index = i
      break
    }
  }
  return index
}

console.log(indexOf([1, 2, 1, 2], 2))
// => 1

console.log(indexOf([1, 2, 1, 2], 2, 2))
// => 3