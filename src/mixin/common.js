// import store from '@/store/index.js'
// import {SET_REQUEST_END} from '@/store/mutation-types'
export const commonMixin = {

  data () {
    return {
      skeletonShow: true
    }
  },
  updated () {
    this.$nextTick(() => {
      this.skeletonShow = false
    })
 }
}
