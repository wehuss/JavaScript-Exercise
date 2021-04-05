let arr = [0]

arr[1] = 1

arr[100]=100

arr['test'] = 'test'

arr.forEach((_,index)=>{
  console.log('index',index)
})

console.log('arr', arr, arr.length)