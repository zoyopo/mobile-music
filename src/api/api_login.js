
import Api from './base'
import {login} from './urls'

// var api = Api.axios()
const axios = Api.axios()

export function loginRequest (loginInfo, vm) {
    // let errArr = []
     if (loginInfo.phone === '') {
       vm.$vux.toast.text('请输入手机号', 'bottom')
       return
     }
     if (loginInfo.password === '') {
       vm.$vux.toast.text('请输入密码', 'bottom')
       return
     }
   
     return axios.get(login.loginRequest, {
       params: loginInfo
     }).then(res => {
       if (res && res.data.code === 200) {
         return Promise.resolve(res.data)
       } else {
         vm.$vux.toast.text('用户名密码错误', 'bottom')
         return Promise.reject(new Error('获取数据出错'))
       }
     })
   }
   