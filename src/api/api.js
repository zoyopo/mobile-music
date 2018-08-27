
import Api from './base'
import {recomend, songsheet} from './urls'
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
      return Promise.reject('获取数据出错')
    }
  }).catch(err => Promise.reject(err))
}
