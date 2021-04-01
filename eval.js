const code='let a=1;eval("var b=1");console.log(b)'

eval(code)

function foo() {
  "use strict"
  eval("var c=1")
  console.log(c)
}
foo()