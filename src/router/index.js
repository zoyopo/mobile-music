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
      meta: {requireAuth: false},
      children: [
        {
          path: '/',
          name: 'Recomend',
          component: view('', 'Recomend'),
          meta: {requireAuth: false}
        }
      ]
    },
    {
      path: '/songsheets/:id',
      name: 'SongSheet',
      component: view('', 'SongSheet'),
      meta: {requireAuth: false}
    },
    {
      path: '/login',
      name: 'Login',
      component: view('', 'Login'),
      meta: {requireAuth: false}
    },
    {
      path: '/dailysongs',
      name: 'dailysongs',
      component: view('', 'DailySongs'),
      meta: {requireAuth: true}
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const token = await localStorage.getItem('userInfo')
  // const tokenExpire = await sessionStorage.getItem('token_expire')
 // debugger
  // console.log('router', to.fullPath, to.path)
  // console.log(token)
  if (token) {
    // token有效，且在有效期内
    // let tmr = setTimeout(() => {
    //  // $loading.show('加载中...')
    // }, 300)
    try {
      // 获取用户信息
      await store.commit('storeUserInfo', JSON.parse(token))
      // 获取过户待审数
     // await store.dispatch('getTrfAuditCount')
       // 获取提货待审数
     // await store.dispatch('getStoAuditCount')
     // clearTimeout(tmr)
      // $loading.hide()

      // 检查是否有访问权限
      // if (to.matched.some(r => r.meta.requireRole == 'admin')) {
      //   // if(Auth.hasAuth(to.path)) {
      //   if (Auth.isAdmin()) {
      //     next()
      //   } else {
      //     await store.dispatch('logout')
      //     next('/login')
      //   }
      // } else {
      //   next()
      // }
    } catch (err) {
      console.log(err)
      next({
        path: '/login',
        query: {backrouter: to.fullPath}
      })
    }
  }
  if (to.matched.some(r => r.meta.requireAuth) && !token) {
    next({
      path: '/login',
      query: {backrouter: to.fullPath}
    })
  } else {
    // 不需要身份验证
    next()
  }
})
export default router
