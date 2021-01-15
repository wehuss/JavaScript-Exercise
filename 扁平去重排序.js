const arr = [...new Set([[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10].flat(Infinity))].sort((a, b) => a - b)
console.log(arr)

function sort(array) {
  let i = 0;
  let newArr = []
  const { length } = array
  for (i; i < length; i++) {
    // console.log('i', i)
    let n = i + 1;
    let count = 0
    for (n; n < length; n++) {
      // console.log('n', n)
      count++
      if (array[i] > array[n]) {
        const arri = array[i]
        const arrn = array[n]
        array[i] = arrn
        array[n] = arri
        break
      }
    }
    console.log('count', count)
  }
  console.log(array)
}

sort([1, 10, 3, 50, 42, 21, 35, 54, 5, 4])