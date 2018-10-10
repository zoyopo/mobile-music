import BScroll from 'better-scroll'
const mixinScroll = {
  mounted () {
    /*
     *  BScroll
     *  @parma bounceTime 动画延迟设置,ps: 动画未结束click无效
     *  @parma startY 初始滑动位置
     */
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 3,
      bounceTime: 400,
      // startY: -90,
      taps: true,
      click: true
    })
    // this.$refs.container.addEventListener('touchend', () => {
    //   this.$refs.container.style['padding-top'] = this.transformDelta + 'px'
    // }, false)
    // this.$refs.container.addEventListener('click', (e) => {
    //   e.preventDefault()
    // }, false)
  },
//   watch: {
//     ldDataFinished () {
//       this.$nextTick(() => {
//       debugger
//         if (this.ldDataFinished) {
//             debugger
//           this.scroll = new BScroll(this.$refs.wrapper, {})
//         }
//       })
//     }
//   }
  updated () {
    /*
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
    */
    // this.$nextTick(() => {
    // //   debugger
    // //   if (this.ldDataFinished) {
    //    // debugger

    // //   }
    // })
  }
}

export default mixinScroll
