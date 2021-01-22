function difference(arr1: any[], arr2: any[]) {
  return arr1.filter(v => !arr2.includes(v))
}

console.log(difference([3, 2, 1, 4, 6], [4, 2]))
// =>[ 3, 1, 6 ]