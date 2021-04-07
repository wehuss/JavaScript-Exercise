{
  function Foo() { }
  let foo = new Foo()
  Foo.prototype = { // 重写了Foo的原型，使其指向一个新的对象。foo的__proto__无法访问到重写后的prototype
    name: 'foo',
    fn() {
      console.log(this.name)
    }
  }
  try {
    foo.fn()
  } catch (error) {
    console.log('实例的原型仅指向原型而不是构造函数')
  }
}