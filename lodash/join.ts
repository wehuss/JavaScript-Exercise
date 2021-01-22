function join(array: any[], separator: string = ',') {
  let str = ''
  array.forEach(v => {
    str += `${v}${separator}`
  })

  return str.slice(0, str.length - separator.length)
}

console.log(join(['a', 'b', 'c'], '~'))
// => 'a~b~c'