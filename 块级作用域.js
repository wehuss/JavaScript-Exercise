if (true) {
  var a = 1
}
for (var i = 0; i < 10; i++) {

}

(function () {
  for (var index = 0; index < 10; index++) {

  }
})()

eval('let e=3')

try {
  console.log('e', e) //e is not defined
} catch (error) {

}

try {
  var b = 2
  console.log('index', index)//index is not defined
} catch (error) {
  // console.log('error:', error)
}

console.log('a', a, 'i', i, 'b', b)
