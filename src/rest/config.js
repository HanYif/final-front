import { Message } from 'element-ui'
import ajax from '../common/ajax'

// 设置错误提示信息
ajax.setTipFn((tips) => {
  Message.error(tips)
})

export default {
  user: {
    register: ajax.create('/api/token/register'),
    login: ajax.create('/api/token/login'),
    token: ajax.query('/api/token'),
    getUsers: ajax.query('/api/users/getUsers')
  },
  auth: {
    github: ajax.query('/api/auth/github'),
    getGithubUser: ajax.query('/api/auth/github/user')
  },
  job: {
    getJobs: ajax.query('/api/jobs/getJobs')
  },
  question: {
    getQuestions: ajax.query('/api/questions/getQuestions')
  }
}

