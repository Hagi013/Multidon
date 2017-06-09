import Vue from 'vue'
import Electron from 'vue-electron'
// import Router from 'vue-router'
import App from './App'
import router from './routes'

Vue.use(Electron)
// Vue.use(Router)
Vue.config.debug = true

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
