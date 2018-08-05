
import Api from './base'
import {recomend } from './urls'
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
