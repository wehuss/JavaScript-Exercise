function compact(array: any[]) {
  return array.filter(v => v)
}

console.log(compact([0, 1, false, 2, '', 3]))
// => [1, 2, 3]