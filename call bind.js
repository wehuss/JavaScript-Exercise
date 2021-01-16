Function.prototype._call = function (context, ...arg) {
  // console.log('this', this)
  context.callfn = this
  const result = context.callfn(...arg)
  delete context.callfn
  return result
}


Function.prototype._bind = function (context, ...arg) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }

  return () => {
    return this.call(context, ...arg)
  }
}

const obj = {
  name: '张三',
  getName(testArg) {
    console.log(this.name, '------', testArg)
  }
}

obj.getName('arg')

obj.getName._call({
  name: '李四'
}, '通过call传入的arg')

const getName = obj.getName._bind({
  name: '王五'
}, '通过bind传入的arg')

getName()

// apply: es6中不推荐使用apply，请用剩余运算符+call代替apply
