// import store from '@/store/index.js'
// import {SET_REQUEST_END} from '@/store/mutation-types'
// import BScroll from 'better-scroll'
export const commonMixin = {

  data () {
    return {
      skeletonShow: true
    }
  },
  updated () {
    this.$nextTick(() => {
      this.skeletonShow = false
      // if (this.$refs.main) {
      //   this.scroll = new BScroll(this.$refs.main, {})
      // }
    })
  }
}
