
import Api from './base'
import {recomend, songsheet, login, dailySongs} from './urls'

// var api = Api.axios()
const axios = Api.axios()
export function getFirstScreenData (apiNames) {
  let api = {
    personalizedData: axios.get(recomend.personalized),
    bannerData: axios.get(recomend.banner),
    privateContent: axios.get(recomend.privatecontent), // 独家放送
    newsongs: axios.get(recomend.newsongs)
  }
  apiNames = apiNames || ['personalizedData', 'bannerData', 'privateContent', 'newsongs']
  let arr = apiNames.map(item => api[item])
  return axios.all(arr).then(
    // debugger
    axios.spread(function (personalized, banner, privateContent, newsongs) {
      return Promise.resolve([ personalized, banner, privateContent, newsongs ])
    })).catch(err => {
      return Promise.reject(err)
    })
}

export function getSongSheetsData (params, apiNames) {
  let api = {
    playlistData: (function () {
      return axios.get(recomend.topplaylist, {
        params
      })
    })(),
    tagData: axios.get(recomend.hotplaylist),
    songCategoriesData: axios.get(recomend.catlist) // 歌单分类
  }
  apiNames = apiNames || ['playlistData']
  let arr = apiNames.map(item => api[item])
  return axios.all(arr).then(
    // debugger
    axios.spread(function (playlistData) {
      return Promise.resolve([playlistData])
    })).catch(err => {
      return Promise.reject(err)
    })
}

export function getSheetDetail (id) {
  return axios.get(songsheet.sheetdetail, {params: {
    id: id
  }}).then(res => {
    if (res && res.data.code === 200) {
      // debugger
      return Promise.resolve(res.data.result)
    } else {
      return Promise.reject(new Error('获取数据出错'))
    }
  })
}

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

export function getUserPlayList (accountId) {
  return axios.get(recomend.playlist, {
    params: {
      uid: accountId
    }
  }).then(res => {
    if (res && res.data.code === 200) {
      return Promise.resolve(res.data.playlist)
    } else {
      return Promise.reject(new Error('获取数据出错'))
    }
  })
}

export function getDailySongs () {
  return axios.get(dailySongs.songsRequest, {
    params: {
      timestamp: new Date().getTime()
    }
  }).then(res => {
    if (res && res.data.code === 200) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(new Error('获取数据出错'))
    }
  })
}
