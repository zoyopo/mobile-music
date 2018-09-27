const recomend = {
  personalized: '/personalized',
  banner: '/banner',
  privatecontent: '/personalized/privatecontent',
  playlist: '/user/playlist',
  topplaylist: '/top/playlist',
  hotplaylist: '/playlist/hot',
  catlist: '/playlist/catlist',
  newsongs: '/personalized/newsong'
}
const songsheet = {
  sheetdetail: '/playlist/detail'
}

const login = {
  loginRequest: '/login/cellphone'
}

const dailySongs = {
  songsRequest: '/recommend/songs'
}

const songsSearch = {
  _search: '/search', // rst
  searchHot: '/search/hot',
  searchSuggest: '/search/suggest'
}
const notLoadingUrl = ['/playlist/catlist', '/playlist/hot', '/top/playlist', '/personalized', '/banner', '/personalized/privatecontent', '/personalized/newsong']
module.exports = {
  recomend: recomend,
  songsheet: songsheet,
  notLoadingUrl: notLoadingUrl,
  login: login,
  dailySongs: dailySongs,
  songsSearch: songsSearch
}
