<template>
  <div class="job">
    <div class="for-ask">
      <img class="img" src="../../static/Home/res/cock.jpg"></img>
      <li class="to-ask">
        <img src="https://gold-cdn.xitu.io/v3/static/img/write-icon.b3ba8ac.svg" class="icon"></img>
        <a href="/#/write-job">发布职位</a>
      </li>
      <!--a href="/draft" class="draft">草稿</a-->
    </div>
    <el-tabs type="border-card" class="border-card">
      <el-tab-pane label="热门职位">
        <div class="job-list-container">
          <div v-for="job in jobList" class="job-item">
            <a href="/" class="job-name">{{job.neededJob}}</a>
            <a href="/" class="job-company">{{job.company}}</a>
            <div class="job-area">{{job.area}}</div>
            <img :src="job.icon" class="job-img"></img>
          </div>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="100"
          class="mg-t">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="急招职位">
        <div class="job-list-container">
          <div v-for="job in jobList" class="job-item">
            <a href="/" class="job-name">{{job.neededJob}}</a>
            <a href="/" class="job-company">{{job.company}}</a>
            <div class="job-area">{{job.area}}</div>
            <img :src="job.icon" class="job-img"></img>
          </div>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="100"
          class="mg-t">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>

<script>
  import PostList from '../components/postList.vue'
  import {
    mapActions
  } from 'vuex'
  export default {
    name: 'home',
    components: {
      PostList
    },
    data () {
      return {
        activeIndex: '1',
        user: {
          name: ''
        },
        jobList: [
          {
            company: '小米',
            neededJob: '硬件工程师',
            area: '北京',
            hot: 251,
            icon: '../../static/Home/res/mi.jpg'
          }, {
            company: '阿里',
            neededJob: '软件工程师',
            area: '北京',
            hot: 1751,
            icon: '../../static/Home/res/ali.jpg'
          }, {
            company: '京东',
            neededJob: '前端开发工程师',
            area: '北京',
            hot: 2093,
            icon: '../../static/Home/res/jd.jpg'
          }, {
            company: '腾讯',
            neededJob: 'C++后台开发',
            area: '北京',
            hot: 751,
            icon: '../../static/Home/res/tx.jpg'
          }
        ],
        jobList1: []
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
    created () {
      for (let i = 0; i < 2; i++) {
        this.jobList = this.jobList.concat(this.jobList)
      }
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
li {
  list-style-type: none;
}
a {
  color: #007fff;
  color: black;
}
a:hover {
  color: #25bb9b;
}
.job-img {
  width: 70px;
  height: 70px;
}
.mg-t {
  margin-top: 10px;
}
.bg-gray {
  background-color: rgb(238, 238, 238);
}
.bg-white {
  background-color: white;
}

.job {
  padding: 15px 0;
  position: relative;
}
.border-card {
  width: 960px;
  margin: auto;
  position: relative;
}
.job-list-container {
  margin: auto;
}
.job-item {
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  width: 400px;
  height: 100px;
  border-bottom: dashed 1px #eaeaea;
  border-right: dashed 1px #eaeaea;
  text-align: left;
  padding: 12px;
  font-size: 18px;
}
.job-item img {
  position: absolute;
  right: 5px;
  top: 5px;
  border: solid 1px #eaeaea;
}
.job-name, .job-area, .job-company {
  display: block;
}
.job-name {
  text-decoration: none;
}
.job-area {
  font-size: 16px;
}
.job-company {
  font-size: 16px;
  color: #67b9ff!important;
}


.for-ask {
  background-color: white;
  height: 50px;
  width: 960px;
  margin: 0 auto 12px auto;
}
.for-ask .img {
  height: 50px!important;
  width: 50px!important;
  float: left;
  border-radius: 2px 0 0 2px;
}
.to-ask {
  position: relative;
  left: 40px;
  top: 15px;
  text-align: left;
}
.to-ask a {
  position: relative;
  top: -6px;
  text-decoration: none;
  font-size: 14px;
}
</style>
