const Vue = require('vue') // commonJs node环境

let createApp = function () {
  return new Vue({
    data () {
      return {
        test: 1
      }
    }
  })
}
