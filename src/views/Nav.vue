<template>
  <div>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" :style="{marginLeft: '35%'}"><router-link to="/home">主页</router-link></el-menu-item>
      <el-menu-item index="2"><router-link to="/question">提问</router-link></el-menu-item>
      <el-menu-item index="3"><router-link to="/note">笔记</router-link></el-menu-item>
      <el-menu-item index="4"><router-link to="/job">求职</router-link></el-menu-item>
      <el-menu-item index="5"><router-link to="/user">个人中心</router-link></el-menu-item>
      <el-menu-item index="6" :style="{float: 'right'}">
        <router-link v-show="!user.name" to="/login">登录</router-link>
        <el-dropdown @command="loginOut">
          <span :style="{color:'#FFF'}" v-show="user.name">
          {{user.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command>登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
    
    <router-view></router-view>
  </div>
</template>

<script>
  import {
    mapActions
  } from 'vuex'
  export default {
    data () {
      return {
        activeIndex: '1',
        user: {
          name: ''
        }
      }
    },
    beforeCreate () {
      // 当主页刷新时，如果服务端设置的token
      // 的时效到了的话，便会提示未登录
      this.$rest.user.token(null).then(res => {
        if (!res.success) {
          this.userLoginOut()
          this.$message.error(res.message)
          this.user.name = null
        } else {
          let username = localStorage.getItem('username')
          if (username) {
            this.user.name = username
          }
        }
      })
      .catch(err => {
        this.$message.error(`${err.message}`, 'ERROR!')
      })
    },
    methods: {
      ...mapActions(['userLoginOut']),
      // 登出loginOut
      loginOut () {
        this.userLoginOut()
        this.user.name = null
        if (!this.$store.state.token) {
          this.$router.push('/login')
          this.$message.success('登出成功')
        } else {
          this.$message.success('登出失败')
        }
      }
    }
  }
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>