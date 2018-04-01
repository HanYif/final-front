<template>
  <div class="user bg-white">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>发布职位</span>
        <!--el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button-->
      </div>
      <el-form :model="jobForm" :rules="rules" ref="jobForm" label-width="90px" class="user-form">
        <el-form-item label="职位名称" prop="name">
          <el-input v-model="jobForm.name" placeholder="填写名称"></el-input>
        </el-form-item>
        <el-form-item label="发布者" prop="publisher">
          <el-input v-model="jobForm.publisher" disabled></el-input>
        </el-form-item>
        <el-form-item label="职位类型" prop="type">
          <el-input v-model="jobForm.type" placeholder="实习，全职..."></el-input>
        </el-form-item>
        <el-form-item label="职位描述" prop="detail">
          <el-input type="textarea" v-model="jobForm.detail" placeholder="填写职位具体要求"></el-input>
        </el-form-item>
        <el-form-item label="截止时间" prop="deadline">
          <el-date-picker type="date" placeholder="截止日期" v-model="jobForm.deadline" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="jobForm.company" placeholder="填写公司"></el-input>
        </el-form-item>
        <el-form-item label="公司简介" prop="company">
          <el-input type="textarea" v-model="jobForm.company" placeholder="填写公司概况"></el-input>
        </el-form-item>
        <el-form-item label="公司图标" prop="icon" style="text-align: left;">
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
        mode: 'read',
        dialogImageUrl: '',
        jobForm: {
          name: '',
          publisher: '雷军',
          type: '',
          detail: '',
          company: '',
          companyDetail: '',
          companyIcon: '',
          publishTime: ''
        },
        user: {
          name: ''
        },
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
      },
      onBack () {
        this.$router.go(-1)
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
.user-icon {
  width: 70px;
  height: 70px;
}

.box-card {
  width: 700px;
  margin: auto;
}
.header {
  font-size: 1.5em;
  text-align: left;
}

.el-upload {
  width: 50px;
  height: 50px;
  line-height: 60px;
}
</style>
