import axios from 'axios'

// import store from '@/store/index.js'
class Api {
  axios () {
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    axios.defaults.baseURL = '//u-to-world.com:3000'
    // let axiosDate = new Date()

    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      // store.dispatch('FETCH_LOADING', true) // 请求时加载loading
      config.params = Object.assign({
        xhrFields: '{ withCredentials: true }'
      }, config.params)

      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })

    return axios
  }
}

export default new Api()

// axios.interceptors.response.use(function (response) {
//   // 处理响应数据
//   let oDate = new Date()
//   let time = oDate.getTime() - axiosDate.getTime()
//   if (time < 500) time = 500
//   setTimeout(() => {
//     store.dispatch('FETCH_LOADING', false) // 完成隐藏loading
//   }, time)
//   // store.dispatch('FETCH_LOADING', false)
//   return response
// }, function (error) {
//   // 处理响应失败
//   store.dispatch('FETCH_LOADING', false)
//   return Promise.reject(error)
// })
