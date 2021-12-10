import { reactivity, effect } from './reactivity'
import html from './index.html'
import { compile } from './template'
import './index.scss'

const data = reactivity({
  value: 'data.value',
  num: 1,
  inputValue:'input value'
})

const methods = {
  testMethod(event) {
    console.log(this, event)
    alert('test method')
  },
  add(e) {
    // console.log('e',e)
    data.num++
  },
  reduce() {
    data.num--
  },
  input(){
    const input=document.querySelector('.input')
    // console.dir(input)
    data.inputValue=input.value
    setTimeout(()=>{
      console.log('focus ?')
      input.focus()
    },300)
  }
}

window.methods = methods

console.log('obj', {
  data,
  // ...methods
})

const render = compile(html)

console.log('render', render)
window.testMethod = (event) => {
  alert('test method')
}
window.addEventListener('load', () => {
  const body = document.querySelector('body')
  body.innerHTML = ''
  effect(() => {
    body.innerHTML = render({
      data,
      // ...methods
    })
  })
})