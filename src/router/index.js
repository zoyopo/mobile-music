import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'
// import HelloWorldFromVux from '@/components/HelloFromVux'

Vue.use(Router)
const view = (path, name) => () => import(`@/components/${path}${name}`)// 路由按需加载
const router = new Router({
  routes: [
    // {
    //   // path: '/',
    //   // name: 'formom',
    //   // component: view('', 'ForMyMomBirth')
    // },
    {
      path: '/',
      name: 'Index',
      component: view('', 'Index'),
      children: [
        {
          path: '/',
          name: 'Recomend',
          component: view('', 'Recomend')
        }
      ]
    },
    {
      path: '/songsheets/:id',
      name: 'SongSheet',
      component: view('', 'SongSheet')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   // ...
//   if (to === '/') {
//     store.commit()
//   }
// })

export default router
