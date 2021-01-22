function concat(...arg: any[]) {
  return arg.flat(1)
}

console.log(concat([1], [2], [3], [[4]]))
// => [ 1, 2, 3, [ 4 ] ]