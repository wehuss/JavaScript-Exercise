
let activeEffect = null

export const effect=(eff)=>{
  activeEffect=eff
  activeEffect()
  activeEffect=null
}

const targetMap=new WeakMap()

// 追踪
const track=(target,key)=>{
  if(!activeEffect) return
  let depsMap=targetMap.get(target)
  if(!depsMap) targetMap.set(target,(depsMap=new Map()))
  let dep=depsMap.get(key)
  if(!dep) depsMap.set(key,(dep=new Set()))
  dep.add(activeEffect)
}

const trigger=(target,key)=>{
  const depsMap=targetMap.get(target)
  if(!depsMap) return
  const dep=depsMap.get(key)
  if(dep) dep.forEach(effect=>effect())
}

export const reactivity=(target)=>{
  return new Proxy(target,{
    get(target,key,receiver){
      track(target,key)
      return Reflect.get(target,key,receiver)
    },
    set(target, key, value, receiver){
      const oldVal=target[key]
      const result=Reflect.set(target, key, value, receiver)
      if(oldVal!==result){
        trigger(target,key)
      }
      return result
    },
  })
}