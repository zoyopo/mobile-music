 import * as types from './mutation-types'

 export const FETCH_LOADING = function ({
   commit
 }, res) {
   commit(types.FETCH_LOADING, res)
 }

 export const SELECT_SONG = function ({commit}, {list, song, index}) {
   commit(types.SET_PLAY_LIST, list)
   commit(types.SET_CURRENT_SONG, song)
   commit(types.SET_CURRENT_INDEX, index)
   commit(types.SET_PLAYING_STATE, true)
 }

 export const NEXT_PREVIOUS = function ({commit}, {song, index}) {
   // debugger
   commit(types.SET_CURRENT_SONG, song)
   commit(types.SET_CURRENT_INDEX, index)
   commit(types.SET_PLAYING_STATE, true)
 }
