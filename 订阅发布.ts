interface SubscribePublish {
  subscribeList: {
    [key: string]: ((...value: any) => void)[]
  };
  publish: (key: string, ...value: any) => void;
  subscribe: (key: string, fn: (...value: any) => any) => void;
}


const subscribePublish: SubscribePublish = {
  subscribeList: {},
  publish(key, ...value) { //传入对应的主题与内容以发布
    const list = this.subscribeList[key] || []
    if (list.length !== 0) {
      list.forEach(fn => fn.call(this, ...value))
    }
  },
  //传入订阅的key和处理函数
  subscribe(key, fn) {
    if (!this.subscribeList[key]) {
      this.subscribeList[key] = []
    }
    this.subscribeList[key].push(fn)
  }
}

const reverseString = (str: string) => str.split('').reverse().join('')

subscribePublish.subscribe('message1', (messageValue1, messageValue2) => {
  console.log('messageValue1', messageValue1, 'messageValue2', messageValue2)
})

subscribePublish.subscribe('message1', (messageValue1, messageValue2) => {
  console.log('messageValue1', reverseString(messageValue1), 'messageValue2', reverseString(messageValue2))
})

subscribePublish.publish('message1', '这是message1的内容', '这是message2的内容')