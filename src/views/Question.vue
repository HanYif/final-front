<template>
  <div>
    <el-card class="box-card bg-gray fix-pos" :body-style="{ padding: '0px', position: 'relative' }">
      <div class="block">
        <div class="for-ask">
          <img class="img" src="../../static/Home/res/cock.jpg"></img>
          <li class="to-ask">
            <img src="https://gold-cdn.xitu.io/v3/static/img/write-icon.b3ba8ac.svg" class="icon"></img>
            <a href="/#/write-ask">发起提问</a>
          </li>
          <!--a href="/draft" class="draft">草稿</a-->
        </div>
        <div class="note-list bg-white">
          <post-list :postList="showQuestionList"></post-list>
          <div style="margin: auto;">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="totalPageSize"
              @current-change="changePage"
              >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="aside">
        <div class="hot-ques-container bg-white">
          <h3>热门问题</h3>
          <div class="hot-ques">
            <div v-for="ques in hotQuestionList" class="hot-ques__item">
              <a href="/" class="ques-title">{{ques.title}}</a>
              <div>
                <span>{{ques.answer_count}}回复</span>
                <span class="fl-r">发布于{{ques.time}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="hot-user-container bg-white">
          <h3>热心用户</h3>
          <div class="hot-user">
            <div v-for="(user, index) in userList" class="hot-user__item">
              <div class="rank" :class="{'first': index===0, 'second': index===1, 'third': index===2}">{{index + 1}}</div>
              <img class="head" :src="user.icon"></img>
              <a class="ques-title" href="/">{{user.nickname}}</a>
              <div class="user-info">
                <span class="title">{{user.company}}</span>
                <span class="answer-count fl-r">{{user.answer_count}}回答</span>
              </div>
            </div>
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
        activeIndex: '2',
        quesParams: {
          pageNum: 1,
          pageSize: 10
        },
        totalPageSize: 1,
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
          {
            name: '雷军',
            company: '小米',
            answerRank: 1,
            neededJob: '硬件工程师',
            title: '软件工程师',
            hot: 251,
            icon: '../../static/Home/res/lei.jpg',
            answerCount: 4
          }, {
            name: '库克',
            company: '苹果',
            answerRank: 2,
            neededJob: '软件工程师',
            title: '软件工程师',
            hot: 1751,
            icon: '../../static/Home/res/cock.jpg',
            answerCount: 4
          }, {
            name: '刘强东',
            company: '京东',
            answerRank: 3,
            neededJob: '前端开发工程师',
            title: '软件工程师',
            hot: 2093,
            icon: '../../static/Home/res/qiang.jpg',
            answerCount: 4
          }, {
            name: '马化腾',
            company: '腾讯',
            answerRank: 4,
            neededJob: 'C++后台开发',
            title: '软件工程师',
            hot: 751,
            icon: '../../static/Home/res/tony.jpg',
            answerCount: 4
          }
        ],
        jobList: [
          {
            company: '小米',
            neededJob: '硬件工程师',
            hot: 251,
            icon: '../../static/Home/res/mi.jpg'
          }, {
            company: '阿里',
            neededJob: '软件工程师',
            hot: 1751,
            icon: '../../static/Home/res/ali.jpg'
          }, {
            company: '京东',
            neededJob: '前端开发工程师',
            hot: 2093,
            icon: '../../static/Home/res/jd.jpg'
          }, {
            company: '腾讯',
            neededJob: 'C++后台开发',
            hot: 751,
            icon: '../../static/Home/res/tx.jpg'
          }
        ],
        questionList: [],
        showQuestionList: [],
        hotQuestionList: []
      }
    },
    beforeCreate () {
      // 当主页刷新时，如果服务端设置的token
      // 的时效到了的话，便会提示未登录
      this.$rest.question.getQuestions().then(res => {
        this.questionList = res.data
        this.totalPageSize = res.data.length
        this.showQuestionList = this.questionList.slice(0, 10)
      })
      this.$rest.question.getQuestions({ isHot: 1 }).then(res => {
        this.hotQuestionList = res.data
      })
      this.$rest.user.getUsers({ 'isHot': 1 }).then(res => {
        this.userList = res.data
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
      updateQuestions (params) {
        let start = (params.pageNum - 1) * params.pageSize
        this.showQuestionList = this.questionList.slice(start, start + 10)
        console.log('this.showQuestionList', this.showQuestionList)
      },
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
      },
      changePage (currentPage) {
        this.quesParams.pageNum = currentPage
        this.updateQuestions(this.quesParams)
        console.log('currentPage', currentPage)
      }
    }
  }
</script>


<style scoped>
.fl-r {
  float: right;
}
.bg-gray {
  background-color: rgb(238, 238, 238);
}
.bg-white {
  background-color: white;
}
a {
  text-decoration: none;
  color: #007fff;
  color: black;
  font-size: 14px;  
}
a:hover {
  color: #25bb9b;
}
li {
  list-style-type: none;
}
.el-pagination {
  padding-left: 33%;
}
.note-list {
  margin: 12px 0;
  padding-bottom: 14px;
}

.block {
  width: 960px;
  min-height: 1000px;
  margin: 15px auto;
  text-align: left;
  position: relative;
  right: 120px;
}

.for-ask {
  background-color: white;
  height: 50px;
}
.for-ask .img {
  height: 50px;
  width: 50px;
  float: left;
  border-radius: 2px 0 0 2px;
}
.to-ask {
  position: relative;
  left: 40px;
  top: 15px;
}
.to-ask a {
  position: relative;
  top: -6px;
}

.aside {
  position: absolute;
  right: 80px;
  top: 0;
  width: 250px;
  color: black;
  text-align: left;
}
.aside h3 {
  border-bottom: 1px solid #d0d6d9;
  padding-bottom: 12px;
  margin: 0;
  font-size: 16px;
}
.aside p {
}
.aside span {
  font-size: 12px;
  color: #b5b9bc;
}
.hot-ques__item {
  border-bottom: 1px solid #edf1f2;
  padding: 10px 0;
}
.hot-ques__item p {
  margin: 0;
  padding-bottom: 5px;
}

.hot-ques-container, .hot-user-container {
  padding: 14px;
}
.hot-user-container {
  margin-top: 20px;
}
.hot-user__item {
  position: relative;
  padding: 10px 0 10px 65px;
  border-bottom: 1px solid #edf1f2;
}
.ques-title {
  display: block;
  margin-bottom: 3px;
}
.head {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 20px;
}
.rank {
  position: absolute;
  left: 3px;
  top: 20px;
}
.first {
  color: #f8b551;
}
.second {
  color: #787d82;
}
.third {
  color: #ec6941;
}
</style>
