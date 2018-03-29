<template>
  <div class="user bg-white">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>个人信息</span>
        <!--el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button-->
      </div>
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="90px" class="user-form">
        <el-form-item label="头像" prop="icon">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="userForm.name" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="用户身份" prop="type">
          <el-input v-model="userForm.type" disabled></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="job">
          <el-input v-model="userForm.job" placeholder="填写你的职位"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="userForm.company" placeholder="填写你的公司"></el-input>
        </el-form-item>
        <el-form-item label="个人介绍" prop="introduce">
          <el-input v-model="userForm.introduce" placeholder="填写职业技能、擅长的事情、喜欢的事情"></el-input>
        </el-form-item>
        <el-form-item label="个人主页" prop="url">
          <el-input v-model="userForm.url" placeholder="填写你的个人主页"></el-input>
        </el-form-item>
        <el-form-item class="mg-t">
          <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
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
      let checkName = (rule, value, cb) => {
        console.log('value', value)
        if (!value) {
          return cb(new Error('昵称不能为空!'))
        } else {
          cb() // 将判断传递给后面
        }
      }
      return {
        userForm: {
          name: '',
          job: '',
          introduce: '',
          company: '',
          url: '',
          type: '管理员'
        },
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
        jobList1: [],
        dialogImageUrl: '',
        dialogVisible: false,
        rules: {
          name: [{
            validator: checkName,
            trigger: 'blur',
            required: true
          }]
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
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //
            this.$message({message: '提交成功', type: 'success'})
            console.log('form', this.userForm)
          } else {
            this.$message({message: '提交失败', type: 'error'})
            return false
          }
        })
      }
    }
  }
</script>


<style scoped>
a {
  color: #007fff;
  color: black;
}
a:hover {
  color: #25bb9b;
}
img {
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

.user {
  padding: 25px;
}
.box-card {
  width: 700px;
  margin: auto;
}
.header {
  font-size: 1.5em;
  text-align: left;
}
</style>
