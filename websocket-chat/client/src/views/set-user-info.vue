<template>
  <div class="set-wrapper">
    <div class="set">
      <el-input v-model="userName" placeholder="请输入你的名字(只能包含字母与数字)"/>
      <el-button type="success" @click="setUserInfo">确定</el-button>
    </div>
  </div>
</template>

<script>
import { setUser } from '../utils/js-cookie'
export default {
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    setUserInfo () {
      if (/(^[0-9a-zA-Z])/.test(this.userName)) {
        setUser({
          userName: this.userName,
          userId: new Date().getTime()
        })
        this.$router.push({ name: 'Home' })
      } else {
        this.$notify.error({
          title: '错误',
          message: '名字格式错误'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.set-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .set{
    width: 300px;
    button {
      margin-top: 20px;
    }
  }
}
</style>
