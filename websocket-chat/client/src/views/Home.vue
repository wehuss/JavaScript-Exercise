<template>
  <div class="ws-wrapper">
    <div class="chat-wrapper">
      <ul class="user-list">
        <li class="user" :class="{active:toUser==='all'}" @click="toUser='all'">所有用户</li>
        <li
          class="user"
          v-for="(user,index) in userList"
          :class="{active:toUser===user.userId}"
          :key="index"
          @click="toUser=user.userId"
        >{{user.userName}}</li>
      </ul>
      <div class="chat">
        <div
          class="msg"
          v-for="(msg,index) in activeMsgList"
          :key="index"
          :style="{textAlign: msg.userId === userId ? 'right':''}"
        >
          <p class="sender">{{msg.userName}}:</p>
          <p class="msg-content">{{msg.msg}}</p>
        </div>
      </div>
      <div class="chat-input-wrapper">
        <div class="chat-input">
          <el-input type="textarea" v-model="userMsg" rows="3"></el-input>
        </div>
        <div class="submit">
          <el-button type="info" @click="userMsg=''">清空</el-button>
          <el-button type="success" @click="submitMsg">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import cookie from 'js-cookie'

export default {
  name: 'Home',
  data () {
    return {
      userId: cookie.get('userId'),
      ws: null,
      userList: [],
      // 即将发送的消息
      userMsg: '',
      toUser: 'all',
      msgList: {
        all: []
      }
    }
  },
  created () {
    if (!cookie.get('userName') || !cookie.get('userId')) {
      return this.$router.push({ path: '/set' })
    }
    this.createWs()
  },
  computed: {
    activeMsgList () {
      console.log(this.msgList[this.toUser], this.toUser)
      return this.msgList[this.toUser]
    }
  },
  methods: {
    createWs () {
      this.ws = new WebSocket('ws://192.168.10.91:8181')
      this.ws.onerror = err => {
        console.log(err)
        this.$notify.error({
          title: '错误',
          message: '连接ws服务器失败'
        })
      }
      this.ws.onopen = suc => {
        this.$notify({
          title: '成功',
          message: '成功连接ws服务器',
          type: 'success'
        })
      }
      this.ws.onclose = () => {
        this.$notify({
          title: '连接断开',
          message: '请刷新页面',
          type: 'warning'
        })
      }
      this.ws.onmessage = msg => {
        const data = JSON.parse(msg.data).data
        const type = JSON.parse(msg.data).type
        switch (type) {
          case 'enter':
            this.userEnter(data)
            break
          case 'userList':
            this.setUserList(data)
            break
          case 'msg':
            this.setMsgList(data)
            break
          case 'privateMsg':
            this.setPrivateMsg(data)
            break
        }
      }
    },
    userEnter (data) {
      this.$notify({
        title: '新用户进入',
        message: data.msg,
        type: 'success'
      })
    },
    setUserList (data) {
      this.userList = data
    },
    setMsgList (data) {
      this.msgList.all.push(data)
    },
    setPrivateMsg (data) {
      const userId = data.userId
      if (!this.msgList[userId]) {
        this.$set(this.msgList, userId, [])
      }
      this.msgList[userId].push(data)
    },
    submitMsg () {
      if (this.userMsg.trim() === '') {
        return this.$message({
          message: '不能发送空内容',
          type: 'warning'
        })
      }
      const msg = {
        userName: cookie.get('userName'),
        userId: cookie.get('userId'),
        toUser: this.toUser,
        msg: this.userMsg
      }
      this.ws.send(JSON.stringify(msg))
      if (this.toUser !== 'all' && this.toUser !== this.userId) {
        if (!this.msgList[this.toUser]) {
          this.$set(this.msgList, this.toUser, [])
        }
        this.msgList[this.toUser].push(msg)
      }
      this.userMsg = ''
    }
  }
}
</script>
<style lang="scss">
.ws-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/bg.jpg");
  background-size: 100% 100%;
  .chat-wrapper {
    width: 1000px;
    height: 600px;
    background: #ffffff;
    position: relative;
    .user-list {
      width: 150px;
      height: 582px;
      overflow-y: scroll;
      background: #52565e;
      list-style: none;
      padding-top: 18px;
      display: inline-block;
      .user {
        width: 124px;
        line-height: 40px;
        padding-left: 8px;
        margin: 10px auto;
        background: #caccd1;
        border-radius: 20px;
        color: rgba($color: #000000, $alpha: 0.5);
      }
      .active {
        background: #c4dff6;
      }
    }
    .user-list::-webkit-scrollbar {
      width: 0px;
      height: 100%;
    }
    .chat {
      width: 800px;
      height: 442px;
      // background: royalblue;
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 25px;
      padding-top: 18px;
      margin: 10px;
      overflow-y: scroll;
      .msg {
        width: 100%;
        margin-bottom: 20px;
        .sender {
          padding-left: 10px;
          font-size: 18px;
          color: rgba($color: #000000, $alpha: 0.5);
        }
        .msg-content {
          display: inline-block;
          min-width: 180px;
          max-width: 500px;
          min-height: 40px;
          background: #f3f4f7;
          border-radius: 12px;
          padding: 10px;
          word-wrap: break-word;
          word-break: normal;
          line-height: 24px;
          text-align: left;
        }
      }
    }
    .chat::-webkit-scrollbar {
      width: 0px;
      height: 100%;
    }
    .chat-input-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 850px;
      height: 140px;
      background: #f3f4f7;
      .chat-input {
        width: 850px;
        margin-top: 12px;
      }
      .submit {
        position: absolute;
        bottom: 6px;
        right: 10px;
      }
    }
  }
}
</style>
