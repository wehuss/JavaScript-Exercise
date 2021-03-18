num = 1
function fun1() {
  console.log(this.num)
}

var obj = {
  num: 2,
  fun1: fun1,
  fun2() {
    console.log('this1',this)
    fun1()
  },
  fun3: () => {
    console.log('this2',this)
    fun1()
  }
}
fun1();
obj.fun1();
obj.fun2();
obj.fun3();