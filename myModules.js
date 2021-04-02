let myModules = (function Manager() {
  let modules = {}

  // 模块名，接口函数，依赖模块列表
  function define(name, impl, deps = []) {
    if (deps.length > 0) {
      for (let i = 0; i < deps.length; i++) {
        // 找到依赖模块
        deps[i] = modules[deps[i]]
      }
    }
    modules[name] = impl.call(impl, ...deps)
  }

  function get(name) {
    return modules[name]
  }

  return {
    define,
    get
  }
})()

myModules.define('bar', () => {
  function hello(who) {
    console.log(`hello,${who}`)
  }

  return {
    hello
  }
})

myModules.define('foo', (bar) => {
  let hungry = 'hippo'

  function awesome() {
    bar.hello(hungry.toLocaleUpperCase())
  }

  return {
    awesome
  }
  // 这个模块依赖于bar模块
}, ['bar'])

let bar = myModules.get('bar')

let foo = myModules.get('foo')

bar.hello('zhangsan')

foo.awesome()