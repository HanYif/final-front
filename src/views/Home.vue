<template>
  <div>
    <el-card class="box-card bg-gray fix-pos" :body-style="{ padding: '0px' }">
      <div class="block">
        <el-carousel>
          <el-carousel-item v-for="item in imgList" :key="item.style">
             <a :style="item.style" class="banner-item"></a>
          </el-carousel-item>
        </el-carousel>
        <div class="fn-block bg-white">
          <div class="title">部分内推用户<span class="down-line"></span></div>
          <el-card v-for="user in userList" :key="user.id" class="user-item">
            <a href="/" class="img-container"><img :src="user.icon"></img></a>
            <p>内推人：{{user.nickname}}</p>
            <p>公司：{{user.company}}</p>
            <p>热度：{{user.hot}}</p>
          </el-card>
        </div>
        <div class="fn-block">
          <div class="title">热门职位<span class="down-line"></span></div>
          <el-card v-for="job in jobList" :key="job.id" class="user-item">
            <a href="/" class="img-container"><img :src="job.icon"></img></a>
            <p>职位：{{job.neededJob}}</p>
            <p>公司：{{job.company}}</p>
            <p>热度：{{job.hot}}</p>
          </el-card>
        </div>
        <div class="fn-block bg-white">
          <div class="title">热门问题<span class="down-line"></span></div>
          <div class="hot-list">
            <post-list :postList="postList">
            </post-list>
          </div>
        </div>
      </div>
    </el-card>
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
        imgList: [
          {
            style: 'background: url(../../static/Home/res/1.jpg) center top no-repeat rgb(37, 33, 94);'
          },
          {
            style: 'background: url(../../static/Home/res/2.jpg) center top no-repeat rgb(72, 92, 251);'
          },
          {
            style: 'background: url(../../static/Home/res/3.png) center top no-repeat rgb(226, 235, 252);'
          }
        ],
        userList: [
          // {
          //   name: '雷军',
          //   company: '小米',
          //   neededJob: '硬件工程师',
          //   hot: 251,
          //   icon: '../../static/Home/res/lei.jpg'
          // }, {
          //   name: '库克',
          //   company: '苹果',
          //   neededJob: '软件工程师',
          //   hot: 1751,
          //   icon: '../../static/Home/res/cock.jpg'
          // }, {
          //   name: '刘强东',
          //   company: '京东',
          //   neededJob: '前端开发工程师',
          //   hot: 2093,
          //   icon: '../../static/Home/res/qiang.jpg'
          // }, {
          //   name: '马化腾',
          //   company: '腾讯',
          //   neededJob: 'C++后台开发',
          //   hot: 751,
          //   icon: '../../static/Home/res/tony.jpg'
          // }
        ],
        jobList: [
        ],
        postList: [
          {
            title: '怎样找到一份暑假实习？',
            tag: '实习',
            icon: '../../static/Home/res/ali.jpg',
            userName: '卢本伟',
            desc: '五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~',
            time: '2018-01-01 01:27:30'
          },
          {
            title: '实习？',
            tag: '实习',
            icon: '../../static/Home/res/ali.jpg',
            userName: '卢本伟',
            desc: '五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~',
            time: '2018-01-01 01:27:30'
          }
        ]
      }
    },
    beforeCreate () {
      // 当主页刷新时，如果服务端设置的token
      // 的时效到了的话，便会提示未登录
      console.log('jobs')
      this.$rest.job.getJobs({ 'isHot': 1 }).then(res => {
        this.jobList = res.data
      })
      this.$rest.user.getUsers({ 'isHot': 1 }).then(res => {
        this.userList = res.data
      })
      this.$rest.question.getQuestions({ 'isHot': 1 }).then(res => {
        this.postList = res.data
      })
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
.bg-gray {
  background-color: rgb(238, 238, 238);
}
.bg-white {
  background-color: white;
}
.fix-pos {
  position: relative;
  bottom: 1px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

.banner-item {
  height: 300px;
  width: 100%;
  display: block;
}

.fn-block {
  padding: 20px;
}

.title {
  position: relative;
  width: 200px;
  margin: 10px auto;  
  font-weight: bold;
  font-size: 20px;
}
.down-line {
  position: absolute;
  bottom: -10px;
  left: 70px;
  width: 56px;
  height: 3px;
  background-color: rgb(155, 155, 155, 0.8);
}


.user-item {
  display: inline-block;
  width: 200px;
  margin: 15px;
  font-size: 12px;
}
.user-item p {
  margin: 0px;
}
.img-container {
  width: 80px;
  height: 80px;
  margin: 10px auto;
}
.user-item img {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-bottom: 10px;
}

.hot-list {
  width: 960px;
  margin: auto;
}
</style>
