const WebSocketServer = require('ws').Server,
wss = new WebSocketServer({ port: 8181 });//服务端口8181
// 有客户端连接时执行
wss.on('connection', function (ws,req) {
  // 获取cookie中的用户凭证
  let cookies=getCookies(req.headers.cookie)
  // 将客户凭证赋值给客户对象，以便区分
  ws.userName=cookies.userName;
  ws.userId=cookies.userId;
  userEnter(cookies);
  userList();
    ws.on('message', function (msg) {
      let data=JSON.parse(msg);
      if(data.toUser === 'all'){
        broadcastAll({
          type:'msg',
          data
        });
      } else {
        broadcastTo({
          type:'privateMsg',
          data
        })
      }
    });
});

// 将cookie从字符串转换为对象
function getCookies(data){
  let cookiesArr = data.split(';');
  let cookies={}
  cookiesArr.forEach(cookie =>{
    let cookieArr = cookie.split('=')
    cookies[cookieArr[0].trim()]=cookieArr[1].trim()
  })
  return cookies
}
// 有新用户进入时执行
function userEnter(user){
  let userTotal=Array.from(wss.clients).length
  broadcastAll({
    type:'enter',
    data:{
      msg:`用户${user.userName}加入了聊天间，当前有${userTotal}人在线`
    }
  })
}
// 获取用户列表
function userList(){
  let userList=[];
  wss.clients.forEach(client => {
    userList.push({
      userName: client.userName,
      userId:client.userId
    })
  })
  broadcastAll({
    type:'userList',
    data:userList
  })
}
// 广播给所有人
function broadcastAll(data){
  // 轮询发送
  wss.clients.forEach(client=> {
    client.send(JSON.stringify(data));
});
}
// 发送给指定用户
function broadcastTo(data){
  let isBreak=false
  // 轮询发送
  wss.clients.forEach(client=> {
    // 发送后终止循环
    if(isBreak){
      return
    }
    if(client.userId == data.data.toUser){
      client.send(JSON.stringify(data));
      isBreak=true
    }
});
}
