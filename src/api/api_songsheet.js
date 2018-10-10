
import Api from './base'
import {songsheet} from './urls'

const axios = Api.axios()
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
