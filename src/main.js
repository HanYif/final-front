// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'
// import Vueditor from 'vueditor'
import App from './App'
import router from './router'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)
// import 'vueditor/dist/style/vueditor.min.css'
// your config here
// let config = {
//   toolbar: [
//     'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor'
//   ],
//   fontName: [
//     {val: 'arial black'},
//     {val: 'times new roman'},
//     {val: 'Courier New'}
//   ],
//   fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
//   uploadUrl: ''
// }

// Vue.use(Vuex)
// Vue.use(Vueditor, config)

Vue.config.productionTip = false
// 使用element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/style/fontawesome.less'
Vue.use(Element)

// import axios from './util/interceptor.js'

// Vue.prototype.$http = axios

// api
import rest from './rest'

import store from './store/index.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  rest,
  store,
  template: '<App/>',
  components: { App }
})
