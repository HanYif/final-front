<template>
  <div class="job">
    <el-card class="box-card">
      <div slot="header" class="clearfix header">
        <span>{{job.name}}</span>
        <div class="info">{{job.publishTime}} <span class="publisher">{{job.publisher}}</span></div>
        <img :src="job.companyIcon" class="header__img"></img>
      </div>
      <div class="content">
        <h3>职位描述</h3>
        <p>{{job.detail}}</p>
        <h3>公司简介</h3>
        <p>{{job.companyDetail}}</p>
        <h3>截止时间</h3>
        <p>{{job.deadLine}}</p>
      </div>
      <el-button type="primary" @click="collect()" class="mg-t">收藏职位</el-button>
    </el-card>
  </div>
</template>

<script>
  import PostList from '../components/postList.vue'
  // import {
    // mapActions
  // } from 'vuex'
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
        job: {
          name: 'HR海外招聘实习生',
          publisher: '马化腾',
          type: '全职',
          detail: `工作职责：

1.支持海外人才的招聘，通过各类渠道搜索海外人才，并作初步甄选与意向沟通

2.支持海外系统的搭建与公司级海外招聘的协调工作



任职要求：

1.本科及以上学历，能在深圳长期实习，至少3天/周，持续3个月以上且尽快到岗；

2.英语能力优秀，英语专业优先

3.聪明，责任心强，踏实，有创新思维；



薪酬福利：

1.实习薪酬：100/天& 一份鹅厂实习证明

2.腾讯全球新总部的办公环境，班车/早餐/下午茶/健身房/恒温游泳池/攀岩

3.对接海外顶级高端人才，接触鹅厂各类大神，大范围扩展人脉资源，开拓全球化视野

PS：此岗位无直接转正机会，接受保研或出国的同学，大三和研二的同学优先。`,
          company: '阿里',
          companyDetail: '中国最大的互联网综合服务提供商之一。',
          companyIcon: '../../static/Home/res/ali.jpg',
          publishTime: '2018-04-22 10:30',
          deadLine: '2018-04-22'
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
.bg-gray {
  background-color: rgb(238, 238, 238);
}
.bg-white {
  background-color: white;
}

.job {
  width: 960px;
  margin: 12px auto;
  text-align: left;
}
.header {
  font-size: 22px;
  position: relative;
}
.header__img {
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  height: 70px;
  border: solid 1px #eaeaea; 
}
.info {
  color: #999;
  font-size: 15px;
  margin-top: 10px;
}
.publisher {
  margin-left: 15px;
}

</style>
