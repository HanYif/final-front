<template>
  <div class="note">
    <el-card class="box-card">
      <div slot="header" class="clearfix header">
        <span>{{note.title}}</span>
        <div class="info">{{note.publishTime}} <span class="publisher">{{note.publisher}}</span></div>
        <img :src="note.icon" class="header__img"></img>
      </div>
      <div class="content" v-html="note.content">
      </div>
    </el-card>
    <el-card class="box-card mg-t-20">
      <div slot="header" class="clearfix discuss-header">
        <span>{{discussList.length}}条回复</span>
      </div>
      <discuss-list :postList="discussList"></discuss-list>
    </el-card>
  </div>
</template>

<script>
  import PostList from '../components/postList.vue'
  import DiscussList from '../components/DiscussList.vue'
  // import {
    // mapActions
  // } from 'vuex'
  export default {
    name: 'home',
    components: {
      PostList,
      DiscussList
    },
    data () {
      return {
        activeIndex: '1',
        user: {
          name: ''
        },
        note: {
          title: '如何高效备战秋招？',
          publisher: '腾讯大佬',
          publishTime: '2018-03-12 20:30',
          icon: '../../static/Home/res/cock.jpg',
          content: '<p>作者：牛妹</p><p>链接：<a href="https://www.nowcoder.com/discuss/67366?type=0&amp;order=0&amp;pos=1&amp;page=2" target="_blank">https://www.nowcoder.com/discuss/67366?type=0&amp;order=0&amp;pos=1&amp;page=2</a></p><p>来源：牛客网</p><p><br></p><p>写题解真的是一个非常好的成长的过程，<a href="/profile/906271" target="_blank" style="color: rgb(37, 187, 155);">@NotDeep</a>&nbsp;就有一个写题解的好习惯，也是一个不折不扣的大神，人称果姐。其实，如果大家能养成很好的写题解的习惯并且长期坚持下去，你会发现，你也会成为大神！</p><p>&nbsp;</p><p>牛客为了鼓励更多人写题解，养成好习惯，春招期间拿出新版限量款T恤50件作为奖品送给大家！</p><p>&nbsp;</p><p><br></p><h2><strong>面向对象：</strong></h2><p>所有牛油</p><p>&nbsp;</p><p><br></p><h2><strong>参与方式：</strong></h2><p>1、写2018春招中某个公司的一套题中编程题的完整题解（题解详细要求请见下方注意事项），标题模板为#公司#+2018春招笔试题解，比如：“腾讯2018春招笔试题解”</p><p>2、在本帖下贴上自己的题解链接（一定不要忘记这个步骤哦）</p><p class="ql-align-justify">&nbsp;</p><p class="ql-align-justify">即为参与成功。</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong style="color: rgb(229, 51, 51);">备注：春招题目在笔试开始后，会陆续在牛客网讨论区有牛友分享出来的</strong></p><p>&nbsp;</p><p><br></p><h2><strong>评选规则：</strong></h2><p>在活动结束时，每人发布的题解的总星星数排名前50的，均可获得奖品！</p><p>&nbsp;</p><p>每篇星星数=每篇题解的点赞*10+每篇阅读量</p><p>&nbsp;</p><p>&nbsp;</p><p><br></p><h2><strong>注意事项：</strong></h2><p>1、每人可以发表多篇题解，每篇题解的星星数可累加</p><p>2、一篇题解必须包含一个公司的一套完整试卷的所有编程题目</p><p>3、题解必须为原创，并且必须将全部内容发在牛客网讨论区上</p><h2><br></h2>'
        },
        discussList: [
          {
            title: '怎样找到一份暑假实习？',
            tag: '实习',
            icon: '../../static/Home/res/ali.jpg',
            userName: '卢本伟',
            desc: '五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~',
            time: '2018-01-01 01:27:30',
            answerCount: 10,
            viewCount: 127,
            voteCount: 11
          },
          {
            title: '实习？',
            tag: '实习',
            icon: '../../static/Home/res/ali.jpg',
            userName: '卢本伟',
            desc: '五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~',
            time: '2018-01-01 01:27:30',
            answerCount: 10,
            viewCount: 127,
            voteCount: 11
          },
          {
            title: '怎样找到一份暑假实习？',
            tag: '实习',
            icon: '../../static/Home/res/ali.jpg',
            userName: '卢本伟',
            desc: '五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~',
            time: '2018-01-01 01:27:30',
            answerCount: 10,
            viewCount: 127,
            voteCount: 11
          },
          {
            title: '实习？',
            tag: '实习',
            icon: '../../static/Home/res/ali.jpg',
            userName: '卢本伟',
            desc: '五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~',
            time: '2018-01-01 01:27:30',
            answerCount: 10,
            viewCount: 127,
            voteCount: 11
          },
          {
            title: '怎样找到一份暑假实习？',
            tag: '实习',
            icon: '../../static/Home/res/ali.jpg',
            userName: '卢本伟',
            desc: '五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~',
            time: '2018-01-01 01:27:30',
            answerCount: 10,
            viewCount: 127,
            voteCount: 11
          },
          {
            title: '实习？',
            tag: '实习',
            icon: '../../static/Home/res/ali.jpg',
            userName: '卢本伟',
            desc: '五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~',
            time: '2018-01-01 01:27:30',
            answerCount: 10,
            viewCount: 127,
            voteCount: 11
          },
          {
            title: '怎样找到一份暑假实习？',
            tag: '实习',
            icon: '../../static/Home/res/ali.jpg',
            userName: '卢本伟',
            desc: '五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~',
            time: '2018-01-01 01:27:30',
            answerCount: 10,
            viewCount: 127,
            voteCount: 11
          },
          {
            title: '实习？',
            tag: '实习',
            icon: '../../static/Home/res/ali.jpg',
            userName: '卢本伟',
            desc: '五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~',
            time: '2018-01-01 01:27:30',
            answerCount: 10,
            viewCount: 127,
            voteCount: 11
          },
          {
            title: '怎样找到一份暑假实习？',
            tag: '实习',
            icon: '../../static/Home/res/ali.jpg',
            userName: '卢本伟',
            desc: '五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~',
            time: '2018-01-01 01:27:30',
            answerCount: 10,
            viewCount: 127,
            voteCount: 11
          },
          {
            title: '实习？',
            tag: '实习',
            icon: '../../static/Home/res/ali.jpg',
            userName: '卢本伟',
            desc: '五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~五五开凉了~',
            time: '2018-01-01 01:27:30',
            answerCount: 10,
            viewCount: 127,
            voteCount: 11
          }
        ]
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
    },
    methods: {
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

.mg-t {
  margin-top: 10px;
}
.mg-t-20 {
  margin-top: 10px;
}
.bg-gray {
  background-color: rgb(238, 238, 238);
}
.bg-white {
  background-color: white;
}

.note {
  width: 960px;
  margin: 12px auto;
  text-align: left;
}
.header {
  font-size: 22px;
  position: relative;
  padding-left: 90px;
}
.header__img {
  position: absolute;
  top: -5px;
  left: 0px;
  width: 70px;
  height: 70px;
  border: solid 1px #eaeaea; 
  border-radius: 35px;
}
.info {
  color: #999;
  font-size: 15px;
  margin-top: 10px;
}
.publisher {
  margin-left: 15px;
}
.discuss-header {
  font-size: 20px;
}
</style>
