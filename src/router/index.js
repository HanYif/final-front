import Vue from 'vue'
import Router from 'vue-router'
import Nav from '../views/Nav'
import Home from '../views/Home'
import Question from '../views/Question'
import Note from '../views/Note'
import NoteDetail from '../views/NoteDetail'
import Write from '../views/Write'
import Job from '../views/Job'
import User from '../views/User'
import WriteJob from '../views/WriteJob'
import JobDetail from '../views/JobDetail'
import Login from '../views/Login'
import Register from '../views/Register'
import Github from '../views/Github'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'Nav',
    // 路由元信息 meta
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Nav,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/question',
        name: 'question',
        component: Question
      },
      {
        path: '/write-ask',
        name: 'write-ask',
        component: Write
      },
      {
        path: '/write-note',
        name: 'write-note',
        component: Write
      },
      {
        path: '/job',
        name: 'job',
        component: Job
      },
      {
        path: '/user',
        name: 'user',
        component: User
      },
      {
        path: '/note',
        name: 'note',
        component: Note
      },
      {
        path: '/note-detail',
        name: 'note-detail',
        component: NoteDetail
      },
      {
        path: '/write-job',
        name: 'write-job',
        component: WriteJob
      },
      {
        path: '/job-detail',
        name: 'job-detail',
        component: JobDetail
      }
    ]
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/register',
    name: 'register',
    component: Register
  }, {
    path: '/github',
    name: 'github',
    component: Github
  }]
})

// 设置路由拦截
// 在vue-router的全局钩子中设置拦截
// 每个路由皆会的钩子函数
// to 进入 from 离开 next 传递
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.meta.requireAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router

