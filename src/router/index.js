import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorldFromVux from '@/components/HelloFromVux'

Vue.use(Router)
const view = (path, name) => () => import(`@/components/${path}${name}`)// 路由按需加载
export default new Router({
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
