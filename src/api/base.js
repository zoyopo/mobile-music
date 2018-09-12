import axios from 'axios'
import {debounce} from 'common/js/util'
import store from '@/store/index.js'
import {notLoadingUrl} from 'api/urls'
import {SET_REQUEST_END} from '@/store/mutation-types'
class Api {
  axios () {
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    axios.defaults.baseURL = '//u-to-world.com:3000'
    // let axiosDate = new Date()
    axios.defaults.withCredentials = true
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      // debugger
      // 为某些url不加loading
      if (notLoadingUrl.indexOf(config.url) < 0) {
      // 请求时加载loading
          // debugger
        store.commit(SET_REQUEST_END, false)
      }
      // config.params = Object.assign({
      //   proxy: 'http://www.u-to-world.com'
      // }, config.params)

      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })

    return axios
  }
}

export default new Api()

axios.interceptors.response.use(function (response) {
  debounce(store.commit(SET_REQUEST_END, true), 100)  // 完成隐藏loading

  // store.dispatch('FETCH_LOADING', false)
  return response
}, function (error) {
  // 处理响应失败
  store.commit(SET_REQUEST_END, true)
  return Promise.reject(error)
})
