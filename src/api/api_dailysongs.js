
import Api from './base'
import {dailySongs} from './urls'

// var api = Api.axios()
const axios = Api.axios()

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
