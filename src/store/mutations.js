import * as types from './mutation-types'

const mutations = {
  [types.storeCategoriesInfo](state, CategoriesInfo) {
    state.CategoriesInfo  = CategoriesInfo 
  },
  [types.storePlayListInfo](state, playListInfo) {
    state.playListInfo = playListInfo
  },
  [types.storeUserInfo](state, userInfo) {
    state.userInfo = userInfo
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
  },

  [types.FETCH_LOADING](state,isLoading){
      state.isLoading=isLoading;
  }
}

export default mutations