let str = "这是字符串"
// str[0]="a"
// console.log(str[0], new Array(str.length))

const reverseString = (s) => {
  let _str = []
  new Array(s.length).fill(null).forEach((_, index) => {
    _str[index] = s[s.length - 1 - index]
  })
  // console.log('str', _str)
  return _str.join("")
}

const reverseString2 = (s) => {
  let _str = s.split("").reduceRight((s1, s2) => {
    return s1+=s2
  })
  // console.log('str',_str)
  return _str
}

console.log(reverseString(str),reverseString2(str))