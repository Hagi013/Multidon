import Vue from 'vue'
import Router from 'vue-router'
import Landing from '../renderer/components/LandingPageView'
import Setting from '../renderer/components/Setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: Landing
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
      beforeEnter: (to, from, next) => {
        /* if (!localStorage.getItem('id_token')) {
          next({path: '/login', query: {redirect: to.fullPath}})
         } else { */
        next()
        // }
      }
    },
    {
      path: '*',
      redirect: '/'
    }

  ]
})

