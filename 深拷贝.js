const depClone = (cloneObj) => {
  if (typeof cloneObj !== 'object') {
    return cloneObj
  }

  // typeof null -> Object
  if(cloneObj===null){
    return cloneObj
  }

  // Array instanceof Object -> true
  let copyObj = cloneObj instanceof Array ? [] : {}

  for (let key in cloneObj) {
    let _obj = cloneObj[key]

    switch (typeof _obj) {
      case 'object':
        copyObj[key] = depClone(_obj)
        break
      case 'function':
        copyObj[key] = _obj.bind(copyObj)
        break
      default:
        copyObj[key] = _obj
        break
    }
  }
  return copyObj
}

let obj1 = {
  a: 1,
  b: {
    c: 2
  },
  d() {
    console.log(this.b.c)
  }
}

let cloneObj1 = depClone(obj1)

obj1.b.c = 3

console.log(obj1, cloneObj1)

obj1.d()
cloneObj1.d()