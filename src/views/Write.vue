<template>
  <!-- bidirectional data binding（双向数据绑定） -->
  <el-form ref="form" :model="form" :rules="rules" id="form" class="bg-gray">
    <div v-if="mode === 'ask'" class="header">发布提问</div>
    <div v-if="mode === 'note'" class="header">发布经验</div>
    <el-form-item prop="title">
      <el-input v-model="form.title" placeholder="标题"></el-input>
    </el-form-item>
    <quill-editor v-model="form.content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)">
    </quill-editor>
    <el-form-item class="mg-t">
      <el-button type="primary" @click="onSubmit('form')">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
  
</template>
 
<script>
 
  // you can also register quill modules in the component
  // import Quill from 'quill'
  // import { someModule } from '../yourModulePath/someQuillModule.js'
  // Quill.register('modules/someModule', someModule)
  export default {
    data () {
      let checkTitle = (rule, value, cb) => {
        console.log('value', value)
        if (!value) {
          return cb(new Error('标题不能为空!'))
        } else {
          cb() // 将判断传递给后面
        }
      }
      let checkContent = (rule, value, cb) => {
        console.log('value', value)
        if (!value) {
          return cb(new Error('内容不能为空!'))
        } else {
          cb() // 将判断传递给后面
        }
      }
      return {
        editorOption: {
          // some quill options
        },
        form: {
          title: '',
          content: '<h2>I am Example</h2>',
          userId: -1,
          tag: ''
        },
        rules: {
          title: [{
            validator: checkTitle,
            trigger: 'blur'
          }],
          content: [{
            validator: checkContent,
            trigger: 'blur'
          }]
        }
      }
    },
    // manually control the data synchronization
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
      onEditorBlur (quill) {
        // console.log('editor blur!', quill)
      },
      onEditorFocus (quill) {
        // console.log('editor focus!', quill)
        console.log('this.content', this.form.content, this.$refs.myQuillEditor.quill.getLength())
      },
      onEditorReady (quill) {
        // console.log('editor ready!', quill)
      },
      onSubmit (formName) {
        console.log('content', this.form.content)
        this.$refs[formName].validate((valid) => {
          if (valid && this.$refs.myQuillEditor.quill.getLength() > 1) {
            this.$message({message: '创建成功', type: 'success'})
            console.log('form', this.form)
          } else {
            let msg = ''
            if (this.$refs.myQuillEditor.quill.getLength() <= 1) {
              msg = '内容不能为空'
            } else {
              msg = '标题不能为空'
            }
            this.$message({message: msg, type: 'error'})
            return false
          }
        })
      }
    },
    computed: {
      editor () {
        return this.$refs.myQuillEditor.quill
      },
      mode () {
        let res = ''
        if (this.$route.name === 'write-note') {
          res = 'note'
        } else {
          res = 'ask'
        }
        return res
      }
    },
    mounted () {
      console.log('this is current quill instance object', this.editor)
      console.log('mode', this.mode)
      console.log(this.$route.name)
    }
  }
</script>

<style scoped>
.mg-t {
  margin-top: 20px;
  margin-bottom: 20px;
}
.bg-gray {
  background-color: rgb(238, 238, 238);
}
#form {
  padding: 20px;
}
.quill-editor {
  background-color: white;
}
.header {
  text-align: left;
  margin: 20px 0;
  font-size: 20px;
}
</style>