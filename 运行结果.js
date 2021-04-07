{
  let Fun1 = function () {
    this.name = 'peter'
    return {
      name: 'jack'
    }
  }


  let p = new Fun1()
  // jack
  console.log(p.name)
}

{
  let fun = function () { }
  fun.prototype = {
    info: {
      name: 'peter',
      age: 25
    }
  }
  let a = new fun()
  let b = new fun()
  a.info.name = 'jack'
  b.info.name = 'tom'
  // tom tom,两个对象指向同一个内存地址
  console.log(a.info, b.info)
}

{
  let fun = function () {
    this.name = 'peter'
    return 'jack'
  }

  console.log(new fun().name)
}

{
  let fun = function () {
    this.info = {
      name: 'peter',
      age: 25
    }
  }
  let a = new fun()
  let b = new fun()
  a.info.name = 'jack'
  b.info.name = 'tom'
  console.log(a.info, b.info)
}

{
  let fun = function () {
    this.info = {
      name: 'peter',
      age: 25
    }
  }
  fun.prototype = {
    info: {
      name: 'peter',
      age: 25
    }
  }
  let a = new fun()
  let b = new fun()
  a.info.name = 'jack'
  b.info.name = 'tom'
  console.log(a.info, b.info)
}

{
  let fun = function () { }
  fun.prototype = {
    name: 'peter'
  }
  let a = new fun()
  let b = new fun()
  a.name = 'jack'
  b.name = 'tom'
  console.log(a.name, b.name)
}