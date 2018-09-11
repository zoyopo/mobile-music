// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
import App from './App'
// import Home from './components/HelloFromVux'
import router from './router'
// Vue.use(VueRouter)
import store from './store'
import {commonMixin} from './mixin/common'

import VueLazyload from 'vue-lazyload'
import {
  ToastPlugin
} from 'vux'
Vue.use(ToastPlugin)

// const router = new VueRouter({
//   routes

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../static/img/no-pic.png',
  loading: require('./assets/imgLoading.png'),
  attempt: 1
})
FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.mixin(commonMixin)
/* eslint-disable no-new */
new Vue({
  router,
  store,
  mounted () {
   // console.log(this.$children[0].$data)

    window.addEventListener('DOMNodeInserted', function () {
      // debugger
      let docEl = window.document.documentElement
      if (window.innerWidth < 768) { // 在768宽度以下使用rem
        let width = docEl.getBoundingClientRect().width
        let rem = width / 25
        docEl.style.fontSize = rem + 'px'
      } else {
        docEl.style.fontSize = ''
      }
    }, false)
    window.addEventListener('resize', function () {
      // debugger
      let docEl = window.document.documentElement
      if (window.innerWidth < 768) {
        let width = docEl.getBoundingClientRect().width
        let rem = width / 25
        docEl.style.fontSize = rem + 'px'
      } else {
        docEl.style.fontSize = ''
      }
    }, false)
  },

  destroyed () {
    window.removeEventListener('DOMNodeInserted')
    window.removeEventListener('resize')
  },
  render: h => h(App)
}).$mount('#app-box')
