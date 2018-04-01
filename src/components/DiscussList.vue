<template>
  <div class="post-list">
    <li v-for="post in postList" :key="post.title" class="post-item">
      <div class="content clearfix">
        <img class="icon" :src="post.icon"></img>
        <div class="detail">
          <div class="detail-head">
            <span href="/" class="detail-head__user clr-br">{{post.userName}}</span>
            <span class="detail-head__time">发布于{{post.time}}</span>
          </div>
          <div class="detail-content">
            <span href="/" class="detail-main">
              {{post.desc}}
            </span>
          </div>
        </div>
      </div>
    </li>
    <div style="margin-top: 12px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'postList',
  props: ['postList', 'type'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
  color: black;
}
a:hover {
  color: #25bb9b;
}

.clr-br {
  color: #67b9ff!important;
}
.clearfix {
  display: block;
  zoom: 1;
}
.detail {
  position: relative;
  top: 5px;
}
.post-list {
  padding: 20px;
  margin: auto;
  font-size: 14px;
  text-align: center;
}

.post-item {
  text-align: left;
}
.post-item p {
  margin: 3px;
}
.title {
  font-size: 14px;
  line-height: 26px;
  display: block;
}
.tag {
  border-radius: 12px;
  border: 1px solid #eaeaea;
  display: inline-block;
  padding: 2px 10px;
  color: #333;
  font-size: 12px;
  margin-right: 2px;
  background: #FFF;
  margin-bottom: 5px;
  line-height: 16px;
  cursor:default;
}
.tag:hover {
  border-color: #1abc9c
}

.content {
  height: 50px;
}
.detail {
  float: left;
  width: 800px;
  font-size: 12px;
}
.detail-head {
  margin-bottom: 20px;
}
.detail-head__user {
  float: left;
}
.detail-head__time {
  float: right;
  color: #999;
}
.detail-rt {
  display: inline-block;
  float: right;
  color: #999;
}
.mg-r-5 {
  margin-right: 5px;
}

.icon {
  float: left;
  width: 50px;
  height: 50px;
}

li {
  list-style-type: none;
}
.post-list li+li {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #e5e5e5;
}

</style>
