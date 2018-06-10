import axios from 'axios'
// import store from '@/store/index.js'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = '//u-to-world.com:3000'
// let axiosDate = new Date()

// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   store.dispatch('FETCH_LOADING', true) // 请求时加载loading
//   return config
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error)
// })
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
export function getFirstScreenData (apiNames) {
  let api = {
    personalizedData: axios.get('/personalized'),
    bannerData: axios.get('/banner'),
    privateContent: axios.get('/personalized/privatecontent') // 独家放送
  }
  apiNames = apiNames || ['personalizedData', 'bannerData', 'privateContent']
  let arr = apiNames.map(item => api[item])
  return axios.all(arr).then(
    // debugger
    axios.spread(function (personalized, banner, privateContent) {
      return Promise.resolve([personalized, banner, privateContent])
    })).catch(err => {
      return Promise.reject(err)
    })
}

export function getPlayList (userId) {
  return axios
    .get('/user/playlist', {
      params: {
        uid: userId
      }
    }).then(res => {
      return Promise.resolve(res)
    }).catch(err => {
      return Promise.reject(err)
    })
}

export function getSongSheetsData (params, apiNames) {
  let api = {
    playlistData: (function () {
      return axios.get('/top/playlist', {
        params
      })
    })(),
    tagData: axios.get('/playlist/hot'),
    songCategoriesData: axios.get('/playlist/catlist') // 歌单分类
  }
  apiNames = apiNames || ['playlistData', 'tagData', 'songCategoriesData']
  let arr = apiNames.map(item => api[item])
  return axios.all(arr).then(
    // debugger
    axios.spread(function (playlistData, tagData, songCategoriesData) {
      return Promise.resolve([playlistData, tagData, songCategoriesData])
    })).catch(err => {
      return Promise.reject(err)
    })
}
