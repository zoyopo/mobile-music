import * as types from './mutation-types'

const mutations = {
  [types.storeCategoriesInfo] (state, CategoriesInfo) {
    state.CategoriesInfo = CategoriesInfo
  },
  [types.storePlayListInfo] (state, playListInfo) {
    state.playListInfo = playListInfo
  },
  [types.storeUserInfo] (state, userInfo) {
    state.userInfo = userInfo
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
  },

  [types.FETCH_LOADING] (state, isLoading) {
    state.isLoading = isLoading
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAY_LIST] (state, list) {

    state.playList = list
  },
  [types.SET_CURRENT_SONG] (state, song) {
    state.currentSong = song
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_PLAYING_STATE] (state, isPlaying) {
    state.playing = isPlaying
  },
  [types.SET_REQUEST_END] (state, isEnd) {
    state.requestEnd = isEnd
  }

}

export default mutations
