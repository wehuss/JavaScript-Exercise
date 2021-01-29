const fn = (() => {
  let obj = null
  return () => {
    if (!obj) {
      obj = {
        a: 1,
        b: 2,
        time: new Date().getTime()
      }
    }
    return obj
  }
})()

const obj1 = fn()
let obj2;

setTimeout(() => {
  obj2 = fn()
  console.log(obj1, obj2, obj1 === obj2)
}, 1000);